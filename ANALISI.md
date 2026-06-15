# Analisi Struttura Progetto PromoSan (Next.js)

> Analisi completa di tutte le cartelle in `/app` e di tutti i componenti in `/components`.
> Per ogni elemento: **cosa renderizza**, **testi/immagini hardcoded** e **dati candidati a un CMS (WordPress + ACF)**.

---

## Panoramica tecnica

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 4 + CSS globale (`globals.css`, `nuovo.css`) + abbondante CSS inline (`style={{...}}`) e `styled-jsx`
- **Librerie:** `react-countup` (numeri animati), Font Awesome via CDN (in `layout.tsx`), `swiper` (usato in `news1`, ma non installato nel `package.json` → componente orfano)
- **Lingua sito:** Italiano (`<html lang="it">`)
- **Pattern dati attuale:** **tutti i contenuti sono hardcoded** dentro i componenti (array JS o JSX inline). Nessuna fetch da API/CMS. Le immagini sono in `public/assets/img/`, alcune news puntano a URL esterni di Unsplash.

### Osservazioni trasversali (problemi rilevati)
- **Componenti orfani / non collegati:** `ScrollToTop.jsx` (usa `react-router-dom`, non compatibile con Next), `news1/*` (usano `swiper` non installato e ricevono props `news` mai passate), `CtaAltriServizi.jsx`, `CtaUnitaMobili.jsx` (non importati nelle rispettive pagine).
- **Percorsi immagine errati in alcuni componenti:** `News.tsx` e `CaratteristicheServizio.tsx` importano/usano path tipo `../../assets/img/...` (fuori da `public/`) → in Next questi non funzionano correttamente come asset statici.
- **Link a vecchie pagine HTML:** `News.tsx` → `/html/news.html`, `NewsPageCard.tsx` → `/news-single.html?id=`, `CtaAltriServizi.jsx` → `./contatti.html`. Residui di una migrazione da sito statico.
- **Dati duplicati:** la lista news è duplicata in `News.tsx` (homepage) e `app/news/page.tsx` (pagina news) con tag/categorie leggermente diverse → candidato forte a fonte unica CMS.
- **Contatti incoerenti:** in giro ci sono numeri/email diversi (`+39 123 456 7890`, `info@promosan.it`, `+39 0932-862613`, WhatsApp `390932123456`/`390932862613`, P.IVA placeholder) → da centralizzare in Opzioni globali ACF.

---

# PARTE 1 — Cartella `/app` (pagine e routing)

### `app/layout.tsx`
- **Renderizza:** layout root HTML, importa Font Awesome (CDN) e `globals.css`.
- **Hardcoded:** `<title>` e `<meta description>` SEO; `lang="it"`.
- **CMS (ACF):** metadati SEO globali di default (title/description), eventuale URL CDN icone → Opzioni globali / plugin SEO (Yoast/RankMath).

### `app/page.tsx` (Home `/`)
- **Renderizza:** composizione homepage: `Navbar`, `Hero`, `ChiSiamo`, `MissionVision`, `PromoSanNumeri`, `Services`, `FAQ`, `News`, `Footer`.
- **Hardcoded:** solo struttura/ordine sezioni (nessun testo proprio).
- **CMS:** l'ordine e l'attivazione delle sezioni potrebbero diventare un "flexible content" ACF (page builder), ma è opzionale.

### `app/altri-servizi/page.tsx` (`/altri-servizi`)
- **Renderizza:** `Navbar`, `HeroAltriServizi`, `ServiziInSviluppo`, `Footer`.
- **Hardcoded:** metadati SEO completi (title, description, keywords, openGraph, robots).
- **CMS:** campi SEO della pagina (title/description/OG) → ACF o plugin SEO.

### `app/contatti/page.tsx` (`/contatti`)
- **Renderizza:** layout 2/3 + 1/3 con `ContattiHeader`, `ContattiForm`, `OrariContatti`, `AssistenzaRapida`, `PrenotaConsulenza`.
- **Hardcoded:** metadati SEO; struttura colonne e media query inline.
- **CMS:** SEO pagina; il resto dei contenuti vive nei sottocomponenti (vedi sotto).

### `app/medicina-del-lavoro/page.tsx` (`/medicina-del-lavoro`)
- **Renderizza:** `Navbar` + 8 sezioni tematiche + `CtaSection` + `Footer`.
- **Hardcoded:** nessun metadata (manca SEO); solo composizione.
- **CMS:** SEO mancante da aggiungere; contenuti nelle sezioni figlie.

### `app/news/page.tsx` (`/news`) — *(in realtà è un NewsClient)*
- **Renderizza:** pagina news client-side con ricerca, filtri per categoria, paginazione (`NewsPageHero`, `NewsPageFilters`, `NewsPageCard`, `NewsPagePagination`).
- **Hardcoded:** **array `newsData` con 4 articoli** (id, title, excerpt, image URL Unsplash, date, readTime, categories); `ITEMS_PER_PAGE = 6`; testo "Nessun risultato trovato".
- **CMS (ALTA PRIORITÀ):** gli articoli sono il candidato n.1 a Custom Post Type WordPress **"News"** con ACF/campi nativi: titolo, estratto (excerpt), immagine in evidenza, data, tempo di lettura, tassonomia "categoria".

### `app/promo-health-center/page.tsx` (`/promo-health-center`)
- **Renderizza:** `Navbar`, `HeroSedi`, `SediInteractive` (Sicilia/Veneto), `RetePartner`, `Footer`.
- **Hardcoded:** **oggetto `sediData`** (regione, indirizzo, telefono, email, URL mappa Google embed, link Google Maps) per Sicilia e Veneto; **array `servizi`** (6 voci); metadati SEO.
- **CMS (ALTA PRIORITÀ):** CPT **"Sedi"** con ACF: regione, indirizzo, telefono, email, embed mappa, link maps; lista servizi come repeater o relazione. SEO pagina.

### `app/unita-mobili/page.tsx` (`/unita-mobili`)
- **Renderizza:** `Navbar`, `HeroUnitaMobili`, `CaratteristicheServizio`, `VantaggiUnitaMobili`, `Footer`. È `'use client'`.
- **Hardcoded:** nessun metadata SEO; solo composizione.
- **CMS:** contenuti nelle sezioni figlie; aggiungere SEO.

### `app/welfare-aziendale/page.tsx` (`/welfare-aziendale`)
- **Renderizza:** `Navbar`, `HeroWelfare`, `IntroduzioneWelfare`, `PacchettiWelfare`, `VantaggiWelfare`, `CtaWelfare`, `Footer`.
- **Hardcoded:** metadati SEO completi.
- **CMS:** SEO pagina; contenuti nelle sezioni figlie.

### File CSS in `/app`
- `globals.css`, `nuovo.css`: classi di design system (`.section`, `.card`, `.btn`, `.nav-pill`, ecc.). Non sono dati di contenuto → restano nel codice.

---

# PARTE 2 — Cartella `/components`

## Componenti condivisi (globali)

### `Navbar/Navbar.tsx`
- **Renderizza:** header sticky con logo, menu desktop con dropdown "Chi siamo" e "Servizi", menu mobile, ricerca, bottone "Area Riservata".
- **Hardcoded:** logo `/assets/img/PromoSan_white.png`; **voci di menu e relativi link** (Home, Promo Health Center, Medicina del lavoro, Unità mobili, Welfare aziendale, Altri Servizi, News, Contatti); URL Area Riservata `https://clienti.promotergroup.eu/login`; placeholder "Cerca…".
- **CMS:** **menu di navigazione** → menu WordPress nativo (WP Menus) o repeater ACF in Opzioni globali; logo e URL area riservata in Opzioni globali.

### `Footer/Footer.tsx`
- **Renderizza:** newsletter, 3 colonne (logo+contatti, navigazione, accesso+social+legali), copyright. Newsletter e download brochure simulati lato client.
- **Hardcoded:** logo; **navItems** (con sottomenu), **socialLinks** (LinkedIn/Facebook/Instagram, href `#`), **legalLinks** (Privacy/Cookie/Termini); telefono `+39 123 456 7890`; email `info@promosan.it`; testo "Consulenza specializzata per la Sanità"; PDF `/Brochure PromoSan.pdf`; copyright `© 2024 PromoSan S.r.l. … P.IVA: 01234567890 - REA: MI-1234567`.
- **CMS (ALTA PRIORITÀ):** Opzioni globali ACF: contatti (tel/email/P.IVA/REA), URL social, link legali, testo newsletter, file brochure, copyright. Menu footer dal menu WP.

### `ScrollToTop.jsx`  ⚠️ orfano/incompatibile
- **Renderizza:** nulla (effetto scroll-to-top). Usa `react-router-dom` (non valido in Next App Router).
- **Hardcoded:** —
- **CMS:** nessuno (logica). Da rimuovere o riscrivere con `usePathname`.

---

## Homepage

### `Hero/Hero.tsx`
- **Renderizza:** hero full-screen con immagine di sfondo, logo, titolo, "trust bar" a 3 voci, CTA, scroll indicator.
- **Hardcoded:** immagine `/assets/img/camper9.jpg`; logo; titolo "RAGGIUNGIAMO OVUNQUE I TUOI LAVORATORI"; 3 trust item ("COSTO VISITA UNICO…", "RIDUCIAMO I TEMPI D'ATTESA", "GESTIAMO TUTTE LE SCADENZE"); CTA "Richiedi un preventivo" → `#contatti`; testo scroll.
- **CMS:** ACF gruppo "Hero Home": immagine sfondo, logo, titolo, repeater trust item, label+link CTA.

### `Chisiamo/chisiamo.tsx`
- **Renderizza:** sezione "Chi siamo" con titolo + paragrafo.
- **Hardcoded:** titolo "IL TUO PARTNER PER LA MEDICINA DEL LAVORO" e lungo paragrafo descrittivo su PromoSan/Promotergroup.
- **CMS:** ACF: titolo + WYSIWYG testo.

### `MissionVision/MissionVision.tsx`
- **Renderizza:** tab Mission/Vision con testi e card (4 card Mission, 3 card Vision) + citazione.
- **Hardcoded:** tutti i testi (riferimento D.Lgs. 81/08), titoli/descrizioni delle 7 card, citazione finale.
- **CMS:** ACF: due gruppi (Mission, Vision) ciascuno con testo intro + repeater card (titolo, testo); citazione.

### `Numeri/PromoSanNumeri.tsx`
- **Renderizza:** 3 contatori animati (IntersectionObserver + CountUp).
- **Hardcoded:** **array `stats`**: 25000+ visite, 50000+ lavoratori, 450 aziende, con label e durate; titolo "PROMOSAN IN NUMERI"; sottotitolo.
- **CMS:** ACF repeater "Numeri": valore, suffisso, label; + titolo/sottotitolo sezione.

### `Services/Services.tsx`
- **Renderizza:** griglia 4 card servizi con immagine, titolo, descrizione, link.
- **Hardcoded:** **array `services`** (4 voci: Medicina del lavoro, Unità mobili, Welfare aziendale, Altri servizi) con descrizione, immagine locale, link; titolo "I NOSTRI SERVIZI" + sottotitolo.
- **CMS:** ACF repeater "Servizi in evidenza" o relazione a CPT "Servizio": titolo, descrizione, immagine, link.

### `FAQ/FAQ.tsx`
- **Renderizza:** 2 colonne di FAQ a fisarmonica ("Servizi & Costi", "Normative & Procedure").
- **Hardcoded:** **tutte le domande/risposte** (3 + 3), con markup ricco (liste, badge, timeline). Titolo "DOMANDE FREQUENTI" + sottotitolo.
- **CMS:** ACF repeater (o CPT "FAQ"): categoria, domanda, risposta (WYSIWYG). Il markup ricco va semplificato/normalizzato.

### `News/News.tsx`
- **Renderizza:** carosello "Ultime novità" con 4 card news (navigazione/indicatori responsive).
- **Hardcoded:** **array `newsList`** (4 articoli, duplicato della pagina /news) con date in formato "20 FEB", tag, tempo lettura, immagini Unsplash; mappa colori tag; bottone "Vedi tutte le news" → `/html/news.html` (link errato).
- **CMS (ALTA PRIORITÀ):** stessa fonte CPT "News" della pagina /news (eliminare duplicazione). Colori tag → tassonomia con campo colore ACF.

---

## `/components/medicina-del-lavoro`

### `HeroMedicinaLavoro.tsx`
- **Renderizza:** hero con badge, titolo, CTA, scroll.
- **Hardcoded:** badge "Medicina del Lavoro"; titolo "IL TUO PARTNER PER LA SORVEGLIANZA SANITARIA"; CTA "Richiedi un preventivo" → `/contatti`.
- **CMS:** ACF gruppo Hero pagina: badge, titolo, label/link CTA.

### `NominaMedicoSection.tsx`
- **Renderizza:** intro normativa + 3 card "modalità di nomina" (componente `Card` interno).
- **Hardcoded:** titoli/paragrafi (D.Lgs. 81/08); 3 card con badge, titolo, descrizione, "consigliato per".
- **CMS:** ACF: testo intro + repeater card (badge, titolo, descrizione, raccomandazione).

### `ValutazioneRischiSection.tsx`
- **Renderizza:** intro + box "Protocollo Sanitario".
- **Hardcoded:** titolo "VALUTAZIONE DEI RISCHI…", paragrafi, box protocollo.
- **CMS:** ACF: titolo + WYSIWYG + box (titolo, testo, claim).

### `SopralluogoSection.tsx`
- **Renderizza:** titolo + badge norma + 2 box (Obbligo fondamentale / Garanzia PromoSan).
- **Hardcoded:** "SOPRALLUOGO AZIENDALE"; badge "Art. 25 D.Lgs. 81/08"; testi dei 2 box.
- **CMS:** ACF: titolo, badge norma, repeater box (icona, titolo, testo).

### `VisiteMedicheSection.tsx`
- **Renderizza:** sezione a tab (Tipologie, Cartella, Accertamenti, Giudizio, Portale) con liste e icone SVG; navigazione prev/next.
- **Hardcoded:** testi di tutti i tab; **liste**: 6 tipologie di visita, 7 accertamenti (con icona+descrizione), 4 giudizi di idoneità; mappa icone SVG (`getIconPath`).
- **CMS:** ACF: repeater "Tab" (titolo, contenuto) + repeater interni (item con icona/titolo/descrizione). Icone come media o set fisso.

### `SegreteriaOrganizzativa.tsx`
- **Renderizza:** card con titolo + paragrafo.
- **Hardcoded:** "SEGRETERIA ORGANIZZATIVA" + testo.
- **CMS:** ACF: titolo + WYSIWYG.

### `RiunioneAllegatoSection.tsx`
- **Renderizza:** 2 card (Riunione periodica / Allegato 3B) con badge e box info.
- **Hardcoded:** testi normativi (art. 35, art. 40 D.Lgs. 81/08), badge "OBBLIGATORIO"/"TRASMISSIONE", box "Per quali aziende"/"Scadenza annuale".
- **CMS:** ACF repeater card: badge, titolo, testo, box label/valore.

### `BenefitsSection.tsx`
- **Renderizza:** "Perché scegliere PromoSan?" con 4 benefit card.
- **Hardcoded:** **array `benefits`** (4 voci: titolo + descrizione); titolo sezione.
- **CMS:** ACF repeater "Benefit": titolo, descrizione.

### `CtaSection.tsx`
- **Renderizza:** CTA finale "Metti in sicurezza la tua azienda".
- **Hardcoded:** titolo, sottotitolo, bottone "Richiedi una consulenza gratuita" → `/contatti`.
- **CMS:** ACF gruppo CTA: titolo, testo, label/link bottone (riusabile su più pagine).

---

## `/components/altri-servizi`

### `HeroAltriServizi.tsx`
- **Renderizza:** hero animato con badge, titolo, sottotitolo, 2 bottoni, link "scopri di più".
- **Hardcoded:** badge "Servizi in Evoluzione"; "ALTRI SERVIZI"; sottotitolo; bottoni "Scopri i servizi"/"Contattaci".
- **CMS:** ACF gruppo Hero: badge, titolo, sottotitolo, bottoni.

### `ServiziInSviluppo.tsx`
- **Renderizza:** sezione con 2 `CardServizio` (ADI, Prevenzione) + `FocusGrid`.
- **Hardcoded:** intro; `adiFeatures`; `prevenzioneFocus` (4 voci); testi card (titoli, badge, descrizioni, footer "In sviluppo").
- **CMS:** ACF repeater "Servizio in sviluppo": titolo, badge, descrizione, lista feature/focus, stato.

### `CardServizio.tsx`
- **Renderizza:** card generica (presentational) con props.
- **Hardcoded:** nessun contenuto (riceve props); default `footerText = 'In sviluppo'`.
- **CMS:** nessuno (componente di presentazione).

### `FocusGrid.tsx`
- **Renderizza:** griglia di "chip" da array `items`.
- **Hardcoded:** nessuno (props).
- **CMS:** nessuno (presentational).

### `CtaAltriServizi.jsx`  ⚠️ non importato
- **Renderizza:** CTA "Innovazione in Azione…" con 2 bottoni e nota orari.
- **Hardcoded:** titolo, testo, link `./contatti.html` (errato), tel `+391234567890`, nota orari.
- **CMS:** ACF CTA (se riutilizzato). Da collegare o rimuovere.

---

## `/components/Contatti`

### `ContattiHeader.tsx`
- **Renderizza:** badge + titolo "RICHIEDI INFORMAZIONI" + sottotitolo.
- **Hardcoded:** testi badge/titolo/sottotitolo.
- **CMS:** ACF gruppo header contatti.

### `ContattiForm.tsx`
- **Renderizza:** form preventivo (nome, email, azienda, telefono, servizio, dipendenti, messaggio, privacy). Submit simulato con `alert`.
- **Hardcoded:** label, placeholder, **opzioni select** (servizi, fasce dipendenti), testo privacy, testo bottone.
- **CMS:** opzioni select e testi label → ACF (o configurazione form). **Manca integrazione reale** (es. Contact Form 7 / WPForms / endpoint).

### `OrariContatti.tsx`
- **Renderizza:** card con telefono e email + orari.
- **Hardcoded:** tel `+39 0932-862613`, orari "Lun-Ven 9:00-18:00", email `info@promosan.it`.
- **CMS (ALTA PRIORITÀ):** Opzioni globali ACF (contatti/orari) — da unificare con Footer.

### `AssistenzaRapida.tsx`
- **Renderizza:** card con bottone WhatsApp + tempo di risposta.
- **Hardcoded:** numero WhatsApp `https://wa.me/390932123456`; testi.
- **CMS:** Opzioni globali ACF: numero WhatsApp, testi.

### `PrenotaConsulenza.tsx`
- **Renderizza:** card "Prenota una consulenza" con elenco vantaggi + bottone.
- **Hardcoded:** 3 voci elenco, nota, bottone "PRENOTA ORA" → `#prenota-consulenza`.
- **CMS:** ACF gruppo: titolo, repeater vantaggi, label/link bottone.

---

## `/components/news-page` (pagina /news)

### `NewsPageHero.tsx`
- **Renderizza:** hero news con barra di ricerca (controllata da props).
- **Hardcoded:** titolo "News & Aggiornamenti", sottotitolo, placeholder ricerca.
- **CMS:** ACF: titolo/sottotitolo hero archivio news.

### `NewsPageFilters.tsx`
- **Renderizza:** pulsanti filtro categoria.
- **Hardcoded:** **array `filters`** (Tutte, Normativa, Servizi, Eventi, Innovazione, Welfare) con icona.
- **CMS:** tassonomia "Categoria News" WordPress (con icona via ACF).

### `NewsPageCard.tsx`
- **Renderizza:** card articolo (immagine, data, categoria, titolo, excerpt, tempo lettura, link).
- **Hardcoded:** **mappe stile/label categoria** (`getCategoryStyle`, `getCategoryLabel`); link `/news-single.html?id=` (errato).
- **CMS:** dati articolo dal CPT News; colori/label dalla tassonomia.

### `NewsPagePagination.tsx`
- **Renderizza:** paginazione numerica prev/next (presentational).
- **Hardcoded:** etichette "Precedente"/"Successivo".
- **CMS:** nessuno (logica); etichette eventualmente in stringhe traducibili.

---

## `/components/news1`  ⚠️ intero gruppo orfano (single news, non collegato)

### `News1Hero.jsx`
- **Renderizza:** hero articolo singolo (immagine, data, categoria, titolo, excerpt, autore, tempo lettura, views). Riceve prop `news`.
- **Hardcoded:** mappa categorie (colori/icone). Il resto da `news` (mai fornito).
- **CMS:** CPT News (campi: autore, views, immagine, categoria, ecc.).

### `News1Content.jsx`
- **Renderizza:** corpo articolo (`dangerouslySetInnerHTML`), barra like/commenti/condivisione, tag.
- **Hardcoded:** like iniziali (124), commenti (18), social; contenuto da `news.content`.
- **CMS:** CPT News: contenuto WYSIWYG, tag (tassonomia). Like/commenti → eventuale plugin.

### `News1Related.jsx`
- **Renderizza:** carosello "Altre news" con `swiper` (non installato). Riceve `relatedNews`.
- **Hardcoded:** mappa colori categoria; "Altre news".
- **CMS:** articoli correlati dal CPT News.

### `BackToTop.jsx`
- **Renderizza:** bottone torna su.
- **Hardcoded:** —
- **CMS:** nessuno (logica).

---

## `/components/Numeri`, `/components/MissionVision`
(già trattati nella sezione Homepage)

---

## `/components/PromoHealthCenter`

### `HeroSedi.tsx`
- **Renderizza:** hero sedi con titolo, sottotitolo, 2 bottoni, freccia.
- **Hardcoded:** "PRESENTI DOVE SERVE, QUANDO SERVE"; sottotitolo; bottoni "Scopri le nostre sedi"/"Contattaci".
- **CMS:** ACF gruppo Hero sedi.

### `SediInteractive.tsx`
- **Renderizza:** toggle Sicilia/Veneto + `SedeCard` + `MappaIframe`. Riceve `sediData`/`servizi` come props dalla pagina.
- **Hardcoded:** nessuno (props); etichetta "Mappa - {regione}".
- **CMS:** dati da CPT "Sedi" (vedi pagina promo-health-center).

### `SedeCard.tsx`
- **Renderizza:** card sede (logo, indirizzo, telefono, email, badge servizi, bottoni).
- **Hardcoded:** logo `Promo_Health_Center_Logo_def.png`; **link Google Maps inline** per Sicilia/Veneto (duplicano `sediData`); etichette UI.
- **CMS:** dati sede dal CPT; logo in Opzioni; rimuovere link maps duplicati.

### `SediToggle.tsx`
- **Renderizza:** 2 bottoni toggle "SEDE SICILIA"/"SEDE VENETO".
- **Hardcoded:** etichette regioni.
- **CMS:** etichette generate dal CPT Sedi.

### `MappaIframe.tsx`
- **Renderizza:** iframe mappa (presentational, props `url`/`titolo`).
- **Hardcoded:** —
- **CMS:** URL embed dal CPT Sedi.

### `RetePartner.tsx`
- **Renderizza:** sezione testo + immagine "Rete di partner qualificati".
- **Hardcoded:** titolo, paragrafo, immagine `/Screenshot 2026-03-03 144118.png`.
- **CMS:** ACF gruppo: titolo, testo, immagine.

---

## `/components/Unita-mobili`

### `HeroUnitaMobili.tsx`
- **Renderizza:** hero con immagine sfondo, badge, titolo, 2 CTA, scroll.
- **Hardcoded:** immagine `/assets/img/camper5.png`; badge "Unità mobili"; titolo "PORTIAMO LA MEDICINA DEL LAVORO DIRETTAMENTE DOVE LAVORI"; CTA "Scopri i vantaggi"/"Prenota un'unità mobile".
- **CMS:** ACF gruppo Hero: immagine, badge, titolo, bottoni.

### `CaratteristicheServizio.tsx`
- **Renderizza:** sezione con testo, slider immagini interne, griglia caratteristiche (Struttura/Tecnologia/Servizi erogati), 2 card finali.
- **Hardcoded:** testi (brevetto telemedicina); **`interiorImages`** (camper1-3, path `../../assets/img/` ⚠️ errato); **array `caratteristiche`** (3 gruppi con items); testi 2 card finali.
- **CMS:** ACF: testo intro, galleria immagini, repeater caratteristiche, repeater card. Correggere i path immagine.

### `VantaggiUnitaMobili.tsx`
- **Renderizza:** griglia 5 vantaggi (card centrale evidenziata) + box logo PromoSan.
- **Hardcoded:** **array `vantaggi`** (5 voci, descrizioni con `<strong>`); immagine `download-removebg-preview.png`; testo box finale.
- **CMS:** ACF repeater "Vantaggio": titolo, descrizione, flag evidenza; + box claim.

### `CtaUnitaMobili.jsx`  ⚠️ non importato
- **Renderizza:** CTA "Portiamo la sanità nella tua azienda".
- **Hardcoded:** titolo, sottotitolo, bottone → `/contatti`.
- **CMS:** ACF CTA (se riutilizzato). Da collegare o rimuovere.

---

## `/components/welfare-aziendale`

### `HeroWelfare.tsx`
- **Renderizza:** hero con badge, titolo, 2 bottoni, scroll.
- **Hardcoded:** badge "PromoSan • Welfare Aziendale"; titolo "DALL'ADEMPIMENTO NORMATIVO ALL'INVESTIMENTO STRATEGICO SUL BENESSERE"; bottoni "Scopri i pacchetti"/"I vantaggi strategici".
- **CMS:** ACF gruppo Hero.

### `IntroduzioneWelfare.tsx`
- **Renderizza:** titolo "WELFARE AZIENDALE" + paragrafo introduttivo.
- **Hardcoded:** testo intro.
- **CMS:** ACF: titolo + WYSIWYG.

### `PacchettiWelfare.tsx`
- **Renderizza:** 3 card pacchetti (Essential/Business/Premium), Business "PIÙ RICHIESTO".
- **Hardcoded:** **array `pacchetti`** (nome, sottotitolo, flag popular, lista feature con `included`, stile sfondo); testi header; bottone "Richiedi preventivo".
- **CMS (ALTA PRIORITÀ):** ACF repeater "Pacchetto": nome, sottotitolo, popolare?, repeater feature (testo + incluso sì/no).

### `VantaggiWelfare.tsx`
- **Renderizza:** griglia 6 vantaggi + citazione finale con logo.
- **Hardcoded:** **array `vantaggi`** (6 voci); logo importato da `../../public/...` ⚠️ (import statico anomalo); citazione finale.
- **CMS:** ACF repeater "Vantaggio strategico": titolo, descrizione; + citazione.

### `CtaWelfare.tsx`
- **Renderizza:** CTA finale "Pronto a trasformare il tuo benessere in valore?".
- **Hardcoded:** titolo, testo, bottone → `/contatti`.
- **CMS:** ACF CTA: titolo, testo, label/link.

---

# PARTE 3 — Sintesi: cosa mettere su CMS (WordPress + ACF)

### Priorità ALTA (contenuti dinamici/ripetuti)
1. **News** → Custom Post Type "News" + tassonomia "Categoria" (Normativa, Servizi, Eventi, Innovazione, Welfare). Risolve la duplicazione tra Home (`News.tsx`) e pagina (`/news`), più il singolo articolo (`news1/*`). Campi: titolo, excerpt, immagine in evidenza, data, tempo di lettura, autore, contenuto, tag, views.
2. **Sedi** → CPT "Sedi" (Sicilia, Veneto, future): regione, indirizzo, telefono, email, embed mappa, link Google Maps, lista servizi.
3. **Pacchetti Welfare** → repeater/CPT: nome, sottotitolo, popolare, feature (testo + incluso).
4. **Opzioni globali (ACF Options Page)** → contatti (telefono, email, WhatsApp, P.IVA, REA, orari), social, link legali, logo, URL Area Riservata, file brochure, copyright, menu navigazione.

### Priorità MEDIA (contenuti editoriali di pagina)
- Hero di ogni pagina (badge, titolo, sottotitolo, immagine, bottoni).
- Sezioni testuali: Chi siamo, Mission/Vision, Numeri, Servizi (home), FAQ, Benefit, Vantaggi (unità mobili/welfare), Caratteristiche unità mobili, sezioni medicina del lavoro (Nomina, Valutazione, Sopralluogo, Visite, Segreteria, Riunione/Allegato), Rete Partner, blocchi CTA riutilizzabili.
- Metadati SEO per pagina (title, description, OG) — preferibilmente plugin SEO (Yoast/RankMath).

### Restano nel codice (NON CMS)
- Componenti puramente presentazionali/logici: `CardServizio`, `FocusGrid`, `MappaIframe`, `SediToggle`, `NewsPagePagination`, `BackToTop`, `ScrollToTop`.
- Design system: `globals.css`, `nuovo.css`, stili inline e `styled-jsx`.
- Logica interattiva: ricerca/filtri/paginazione news, slider, contatori, animazioni.

### Azioni di pulizia consigliate (a margine)
- Rimuovere/riscrivere componenti orfani: `ScrollToTop.jsx`, `news1/*`, `CtaAltriServizi.jsx`, `CtaUnitaMobili.jsx`.
- Correggere i path immagine `../../assets/img/...` e gli import da `../../public/...` (usare `/assets/img/...` da `public`).
- Sostituire i link a pagine `.html` legacy con route Next (`/news`, `/contatti`, `/news/[id]`).
- Centralizzare i dati di contatto incoerenti (telefoni/email/WhatsApp/P.IVA).
- Implementare l'invio reale dei form (oggi solo `alert`) e della newsletter.
