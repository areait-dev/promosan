# Testi del sito modificabili da WordPress

Come si usa:
1. In WordPress apri **Pagine → Opzioni Globali** e cerca il campo **Testi del sito (personalizzazioni)**.
2. Aggiungi una riga per ogni testo che vuoi cambiare, nel formato `chiave = nuovo testo`.
3. Se una chiave non c'è, o il testo dopo `=` è vuoto, il sito usa il testo predefinito qui sotto.
4. Per andare a capo dentro un testo scrivi `
`. Le righe che iniziano con `#` sono commenti.
5. Salva: il sito si aggiorna entro pochi secondi (o al massimo 1 minuto).

Esempio:
```
contatti-form.richiedi-preventivo = Chiedi un preventivo gratuito
orari-contatti.chiamaci = Telefonaci
```

I testi lunghi e strutturati (liste di servizi, news, FAQ, sedi, pacchetti, contenuti delle pagine) restano nei loro campi dedicati di WordPress.
Le pagine **Cookie Policy**, **Privacy Policy** e **Termini e Condizioni** si modificano creando in WordPress pagine con gli stessi slug (vedi `contenuti-legali/`).


## Contatti/ContattiForm

| Chiave | Testo predefinito |
|---|---|
| `contatti-form.invia-un-messaggio` | INVIA UN MESSAGGIO |
| `contatti-form.compila-il-form-per-ricevere-un` | Compila il form per ricevere un preventivo personalizzato |
| `contatti-form.nome-e-cognome` | Nome e Cognome * |
| `contatti-form.email` | Email * |
| `contatti-form.azienda` | Azienda |
| `contatti-form.telefono` | Telefono * |
| `contatti-form.servizio-di-interesse` | Servizio di interesse * |
| `contatti-form.seleziona-un-servizio` | Seleziona un servizio |
| `contatti-form.medicina-del-lavoro` | Medicina del lavoro |
| `contatti-form.unita-mobili` | Unità mobili |
| `contatti-form.welfare-aziendale` | Welfare aziendale |
| `contatti-form.sicurezza-sul-lavoro` | Sicurezza sul lavoro |
| `contatti-form.formazione` | Formazione |
| `contatti-form.numero-dipendenti` | Numero dipendenti |
| `contatti-form.seleziona-fascia-dipendenti` | Seleziona fascia dipendenti |
| `contatti-form.1-10-dipendenti` | 1-10 dipendenti |
| `contatti-form.11-50-dipendenti` | 11-50 dipendenti |
| `contatti-form.51-200-dipendenti` | 51-200 dipendenti |
| `contatti-form.200-dipendenti` | 200+ dipendenti |
| `contatti-form.messaggio` | Messaggio * |
| `contatti-form.piu-informazioni-ci-fornisci-piu-preciso` | Più informazioni ci fornisci, più preciso sarà il nostro preventivo |
| `contatti-form.acconsento-al-trattamento-dei-dati-personali` | Acconsento al trattamento dei dati personali secondo la privacy policy di PromoSan. |
| `contatti-form.i-tuoi-dati-sono-protetti-e` | I tuoi dati sono protetti e sicuri |
| `contatti-form.grazie-la-tua-richiesta-e-stata` | Grazie! La tua richiesta è stata inviata. Ti risponderemo a breve. |
| `contatti-form.si-e-verificato-un-errore-riprova` | Si è verificato un errore. Riprova più tardi. |
| `contatti-form.mario-rossi` | Mario Rossi |
| `contatti-form.nome-della-tua-azienda` | Nome della tua azienda |
| `contatti-form.descrivici-le-tue-esigenze` | Descrivici le tue esigenze... |
| `contatti-form.invio-in-corso` | Invio in corso... |
| `contatti-form.richiedi-preventivo` | Richiedi preventivo |

## Contatti/OrariContatti

| Chiave | Testo predefinito |
|---|---|
| `orari-contatti.orari-e-contatti` | Orari e contatti |
| `orari-contatti.chiamaci` | Chiamaci |
| `orari-contatti.scrivici` | Scrivici |
| `orari-contatti.lun-ven-9-00-18-00` | Lun-Ven: 9:00-18:00 |

## CookieBanner/CookieBanner

| Chiave | Testo predefinito |
|---|---|
| `cookie-banner.la-tua-privacy-conta-per-noi` | La tua privacy conta per noi |
| `cookie-banner.utilizziamo-cookie-tecnici-necessari-e-previo` | Utilizziamo cookie tecnici necessari e, previo consenso, cookie analytics e marketing per migliorare il sito e offrire contenuti personalizzati. Puoi accettare, rifiutare o personalizzare le preferenze. Per maggiori informazioni consulta la |
| `cookie-banner.cookie-policy` | Cookie Policy |
| `cookie-banner.e-la` | e la |
| `cookie-banner.privacy-policy` | Privacy Policy |
| `cookie-banner.cookie-tecnici` | Cookie tecnici |
| `cookie-banner.sempre-attivi-necessari-al-funzionamento-e` | Sempre attivi. Necessari al funzionamento e alla sicurezza del sito. |
| `cookie-banner.cookie-analytics` | Cookie analytics |
| `cookie-banner.statistiche-aggregate-sull-apos-utilizzo-del` | Statistiche aggregate sull'utilizzo del sito (es. Google Analytics). |
| `cookie-banner.cookie-marketing` | Cookie marketing |
| `cookie-banner.contenuti-e-messaggi-personalizzati-retargeting-e` | Contenuti e messaggi personalizzati, retargeting e misurazione campagne. |
| `cookie-banner.personalizza` | Personalizza |
| `cookie-banner.rifiuta` | Rifiuta |
| `cookie-banner.salva-preferenze` | Salva preferenze |
| `cookie-banner.accetta-tutti` | Accetta tutti |

## FAQ/FAQ

| Chiave | Testo predefinito |
|---|---|
| `faq.faq` | FAQ |
| `faq.servizi-costi` | Servizi & Costi |
| `faq.normative-procedure` | Normative & Procedure |

## Footer/Footer

| Chiave | Testo predefinito |
|---|---|
| `footer.newsletter` | Newsletter |
| `footer.ricevi-le-ultime-novita-normative` | Ricevi le ultime novità normative |
| `footer.grazie-per-l-apos-iscrizione` | Grazie per l'iscrizione! |
| `footer.navigazione` | Navigazione |
| `footer.accesso` | Accesso |
| `footer.area-riservata` | Area Riservata |
| `footer.scarica-brochure` | Scarica Brochure |
| `footer.seguici` | Seguici |
| `footer.gestisci-preferenze-cookie` | Gestisci preferenze cookie |
| `footer.promosan-su-linkedin` | PromoSan su LinkedIn |
| `footer.promosan-su-facebook` | PromoSan su Facebook |
| `footer.promosan-su-instagram` | PromoSan su Instagram |
| `footer.inserisci-una-email-valida` | Inserisci una email valida. |
| `footer.iscrizione-non-riuscita` | Iscrizione non riuscita. |
| `footer.la-tua-email` | La tua email |

## Hero/Hero

| Chiave | Testo predefinito |
|---|---|
| `hero.scorri-ai-nostri-servizi` | Scorri ai nostri servizi |

## MissionVision/MissionVision

| Chiave | Testo predefinito |
|---|---|
| `mission-vision.mission` | MISSION |
| `mission-vision.vision` | VISION |
| `mission-vision.il-nostro-impegno-e-garantire` | IL NOSTRO IMPEGNO È GARANTIRE: |
| `mission-vision.competenza-professionale` | COMPETENZA PROFESSIONALE |
| `mission-vision.attraverso-medici-specializzati-e-costantemente-aggiornati` | Attraverso medici specializzati e costantemente aggiornati |
| `mission-vision.rispetto-della-dignita-e-privacy` | RISPETTO DELLA DIGNITÀ E PRIVACY |
| `mission-vision.di-ogni-lavoratore-in-ogni-fase` | Di ogni lavoratore in ogni fase del percorso |
| `mission-vision.qualita-del-servizio` | QUALITÀ DEL SERVIZIO |
| `mission-vision.attraverso-il-miglioramento-continuo-dei-processi` | Attraverso il miglioramento continuo dei processi |
| `mission-vision.supporto-completo` | SUPPORTO COMPLETO |
| `mission-vision.alle-imprese-di-ogni-dimensione-dalle` | Alle imprese di ogni dimensione, dalle PMI alle realtà strutturate |
| `mission-vision.i-nostri-obiettivi` | I NOSTRI OBIETTIVI: |
| `mission-vision.efficacia-ed-efficienza` | EFFICACIA ED EFFICIENZA |
| `mission-vision.garantire-la-qualita-del-servizio-attraverso` | Garantire la qualità del servizio attraverso risorse professionali qualificate e tecnologie all'avanguardia, ottimizzando ogni processo aziendale. |
| `mission-vision.attenzione-all-utenza` | ATTENZIONE ALL'UTENZA |
| `mission-vision.soddisfare-le-esigenze-delle-aziende-e` | Soddisfare le esigenze delle aziende e dei lavoratori con servizi rapidi, accessibili e di qualità, riducendo i tempi d'attesa e ottimizzando i costi senza compromettere l'eccellenza. |
| `mission-vision.innovazione-e-miglioramento-continuo` | INNOVAZIONE E MIGLIORAMENTO CONTINUO |
| `mission-vision.investire-costantemente-in-formazione-strumenti-e` | Investire costantemente in formazione, strumenti e metodologie per offrire soluzioni sempre più efficaci e personalizzate. |

## Navbar/Navbar

| Chiave | Testo predefinito |
|---|---|
| `navbar.home` | Home |
| `navbar.servizi` | Servizi |
| `navbar.medicina-del-lavoro` | Medicina del lavoro |
| `navbar.unita-mobili` | Unità mobili |
| `navbar.welfare-aziendale` | Welfare aziendale |
| `navbar.altri-servizi` | Altri Servizi |
| `navbar.sedi` | Sedi |
| `navbar.news` | News |
| `navbar.contatti` | Contatti |
| `navbar.cerca` | Cerca |
| `navbar.area-riservata` | Area Riservata |
| `navbar.cerca-nel-sito` | Cerca nel sito... |

## News/News

| Chiave | Testo predefinito |
|---|---|
| `news.news` | News |
| `news.min` | min |
| `news.leggi` | Leggi |
| `news.vedi-tutte-le-news` | Vedi tutte le news |
| `news.sicurezza-sul-lavoro` | Sicurezza sul lavoro |

## PromoHealthCenter/SedeCard

| Chiave | Testo predefinito |
|---|---|
| `sede-card.indirizzo` | Indirizzo |
| `sede-card.telefono` | Telefono |
| `sede-card.email` | Email |
| `sede-card.servizi-principali` | Servizi principali |
| `sede-card.contatta-questa-sede` | Contatta questa sede |
| `sede-card.vai-alla-mappa` | Vai alla mappa |

## PromoHealthCenter/SediInteractive

| Chiave | Testo predefinito |
|---|---|
| `sedi-interactive.mappa` | Mappa - |

## PromoHealthCenter/SediToggle

| Chiave | Testo predefinito |
|---|---|
| `sedi-toggle.sicilia` | SICILIA |
| `sedi-toggle.veneto` | VENETO |
| `sedi-toggle.piemonte` | PIEMONTE |

## Unita-mobili/CaratteristicheServizio

| Chiave | Testo predefinito |
|---|---|
| `caratteristiche-servizio.unita-mobile-di-telemedicina-brevettata` | UNITÀ MOBILE DI TELEMEDICINA BREVETTATA |
| `caratteristiche-servizio.promosan-detiene-il-brevetto` | PromoSan detiene il brevetto |
| `caratteristiche-servizio.per-l-apos-unita-mobile-di` | per l'Unità Mobile di Telemedicina sul Lavoro, un'innovazione all'avanguardia che anticipa le evoluzioni future nel settore della Medicina del Lavoro. |
| `caratteristiche-servizio.caratteristiche-dell-apos-unita-mobile` | CARATTERISTICHE DELL'UNITÀ MOBILE |
| `caratteristiche-servizio.particolarmente-indicata-per` | Particolarmente indicata per |
| `caratteristiche-servizio.aziende-con-sedi-distribuite` | aziende con sedi distribuite |
| `caratteristiche-servizio.sul-territorio-cantieri-temporanei-stabilimenti-in` | sul territorio, cantieri temporanei, stabilimenti in aree remote. |
| `caratteristiche-servizio.soluzione-ideale-per-situazioni-in-cui` | Soluzione ideale per situazioni in cui è necessario |
| `caratteristiche-servizio.minimizzare-l-apos-interruzione-dell-apos` | minimizzare l'interruzione dell'attività lavorativa |
| `caratteristiche-servizio.ed-eliminare-la-necessita-di-spostamenti` | ed eliminare la necessità di spostamenti. |
| `caratteristiche-servizio.soluzione-flessibile` | SOLUZIONE FLESSIBILE |
| `caratteristiche-servizio.efficienza-operativa` | EFFICIENZA OPERATIVA |

## Unita-mobili/CtaUnitaMobili

| Chiave | Testo predefinito |
|---|---|
| `cta-unita-mobili.portiamo-la-sanita-nella-tua-azienda` | PORTIAMO LA SANITÀ NELLA TUA AZIENDA |
| `cta-unita-mobili.scopri-come-le-nostre-unita-mobili` | Scopri come le nostre Unità Mobili possono ottimizzare la gestione della medicina del lavoro nella tua realtà aziendale. |
| `cta-unita-mobili.richiedi-una-consulenza-gratuita` | Richiedi una consulenza gratuita |

## altri-servizi/BannerInfo

| Chiave | Testo predefinito |
|---|---|
| `banner-info.innovazione-in-azione-scopri-i-servizi` | Innovazione in Azione: Scopri i Servizi del Futuro |
| `banner-info.unisciti-alla-rivoluzione-sanitaria-digitale-e` | Unisciti alla rivoluzione sanitaria digitale e sperimenta oggi i servizi che definiranno la medicina di domani |
| `banner-info.chiamaci-ora-per-informazioni` | Chiamaci ora per informazioni |
| `banner-info.servizio-attivo-dal-lunedi-al-venerdi` | Servizio attivo dal lunedì al venerdì, 9:00-18:00. Rispondiamo entro 24 ore |

## altri-servizi/CtaAltriServizi

| Chiave | Testo predefinito |
|---|---|
| `cta-altri-servizi.innovazione-in-azione-scopri-i-servizi` | Innovazione in Azione: Scopri i Servizi del Futuro |
| `cta-altri-servizi.unisciti-alla-rivoluzione-sanitaria-digitale-e` | Unisciti alla rivoluzione sanitaria digitale e sperimenta oggi i servizi che definiranno la medicina di domani |
| `cta-altri-servizi.diventa-partner-innovativo` | Diventa Partner Innovativo |
| `cta-altri-servizi.chiamaci-ora-per-informazioni` | Chiamaci ora per informazioni |
| `cta-altri-servizi.servizio-attivo-dal-lunedi-al-venerdi` | Servizio attivo dal lunedì al venerdì, 8:00-18:00. Rispondiamo entro 24 ore |

## altri-servizi/HeroAltriServizi

| Chiave | Testo predefinito |
|---|---|
| `hero-altri-servizi.scorri-per-saperne-di-piu` | Scorri per saperne di più |

## altri-servizi/ServiziInSviluppo

| Chiave | Testo predefinito |
|---|---|
| `servizi-in-sviluppo.focus-principali` | Focus principali: |
| `servizi-in-sviluppo.obiettivo-principale` | Obiettivo principale |
| `servizi-in-sviluppo.garantire-cure-di-qualita-nel-comfort` | Garantire cure di qualità nel comfort domestico |
| `servizi-in-sviluppo.assistenza-domiciliare-integrata` | ASSISTENZA DOMICILIARE INTEGRATA |
| `servizi-in-sviluppo.servizio-integrato` | Servizio integrato |
| `servizi-in-sviluppo.l-adi-si-configura-come-un` | L'ADI si configura come un servizio di assistenza sanitaria e socio-sanitaria erogato direttamente al domicilio della persona, garantendo continuità assistenziale e qualità delle cure in un contesto familiare. |
| `servizi-in-sviluppo.in-sviluppo` | In sviluppo |
| `servizi-in-sviluppo.programmi-avanzati-di-prevenzione` | PROGRAMMI AVANZATI DI PREVENZIONE |
| `servizi-in-sviluppo.programmi-avanzati` | Programmi avanzati |
| `servizi-in-sviluppo.oltre-ai-programmi-di-prevenzione-gia` | Oltre ai programmi di prevenzione già inclusi nel welfare aziendale, PromoSan sta sviluppando percorsi di prevenzione estesi anche alla popolazione generale. |
| `servizi-in-sviluppo.l-obiettivo-e-creare-una-rete` | L'obiettivo è creare una rete di servizi che metta la prevenzione al centro del percorso di salute delle persone. |

## medicina-del-lavoro/CtaSection

| Chiave | Testo predefinito |
|---|---|
| `cta-section.metti-in-sicurezza-la-tua-azienda` | METTI IN SICUREZZA LA TUA AZIENDA |
| `cta-section.tutela-la-salute-dei-tuoi-collaboratori` | Tutela la salute dei tuoi collaboratori con un servizio di Medicina del Lavoro completo, chiaro e affidabile. |
| `cta-section.richiedi-una-consulenza-gratuita` | Richiedi una consulenza gratuita |

## medicina-del-lavoro/NominaMedicoSection

| Chiave | Testo predefinito |
|---|---|
| `nomina-medico-section.nomina-del-medico-competente` | NOMINA DEL MEDICO COMPETENTE |
| `nomina-medico-section.la-nomina-del-medico-competente-rappresenta` | La nomina del Medico Competente rappresenta un adempimento fondamentale per le aziende soggette all'obbligo di sorveglianza sanitaria. Secondo il |
| `nomina-medico-section.d-lgs-81-08` | D.Lgs. 81/08 |
| `nomina-medico-section.il-medico-competente-e-il-professionista` | , il Medico Competente è il professionista sanitario specializzato in medicina del lavoro che collabora con il datore di lavoro nella tutela della salute e della sicurezza dei lavoratori, attuando la sorveglianza sanitaria prevista dalla legge. |
| `nomina-medico-section.modalita-di-nomina-personalizzabili` | MODALITÀ DI NOMINA PERSONALIZZABILI |
| `nomina-medico-section.scegli-la-soluzione-piu-adatta-alla` | Scegli la soluzione più adatta alla tua azienda. Ogni modalità offre vantaggi specifici in base alle dimensioni, alla complessità organizzativa e alle esigenze specifiche. |
| `nomina-medico-section.consigliato-per` | Consigliato per: |
| `nomina-medico-section.ideale-per-gruppi` | Ideale per Gruppi |
| `nomina-medico-section.una-soluzione-integrata-che-prevede-sia` | Una soluzione integrata che prevede sia la funzione di coordinamento di più medici competenti, ideale per realtà complesse con sedi multiple o articolazioni organizzative distribuite sul territorio, sia l'operatività diretta nella sorveglianza sanitaria. |
| `nomina-medico-section.gruppi-aziendali-multinazionali-aziende-con-piu` | Gruppi aziendali, multinazionali, aziende con più sedi operative |
| `nomina-medico-section.solo-coordinato` | SOLO COORDINATO |
| `nomina-medico-section.il-servizio-si-concentra-sull-attivita` | Il servizio si concentra sull'attività operativa di sorveglianza sanitaria, perfetto per aziende che hanno già una struttura di coordinamento definita o che necessitano di supporto specialistico su specifiche sedi o reparti. |
| `nomina-medico-section.aziende-con-team-rspp-interno-realta` | Aziende con team RSPP interno, realtà che hanno già strutture di coordinamento |
| `nomina-medico-section.soluzione-standard` | Soluzione Standard |
| `nomina-medico-section.medico-competente-dedicato` | MEDICO COMPETENTE DEDICATO |
| `nomina-medico-section.la-nomina-con-tutti-gli-obblighi` | La nomina con tutti gli obblighi normativi per aziende di piccole dimensioni, con un professionista dedicato che segue in modo continuativo tutti gli aspetti della medicina del lavoro aziendale. |
| `nomina-medico-section.pmi-startup-aziende-che-cercano-una` | PMI, startup, aziende che cercano una soluzione completa e autonoma |

## medicina-del-lavoro/RiunioneAllegatoSection

| Chiave | Testo predefinito |
|---|---|
| `riunione-allegato-section.riunione-periodica-e-relazione-sanitaria` | RIUNIONE PERIODICA E RELAZIONE SANITARIA |
| `riunione-allegato-section.obbligatorio-art-35` | OBBLIGATORIO Art. 35 |
| `riunione-allegato-section.la-riunione-periodica-prevista-dall-art` | La riunione periodica, prevista dall'art. 35 del D.Lgs. 81/08 per le aziende con più di 15 dipendenti, si svolge almeno una volta all'anno e coinvolge datore di lavoro, RSPP, Medico Competente e RLS. Durante l'incontro vengono discussi i risultati della sorveglianza sanitaria, l'andamento infortunistico e i programmi di prevenzione. Il Medico Competente presenta la relazione sanitaria annuale con i dati anonimi collettivi della sorveglianza effettuata. |
| `riunione-allegato-section.attraverso-l-analisi-e-il-confronto` | Attraverso l'analisi e il confronto con le figure aziendali, i professionisti PromoSan forniscono raccomandazioni concrete che permettono di affinare i protocolli sanitari e ottimizzare le misure preventive, garantendo una tutela sempre più efficace della salute dei lavoratori. |
| `riunione-allegato-section.per-quali-aziende` | Per quali aziende? |
| `riunione-allegato-section.imprese-e-unita-produttive-con-piu` | Imprese e unità produttive con più di 15 lavoratori |
| `riunione-allegato-section.allegato-3b` | ALLEGATO 3B |
| `riunione-allegato-section.trasmissione-art-40` | TRASMISSIONE Art. 40 |
| `riunione-allegato-section.l-allegato-3b-e-un-adempimento` | L'Allegato 3B è un adempimento previsto dall'art. 40 del D.Lgs. 81/08 che prevede la trasmissione annuale all'INAIL dei dati aggregati sanitari e di rischio dei lavoratori sottoposti a sorveglianza sanitaria. |
| `riunione-allegato-section.il-documento-raccoglie-in-forma-anonima` | Il documento raccoglie in forma anonima le informazioni relative alle visite mediche, ai rischi lavorativi presenti in azienda e ai giudizi di idoneità espressi nell'anno precedente. La trasmissione avviene esclusivamente per via telematica attraverso il portale INAIL. |
| `riunione-allegato-section.scadenza-annuale` | Scadenza annuale |
| `riunione-allegato-section.trasmissione-entro-il-31-marzo-dell` | Trasmissione entro il 31 Marzo dell'anno successivo |

## medicina-del-lavoro/SegreteriaOrganizzativa

| Chiave | Testo predefinito |
|---|---|
| `segreteria-organizzativa.segreteria-organizzativa` | SEGRETERIA ORGANIZZATIVA |
| `segreteria-organizzativa.la-segreteria-organizzativa-di-promosan-gestisce` | La Segreteria Organizzativa di PromoSan gestisce tutti gli aspetti amministrativi e logistici della medicina del lavoro, garantendo il rispetto delle scadenze normative. Il servizio comprende la gestione completa della pianificazione delle visite mediche, il coordinamento logistico presso le sedi aziendali o le strutture PromoSan, e il supporto amministrativo. La segreteria si occupa della raccolta e archiviazione documentale, del monitoraggio proattivo delle scadenze delle visite periodiche. |

## medicina-del-lavoro/SopralluogoSection

| Chiave | Testo predefinito |
|---|---|
| `sopralluogo-section.sopralluogo-aziendale` | SOPRALLUOGO AZIENDALE |
| `sopralluogo-section.art-25-d-lgs-81-08` | Art. 25 D.Lgs. 81/08 |
| `sopralluogo-section.obbligo-fondamentale` | OBBLIGO FONDAMENTALE |
| `sopralluogo-section.il-sopralluogo-negli-ambienti-di-lavoro` | Il sopralluogo negli ambienti di lavoro è un obbligo fondamentale del Medico Competente stabilito dall' |
| `sopralluogo-section.art-25-comma-1-lettera-l` | art. 25 comma 1 lettera l) del D.Lgs. 81/08 |
| `sopralluogo-section.questa-attivita-permette-di-conoscere-direttamente` | Questa attività permette di conoscere direttamente i luoghi di lavoro, verificare le condizioni ambientali e valutare l'esposizione dei lavoratori ai rischi professionali. |
| `sopralluogo-section.garanzia-promosan` | GARANZIA PROMOSAN |
| `sopralluogo-section.promosan-garantisce-lo-svolgimento-puntuale-dei` | PromoSan garantisce lo svolgimento puntuale dei sopralluoghi aziendali in conformità agli obblighi normativi, fornendo alle aziende un supporto qualificato nella verifica delle condizioni di salute e sicurezza degli ambienti di lavoro. |

## medicina-del-lavoro/ValutazioneRischiSection

| Chiave | Testo predefinito |
|---|---|
| `valutazione-rischi-section.valutazione-dei-rischi-e-protocollo-sanitario` | VALUTAZIONE DEI RISCHI E PROTOCOLLO SANITARIO |
| `valutazione-rischi-section.il-medico-competente-partecipa-attivamente-alla` | Il Medico Competente partecipa attivamente alla |
| `valutazione-rischi-section.valutazione-dei-rischi` | valutazione dei rischi |
| `valutazione-rischi-section.aziendali-attraverso-sopralluoghi-negli-ambienti-di` | aziendali attraverso sopralluoghi negli ambienti di lavoro, l'analisi delle mansioni e la partecipazione alle riunioni periodiche sulla sicurezza. Questo contributo permette di identificare i rischi specifici per la salute e stabilire quando è necessario attivare la sorveglianza sanitaria. |
| `valutazione-rischi-section.protocollo-sanitario` | PROTOCOLLO SANITARIO |
| `valutazione-rischi-section.il-protocollo-sanitario-e-lo-strumento` | Il protocollo sanitario è lo strumento che definisce come viene effettuata la sorveglianza sanitaria. Il Medico Competente lo elabora in base ai rischi identificati e agli standard scientifici più aggiornati, individuando per ogni mansione gli accertamenti necessari: visite mediche, esami strumentali, analisi di laboratorio e consulenze specialistiche. |
| `valutazione-rischi-section.tutti-gli-accertamenti-sono-mirati-al` | Tutti gli accertamenti sono mirati al rischio specifico e il meno invasivi possibile. |

## medicina-del-lavoro/VisiteMedicheSection

| Chiave | Testo predefinito |
|---|---|
| `visite-mediche-section.le-visite-mediche-previste-dalla-normativa` | LE VISITE MEDICHE PREVISTE DALLA NORMATIVA INCLUDONO: |
| `visite-mediche-section.istituzione-della-cartella-sanitaria-e-di` | ISTITUZIONE DELLA CARTELLA SANITARIA E DI RISCHIO |
| `visite-mediche-section.per-ogni-lavoratore-sottoposto-a-sorveglianza` | Per ogni lavoratore sottoposto a sorveglianza sanitaria, il Medico Competente istituisce e aggiorna una cartella sanitaria e di rischio. La cartella, custodita sotto la responsabilità del Medico Competente nel rispetto del segreto professionale, contiene tutti i dati relativi agli accertamenti sanitari effettuati, ai risultati degli esami e al giudizio di idoneità espresso. |
| `visite-mediche-section.accertamenti-sanitari` | ACCERTAMENTI SANITARI |
| `visite-mediche-section.le-visite-mediche-comprendono-gli-esami` | Le visite mediche comprendono gli esami clinici e gli accertamenti diagnostici necessari, individuati dal Medico Competente in funzione dei rischi specifici della mansione. PromoSan effettua direttamente in azienda o presso le proprie strutture una gamma completa di accertamenti sanitari: |
| `visite-mediche-section.rilascio-giudizio-di-idoneita` | RILASCIO GIUDIZIO DI IDONEITÀ |
| `visite-mediche-section.al-termine-della-visita-medica-e` | Al termine della visita medica e sulla base dei risultati degli accertamenti effettuati, il Medico Competente esprime uno dei seguenti giudizi previsti dall' |
| `visite-mediche-section.art-41` | art. 41 |
| `visite-mediche-section.il-giudizio-di-idoneita-viene-comunicato` | Il giudizio di idoneità viene comunicato sia al datore di lavoro che al lavoratore. |
| `visite-mediche-section.consegna-documentazione-tramite-portale-telematico` | CONSEGNA DOCUMENTAZIONE TRAMITE PORTALE TELEMATICO |
| `visite-mediche-section.promosan-mette-a-disposizione-un-portale` | PromoSan mette a disposizione un portale digitale dedicato attraverso cui datore di lavoro e lavoratori possono accedere in modo semplice e sicuro alla documentazione sanitaria. |
| `visite-mediche-section.unita-mobile` | unità mobile |
| `visite-mediche-section.visita-medica` | visita medica |
| `visite-mediche-section.tipologie-di-visite` | TIPOLOGIE DI VISITE |
| `visite-mediche-section.cartella-sanitaria` | CARTELLA SANITARIA |
| `visite-mediche-section.giudizio-di-idoneita` | GIUDIZIO DI IDONEITÀ |
| `visite-mediche-section.portale-digitale` | PORTALE DIGITALE |
| `visite-mediche-section.visita-medica-preventiva` | VISITA MEDICA PREVENTIVA |
| `visite-mediche-section.visita-medica-periodica` | VISITA MEDICA PERIODICA |
| `visite-mediche-section.visita-medica-su-richiesta-del-lavoratore` | VISITA MEDICA SU RICHIESTA DEL LAVORATORE |
| `visite-mediche-section.visita-medica-per-cambio-mansione` | VISITA MEDICA PER CAMBIO MANSIONE |
| `visite-mediche-section.visita-medica-precedente-alla-ripresa-del` | VISITA MEDICA PRECEDENTE ALLA RIPRESA DEL LAVORO |
| `visite-mediche-section.visita-medica-alla-cessazione-del-rapporto` | VISITA MEDICA ALLA CESSAZIONE DEL RAPPORTO DI LAVORO |
| `visite-mediche-section.valutazione-dell-acuita-visiva-e-della` | Valutazione dell'acuità visiva e della percezione cromatica |
| `visite-mediche-section.esame-della-funzionalita-respiratoria` | Esame della funzionalità respiratoria |
| `visite-mediche-section.valutazione-della-capacita-uditiva` | Valutazione della capacità uditiva |
| `visite-mediche-section.ecg-a-riposo` | ECG A RIPOSO |
| `visite-mediche-section.elettrocardiogramma-per-la-valutazione-della-funzionalita` | Elettrocardiogramma per la valutazione della funzionalità cardiaca |
| `visite-mediche-section.drug-test-on-site` | DRUG TEST ON-SITE |
| `visite-mediche-section.test-rapidi-per-la-ricerca-di` | Test rapidi per la ricerca di sostanze stupefacenti |
| `visite-mediche-section.alcol-test-mediante-etilometri` | ALCOL TEST MEDIANTE ETILOMETRI |
| `visite-mediche-section.misurazione-del-tasso-alcolemico` | Misurazione del tasso alcolemico |
| `visite-mediche-section.esami-ematochimici` | ESAMI EMATOCHIMICI |
| `visite-mediche-section.analisi-di-laboratorio-mirate-ai-rischi` | Analisi di laboratorio mirate ai rischi specifici |
| `visite-mediche-section.il-lavoratore-e-idoneo-a-svolgere` | Il lavoratore è idoneo a svolgere la mansione specifica |
| `visite-mediche-section.idoneita-parziale-temporanea-o-permanente-con` | IDONEITÀ PARZIALE, TEMPORANEA O PERMANENTE, CON PRESCRIZIONI O LIMITAZIONI |
| `visite-mediche-section.il-lavoratore-puo-svolgere-la-mansione` | Il lavoratore può svolgere la mansione con specifiche condizioni |
| `visite-mediche-section.inidoneita-temporanea` | INIDONEITÀ TEMPORANEA |
| `visite-mediche-section.il-lavoratore-non-puo-svolgere-temporaneamente` | Il lavoratore non può svolgere temporaneamente la mansione, con indicazione dei limiti temporali |
| `visite-mediche-section.inidoneita-permanente` | INIDONEITÀ PERMANENTE |
| `visite-mediche-section.il-lavoratore-non-e-idoneo-a` | Il lavoratore non è idoneo a svolgere la mansione specifica |

## news-page/NewsPageCard

| Chiave | Testo predefinito |
|---|---|
| `news-page-card.min` | min |
| `news-page-card.leggi-articolo` | Leggi articolo |

## news-page/NewsPageHero

| Chiave | Testo predefinito |
|---|---|
| `news-page-hero.news` | News |
| `news-page-hero.rimani-informato-sulle-ultime-normative-e` | Rimani informato sulle ultime normative e innovazioni nel settore della medicina del lavoro |
| `news-page-hero.cerca-articoli-normative-aggiornamenti` | Cerca articoli, normative, aggiornamenti... |

## news-page/NewsPagePagination

| Chiave | Testo predefinito |
|---|---|
| `news-page-pagination.precedente` | Precedente |
| `news-page-pagination.successivo` | Successivo |

## news1/News1Content

| Chiave | Testo predefinito |
|---|---|
| `news1-content.tag` | Tag: |

## news1/News1Hero

| Chiave | Testo predefinito |
|---|---|
| `news1-hero.min-di-lettura` | min di lettura |

## news1/News1Related

| Chiave | Testo predefinito |
|---|---|
| `news1-related.altre-news` | ALTRE NEWS |
| `news1-related.approfondisci-con-gli-ultimi-aggiornamenti-e` | Approfondisci con gli ultimi aggiornamenti e articoli correlati |
| `news1-related.news` | News |
| `news1-related.min` | min |
| `news1-related.leggi` | Leggi |

## pagina: error

| Chiave | Testo predefinito |
|---|---|
| `pagina.error.ops` | Ops. |
| `pagina.error.qualcosa-e-andato-storto` | Qualcosa è andato storto |
| `pagina.error.si-e-verificato-un-errore-imprevisto` | Si è verificato un errore imprevisto. Riprova, oppure torna alla home o contattaci se il problema persiste. |
| `pagina.error.riprova` | Riprova |
| `pagina.error.torna-alla-home` | Torna alla Home |

## pagina: news/NewsClient

| Chiave | Testo predefinito |
|---|---|
| `pagina.news.nessun-risultato-trovato` | Nessun risultato trovato |
| `pagina.news.prova-a-modificare-i-filtri-di` | Prova a modificare i filtri di ricerca o la categoria selezionata |

## pagina: not-found

| Chiave | Testo predefinito |
|---|---|
| `pagina.not-found.pagina-non-trovata` | Pagina non trovata |
| `pagina.not-found.la-pagina-che-stai-cercando-non` | La pagina che stai cercando non esiste o è stata spostata. Torna alla home o contattaci se pensi che sia un errore. |
| `pagina.not-found.torna-alla-home` | Torna alla Home |
| `pagina.not-found.contattaci` | Contattaci |

## pagina: ricerca/RicercaClient

| Chiave | Testo predefinito |
|---|---|
| `pagina.ricerca.ricerca-nel-sito` | Ricerca nel sito |
| `pagina.ricerca.risultati-della-ricerca-per` | Risultati della ricerca per: |
| `pagina.ricerca.ldquo` | &ldquo; |
| `pagina.ricerca.rdquo` | &rdquo; |
| `pagina.ricerca.risultato` | risultato |
| `pagina.ricerca.per` | per |
| `pagina.ricerca.nessun-risultato-per` | Nessun risultato per |
| `pagina.ricerca.pagine-del-sito` | Pagine del sito |
| `pagina.ricerca.news-amp-articoli` | News & Articoli |
| `pagina.ricerca.sfoglia-tutte-le-news` | Sfoglia tutte le news |
| `pagina.ricerca.nessun-risultato-trovato` | Nessun risultato trovato |
| `pagina.ricerca.inizia-la-tua-ricerca` | Inizia la tua ricerca |
| `pagina.ricerca.prova-con-parole-chiave-diverse-o` | Prova con parole chiave diverse o più generiche. |
| `pagina.ricerca.digita-un-termine-nel-campo-qui` | Digita un termine nel campo qui sopra per cercare nel sito. |

## welfare-aziendale/CtaWelfare

| Chiave | Testo predefinito |
|---|---|
| `cta-welfare.pronto-a-trasformare-il-tuo-benessere` | PRONTO A TRASFORMARE IL TUO BENESSERE IN VALORE? |
| `cta-welfare.contattaci-per-una-consulenza-personalizzata-sui` | Contattaci per una consulenza personalizzata sui pacchetti welfare |
| `cta-welfare.richiedi-un-preventivo` | Richiedi un preventivo |

## welfare-aziendale/HeroWelfare

| Chiave | Testo predefinito |
|---|---|
| `hero-welfare.scorri-per-saperne-di-piu` | Scorri per saperne di più |

## welfare-aziendale/PacchettiWelfare

| Chiave | Testo predefinito |
|---|---|
| `pacchetti-welfare.pacchetti-su-misura` | PACCHETTI SU MISURA |
| `pacchetti-welfare.promosan-progetta-soluzioni-personalizzate-in-base` | PromoSan progetta soluzioni personalizzate in base alle caratteristiche dell'azienda e della popolazione lavorativa, tutti i pacchetti sono personalizzabili in base alle esigenze della tua azienda. |
| `pacchetti-welfare.piu-richiesto` | PIÙ RICHIESTO |
| `pacchetti-welfare.richiedi-preventivo` | Richiedi preventivo |
| `pacchetti-welfare.prevenzione-di-base` | PREVENZIONE DI BASE |
| `pacchetti-welfare.check-up-preventivi-completi` | Check-up preventivi completi |
| `pacchetti-welfare.screening-cardiovascolare` | Screening cardiovascolare |
| `pacchetti-welfare.screening-oncologici` | Screening oncologici |
| `pacchetti-welfare.supporto-psicologico` | Supporto psicologico |
| `pacchetti-welfare.valutazioni-ergonomiche` | Valutazioni ergonomiche |
| `pacchetti-welfare.prevenzione-completa` | PREVENZIONE COMPLETA |
| `pacchetti-welfare.screening-oncologici-e-cardiovascolari` | Screening oncologici e cardiovascolari |
| `pacchetti-welfare.promozione-salute-alimentazione-attivita-fisica` | Promozione salute (alimentazione, attività fisica) |
| `pacchetti-welfare.telemedicina-e-consulti-specialistici` | Telemedicina e consulti specialistici |
| `pacchetti-welfare.prevenzione-totale` | PREVENZIONE TOTALE |
| `pacchetti-welfare.promozione-salute-completa` | Promozione salute completa |
| `pacchetti-welfare.supporto-psicologico-dedicato` | Supporto psicologico dedicato |
| `pacchetti-welfare.programma-cessazione-fumo` | Programma cessazione fumo |
| `pacchetti-welfare.valutazioni-ergonomiche-personalizzate` | Valutazioni ergonomiche personalizzate |
