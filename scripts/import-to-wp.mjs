/**
 * scripts/import-to-wp.mjs
 *
 * Popola WordPress (REST API) con tutti i contenuti hardcoded del front-end:
 *  - Campi ACF delle 7 pagine (group_pagina_hero_cta, organizzato per Tab/sezione)
 *  - Opzioni globali (group_opzioni_globali)
 *  - CPT: sedi (Sicilia/Veneto), pacchetti (Essential/Business/Premium), faq
 *    (le news si gestiscono manualmente da WordPress, non da questo script)
 *
 * Lettura credenziali da .env.local:
 *   NEXT_PUBLIC_WP_API_URL  (es. https://wp.promosan.eu/wp-json/wp/v2)
 *   WP_USER
 *   WP_APP_PASSWORD         (Application Password di WordPress)
 *
 * Uso:  npm run import:wp
 *
 * NB: i valori qui sotto sono trascritti dai default hardcoded dei componenti
 *     (Hero, Services, PromoSanNumeri, FAQ, PacchettiWelfare, fallback sedi, ecc.).
 *
 * IMMAGINI: vengono caricate automaticamente da public/assets/img/ nella Media
 *     Library (uploadMedia, con dedup per slug) e collegate ai campi ACF di tipo
 *     image come ID allegato. Le mappature filename->campo sono in PAGE_IMAGES /
 *     OPZIONI_IMAGES / SEDI_IMAGES / PACCHETTI_IMAGES.
 *
 * Al termine viene stampato un riepilogo (pagine, immagini, CPT, errori).
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// L'hosting (o un antivirus che fa scanning TLS in locale) può presentare una
// catena di certificati che Node non verifica: per l'import verso il PROPRIO
// WordPress accettiamo comunque la connessione. Impostato PRIMA di ogni fetch.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cartella immagini locali da cui caricare i media.
const IMG_DIR = resolve(__dirname, '..', 'public', 'assets', 'img');

// Flag CLI: l'upload delle immagini avviene SOLO con --with-media.
// Senza flag l'import è solo testuale (campi ACF/CPT, niente media).
//   node scripts/import-to-wp.mjs               -> solo testo  (npm run import:wp)
//   node scripts/import-to-wp.mjs --with-media  -> testo + img (npm run import:wp:full)
const WITH_MEDIA = process.argv.includes('--with-media');

/* -------------------------------------------------------------------------- */
/*                              Contatori riepilogo                           */
/* -------------------------------------------------------------------------- */

const stats = {
  pagesUpdated: 0,
  imagesUploaded: 0,
  imagesReused: 0,
  cptCreated: 0,
  cptUpdated: 0,
  errors: [],
};

/* -------------------------------------------------------------------------- */
/*                          Lettura .env.local                                */
/* -------------------------------------------------------------------------- */

function loadEnv() {
  const envPath = resolve(__dirname, '..', '.env.local');
  let raw = '';
  try {
    raw = readFileSync(envPath, 'utf8');
  } catch {
    console.error(`❌ Impossibile leggere ${envPath}`);
    process.exit(1);
  }
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

const env = loadEnv();
const API_URL = (env.NEXT_PUBLIC_WP_API_URL || '').replace(/\/$/, '');
const WP_USER = env.WP_USER;
const WP_APP_PASSWORD = env.WP_APP_PASSWORD;

if (!API_URL || !WP_USER || !WP_APP_PASSWORD) {
  console.error(
    '❌ Variabili mancanti in .env.local: servono NEXT_PUBLIC_WP_API_URL, WP_USER, WP_APP_PASSWORD'
  );
  process.exit(1);
}

const AUTH =
  'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');

/* -------------------------------------------------------------------------- */
/*                              Helper REST                                   */
/* -------------------------------------------------------------------------- */

async function api(path, { method = 'GET', body } = {}) {
  const url = path.startsWith('http') ? path : `${API_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: AUTH,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    const msg = json?.message || json?.raw || res.statusText;
    throw new Error(`HTTP ${res.status} → ${msg}`);
  }
  return json;
}

/** Trova l'ID di un contenuto per slug (pages o CPT). */
async function findIdBySlug(restBase, slug) {
  const data = await api(
    `/${restBase}?slug=${encodeURIComponent(slug)}&_fields=id&status=publish,draft`
  );
  return Array.isArray(data) && data.length ? data[0].id : null;
}

/** Aggiorna i campi ACF di una pagina esistente (trovata per slug). */
async function updatePageAcf(slug, acf) {
  const label = `page "${slug}"`;
  try {
    const id = await findIdBySlug('pages', slug);
    if (!id) {
      const msg = `${label}: pagina non trovata (crea la pagina con questo slug)`;
      console.log(`❌ ${msg}`);
      stats.errors.push(msg);
      return;
    }
    await api(`/pages/${id}`, { method: 'POST', body: { acf } });
    console.log(`✅ ${label}: campi ACF aggiornati (id ${id})`);
    stats.pagesUpdated++;
  } catch (err) {
    console.log(`❌ ${label}: ${err.message}`);
    stats.errors.push(`${label}: ${err.message}`);
  }
}

/** Crea o aggiorna un post di un CPT, identificandolo per slug. */
async function upsertPost(restBase, slug, data, labelName) {
  const label = `${restBase} "${labelName}"`;
  try {
    const id = await findIdBySlug(restBase, slug);
    const body = { slug, status: 'publish', ...data };
    if (id) {
      await api(`/${restBase}/${id}`, { method: 'POST', body });
      console.log(`✅ ${label}: aggiornato (id ${id})`);
      stats.cptUpdated++;
    } else {
      const created = await api(`/${restBase}`, { method: 'POST', body });
      console.log(`✅ ${label}: creato (id ${created.id})`);
      stats.cptCreated++;
    }
  } catch (err) {
    console.log(`❌ ${label}: ${err.message}`);
    stats.errors.push(`${label}: ${err.message}`);
  }
}

const nl = (arr) => arr.join('\n'); // per i campi textarea (una voce per riga)

/* -------------------------------------------------------------------------- */
/*                              Upload Media                                  */
/* -------------------------------------------------------------------------- */

const MIME_BY_EXT = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

// Cache filename -> media ID (evita doppi upload nello stesso run).
const mediaCache = new Map();

/** Slug WP atteso a partire dal nome file (senza estensione, sanitizzato). */
function slugFromFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Cerca un media già presente per slug; ritorna l'ID o null. */
async function findMediaBySlug(slug) {
  try {
    const data = await api(
      `/media?slug=${encodeURIComponent(slug)}&per_page=1&_fields=id,slug`
    );
    return Array.isArray(data) && data.length ? data[0].id : null;
  } catch {
    return null;
  }
}

/**
 * Carica un'immagine da public/assets/img/ nella Media Library di WordPress
 * e ritorna l'ID dell'allegato. Riusa il media se già caricato (per slug).
 */
async function uploadMedia(filename) {
  // Upload disabilitato se non è stato passato --with-media.
  if (!WITH_MEDIA) return null;
  if (!filename) return null;
  if (mediaCache.has(filename)) return mediaCache.get(filename);

  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  const mime = MIME_BY_EXT[ext];
  if (!mime) {
    const msg = `media "${filename}": estensione non supportata`;
    console.log(`❌ ${msg}`);
    stats.errors.push(msg);
    return null;
  }

  // Riuso: se esiste già un allegato con lo stesso slug, non ricaricare.
  const slug = slugFromFilename(filename);
  const existing = await findMediaBySlug(slug);
  if (existing) {
    mediaCache.set(filename, existing);
    stats.imagesReused++;
    console.log(`  ♻️  media "${filename}" già presente → id ${existing}`);
    return existing;
  }

  let buffer;
  try {
    buffer = readFileSync(resolve(IMG_DIR, filename));
  } catch {
    const msg = `media "${filename}": file non trovato in public/assets/img/`;
    console.log(`❌ ${msg}`);
    stats.errors.push(msg);
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/media`, {
      method: 'POST',
      headers: {
        Authorization: AUTH,
        'Content-Type': mime,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
      body: buffer,
    });
    const text = await res.text();
    const json = text ? JSON.parse(text) : {};
    if (!res.ok) throw new Error(json?.message || res.statusText);
    mediaCache.set(filename, json.id);
    stats.imagesUploaded++;
    console.log(`  🖼  upload "${filename}" → media id ${json.id}`);
    return json.id;
  } catch (err) {
    const msg = `media "${filename}": ${err.message}`;
    console.log(`❌ ${msg}`);
    stats.errors.push(msg);
    return null;
  }
}

/** Imposta un valore in profondità su un oggetto, dato un path "a.b.c". */
function setByPath(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur[parts[i]] = cur[parts[i]] ?? {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

/**
 * Carica le immagini indicate in `imageMap` (path ACF -> filename) e le
 * inietta come ID media nell'oggetto `acf`. Path saltati se l'upload fallisce.
 */
async function applyImages(acf, imageMap) {
  for (const [path, filename] of Object.entries(imageMap)) {
    const id = await uploadMedia(filename);
    if (id) setByPath(acf, path, id);
  }
}

/* -------------------------------------------------------------------------- */
/*                       CONTENUTI HARDCODED (dai componenti)                 */
/* -------------------------------------------------------------------------- */

const PAGES = {
  home: {
    home: {
      hero: {
        badge: '',
        titolo: 'RAGGIUNGIAMO OVUNQUE I TUOI LAVORATORI',
        sottotitolo: '',
        btn1_label: 'Scopri i servizi',
        btn1_link: '#servizi',
      },
      servizi: {
        titolo: 'I NOSTRI SERVIZI',
        sottotitolo:
          "PromoSan mette a disposizione delle aziende un'offerta completa di servizi: medicina del lavoro, welfare aziendale e medicina preventiva. La nostra unicità risiede nella flessibilità operativa: attraverso le Unità Mobili raggiungiamo le imprese ovunque si trovino, assicurando programmazione certa e risposte tempestive su tutto il territorio nazionale.",
        lista: nl([
          'MEDICINA DEL LAVORO | Servizio completo: nomina Medico Competente (soluzioni flessibili), sorveglianza sanitaria, visite mediche, accertamenti, gestione documentale e tutti gli adempimenti normativi (Allegato 3B, riunioni periodiche). | /assets/img/doctor-with-yellow-stethoscope.jpg | /medicina-del-lavoro',
          'UNITÀ MOBILI | Visite e accertamenti direttamente in azienda o in cantiere con cliniche su ruote attrezzate. Massima flessibilità, riduzione dei tempi e costi standardizzati. | /assets/img/camper5.png | /unita-mobili',
          'WELFARE AZIENDALE | Pacchetti personalizzati di prevenzione e benessere (check-up, screening, programmi salute). Trasforma la tutela della salute in un vantaggio competitivo e migliora il clima aziendale. | /assets/img/teamwork-concept.jpg | /welfare-aziendale',
          "ALTRI SERVIZI | Servizi in sviluppo: Assistenza Domiciliare Integrata (ADI) e programmi avanzati di Prevenzione della Salute per la comunità. | /assets/img/various-applications-forming-circle-front-two-people-using-mobile-phone.jpg | /altri-servizi",
        ]),
      },
      numeri: {
        titolo: 'PROMOSAN IN NUMERI',
        sottotitolo:
          'La fiducia delle aziende è il nostro punto di forza. Ogni giorno lavoriamo per garantire salute e sicurezza nei luoghi di lavoro, con risultati concreti e misurabili.',
        lista: nl([
          '25000 | + | VISITE MEDICHE EFFETTUATE OGNI ANNO',
          '50000 | + | LAVORATORI SEGUITI E TUTELATI',
          '450 |  | AZIENDE CLIENTI CHE SI AFFIDANO A PROMOSAN',
        ]),
      },
      mission: {
        mission_testo:
          'Al centro della nostra attività c\'è la <strong class="text-primary">sorveglianza sanitaria</strong>: l\'insieme degli atti medici finalizzati alla tutela dello stato di salute e sicurezza dei lavoratori, in relazione all\'ambiente di lavoro, ai fattori di rischio professionali e alle modalità di svolgimento dell\'attività lavorativa (art. 2, lettera m del D.Lgs. 81/08).',
        vision_testo:
          '<strong class="text-primary">PromoSan</strong> si impegna a diventare <strong class="text-primary">un punto di riferimento nel settore della Medicina del Lavoro</strong>, collaborando attivamente con le aziende per diffondere una cultura aziendale basata sulla salute, la sicurezza e il benessere delle persone.',
      },
      chisiamo: {
        titolo: 'IL TUO PARTNER PER LA MEDICINA DEL LAVORO',
        testo:
          "PromoSan S.r.l. nasce dall'esperienza consolidata di Promotergroup S.p.A., leader nazionale nella gestione della sorveglianza sanitaria e dei servizi integrati per la sicurezza sul lavoro. PromoSan si propone come punto di riferimento nel settore della Medicina del Lavoro, offrendo servizi di eccellenza per la prevenzione, diagnosi e cura delle patologie connesse all'attività lavorativa. La Medicina del Lavoro non è solo un obbligo normativo: è uno strumento fondamentale per tutelare la salute e la sicurezza dei lavoratori, contribuendo al benessere delle persone e alla produttività delle imprese.",
      },
    },
  },

  'medicina-del-lavoro': {
    medicina: {
      hero: {
        badge: 'Medicina del Lavoro',
        titolo: 'IL TUO PARTNER PER LA SORVEGLIANZA SANITARIA',
        btn1_label: 'Scopri il servizio',
        btn1_link: '',
      },
      benefits: {
        titolo: 'PERCHÈ SCEGLIERE PROMOSAN?',
        lista: nl([
          'COMPETENZA NORMATIVA | Piena conformità al D.Lgs. 81/08 e successivi aggiornamenti.',
          'PERSONALIZZAZIONE | Soluzioni flessibili che si adattano alla tua struttura aziendale.',
          'APPROCCIO PROATTIVO | Non solo adempimenti, ma analisi dei dati e consulenza per migliorare la prevenzione.',
          'COPERTURA NAZIONALE | Servizio erogato su tutto il territorio nazionale con professionalità omogenea.',
        ]),
      },
      visite: {
        titolo: 'VISITE MEDICHE',
        intro:
          'Le visite mediche rappresentano il momento centrale della sorveglianza sanitaria e costituiscono lo strumento attraverso cui il Medico Competente valuta la salute dei lavoratori in relazione ai rischi professionali. Secondo l\'<strong style="color: #2c5282">art. 41 del D.Lgs. 81/08</strong>, la sorveglianza sanitaria comprende diverse tipologie di visite mediche, ciascuna con finalità specifiche.',
      },
    },
  },

  'unita-mobili': {
    unita: {
      hero: {
        badge: 'Unità mobili',
        titolo: 'PORTIAMO LA MEDICINA DEL LAVORO DIRETTAMENTE DOVE LAVORI',
        btn1_label: 'Scopri i vantaggi',
        btn1_link: '#vantaggi',
        btn2_label: 'Come funziona',
        btn2_link: '#caratteristiche-unita-mobile',
      },
      caratteristiche: {
        titolo: 'CARATTERISTICHE DEL SERVIZIO',
        intro:
          '<strong style="color: #2c5282">PromoSan</strong> dispone di Unità Mobili attrezzate per lo svolgimento completo delle visite mediche di medicina del lavoro, portando il servizio direttamente presso le sedi aziendali, i cantieri e i centri operativi dislocati sul territorio.',
      },
      vantaggi: {
        titolo: 'I VANTAGGI PER LA TUA AZIENDA',
        sottotitolo:
          'Il servizio con Unità Mobili offre significativi benefici alle aziende:',
        lista: nl([
          'RIDUZIONE DEI TEMPI | I lavoratori non devono spostarsi, eliminando <strong>tempi di viaggio e attese</strong>.',
          'COSTI STANDARDIZZATI | <strong>Tariffe uniformi su tutto il territorio</strong>, indipendentemente dalla localizzazione.',
          'ACCESSIBILITÀ TERRITORIALE | Possibilità di raggiungere <strong>cantieri, siti produttivi e aree interne</strong> anche in zone remote.',
          'FLESSIBILITÀ ORGANIZZATIVA | <strong>Programmazione personalizzata</strong> in base alle esigenze produttive aziendali.',
          "CONTINUITÀ OPERATIVA | <strong>Minore impatto sull'attività lavorativa</strong> quotidiana.",
        ]),
      },
    },
  },

  'welfare-aziendale': {
    welfare: {
      hero: {
        badge: 'PromoSan • Welfare Aziendale',
        titolo:
          "DALL'ADEMPIMENTO NORMATIVO ALL'INVESTIMENTO STRATEGICO SUL BENESSERE",
        btn1_label: 'Scopri i pacchetti',
        btn1_link: '#pacchetti',
        btn2_label: 'I vantaggi strategici',
        btn2_link: '#vantaggi',
      },
      introduzione: {
        titolo: 'WELFARE AZIENDALE',
        testo:
          'Il <strong style="font-weight:600;color:#2c5282">Welfare Aziendale</strong> rappresenta l\'evoluzione strategica della medicina del lavoro: <strong style="color:#2c5282">non più solo adempimento normativo</strong>, ma investimento concreto sul benessere delle persone e sulla competitività dell\'impresa. <strong style="font-weight:600;color:#2c5282">PromoSan</strong> offre pacchetti personalizzati che trasformano la tutela della salute in un <strong style="font-weight:600;color:#1f2937">vantaggio competitivo per l\'azienda</strong> e in un beneficio tangibile per i lavoratori.',
      },
      vantaggi: {
        titolo: 'I VANTAGGI STRATEGICI',
        sottotitolo: 'INVESTIRE NEL WELFARE AZIENDALE SIGNIFICA:',
        lista: nl([
          'MIGLIORAMENTO DEL CLIMA AZIENDALE | Il welfare contribuisce a creare un ambiente di lavoro più sereno e collaborativo.',
          'AUMENTO DELLA PRODUTTIVITÀ | Dipendenti soddisfatti sono più motivati e produttivi.',
          'RIDUZIONE DEL TURNOVER | Minore turnover del personale grazie a maggior senso di appartenenza.',
          "VANTAGGI FISCALI | Detrazioni fiscali per l'azienda e vantaggi in busta paga per i dipendenti.",
          "MIGLIORAMENTO DELL'IMMAGINE AZIENDALE | L'azienda si posiziona come datore di lavoro responsabile e attrattivo.",
          'MAGGIORE ATTRATTIVITÀ PER I TALENTI | Strumento strategico per attrarre nuovi talenti in un mercato competitivo.',
        ]),
        citazione:
          "La prevenzione diventa così uno strumento di gestione strategica delle risorse umane, in cui la salute è un asset aziendale che genera valore condiviso per l'impresa e per chi lavora.",
      },
    },
  },

  'altri-servizi': {
    altri: {
      hero: {
        badge: 'Servizi in Evoluzione',
        titolo: 'ALTRI SERVIZI',
        sottotitolo:
          "L'evoluzione continua dei servizi sanitari per rispondere alle esigenze emergenti",
        btn1_label: 'Scopri i servizi',
        btn2_label: 'Contatti',
      },
      servizi_sviluppo: {
        badge: 'INNOVAZIONE IN CORSO',
        titolo: 'SERVIZI IN SVILUPPO',
        intro:
          "<p>PromoSan è costantemente impegnata nell'ampliamento della propria offerta per rispondere alle esigenze emergenti in ambito sanitario e assistenziale.</p><p>Tra i servizi in fase di sviluppo figurano l'Assistenza Domiciliare Integrata (ADI) e programmi avanzati di Prevenzione della Salute, che rappresentano l'evoluzione naturale del nostro impegno nella tutela del benessere delle persone.</p>",
        focus_lista: nl([
          'Screening oncologici',
          'Educazione sanitaria',
          'Monitoraggio cronicità',
          'Stili di vita salutari',
        ]),
      },
    },
  },

  'promo-health-center': {
    sedi: {
      hero: {
        titolo: 'PRESENTI DOVE SERVE, QUANDO SERVE',
        sottotitolo:
          'PromoSan garantisce copertura su tutto il territorio nazionale grazie a una rete capillare e flessibile, pensata per rispondere alle esigenze di ogni azienda, ovunque essa operi.',
        btn1_label: 'Scopri le nostre sedi',
        btn2_label: 'Contattaci',
      },
      rete_partner: {
        titolo: 'RETE DI PARTNER QUALIFICATI',
        testo:
          'La nostra presenza è ulteriormente rafforzata da una distribuzione capillare di partner certificati su tutto il territorio nazionale. Questa rete di professionisti qualificati ci consente di garantire vicinanza alle aziende clienti, tempestività negli interventi e standard qualitativi uniformi, anche nelle aree più periferiche.',
      },
    },
  },

  contatti: {
    contatti: {
      header: {
        badge: 'Contatti',
        titolo: 'RICHIEDI INFORMAZIONI',
        sottotitolo:
          'Ottieni un <span style="font-weight:600;color:#2c5282">preventivo personalizzato</span> per la tua azienda',
      },
      prenota: {
        titolo: 'PRENOTA UNA CONSULENZA',
        lista: nl([
          'Analisi personalizzata delle tue esigenze',
          'Preventivo gratuito e senza impegno',
          'Consulenza con i nostri specialisti',
        ]),
        nota: "*La consulenza è un'opportunità per conoscere come possiamo aiutarti",
      },
    },
  },
};

// Opzioni globali — valori demo (non esistono hardcoded nei componenti).
const OPZIONI_GLOBALI = {
  telefono: '+39 0932 862613',
  email: 'info@promosan.eu',
  whatsapp: '390932862613',
  orari: 'Lun-Ven: 9:00-18:00',
  piva: '',
  rea: '',
  area_riservata_url: 'https://clienti.promotergroup.eu/login',
  brochure_url: '',
  copyright: '© PromoSan S.r.l. - Tutti i diritti riservati',
  social_linkedin: '#',
  social_facebook: '#',
  social_instagram: '#',
};

// CPT news: gestite manualmente da WordPress, non da questo script
// (esiste già un solo articolo reale, non vanno generate news demo).

// CPT sedi — Sicilia e Veneto (da FALLBACK_SEDI_DATA + FALLBACK_SERVIZI).
const SEDI_SERVIZI = nl([
  'Medicina del Lavoro',
  'Sorveglianza Sanitaria',
  'Visite Mediche',
  'Certificati di Idoneità',
  'Visite Specialistiche',
  'Formazione Sicurezza',
]);
const SEDI = [
  {
    slug: 'sicilia',
    title: 'Sicilia',
    acf: {
      regione: 'Sicilia',
      indirizzo: 'Via del Carrubbo sn, Vittoria (RG)',
      telefono: '+39 095 1234567',
      email: 'sicilia@promohealthcenter.it',
      mappa_url:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.1234!2d14.5278!3d36.9515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313f123456789ab%3A0x123456789abcdef!2sVia%20del%20Carrubbo%2C%20Vittoria%20RG!5e0!3m2!1sit!2sit!4v1234567890',
      mappa_titolo: 'Mappa sede Sicilia',
      google_maps_link: 'https://maps.google.com/?q=Via+del+Carrubbo+Vittoria+RG',
      servizi: SEDI_SERVIZI,
    },
  },
  {
    slug: 'veneto',
    title: 'Veneto',
    acf: {
      regione: 'Veneto',
      indirizzo: 'Via Europa Unita 12/A, Postioma di Paese (TV)',
      telefono: '+39 041 1234567',
      email: 'veneto@promohealthcenter.it',
      mappa_url:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.1234!2d12.1234!3d45.6789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477e123456789abc%3A0x123456789abcdef!2sVia%20Europa%20Unita%2012%2FA%2C%20Postioma%20di%20Paese%20TV!5e0!3m2!1sit!2sit!4v1234567890',
      mappa_titolo: 'Mappa sede Veneto',
      google_maps_link:
        'https://maps.google.com/?q=Via+Europa+Unita+12+A+Postioma+Paese+TV',
      servizi: SEDI_SERVIZI,
    },
  },
];

// CPT pacchetti — Essential, Business, Premium (da DEFAULT_PACCHETTI).
const PACCHETTI = [
  {
    slug: 'essential',
    title: 'ESSENTIAL',
    menu_order: 1,
    acf: {
      nome: 'ESSENTIAL',
      sottotitolo: 'PREVENZIONE DI BASE',
      popolare: false,
      caratteristiche_incluse: nl([
        'Check-up preventivi completi',
        'Screening cardiovascolare',
        'Telemedicina',
      ]),
      caratteristiche_escluse: nl([
        'Screening oncologici',
        'Supporto psicologico',
        'Valutazioni ergonomiche',
      ]),
    },
  },
  {
    slug: 'business',
    title: 'BUSINESS',
    menu_order: 2,
    acf: {
      nome: 'BUSINESS',
      sottotitolo: 'PREVENZIONE COMPLETA',
      popolare: true,
      caratteristiche_incluse: nl([
        'Check-up preventivi completi',
        'Screening oncologici e cardiovascolari',
        'Promozione salute (alimentazione, attività fisica)',
        'Telemedicina e consulti specialistici',
        'Supporto psicologico',
      ]),
      caratteristiche_escluse: nl(['Valutazioni ergonomiche']),
    },
  },
  {
    slug: 'premium',
    title: 'PREMIUM',
    menu_order: 3,
    acf: {
      nome: 'PREMIUM',
      sottotitolo: 'PREVENZIONE TOTALE',
      popolare: false,
      caratteristiche_incluse: nl([
        'Check-up preventivi completi',
        'Screening oncologici e cardiovascolari',
        'Promozione salute completa',
        'Supporto psicologico dedicato',
        'Telemedicina e consulti specialistici',
        'Programma cessazione fumo',
        'Valutazioni ergonomiche personalizzate',
      ]),
      caratteristiche_escluse: '',
    },
  },
];

// CPT faq — tutte le FAQ (da DEFAULT_ITEMS di FAQ.tsx).
const FAQ = [
  {
    slug: 'faq-costo-medicina-lavoro',
    title: 'Quanto costa il servizio di medicina del lavoro?',
    content:
      '<p>I costi variano in base a:</p><ul><li>Numero di lavoratori: preventivi personalizzati</li><li>Tipologia di rischi presenti in azienda</li><li>Frequenza delle visite richieste</li></ul><p>Offriamo un <strong>costo standardizzato</strong> su tutto il territorio nazionale.</p>',
    acf: { categoria: 'servizi' },
  },
  {
    slug: 'faq-unita-mobili-italia',
    title: 'Le unità mobili sono presenti in tutta Italia?',
    content:
      '<p><strong>Sì, copriamo tutto il territorio nazionale</strong> grazie alla nostra rete di partner qualificati: programmazione flessibile, costi standardizzati e attrezzature complete a bordo.</p>',
    acf: { categoria: 'servizi' },
  },
  {
    slug: 'faq-pacchetto-welfare',
    title: 'Cosa include il pacchetto welfare aziendale?',
    content:
      '<p>Pacchetti personalizzabili che includono: check-up, screening, visite specialistiche e assistenza psicologica.</p>',
    acf: { categoria: 'servizi' },
  },
  {
    slug: 'faq-nomina-medico-competente',
    title: 'Come funziona la nomina del medico competente?',
    content:
      '<p>Processo in 4 fasi: valutazione rischi, nomina formale, piano sorveglianza, gestione continuativa. Documentazione conforme al D.Lgs. 81/08.</p>',
    acf: { categoria: 'normative' },
  },
  {
    slug: 'faq-tempi-visite-mediche',
    title: 'Quali sono i tempi per le visite mediche?',
    content:
      '<p>Tempi medi: <strong>Unità Mobili</strong> 7-10 giorni lavorativi, <strong>Sedi Fisse</strong> 10-15 giorni lavorativi. Per le urgenze sono disponibili slot entro 48h.</p>',
    acf: { categoria: 'normative' },
  },
  {
    slug: 'faq-documentazione-iniziale',
    title: 'Che documentazione serve per iniziare?',
    content:
      '<p>Documenti necessari: documenti aziendali (P.IVA, visura), lista lavoratori con mansioni, DVR aggiornato (se disponibile). Ti aiutiamo nella preparazione se mancano documenti.</p>',
    acf: { categoria: 'normative' },
  },
];

/* -------------------------------------------------------------------------- */
/*               MAPPATURA IMMAGINI -> CAMPI ACF (filename in img/)            */
/* -------------------------------------------------------------------------- */

// Pagine: path ACF (relativo all'oggetto acf della pagina) -> filename immagine.
const PAGE_IMAGES = {
  home: {
    'home.hero.immagine': 'camper9.jpg',
    'home.chisiamo.foto_team': 'fototeam.jpg',
    'home.mission.immagine': 'teamwork-concept.jpg',
  },
  'medicina-del-lavoro': {
    'medicina.hero.immagine': 'doctor-with-yellow-stethoscope.jpg',
  },
  'unita-mobili': {
    'unita.hero.immagine': 'camper5.png',
  },
  'welfare-aziendale': {
    'welfare.hero.immagine': 'side-view-smiley-woman-work.jpg',
  },
  'altri-servizi': {
    'altri.hero.immagine':
      'various-applications-forming-circle-front-two-people-using-mobile-phone.jpg',
  },
  'promo-health-center': {
    'sedi.hero.immagine': 'camper7.png',
    'sedi.rete_partner.immagine': 'Screenshot 2026-03-03 144118.png',
  },
  // 'contatti' non ha campi immagine.
};

// Opzioni globali: campo ACF -> filename.
const OPZIONI_IMAGES = {
  logo: 'logo.png',
  logo_bianco: 'PromoSan_white.png',
};

// CPT: slug -> filename per il campo acf.immagine.
const SEDI_IMAGES = {
  sicilia: 'Promo_Health_Center_Logo_def.png',
  veneto: 'Promo_Health_Center_Logo_def.png',
};
const PACCHETTI_IMAGES = {
  essential: 'promo.san400x400.png',
  business: 'promo.san400x400.png',
  premium: 'promo.san400x400.png',
};

/* -------------------------------------------------------------------------- */
/*                                 RUN                                        */
/* -------------------------------------------------------------------------- */

async function main() {
  console.log(`\n🔗 Target: ${API_URL}`);
  console.log(`👤 Utente: ${WP_USER}`);
  console.log(
    `🖼  Media : ${WITH_MEDIA ? 'ON (--with-media) — upload immagini attivo' : 'OFF — solo testo (usa --with-media o npm run import:wp:full)'}\n`
  );

  console.log('— Pagine (campi ACF per Tab + immagini) —');
  for (const [slug, acf] of Object.entries(PAGES)) {
    // Carica e inietta le immagini (come ID media) nei campi ACF della pagina.
    if (PAGE_IMAGES[slug]) await applyImages(acf, PAGE_IMAGES[slug]);
    await updatePageAcf(slug, acf);
  }

  console.log('\n— Opzioni globali (logo + dati) —');
  await applyImages(OPZIONI_GLOBALI, OPZIONI_IMAGES);
  await updatePageAcf('opzioni-globali', OPZIONI_GLOBALI);

  console.log('\n— CPT News — SALTATO (le news reali si gestiscono da WP, non da questo script)');

  console.log('\n— CPT Sedi —');
  for (const s of SEDI) {
    const imgId = await uploadMedia(SEDI_IMAGES[s.slug]);
    const acf = { ...s.acf, ...(imgId ? { immagine: imgId } : {}) };
    await upsertPost('sedi', s.slug, { title: s.title, acf }, s.title);
  }

  console.log('\n— CPT Pacchetti —');
  for (const p of PACCHETTI) {
    const imgId = await uploadMedia(PACCHETTI_IMAGES[p.slug]);
    const acf = { ...p.acf, ...(imgId ? { immagine: imgId } : {}) };
    await upsertPost('pacchetti', p.slug, { title: p.title, menu_order: p.menu_order, acf }, p.title);
  }

  console.log('\n— CPT FAQ —');
  for (const f of FAQ) {
    await upsertPost('faq', f.slug, { title: f.title, content: f.content, acf: f.acf }, f.title);
  }

  /* ----------------------------- Riepilogo --------------------------------- */
  console.log('\n────────────────────────────────────────');
  console.log('📊 RIEPILOGO IMPORT');
  console.log('────────────────────────────────────────');
  console.log(`📄 Pagine ACF aggiornate : ${stats.pagesUpdated}`);
  console.log(`🖼  Immagini caricate     : ${stats.imagesUploaded}`);
  console.log(`♻️  Immagini riusate      : ${stats.imagesReused}`);
  console.log(`🆕 CPT creati            : ${stats.cptCreated}`);
  console.log(`🔁 CPT aggiornati        : ${stats.cptUpdated}`);
  console.log(`❌ Errori                : ${stats.errors.length}`);
  if (stats.errors.length) {
    console.log('\n  Dettaglio errori:');
    for (const e of stats.errors) console.log(`   • ${e}`);
  }
  console.log('────────────────────────────────────────');
  console.log(stats.errors.length ? '\n⚠️  Import completato con errori.\n' : '\n✨ Import completato senza errori.\n');

  // Exit code non-zero se ci sono stati errori (utile in CI).
  if (stats.errors.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(`\n❌ Errore fatale: ${err.message}\n`);
  process.exit(1);
});
