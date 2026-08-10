# Changelog

Registro delle modifiche a questo template, una voce per ogni valore del campo `version` in `src/config/property.json`. Serve anche come base per la futura funzione "Aggiorna" nell'admin hub, che confronterà la versione di un sito già deployato con l'ultima disponibile qui.

Il changelog parte da questa versione in avanti: le versioni precedenti non sono documentate qui.

## [1.37] - 2026-08-10
### Aggiunto
- **Scadenza automatica del minisito.** Nuovo campo `expiresAt`: alle 23:59:59 del giorno indicato, ora italiana, il sito smette di essere raggiungibile e mostra una pagina che rimanda ai contatti dell'agenzia. Il minisito è la brochure di un immobile in vendita: passata la finestra dell'Open Domus, lasciarlo online significa lasciare in giro un prezzo e delle foto che col tempo diventano sbagliati.
- Nuovo `src/proxy.ts`: il controllo gira **a ogni richiesta**, non a build time. Le pagine del sito sono statiche e da sole non saprebbero mai che è passata la mezzanotte; così invece il sito si spegne all'ora giusta senza cron da far scattare e senza un nuovo deploy da attendere. Spostare la data avanti lo riaccende da subito.
- Nuova pagina `/non-disponibile`, mostrata al posto di qualunque pagina del sito scaduto. È un *rewrite*, non un redirect: l'indirizzo che il visitatore ha ricevuto dall'agenzia resta quello, e non si trasforma in un link a una pagina d'errore.
- Immagini e documenti continuano a essere serviti: si spengono le pagine, non i file.
- Un `expiresAt` vuoto significa "nessuna scadenza": i siti creati prima di questa versione restano online finché non si spengono a mano.

### Note tecniche
- Il file si chiama `proxy.ts` e non `middleware.ts`: da Next 16 è questo il nome della convenzione, e quello vecchio avverte a ogni build.
- Le esclusioni (`/_next/`, i file con estensione) sono nel codice e non in `config.matcher`: nella conversione del matcher da stringa a espressione regolare le sequenze di escape si perdono, `\.` diventa un punto qualunque e finiva per escludere quasi tutte le pagine. Il sito scaduto restava visibile tranne la home — verificato e corretto.

## [1.36] - 2026-08-10
### Aggiunto
- Nella sezione 10 compaiono i premi dell'agenzia: **Top Agency d'Italia, 2024 e 2025**.
- Uno stesso premio vinto più volte è una riga sola con gli anni accanto ("Top Agency d'Italia — 2024 e 2025"): due righe identiche tranne l'anno direbbero meno di quel che vale averlo vinto due volte di fila.

## [1.35] - 2026-08-10
### Aggiunto
- Nuova sezione **"❤️ 10. Il Mondo Domus Tua"**, pagina `/mondo-domus-tua`: chi siamo, i valori, il manifesto, i numeri, i premi, le recensioni, il canale YouTube, il sito e i social, tutto in una pagina invece del solo collegamento al sito dell'agenzia.
- I contenuti vengono dal sito ufficiale: la frase "we love home, we love life" e il senso di "chi siamo", i tre valori (professionalità, innovazione, integrità) con il protocollo Domus D.O.C., il manifesto, e i **numeri reali letti dai contatori della home** — 6.433 persone felici, 1.523 transazioni, 92% di immobili venduti, 269.395 mq valutati.
- Chi siamo, valori e manifesto sono **testi fissi nel modello**, come le regole dell'Open Domus: uguali per ogni immobile, si cambiano qui una volta per tutti. Dal pannello si aggiornano invece i numeri, i premi e i collegamenti, che cambiano nel tempo.
- I premi partono da un elenco vuoto: sul sito dell'agenzia non c'è una pagina che li elenchi, quindi vanno aggiunti a mano. Finché è vuoto, il blocco non compare.

## [1.34] - 2026-08-10
### Aggiunto
- Nuova sezione **"🔁 9B. Per comprare devi vendere la tua casa?"**, pagina `/devi-vendere`: un testo, un video e un pulsante che porta alla valutazione. È l'ostacolo più frequente fra l'interesse e la proposta, e la pagina lo dice apertamente invece di lasciarlo come dubbio non detto.
- Il pulsante compare solo se ha sia il testo sia il link: può portare alla pagina di valutazione dell'agenzia, a un modulo o a una chat WhatsApp.
- L'ordinamento del menu accetta ora i numeri con lettera (`9B.`), che altrimenti finivano in fondo con le voci non numerate.

## [1.33] - 2026-08-10
### Aggiunto
- Le recensioni della sezione 9 possono ora venire **dalla scheda Google dell'agenzia**, caricate dal pannello. Nuovi campi `googlePlaceId`, `recensioniFonte`, `recensioniAggiornateIl`, e `data` e `url` in ogni recensione.
- Ogni recensione mostra la data e il collegamento "Leggila su Google", e sotto l'elenco compare l'attribuzione richiesta dai termini d'uso delle Places API. Le recensioni scritte a mano restano possibili: quei campi restano vuoti e l'attribuzione non compare.

### Note
- **Google restituisce al massimo cinque recensioni**, quelle che considera più rilevanti: non c'è modo, via API, di averle tutte. Media e numero complessivo però ci sono, e finiscono nel riepilogo sopra l'elenco, altrimenti chi legge crede che l'agenzia abbia cinque recensioni in tutto.

## [1.32] - 2026-08-10
### Aggiunto
- Nuova sezione **"⭐ 9. Le Esperienze dei Nostri Acquirenti"**, pagina `/esperienze-acquirenti`, con due blocchi: i **video** di chi ha già comprato (quanti se ne vogliono, ciascuno con la sua didascalia) e le **recensioni** scritte, con nome, stelle e testo, sopra un riepilogo facoltativo tipo "+500 recensioni · ★4,9 su Google".
- Un video senza link e una recensione senza testo non compaiono: si possono lasciare vuoti finché non si hanno. Se non c'è né l'uno né l'altro, la pagina lo dichiara invece di mostrare una sezione "esperienze" vuota, che direbbe l'opposto di quel che vuole dire.
- Nuova chiave `esperienzeAcquirenti`.

## [1.31] - 2026-08-10
### Aggiunto
- Nella sezione **7. Come Acquistarla** ogni passo può ora essere spiegato in tre modi, tutti facoltativi: un **testo**, un **video di YouTube** e il documento da scaricare. Nuovi campi `text` e `videoUrl` in ogni voce di `comeAcquistarla.items`.
- In fondo alla sezione **8. Il Metodo Open Domus®** compare un **video** (`openDomus.videoUrl`). Nel pannello il campo è bloccato dietro una spunta, come telefono ed email: il video del metodo è lo stesso per tutti gli immobili e non va cambiato sito per sito.
- Nuovo componente `VideoYoutube` e funzione `parseYoutubeId`: accettano l'indirizzo copiato dalla barra del browser, quello del pulsante "Condividi" (`youtu.be`) e gli Shorts. Un indirizzo non riconosciuto non produce nulla, invece di un riquadro con l'errore di YouTube dentro.
- I video usano `youtube-nocookie.com`: stesso video, nessun cookie di profilazione finché il visitatore non preme play. **Nota privacy:** se un domani arriverà un banner di consenso, questi riquadri vanno tra quelli da bloccare.

## [1.30] - 2026-08-10
### Modificato
- La pagina dell'Open Domus diventa **"🤝 8. Il Metodo Open Domus®"**: nuovo titolo nel menu e in cima alla pagina, con il numero di sezione come gli altri capitoli. La rotta resta `/open-domus` e il testo della pagina non cambia.
- Nuovo campo `openDomus.sectionNumber`.

## [1.29] - 2026-08-10
### Aggiunto
- Nuova sezione **"✍️ 7. Come Acquistarla"**, pagina `/come-acquistarla`, con i tre passi dell'acquisto: **procedura (manifestazione di interesse)**, **bozza proposta**, **caparra o bonifico bancario**. Ciascuno è un documento da scaricare, e una voce senza file allegato non compare.

### Modificato
- **"Bozza proposta di acquisto" confluisce nella nuova sezione** e passa da fotografie a documenti scaricabili: erano immagini della bozza cartacea, ma è un modulo da leggere e compilare, non da guardare.

### Rimosso
- La pagina `/bozza-proposta`, la chiave `bozzaProposta` e le cinque immagini `public/images/bozza-proposta-image*.jpg`.

## [1.28] - 2026-08-10
### Modificato
- La sezione **"6. Quanto Costa"** si riduce all'osso: due sezioni, "prezzo acquisto prima casa" e "prezzo acquisto seconda casa", ciascuna con il solo prospetto da caricare dal pannello. Il campo per l'importo scritto a mano non c'è più. Finché il prospetto manca, la sezione compare comunque e dichiara che non è ancora disponibile.

### Aggiunto
- Nuova chiave `annuncio` (`adId`, `url`, `prezzo`, `prezzoTesto`, `aggiornatoIl`): **il prezzo dell'annuncio ufficiale viene conservato nel sito**, riletto a ogni rigenerazione delle caratteristiche o della galleria. Nessuna pagina lo usa ancora — è la base per i conti della sezione 6.
- `prezzo` è il numero in euro, `prezzoTesto` la scritta originale. Un annuncio in "trattativa riservata" lascia `prezzo` a `null` invece di uno zero, che sarebbe stato peggio di un'assenza dichiarata.

## [1.27] - 2026-08-10
### Modificato
- **Il menu hamburger è riordinato**: prima "Benvenuto", poi i capitoli numerati dall'1 al 6 in ordine, poi le voci non ancora numerate (Introduzione, Open Domus, Bozza proposta, Link utili, Link utili 2, Per te VENDITORE). I capitoli erano finiti sparsi, nell'ordine in cui erano nati: la 6 prima della 5, la 3 in fondo dopo "Per te, VENDITORE".

## [1.26] - 2026-08-10
### Modificato
- **"Prospetto costi" diventa "💶 6. Quanto Costa"**, pagina `/quanto-costa`, con due sole voci: **prezzo acquisto prima casa** e **prezzo acquisto seconda casa**. Prima e seconda casa hanno imposte diverse, e un prezzo solo non poteva dirlo.
- Ogni voce ha un importo (o una descrizione libera) e un prospetto dettagliato allegabile. Una voce senza né l'uno né l'altro non compare in pagina.

### Rimosso
- La chiave `prospettoCosti`, con il suo elenco di voci e l'immagine del prospetto, e la pagina `/prospetto-costi`. Sostituita da `quantoCosta`: i contenuti vecchi non vengono travasati, perché le voci non corrispondono.

## [1.25] - 2026-08-10
### Modificato
- **"Scopri la Casa" perde lo sfondo bianco** e passa a `PhotoLayout` come le sezioni 2, 3, 4 e 5: la foto dell'immobile sotto un velo bianco, il titolo della pagina in alto e i due blocchi — parcheggi e dintorni — dentro riquadri chiari. Era l'ultima pagina rimasta bianca.
- Le righe dei servizi nei dintorni perdono il fondo bianco, che dentro il riquadro chiaro sarebbe sparito: le separa il solo bordo.

## [1.24] - 2026-08-10
### Modificato
- La sezione 3 si chiama ora **"📐 3. Gli Spazi"** invece di "Planimetrie e Catasto", e la sua pagina passa da `/planimetrie` a **`/gli-spazi`**. Le tre voci — planimetrie quotate, planimetrie catastali, visure catastali — restano quelle, con i documenti già caricati.
- La relazione tecnica resta il secondo blocco della pagina, sotto le planimetrie.
- La chiave `planimetrieCatasto` non cambia nome: cambiano il titolo mostrato e l'indirizzo della pagina, non dove si modificano i contenuti.

## [1.23] - 2026-08-10
### Corretto
- **Un sito aggiornato da una versione anteriore alla 1.8 non compilava più, e il deploy falliva.** Le sezioni documentali di quei siti hanno `items` come elenco di stringhe, e la funzione "Aggiorna" del pannello aggiunge le chiavi nuove senza riscrivere quelle vecchie: la pagina 4 riceveva quindi voci in due forme diverse e il controllo dei tipi si fermava (`Type 'string' is not assignable to type 'VoceDocumento'`). Il sito restava pubblicato all'ultima versione buona, ma ogni nuovo deploy falliva.
- Le pagine 3 e 4 accettano ora entrambe le forme (`vociDocumento` in `ElencoDocumenti`). Le voci in forma vecchia non hanno documento allegato, quindi non compaiono comunque — ma la pagina si costruisce, ed è il pannello a convertirle davvero alla prima apertura dell'editor.

## [1.22] - 2026-08-09
### Aggiunto
- **Galleria delle foto dell'annuncio** in cima alla sezione "Vivi la Casa": le stesse foto pubblicate sull'annuncio ufficiale, nello stesso ordine, in griglia e apribili a schermo intero con le frecce e lo scorrimento del dito già usati altrove. Nuovi campi `viviLaCasa.gallery`, `galleryEnabled`, `galleryHeading`, `galleryGeneratedAt`.
- Le foto **non vengono copiate nel sito**: `gallery` contiene i loro indirizzi, e restano servite dal gestionale dell'agenzia. Un annuncio ne ha spesso cinquanta da qualche centinaio di kilobyte l'una, e copiarle significherebbe decine di megabyte per ogni immobile, da rifare a ogni foto aggiunta o tolta. Il rovescio: se l'annuncio viene ritirato, la galleria si svuota.
- Le prime sei foto si caricano subito, le altre quando si avvicinano allo schermo, e `next/image` le ridimensiona per il telefono invece di servire gli originali.
- `next.config.ts` autorizza `annunci.domustua.com` per `next/image`.
- Nuovo componente `GalleriaFoto`.

## [1.21] - 2026-08-09
### Modificato
- **"Bollette e impianti" passa da galleria di immagini a elenco di documenti scaricabili**, come tutti gli altri gruppi della pagina 4: niente anteprime, solo i file da aprire. Le voci esistenti restano come etichette, ciascuna con il proprio documento da caricare, e una voce senza file non compare.
- `bolletteImpianti.items` passa da elenco di stringhe a elenco di `{ label, enabled, documentUrl }`; `bolletteImpianti.images` non esiste più.

### Rimosso
- Il componente `GalleriaImmagini`, introdotto nella 1.19 per le sole bollette e ora senza usi.
- Le sette immagini `public/images/bollette-image*.png`, che nessuna pagina referenziava più.

## [1.20] - 2026-08-09
### Aggiunto
- Nuova sezione **"🎥 5. Vivi la Casa"**, pagina `/vivi-la-casa`: riunisce il **video social** e il **tour virtuale Matterport**, i due modi di vedere l'immobile senza esserci. Erano due voci di menu separate, e chi cercava "le immagini della casa" non sapeva quale aprire. Nuova chiave `viviLaCasa` (`enabled`, `sectionNumber`, `sectionTitle`), sul modello di `scopriLaCasa`.
- Ogni blocco conserva il proprio interruttore: si può pubblicare il video tenendo spento il Matterport, o viceversa. Le chiavi `videoSocial` e `matterport` restano invariate.

### Rimosso
- Le pagine `/video-social` e `/matterport` e le loro voci di menu.

## [1.19] - 2026-08-09
### Modificato
- **"Bollette e impianti" chiude la pagina 4**, sotto i sette gruppi documentali: l'elenco delle voci e, se ci sono, le foto delle bollette, che continuano ad aprirsi a schermo intero. Perde la pagina propria e la voce di menu.
- Nuovo componente `GalleriaImmagini`: le foto con lightbox hanno bisogno di stato, e incapsularlo qui lascia la pagina 4 un componente server nonostante ospiti una galleria.

### Rimosso
- La pagina `/bollette-e-impianti` e la sua voce di menu. La chiave `bolletteImpianti` resta invariata.

## [1.18] - 2026-08-09
### Modificato
- **"La Documentazione" diventa una pagina sola.** I sette gruppi documentali — APE, certificazione impianto elettrico, certificazione idrico/termico/sanitario, libretto caldaia, regolamento di condominio, spese condominiali 2024-2025, verbali — erano sette pagine raggiunte da un indice: tre click per arrivare a un PDF. Ora stanno uno sotto l'altro nella pagina 4, ciascuno col proprio titolo e i propri documenti. Un gruppo senza documenti caricati non compare.
- **I titoli delle quattro sezioni numerate nel menu portano l'emoji e il numero**: `🏡 1. Scopri la Casa`, `🏗️ 2. La Qualità dell'Immobile`, `🗺️ 3. Planimetrie e Catasto`, `📄 4. La Documentazione`. Le altre voci restano testo semplice, così i capitoli si distinguono a colpo d'occhio da ciò che capitolo non è.
- La pagina 4 passa a `PhotoLayout`, come la 2 e la 3.

### Rimosso
- Le pagine `/ape`, `/certificazione-impianto-elettrico`, `/certificazione-impianto-idrico-termico`, `/libretto-caldaia`, `/regolamento-condominio`, `/spese-condominiali`, `/verbali` e le loro voci di `navigation`. Le sette chiavi corrispondenti in `property.json` restano invariate, con i loro documenti: cambia dove sono mostrate, non dove si modificano.
- Con esse sparisce l'ultimo uso del campo `parent` nelle voci di menu, introdotto nella 1.8. Il campo resta supportato.

## [1.17] - 2026-08-09
### Corretto
- **Il blocco "Planimetrie e dati catastali" spariva del tutto quando non c'era ancora nessun documento caricato**, titolo compreso: la pagina si apriva sull'intestazione "Relazione tecnica", come se la voce di menu portasse altrove. Ora il blocco resta finché la sezione è accesa e, se non c'è nulla da scaricare, mostra "Nessun documento disponibile al momento." — com'era prima che le due sezioni fossero unite. Le singole voci senza file continuano a non comparire.

### Modificato
- La voce "Descrizione interventi di ristrutturazione 2021" della relazione tecnica perde l'anno: la descrizione degli interventi non riguarda solo quelli del 2021. Il pannello rinomina la voce anche sui siti già creati; resta comunque modificabile.

## [1.16] - 2026-08-09
### Modificato
- **La "Relazione tecnica" smette di essere una voce a sé e diventa il secondo blocco della sezione 3**, sotto le planimetrie: stessa pagina, stessa struttura già adottata per la sezione 2. I due blocchi parlano della stessa cosa — cosa risulta dell'immobile sulla carta — e su due voci di menu affiancate sembravano due argomenti distinti.
- La sezione 3 passa da `DocumentLayout` a `PhotoLayout`, come la 2: al posto dello sfondo bianco, la foto dell'immobile sotto un velo bianco, con i due blocchi in riquadri chiari. È lo sfondo che la relazione tecnica aveva già.
- Ogni blocco conserva il proprio interruttore e nel pannello resta una sezione a sé: si possono pubblicare le planimetrie tenendo spenta la relazione, o viceversa.
- Nella relazione tecnica **una voce senza documento caricato non compare più** in grigio come "non disponibile", uniformandosi a tutte le altre pagine documentali dalla 1.8 in avanti.
- Nuovi export `ListaDocumenti` e `documentiDisponibili` da `ElencoDocumenti`: la lista dei documenti si usa ora anche fuori dalla pagina a documento singolo, senza duplicarne il markup. `ElencoDocumenti` non cambia comportamento.

### Rimosso
- La pagina `/relazione-tecnica` e la sua voce di menu. La chiave `relazioneTecnica`, con i suoi testi e documenti, resta invariata.

## [1.15] - 2026-08-09
### Modificato
- **"La Qualità dell'Immobile" diventa una pagina sola con due blocchi**: le dieci voci della qualità e, sotto, le caratteristiche principali con le informazioni condominiali. Nella 1.14 le caratteristiche erano una sottopagina raggiungibile da un collegamento; ora il contenuto è lì, senza un secondo passaggio.
- La pagina passa da `DocumentLayout` a `PhotoLayout`: **niente più sfondo bianco**, ma la foto dell'immobile sotto un velo bianco, con i due blocchi in riquadri chiari — lo sfondo che le caratteristiche avevano già e che la qualità non aveva mai avuto.
- Ogni blocco conserva il proprio interruttore, come le due metà di "Scopri la Casa": si può pubblicare la qualità e tenere spente le caratteristiche, o viceversa. Nel pannello restano due sezioni distinte.

### Rimosso
- La pagina `/caratteristiche-principali` e la sua voce di menu. La chiave `caratteristichePrincipali` resta invariata — cambia dove è mostrata, non dove si modifica.

## [1.14] - 2026-08-09
### Modificato
- **"Caratteristiche principali" diventa una sottopagina della sezione 2, "La Qualità dell'Immobile"**: esce dal menu hamburger e si raggiunge dal collegamento in fondo a quella pagina, come le voci documentali si raggiungono dall'indice de "La Documentazione". Le due pagine parlano della stessa cosa — com'è fatto l'immobile — e la 1.11 aveva già travasato metà delle caratteristiche nella qualità: tenerle su due voci di menu affiancate faceva sembrare due argomenti diversi quello che è uno solo.
- Il collegamento compare solo se la sezione è accesa; da spenta, la pagina della qualità mostra le sole voci di testo. La pagina `/caratteristiche-principali` e la chiave `caratteristichePrincipali` restano dove sono: cambia come ci si arriva, non dove si modifica.

## [1.13] - 2026-08-09
### Aggiunto
- Nuova sezione **"Scopri la Casa"** (sezione 1), pagina `/scopri-la-casa`: una pagina sola che contiene sia "Dove parcheggiare" sia "Dove siamo". Erano due pagine separate, e chi le apriva una dopo l'altra vedeva due mappe della stessa zona senza capire perché fossero divise.

### Rimosso
- Le pagine `/dove-parcheggiare` e `/dove-siamo`: i loro contenuti vivono ora dentro "Scopri la Casa". Le chiavi `doveParcheggiare` e `doveSiamo` restano invariate — cambia dove sono mostrate, non dove si modificano — e ciascuna conserva il proprio interruttore, così si può tenere la mappa dei dintorni e spegnere quella dei parcheggi, o viceversa.

## [1.12] - 2026-08-09
### Modificato
- "Planimetrie e Catasto" diventa la **sezione 3** e passa da quattro voci a tre: **Planimetrie quotate**, **Planimetrie catastali**, **Visure catastali**. "Planimetria appartamento" e "Planimetria box" confluiscono nelle planimetrie quotate, "Schede catastali" diventa "Planimetrie catastali"; eventuali documenti già caricati vengono conservati.
- La pagina usa ora lo stesso elenco documenti delle altre sezioni: **una voce senza file allegato non compare**, invece di restare visibile in grigio come "non disponibile". Niente immagini nella pagina.

## [1.11] - 2026-08-09
### Aggiunto
- Nuova sezione **"La Qualità dell'Immobile"** (sezione 2), pagina `/la-qualita-dell-immobile`, con dieci voci fisse: anno costruzione, ristrutturazioni, serramenti, tetto, cappotto, riscaldamento, climatizzazione, materiali, impianti e "tutti i plus".
- I contenuti si ricavano dal PDF del modulo compilato al sopralluogo, allegato dal pannello alla creazione del sito o in un secondo momento. Le voci di cui il modulo non parla restano vuote e **non compaiono in pagina**: un appartamento in condominio non ha un tetto proprio, e un'etichetta seguita dal nulla è peggio di un'etichetta assente.

### Modificato
- Le voci che parlano di qualità costruttiva sono uscite da "Caratteristiche principali" per confluire qui: stato dell'immobile, interni, impianti e infissi, altre dotazioni. "Caratteristiche principali" resta su tipologia, superfici, area esterna, autorimessa e arredi inclusi. I testi già presenti sono stati travasati nelle voci corrispondenti, non persi.

## [1.10] - 2026-08-09
### Aggiunto
- La pagina "Dove parcheggiare" può mostrare **quattro varianti di mappa** una sotto l'altra, etichettate, per scegliere quale tenere. Si accende e si spegne dal pannello con `confrontoMappe`; da spenta resta la sola mappa disegnata.
  1. **Mappa disegnata** — quella già esistente.
  2. **Vista satellitare** (`mapImageSatellite`) — stessa inquadratura su foto aerea: si vedono i palazzi reali dall'alto, con i nomi delle vie sovrapposti. È la stessa chiamata di prima con `maptype=hybrid`, quindi non richiede nulla in più.
  3. **Mappa 3D interattiva** — riquadro di Google che il visitatore può ruotare e inclinare. È l'unica che gira nel browser: richiede `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` sul progetto Vercel del singolo sito (vedi `.env.example`) e si paga a visita, non a generazione. Senza la chiave la variante semplicemente non compare.
  4. **Vista dalla strada** (`streetViewImage`) — foto Street View dell'ingresso. Prima di scaricarla si interrogano i metadati: dove Street View non è mai passato la variante non compare, invece di pubblicare il riquadro grigio "no imagery here" che Google restituirebbe comunque.
- Nuovo `.env.example` nel template, che finora non ne aveva uno.

## [1.9] - 2026-08-09
### Aggiunto
- La pagina **"Dove parcheggiare"** mostra una mappa generata da Google Maps che parte dall'indirizzo dell'immobile: l'immobile è il segnaposto rosso, i parcheggi più vicini sono numerati in blu. Sotto la mappa l'elenco dei parcheggi con distanza e tempo a piedi.
- Nuovi campi nella sezione `doveParcheggiare`: `mapImage`, `generatedAt`, `lat`, `lng` e `parcheggi[]`. I testi e le foto della pagina restano dov'erano, la mappa si aggiunge sopra di essi.
- La mappa cerca entro 800 metri e tiene i cinque parcheggi più vicini a piedi. Il raggio è più stretto di quello della mappa dei dintorni ("Dove siamo", 1200 m) perché un parcheggio lontano un chilometro non è un parcheggio utile.
- Se non viene trovato alcun parcheggio la mappa viene comunque generata: mostra dov'è l'immobile, senza elenco.

## [1.8] - 2026-08-09
### Aggiunto
- Nuovo ramo **"La Documentazione"** (sezione 4): la pagina `/la-documentazione` fa da indice a sette sezioni documentali — APE, certificazione (rispondenza) impianto elettrico, certificazione (rispondenza) impianto idrico/termico/sanitario, libretto caldaia, regolamento di condominio, spese condominiali 2024-2025, verbali.
- Le voci di `navigation` accettano un campo opzionale `parent`. Una voce che ce l'ha non compare nel menu hamburger e si raggiunge dalla pagina indice del ramo: il menu resta a un livello solo, senza sottomenu.
- Nuovo componente `ElencoDocumenti`, condiviso dalle pagine documentali.
- **Sottotitolo dell'immobile** (`subtitle`), mostrato nell'hero sotto il titolo. In precedenza titolo e sottotitolo stavano uniti nello stesso campo `title`.
- **Descrizione libera** (`description`), la riga in corsivo dell'hero sotto il sottotitolo, con gli a capo rispettati.
- Interruttore `doveSiamo.showAddress`: l'indirizzo compare sopra la mappa dei dintorni solo se acceso (di default lo è).

### Modificato
- **In tutte le pagine documentali una voce senza documento caricato non compare più**, invece di restare visibile in grigio come "non disponibile". Le pagine elencano quindi solo ciò che si può davvero scaricare, e la pagina indice salta le sezioni ancora vuote.
- L'**APE** passa da pagina fotografica (immagine dell'attestato con zoom) a elenco di documenti scaricabili, coerentemente con la regola qui sopra. `ape.caption` e `ape.images` non esistono più.
- `/come-raggiungerci-1` diventa **`/dove-parcheggiare`** e la sua chiave passa da `dalCentroTradate` a `doveParcheggiare`.
- Il campo `address` torna a contenere l'indirizzo dell'immobile: prima ospitava un testo descrittivo, ora spostato in `description`.
- Nell'hero il sottotitolo è di un gradino più grande e la riga "tutti i dettagli dell'immobile…" inizia in minuscolo.

### Rimosso
- Pagina `/come-raggiungerci-2` e chiave `daViaCrocifisso`.
- Pagina `/documenti-condominiali` e chiave `documentiCondominiali`: i suoi documenti sono confluiti nelle sezioni "Regolamento di condominio", "Spese condominiali" e "Verbali". Le voci impiantistiche sono uscite da `bolletteImpianti`, che conserva le sole bollette.

### Note per l'aggiornamento dei siti esistenti
Questa versione **rinomina e rimuove chiavi e rotte**, mentre la funzione "Aggiorna" aggiunge le chiavi mancanti senza togliere quelle vecchie. Un sito aggiornato dalla 1.7 o precedenti si ritroverebbe quindi le vecchie voci di menu verso pagine che non esistono più, e le sezioni nuove riempite con i contenuti del modello invece dei propri. Per i siti ancora sulle versioni precedenti conviene rifarli, non aggiornarli.

## [1.7] - 2026-08-08
### Corretto
- `Navigation.tsx` chiamava `setState` in modo sincrono dentro un `useEffect` per chiudere il menu al cambio pagina (errore lint `react-hooks/set-state-in-effect`, può causare render a cascata non necessari). Ora l'apertura del menu è derivata dal confronto tra la rotta corrente e la rotta su cui è stato aperto (`openedFrom === pathname`): cambiare pagina lo chiude senza bisogno di un effect. Nessuna chiave di `property.json` coinvolta, nessun cambiamento visibile per l'utente finale.

## [1.6] - 2026-08-04
### Aggiunto
- Nella pagina "Link utili" la card Facebook mostra l'ultimo post pubblicato dalla Pagina dell'agenzia (foto del post, testo come didascalia, click che porta al post), come già faceva la card YouTube con l'ultimo video. I dati arrivano dall'endpoint `/api/social/facebook` di `minisito-admintool`, dove risiede l'unico token della Graph API: nessuna credenziale e nessuna configurazione da impostare sui singoli siti.
- `next.config.ts` autorizza `*.fbcdn.net` per `next/image` (dominio delle foto dei post Facebook).
- La card TikTok ospita il widget ufficiale del profilo, che mostra i video più recenti e si aggiorna da solo. Non richiede credenziali: l'handle si ricava dall'URL già presente in `property.json`. Il link "Guarda gli ultimi video su TikTok" resta sotto al widget e continua a funzionare anche se TikTok non risponde.
- **Nota implementativa:** l'iframe punta direttamente a `tiktok.com/embed/@handle` invece di usare `embed.js`. Lo script ufficiale crea l'iframe ma non gli comunica mai l'altezza, lasciandolo alto un pixel (verificato in produzione). Puntando l'iframe a mano il componente non richiede JavaScript e non carica script di terze parti nella pagina.
- **Modifica puramente additiva:** nessuna chiave di `property.json` cambia. Se l'endpoint Facebook non risponde, la card torna da sola all'aspetto statico precedente.
- **Nota privacy:** il widget TikTok carica uno script di terze parti nel browser del visitatore. Se in futuro verrà introdotto un banner cookie, questo componente va tra quelli da bloccare fino al consenso.

## [1.5] - 2026-08-03
### Modificato
- Le sezioni "Planimetrie" e "Documenti catastali" sono state unite in un'unica pagina "Planimetrie e dati catastali" (voce di navigazione unica, ancora su `/planimetrie`), nello stesso formato a elenco di documenti scaricabili già usato per "Documenti condominiali" (non più foto in galleria). Le chiavi `planimetrie` e `documentiCatastali` di `property.json` sono state sostituite dalla nuova chiave `planimetrieCatasto`.
- **Nota per l'Aggiorna:** questa è una modifica non additiva (rinomina/rimozione di chiavi). Un sito già deployato che riceve questo aggiornamento manterrà le vecchie chiavi `planimetrie`/`documentiCatastali` nel proprio `property.json` (dati non persi, ma non più raggiungibili da nessuna pagina) e la voce di menu "Documenti catastali" diventerà un link non più valido, finché non viene rimossa a mano nell'editor.

## [1.4] - 2026-08-01
### Aggiunto
- Pagina "Dove siamo": mappa dei dintorni (scuole, supermercati, farmacie, parcheggi, stazione) con distanza e tempo a piedi, generata automaticamente da `minisito-admintool` tramite Google Maps Platform. Nuova sezione `doveSiamo` in `property.json` e nuova voce di navigazione `/dove-siamo`.
