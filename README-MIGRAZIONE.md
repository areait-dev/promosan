# Migrazione PromoSan → WordPress headless (wp.promosan.eu)

Guida step-by-step per spostare i contenuti hardcoded del frontend Next.js su WordPress + ACF,
consumandoli via REST API. Basata su `ANALISI.md`.

**Architettura target:** WordPress headless su `https://wp.promosan.eu` come CMS; il frontend Next.js
(questo repo) resta su dominio separato (es. `promosan.eu`) e legge i contenuti via REST con ISR.

---

## 0. Prerequisiti

- WordPress installato e raggiungibile su `https://wp.promosan.eu` (HTTPS obbligatorio).
- Accesso admin WP + accesso FTP/SSH al filesystem del tema.
- Plugin da installare e attivare:
  - **Advanced Custom Fields** (versione **FREE** — niente Pro): solo campi semplici
    (text, textarea, url, email, select, image, true_false). **Nessun repeater né Options Page.**
  - **Custom Post Type UI** (oppure registrazione CPT via codice, vedi §2)
  - **WP REST Cache** *(opzionale, performance)*

> **Niente ACF Pro:** le liste (servizi sede, caratteristiche pacchetto) sono campi `textarea`
> con una voce per riga; le Opzioni globali sono una **pagina WordPress normale** con slug
> `opzioni-globali`, non una Options Page.
- Node ≥ 18 e questo progetto Next.js già funzionante in locale.

---

## 1. Configurazione del frontend Next.js

Già predisposto in questo repo:

1. **`next.config.ts`** — autorizza le immagini da `wp.promosan.eu`, definisce le env
   (`NEXT_PUBLIC_WORDPRESS_URL`, `NEXT_PUBLIC_WP_API_URL`)
   e un rewrite `/wp-api/*` per evitare CORS in dev.
2. **`lib/wordpress.ts`** — funzioni di fetch tipizzate: `getNews`, `getLatestNews`,
   `getNewsBySlug`, `getRelatedNews`, `getSedi`, `getPacchettiWelfare`, `getFaq`,
   `getGlobalOptions`, `getPageFields`.

Crea un file **`.env.local`** (override opzionale degli env del config):

```bash
NEXT_PUBLIC_WORDPRESS_URL=https://wp.promosan.eu
NEXT_PUBLIC_WP_API_URL=https://wp.promosan.eu/wp-json/wp/v2
```

---

## 2. Registrazione Custom Post Type e Tassonomie (lato WordPress)

Con **CPT UI** o aggiungendo questo codice in `functions.php` del tema (o in un mu-plugin):

```php
add_action('init', function () {
  $common = ['public' => true, 'show_in_rest' => true, 'supports' => ['title','editor','thumbnail','excerpt','page-attributes']];

  register_post_type('news', $common + ['label' => 'News', 'menu_icon' => 'dashicons-megaphone', 'rewrite' => ['slug' => 'news']]);
  register_post_type('sedi', $common + ['label' => 'Sedi', 'menu_icon' => 'dashicons-location']);
  register_post_type('pacchetti', $common + ['label' => 'Pacchetti Welfare', 'menu_icon' => 'dashicons-portfolio']);
  register_post_type('faq', $common + ['label' => 'FAQ', 'menu_icon' => 'dashicons-editor-help']);

  // Tassonomia categorie per le news (slug usati dal frontend).
  register_taxonomy('categoria_news', 'news', [
    'label' => 'Categorie News',
    'public' => true,
    'show_in_rest' => true,
    'hierarchical' => true,
  ]);
});
```

> **Importante:** `show_in_rest => true` su ogni CPT/tassonomia, altrimenti non compaiono in `/wp/v2`.

Crea i termini della tassonomia `categoria_news` con questi **slug esatti** (usati nel codice):
`normativa`, `servizi`, `eventi`, `innovazione`, `welfare`.

**Campi nativi vs ACF (ACF free):**
- **FAQ** → Domanda = *Titolo* del post; Risposta = *Editor* dei contenuti; solo `categoria` è un campo ACF (select).
- **Sedi** → il campo `servizi` è una *textarea*: una voce per riga.
- **Pacchetti** → due *textarea*: `caratteristiche_incluse` e `caratteristiche_escluse` (una per riga). Ordine via "Attributi pagina".

---

## 3. Importazione dei field group ACF (cartella `/acf-json`)

ACF supporta la sincronizzazione automatica via JSON.

1. Copia la cartella **`acf-json/`** di questo repo dentro il tema attivo di WordPress:
   `wp-content/themes/<tuo-tema>/acf-json/`
   (la cartella deve chiamarsi esattamente `acf-json` e avere permessi di scrittura).
2. In WP vai su **ACF → Field Groups**: comparirà l'avviso **"Sync available"**.
3. Clicca **Sync** su tutti i gruppi:
   - `Opzioni Globali PromoSan` (`group_opzioni_globali`)
   - `News - Campi aggiuntivi` (`group_news`)
   - `Sede - Dati` (`group_sedi`)
   - `Pacchetto Welfare - Dati` (`group_pacchetti`)
   - `FAQ - Dati` (`group_faq`)
   - `Contenuti Pagina (Hero, Intro, CTA)` (`group_pagina_hero_cta`)

> D'ora in poi ogni modifica ai field group fatta in WP viene riscritta in questi JSON:
> versionali nel repo per mantenere allineati CMS e codice.

---

## 4. Opzioni globali come pagina normale (senza Options Page Pro)

Niente `acf_add_options_page` (è una feature Pro) e niente endpoint custom. Procedura:

1. In WP crea una **Pagina** normale (Pagine → Aggiungi):
   - Titolo: `Opzioni Globali` → assicurati che lo **slug** sia `opzioni-globali`.
   - *(Consigliato)* impostala su **Bozza**: non serve pubblicarla per leggerne i campi via REST
     se la query usa `status=publish`. Per semplicità qui la teniamo **Pubblicata** ma fuori dai menu.
2. Il field group `Opzioni Globali PromoSan` è agganciato a quella pagina. Compila contatti, social, ecc.
3. I dati sono già esposti dall'endpoint nativo:

```
GET https://wp.promosan.eu/wp-json/wp/v2/pages?slug=opzioni-globali
```

> **Nota sulla location ACF:** la regola di `group_opzioni_globali.json` usa
> `page == opzioni-globali`. Se la tua versione di ACF richiede l'**ID** della pagina invece
> dello slug, apri il field group in WP, seleziona la pagina dal menu a tendina e risincronizza
> il JSON. In alternativa cambia la regola in `Tipo di post == Pagina`.

Verifica: l'URL sopra deve restituire un array con un elemento la cui proprietà `acf`
contiene `telefono`, `email`, `social_linkedin`, ecc. La funzione `getGlobalOptions()`
in `lib/wordpress.ts` legge proprio `data[0].acf`.

---

## 5. Inserimento contenuti (migrazione dei dati hardcoded)

Trasferisci manualmente in WP i contenuti oggi nel codice (vedi `ANALISI.md` per la mappa completa):

| Contenuto attuale (file) | Destinazione WordPress |
|---|---|
| `app/news/page.tsx` + `News.tsx` (4 articoli) | CPT **News** (un post per articolo, categoria, immagine in evidenza, `tempo_lettura`) |
| `app/promo-health-center/page.tsx` (`sediData`, `servizi`) | CPT **Sedi** (Sicilia, Veneto) |
| `welfare-aziendale/PacchettiWelfare.tsx` (`pacchetti`) | CPT **Pacchetti** (Essential, Business, Premium — usa l'ordine via "Attributi pagina") |
| `FAQ/FAQ.tsx` (6 FAQ) | CPT **FAQ** (campo categoria) |
| Footer/Contatti (tel, email, WhatsApp, P.IVA, social, brochure) | **Opzioni PromoSan** |
| Hero/Intro/CTA di ogni pagina | Campi ACF su **Pagine** native (crea le pagine con slug: `home`, `medicina-del-lavoro`, `unita-mobili`, `welfare-aziendale`, `altri-servizi`, `promo-health-center`, `contatti`) |

Carica le immagini in **Media** (oggi in `public/assets/img/`). Le news che usano URL Unsplash
vanno sostituite con immagini caricate su WP.

---

## 6. Aggiornamento dei componenti React

Converti i componenti da dati hardcoded a props/fetch. Esempi.

### 6a. Server Component che fa il fetch (pagina news)

```tsx
// app/news/page.tsx
import { getNews } from "@/lib/wordpress";
import NewsClient from "./NewsClient";

export default async function NewsPage() {
  const news = await getNews(12);
  return <NewsClient initialNews={news} />;
}
```

`NewsClient` riceve `initialNews` come prop al posto dell'array `newsData` hardcoded;
filtri/ricerca/paginazione restano client-side invariati.

### 6b. Homepage news

```tsx
// app/page.tsx
import { getLatestNews } from "@/lib/wordpress";
// ...
const latest = await getLatestNews(4);
// <News items={latest} />  (rimuovi l'array interno e mappa sulle props)
```

### 6c. Sedi

```tsx
// app/promo-health-center/page.tsx
import { getSedi } from "@/lib/wordpress";
const sedi = await getSedi(); // passa a <SediInteractive sedi={sedi} />
```

### 6d. Opzioni globali (Footer / Contatti)

```tsx
import { getGlobalOptions } from "@/lib/wordpress";
const opt = await getGlobalOptions();
// usa opt.telefono, opt.email, opt.whatsapp, opt.social.linkedin, opt.brochureUrl, ...
```

> Suggerimento: i componenti che oggi sono `'use client'` ma non hanno interattività
> (es. `Footer`) possono diventare Server Component e ricevere i dati via fetch.
> Quelli interattivi ricevono i dati come props dal genitore server.

### 6e. Single news (riattivare `news1/*`)

Crea la route dinamica `app/news/[slug]/page.tsx` usando `getNewsBySlug` e `getRelatedNews`.
Prima di riusare `news1/News1Related.jsx` installa `swiper` (`npm i swiper`) oppure sostituiscilo.

---

## 7. Pulizia tecnica (da ANALISI.md)

- Correggi i path immagine `../../assets/img/...` in `News.tsx` e `CaratteristicheServizio.tsx`
  → ora le immagini arrivano da WP (campo `image.url`).
- Sostituisci i link legacy `.html` (`/html/news.html`, `/news-single.html`, `./contatti.html`)
  con le route Next (`/news`, `/news/[slug]`, `/contatti`).
- Rimuovi/riscrivi i componenti orfani: `ScrollToTop.jsx` (usa `usePathname`), `CtaAltriServizi.jsx`,
  `CtaUnitaMobili.jsx`.
- Unifica i contatti incoerenti: tutti i componenti devono leggere da `getGlobalOptions()`.
- Form contatti/newsletter: collega un endpoint reale (Contact Form 7 / WPForms + REST, o API route Next).

---

## 8. Revalidation / cache

- Le funzioni usano `next: { revalidate }` (60s per i contenuti, 300s per le opzioni): ISR automatico.
- Per aggiornamenti istantanei alla pubblicazione, configura un **webhook** WP → Next:
  in `functions.php` su `save_post`/`acf/save_post` chiama un endpoint Next
  `app/api/revalidate/route.ts` che esegue `revalidateTag`/`revalidatePath`.

---

## 9. Checklist finale

- [ ] CPT `news`, `sedi`, `pacchetti`, `faq` visibili in `/wp-json/wp/v2/...`
- [ ] Tassonomia `categoria_news` con i 5 slug corretti
- [ ] Field group ACF sincronizzati da `/acf-json` e con `show_in_rest`
- [ ] `/wp-json/wp/v2/pages?slug=opzioni-globali` restituisce i contatti nella proprietà `acf`
- [ ] Immagini caricate in Media; dominio autorizzato in `next.config.ts`
- [ ] Componenti aggiornati a fetch/props; build `npm run build` senza errori
- [ ] Link legacy `.html` rimossi; componenti orfani gestiti
- [ ] Form e newsletter collegati a un backend reale
```
