/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LeggereSection, AscoltareSection, ScriverePrompt, ParlarePrompt, GrammarDrill } from './types';

export const leggereSections: LeggereSection[] = [
  {
    id: 'l1',
    title: 'Leggere Parte 1 (Set A)',
    subtitle: 'Intervista a Riccardo Muti',
    instructions: 'Leggi l\'intervista e rispondi alle domande (1-3) scegliendo l\'unica risposta corretta (A, B, C o D).',
    text: `«È risaputo che da decenni conduco una battaglia in favore della cultura musicale. La ritengo una delle spine dorsali della storia del nostro Paese».
Non sembra che finora i suoi appelli siano stati ascoltati.
«Purtroppo no. Fa da freno l’atavica ignoranza musicale dei politici. Non lo fanno neanche apposta: semplicemente ignorano. Nei miei anni al Maggio fiorentino e alla Scala ne ho visti pochissimi. Se, come dicono, non ci sono risorse, che si lasci almeno fare ai privati. Ogni paese italiano ha il suo teatro e ha anche il suo ricco epulone che potrebbe aprirlo ai giovani locali, molto spesso dotati di idee più nuove delle cosiddette avanguardie, che sono più vecchie della vecchiaia».
Sospetto che pensi a qualcuno in particolare.
«Penso a una società che sta diventando sempre più visiva e che riduce tutto a “evento” svuotando l’arte del suo significato più profondo. Anche nella musica classica ormai fa più colpo il saltimbanco di turno di chi cerca di lavorare in profondità. Pianisti come Richter, Benedetti Michelangeli o Pollini, violinisti come Ojstrach o Francescatti stanno lasciando il posto a tanti saltimbanchi. Eppure non mi stancherà di dire che è proprio con la musica che si può aiutare a costruire una società migliore».
È questa una frase che ripete spesso. Ma che, detta così, può somigliare a uno slogan. Vorrei che la spiegasse perché non cada ancora nel vuoto.
«Gianfranco Ravasi mi ha ricordato giorni fa una magnifica esortazione di Cassiodoro: “Se noi uomini continueremo a commettere ingiustizie, Dio ci punirà togliendoci la musica”. Ecco, io sono convinto che dall’universo scendano raggi di suoni che girano in armonia e investono il nostro pianeta. Qualcuno ne è attraversato di più, come Mozart che a 35 anni aveva scritto ciò che è impossibile scrivere in una vita, e tutti capolavori. Altri ne restano indenni. Le sembrerà un’ingenuità, ma sento che la musica non è una cosa che abbiamo inventato noi: fanno musica gli uccelli che cantano, il suono che rimbomba, il mare che si muove, le foglie che vibrano. Dal punto di vista scientifico la musica è una costruzione, ma da quello emotivo è semplicemente un’armonia che ci investe e ci fa diventare migliori».
Se la natura ha la sua musica, anche i popoli esprimono suoni diversi. Non pensa che la globalizzazione, mentre mischia le genti, finirà per produrre una nuova confusione delle lingue, una Torre di Babele musicale che farà nascere qualcosa di inedito?
«No solo lo penso, ma ne sono convinto. La composizione contemporanea ha preso ormai completamente le distanze dal pubblico. Mozart parlava a persone che capivano il suo linguaggio, già l’ultimo Beethoven andava verso un mondo metafisico. Oggi è una musica per pochi eletti, generalmente divisa in isole, europea, orientale, americana, ecc. La globalizzazione porterà nuovi elementi ritmici, timbrici, melodici, armonici da cui nascerà una nuova alba».
C’è però una musica che ha già invaso il mondo: quella pop. Che rapporto ha con i generi popolari?
«Tutta la musica ha un suo valore, e ritengo il jazz una forma d’arte, ma è evidente che c’è quella che compiace e piace perché non fa pensare. Il pubblico divora queste invenzioni melodiche da spiagge romagnole. Prima c’era Modugno, c’erano le grandi canzoni napoletane. Ma oggi, tra la classica sempre più sofisticata e il semplicismo delle canzonette, c’è il vuoto. La globalizzazione lo colmerà e, dopo anni di crisi, di lotte e di sangue, si arriverà forse a un mondo migliore. Che probabilmente io non vedrò».`,
    type: 'multiple-choice',
    items: [
      {
        id: 1,
        question: '1. Secondo Muti, oggi nel mondo della musica classica:',
        options: [
          'A) si stanno affacciando talenti interessanti.',
          'B) si cerca soprattutto di intrattenere il pubblico.',
          'C) si dà troppo spazio agli artisti già conosciuti.',
          'D) si evita di affrontare temi legati all’attualità.'
        ],
        correctAnswer: 'B',
        explanation: 'Muti afferma che la società sta diventando sempre più visiva e che riduce tutto a "evento" svuotando l\'arte del suo significato più profondo, e che fa più colpo il "saltimbanco di turno" di chi lavora in profondità.'
      },
      {
        id: 2,
        question: '2. Secondo Muti la musica:',
        options: [
          'A) avvicina le persone alla natura.',
          'B) si basa su princìpi semplici.',
          'C) può ispirare sentimenti religiosi.',
          'D) esiste indipendentemente dall’uomo.'
        ],
        correctAnswer: 'D',
        explanation: 'Muti dichiara: "Sento che la musica non è una cosa che abbiamo inventato noi: fanno musica gli uccelli che cantano, il suono che rimbomba, il mare che si muove...". Esiste quindi autonomamente nella natura.'
      },
      {
        id: 3,
        question: '3. A proposito del pop, Muti dice che:',
        options: [
          'A) è un misto degli altri generi.',
          'B) ha un legame con la tradizione.',
          'C) è un tipo di musica superficiale.',
          'D) ha una sua funzione educativa.'
        ],
        correctAnswer: 'C',
        explanation: 'Paragonandola alle canzonette, dice che è "quella che compiace e piace perché non fa pensare", indicando il semplicismo delle canzonette e distinguendola dalla cultura musicale profonda.'
      }
    ]
  },
  {
    id: 'l2',
    title: 'Leggere Parte 2 (Set A)',
    subtitle: 'Doppia recensione di "Non avevo capito niente" (Diego De Silva)',
    instructions: 'Leggi le due recensioni (Testo A e Testo B) al romanzo e indica per ciascun quesito (4-8) l\'attribuzione corretta (A, B o C).',
    text: `TESTO A:
Lasciarsi catturare dalle riflessioni, sorridere come se l’autore fosse proprio dinanzi a te, è l’effetto disarmante di "Non avevo capito niente", romanzo di Diego De Silva, autore napoletano che all’interno di questo testo brillante affronta gli argomenti più disparati: i rapporti interpersonali, il ruolo di padre divorziato che cerca di mantenere e costruire un rapporto civile con i propri figli.
L’autore è stato in grado di affrontare un argomento come l’inadeguatezza umana con uno stile frizzante e soave senza sfiorare la banalità, attraverso un personaggio tragicomico rendendo le vicende che lo coinvolgono parte integrante del lettore stesso, che vive attraverso le sue battute e i suoi brillanti e buffi quesiti, le sue gioie e i suoi dolori, guai, situazioni imbarazzanti e momenti di estrema malinconia.
Un romanzo che permette al lettore di afferrare per mano questo bizzarro avvocato e di lasciarsi travolgere pienamente dai suoi voli pindarici. Vincenzo Malinconico vi farà ridere e riflettere, riuscirà a estrapolare tutti i dettagli della società in cui viviamo, in cui è difficile elaborare pensieri profondi e ancor più difficile è riuscire a farlo con una dose d’ironia che diventa il mezzo necessario per sopravvivere. Malinconico si concede del tempo per conoscersi, per comprender che le cose accadono senza poterne modificare gli effetti: non possiamo esercitare alcun controllo sugli eventi che coinvolgono la nostra routine e l’ironia è la compagna ideale per affrontare questa disarmante verità.`,
    textPart2: `TESTO B:
"Non avevo capito niente" parla delle difficoltà di comprendere le dinamiche della vita quotidiana tramite il protagonista del romanzo, Vincenzo Malinconico, che si fa portavoce di questa incapacità.
Malinconico, avvocato napoletano, ci racconta la sua vita di precario: una precarietà che riguarda gli affetti, i sentimenti, le amicizie e il lavoro perché lavora poco e male.
Vincenzo Malinconico divide con altri lavoratori, sfigati come lui, un piccolo studio arredato con mobili Ikea che il protagonista chiama affettuosamente per nome: la poltroncina Tullsta, la sedia Stefan, la libreria Billy, la tenda Kvadrant che sono diventati un’icona della generazione moderna. Come dice lo stesso De Silva in una intervista, Vincenzo Malinconico è l’uomo griffato Ikea.
Malinconico è anche un outlet, cioè un uomo che si definisce appartenente al campionario della stagione passata, che vive male il rapporto con l’attualità e in questo ha difficoltà ad afferrare la vita perché la vita lo supera continuamente.
Il libro scorre velocemente, si legge tutto d’un fiato e fa riflettere molto su vicende che consideriamo banali e sulle quali sorvoliamo. La vita di Malinconico è simile alla vita di ognuno di noi: non segue un filo logico e si snoda attraverso le vicissitudini che si delineano di giorno in giorno. Mi sento di dire che è un romanzo che dovrebbero leggere tutti perché aiuta a riflettere ma anche a prendere la vita con più ironia.`,
    type: 'matrix',
    items: [
      {
        id: 4,
        question: '4. Diego De Silva tratta in modo originale l’incapacità di vivere ed essere adeguati:',
        options: ['A (Testo A)', 'B (Testo B)', 'C (Entrambi i testi)'],
        correctAnswer: 'A',
        explanation: 'Il Testo A commenta specificamente che De Silva risalta "l\'inadeguatezza umana" con uno stile "frizzante e soave senza sfiorare la banalità".'
      },
      {
        id: 5,
        question: '5. Vincenzo Malinconico descrive in modo accurato la sua vita e il mondo contemporaneo:',
        options: ['A (Testo A)', 'B (Testo B)', 'C (Entrambi i testi)'],
        correctAnswer: 'C',
        explanation: 'Entrambe le recensioni descrivono in dettaglio come il personaggio analizzi e approfondisca sia la sua vita quotidiana sia la società contemporanea in cui viviamo.'
      },
      {
        id: 6,
        question: '6. Malinconico si serve dell\'umorismo come compagno di fronte all’imprevedibilità del destino:',
        options: ['A (Testo A)', 'B (Testo B)', 'C (Entrambi i testi)'],
        correctAnswer: 'A',
        explanation: 'Il Testo A descrive in modo approfondito l\'ironia e la comprensione che "le cose accadono senza poterne modificare gli effetti" e l\'ironia come compagna ideale.'
      },
      {
        id: 7,
        question: '7. Malinconico vive in una condizione di instabilità lavorativa e sentimentale:',
        options: ['A (Testo A)', 'B (Testo B)', 'C (Entrambi i testi)'],
        correctAnswer: 'B',
        explanation: 'Il Testo B menziona la "vita di precario" che tocca affetti, sentimenti, amicizie e lavoro ("precarietà... lavora poco e male").'
      },
      {
        id: 8,
        question: '8. Malinconico si sente poco allineato con i ritmi e lo stile della modernità:',
        options: ['A (Testo A)', 'B (Testo B)', 'C (Entrambi i testi)'],
        correctAnswer: 'B',
        explanation: 'Il Testo B lo definisce un "uomo che si definisce appartenente al campionario della stagione passata, che vive male il rapporto con l\'attualità".'
      }
    ]
  },
  {
    id: 'l3',
    title: 'Leggere Parte 3 (Set A)',
    subtitle: 'La scrittura scientifica e tecnica',
    instructions: 'Scegli fra le opzioni (A-E) quella adatta a completare i fori 9, 10 e 11. (Ci sono due parti di testo in più).',
    text: `Scrivere una relazione, un articolo, un rapporto, uno studio di fattibilità, un manuale o un libro è un’attività che gli ingegneri e gli scienziati devono costantemente svolgere nella loro carriera. Eppure alcuni pensano che la redazione di un manoscritto sia la parte più noiosa e frustrante di un lavoro, che scrivere sia un’interruzione irritante del loro “vero” lavoro, un’attività di livello inferiore. Altri ritengono che scrivere sia un’attività che ha un solo scopo legittimo, quello di informare, trasmettere informazioni e dati da una testa all’altra. 

[FORO 9] ________________ Gli ingegneri e gli scienziati, per essere efficaci, devono fare molto di più che informare: devono anche provare, spiegare, valutare, giustificare, difendere, attaccare, scegliere, sostenere, confutare.

La comunicazione tecnico-scientifica (scritta e orale) è tradizionalmente associata all’ingegneria e alle scienze. Oggi, però, essa, soprattutto nel solo aspetto tecnico, tocca quasi ogni attività e professione, e con una gran varietà di documenti, articoli, relazioni, definisce, descrive e guida le attività nell’industria, nelle professioni, negli enti statali, nelle istituzioni della ricerca, nella scuola, in breve in una qualunque attività umana ben strutturata.

[FORO 10] ________________ I foglietti illustrativi che accompagnano i medicinali sono letti da operatori della sanità di cultura e funzioni diverse, oltre che dal malato.

La scrittura è uno stimolo importante per il progresso della scienza e della tecnica e sua parte integrante.

[FORO 11] ________________ Esempi storici mostrano che le idee emergono, si sviluppano, cambiano forma e sono abbandonate perché sostituite da nuove idee e spiegazioni, che si rivelano essere quelle corrette. Scrivere un manoscritto scientifico non è un esercizio di ricostruzione fedele del processo creativo ma ne fa parte, e in modo profondo. Nessuno, infatti, sa con precisione ciò che pensa finché non lo esprime con parole scritte o pronunciate.`,
    type: 'gap-fill',
    items: [
      {
        id: 9,
        question: 'Scegli la parte mancante per il Buco 9:',
        options: [
          'A. L’esperienza fondamentale di una tesi non è tanto, o soltanto, studiare cose nuove, ma imparare a lavorare su problemi irrisolti in modo autonomo...',
          'B. Molte persone leggono documenti tecnici di varia difficoltà in diverse occasioni, sia al lavoro sia a casa...',
          'C. Dall’elenco si deduce che alcuni atti di congressi, i rapporti interni, le proposte scritte per enti statali...',
          'D. Le altre due funzioni della scrittura in genere, e di quella tecnico-scientifica in particolare, persuadere e motivare, secondo loro non riguardano gli scienziati...',
          'E. Mettere per iscritto le proprie idee su un argomento ne migliora sempre la comprensione...'
        ],
        correctAnswer: 'D',
        explanation: 'L\'opzione D continua perfettamente il discorso sulle finalità della scrittura scientifica e smentisce la tesi restrittiva esposta nella frase precedente ("quello di informare...").'
      },
      {
        id: 10,
        question: 'Scegli la parte mancante per il Buco 10:',
        options: [
          'A. L’esperienza fondamentale di una tesi non è tanto, o soltanto, studiare cose nuove, ma imparare...',
          'B. Molte persone leggono documenti tecnici di varia difficoltà in diverse occasioni, sia al lavoro sia a casa. Per esempio, informazioni particolareggiate su natura...',
          'C. Dall’elenco si deduce che alcuni atti di congressi, i rapporti interni...',
          'D. Le altre due funzioni della scrittura in genere, e di quella tecnico-scientifica in particolare...',
          'E. Mettere per iscritto le proprie idee su un argomento ne migliora sempre la comprensione...'
        ],
        correctAnswer: 'B',
        explanation: 'L\'opzione B introduce la tesi che molte persone (come pazienti, medici, ingegneri) leggano regolarmente documenti tecnici, introducendo coerentemente l\'esempio successivo sui "foglietti illustrativi dei medicinali".'
      },
      {
        id: 11,
        question: 'Scegli la parte mancante per il Buco 11:',
        options: [
          'A. L’esperienza fondamentale di una tesi non è tanto, o soltanto, studiare nuove cose...',
          'B. Molte persone leggono documenti tecnici...',
          'C. Dall’elenco si deduce che alcuni atti di congressi...',
          'D. Le altre due funzioni della scrittura in genere...',
          'E. Mettere per iscritto le proprie idee su un argomento ne migliora sempre la comprensione, perché la scrittura non è indipendente dal processo mentale...'
        ],
        correctAnswer: 'E',
        explanation: 'L\'opzione E discute il valore conoscitivo della scrittura ("mettere per iscritto le proprie idee ne migliora la comprensione"), che si aggancia al testo ("le idee emergono, si sviluppano...").'
      }
    ]
  },
  {
    id: 'l4',
    title: 'Leggere Parte 4 (Set A)',
    subtitle: 'Il futuro di Rita Levi Montalcini e del fattore NGF',
    instructions: 'Abbina ciascuna delle affermazioni (12-15) al corretto paragrafo del testo (B-G) in cui si trova la risposta.',
    text: `A. Nell’ottobre del 1986 l’Accademia delle Scienze svedese inviava a Rita Levi Montalcini la comunicazione, con un linguaggio scarno quanto quello di un comunicato Ansa, l’assegnazione del più prestigioso premio internazionale: il Nobel per la fisiologia e la medicina.

B. Il conferimento del premio suscitò tanta sorpresa nella maggior parte della comunità scientifica italiana quanto un «finalmente» in quella internazionale. Non è questa la sede per analizzare i motivi di questa sorpresa nostrana, perché significherebbe sviscerare i numerosi difetti del nostro mondo accademico che non offrì neppure uno sbocco universitario concreto, quando la scienziata torinese si accinse a ritornare in Italia dopo un ventennio statunitense. Questa opportunità fu prospettata dall’allora presidente del Cnr, Vincenzo Caglioti, che istituì un piccolo Centro di Neurobiologia ospitato nei sotterranei dell’Istituto Superiore di Sanità.

C. Il 2016 sancisce il trentennale di quel premio e l’occasione mi ricorda una frase che all’epoca apparve su «La Stampa» di Primo Levi: «Il Premio Nobel si attaglia a Rita come la chiave alla toppa di una serratura». Oggi la domanda è: la chiave di Rita Levi Montalcini quale serratura ha aperto nella ricerca sul cervello e - domanda collegata - ha anche contribuito al progresso della medicina?

D. La risposta alla prima domanda si inserisce nella cornice delle sostanze come vitamine e ormoni che circolano nel sangue e nei tessuti e ne modulano sia lo sviluppo sia la presenza nell’organismo adulto. La scoperta dell’«Ngf», infatti, ha portato alla luce l’esistenza di un’intera nuova classe di queste sostanze circolanti, che i biologi definiscono «fattori di crescita».

E. Basta ricordare che Rita Levi Montalcini scoprì l’«Ngf» per le sus proprietà di far crescere le fibre nervose (di qui il termine di «fattore di crescita») con gangli che fanno parte del sistema nervoso periferico. Oggi sappiamo che le sue funzioni si estendono al cervello, al sistema endocrino, a quello che presiede alle difese dell’organismo e, ultimamente, è emerso anche un suo ruolo fondamentale in una fase della fecondazione.

F. Nell’ambito di questi studi «organismici», meritano una segnalazione particolare l’impiego dell’«Ngf» in un numero crescente di malattie che colpiscono l’occhio e nel morbo di Alzheimer. L’«Ngf» viene già impiegato per la cura delle ulcere corneali ed è in fase iniziale il suo impiego per il glaucoma. Ma la prospettiva più interessante riguarda quella devastante malattia che prende il nome dal suo scopritore: Alois Alzheimer.

G. L’aspetto crudele di questa malattia è che ne conosciamo, in molti dettagli, la varietà dei sintomi clinici, cellulari e molecolari, ma non si riesce ancora ad accertare se esista una sola oppure molte cause scatenanti. In questo quadro l’«Ngf» sta emergendo come un potenziale elemento di speranza. Ciò che sappiamo è che, se questo viene a mancare al cervello di animali o di cellule nervose coltivate in vitro, insorgono sintomi molto simili a quelli che colpiscono l’uomo. Altri, negli Stati Uniti e con mezzi molto più consistenti dei nostri, hanno raggiunto le stesse conclusioni e sono già nella cosiddetta «fase 2» del suo impiego per curare pazienti con questa malattia.`,
    type: 'paragraph-match',
    items: [
      {
        id: 12,
        question: '12. Dove si sta già sperimentando l’Ngf sui malati di Alzheimer?',
        options: ['Paragrafo B', 'Paragrafo C', 'Paragrafo D', 'Paragrafo E', 'Paragrafo F', 'Paragrafo G'],
        correctAnswer: 'Paragrafo G',
        explanation: 'Il paragrafo G menziona: "Altri, negli Stati Uniti... sono già nella cosiddetta «fase 2» del suo impiego per curare pazienti con questa malattia [Alzheimer]".'
      },
      {
        id: 13,
        question: '13. Quali informazioni abbiamo sugli effetti dell’Ngf sul corpo umano?',
        options: ['Paragrafo B', 'Paragrafo C', 'Paragrafo D', 'Paragrafo E', 'Paragrafo F', 'Paragrafo G'],
        correctAnswer: 'Paragrafo E',
        explanation: 'Il paragrafo E elenca gli effetti e le estensioni delle funzioni dell\'Ngf: "sistema nervoso periferico... cervello, sistema endocrino, difese dell\'organismo, fecondazione".'
      },
      {
        id: 14,
        question: '14. Dove andò a lavorare Rita Levi Montalcini quando rientrò dall’estero?',
        options: ['Paragrafo B', 'Paragrafo C', 'Paragrafo D', 'Paragrafo E', 'Paragrafo F', 'Paragrafo G'],
        correctAnswer: 'Paragrafo B',
        explanation: 'Il paragrafo B afferma che tornata dagli USA lavorò in "un piccolo Centro di Neurobiologia ospitato nei sotterranei dell’Istituto Superiore di Sanità".'
      },
      {
        id: 15,
        question: '15. In quali terapie si usa attualmente l’Ngf?',
        options: ['Paragrafo B', 'Paragrafo C', 'Paragrafo D', 'Paragrafo E', 'Paragrafo F', 'Paragrafo G'],
        correctAnswer: 'Paragrafo F',
        explanation: 'Il paragrafo F spiega: "L’«Ngf» viene già impiegato per la cura delle ulcere corneali ed è in fase iniziale il suo impiego per il glaucoma...".'
      }
    ]
  },
  {
    id: 'l5',
    title: 'Leggere Parte 1 (Set B - Extra)',
    subtitle: 'La rivitalizzazione dei borghi italiani',
    instructions: 'Leggi il brano e rispondi alle domande (16-18) sull\'argomento del recupero territoriale e demografico.',
    text: `L’Italia è costellata da migliaia di piccoli borghi storici, molti dei quali rischiano oggi di scomparire a causa dello spopolamento demografico e del progressivo abbandono delle campagne. Tuttavia, negli ultimi anni si sta diffondendo un forte movimento di controtendenza che mira a ripopolare queste piccole perle storiche, non solo come attrazioni turistiche stagionali, bensì come centri vivi dell'economia digitale.
La vera svolta è stata determinata dall’avvento della banda ultralarga e dalla diffusione dello smart working. Molti professionisti sia italiani che stranieri hanno scelto di trasferire la propria residenza in contesti naturali e monumentali dove il costo della vita è contenuto e le relazioni sociali sono basate sulla prossimità e sul senso di comunità. Progetti innovativi come le "case a un euro" si sono rivelati eccezionali calamite pubblicitarie capaci di attirare investitori esteri e giovani famiglie disposte a ristrutturare immobili fatiscenti in cambio di una nuova prospettiva di vita.
Ciononostante, non mancano le voci critiche che invitano a non idealizzare eccessivamente questo fenomeno. Gli scettici evidenziano che senza un serio e duraturo potenziamento dei servizi infrastrutturali primari – ospedali di zona, scuole aperte, trasporti ferroviari e stradali affidabili – la transizione verso il borgo rischia di rimanere un idillio passeggero. La rinascita economica deve reggersi su progetti integrati in grado di colmare il divario strutturale tra metropoli e periferie alpine o appenniniche.`,
    type: 'multiple-choice',
    items: [
      {
        id: 16,
        question: '16. Quale fattore è indicato come principale elemento di svolta per il ripopolamento dei borghi?',
        options: [
          'A) La concessione di sussidi pubblici permanenti agli imprenditori agricoli.',
          'B) Il progressivo rincaro degli affitti turistici nelle grandi capitali europee.',
          'C) La crescita del lavoro agile supportata da reti internet veloci.',
          'D) L’incremento delle tariffe di soggiorno per i vacanzieri stranieri.'
        ],
        correctAnswer: 'C',
        explanation: 'Il testo specifica esplicitamente che "la vera svolta è stata determinata dall’avvento della banda ultralarga e dalla diffusione dello smart working".'
      },
      {
        id: 17,
        question: '17. L’iniziativa commerciale delle "case a un euro" viene descritta come:',
        options: [
          'A) Un fallimento amministrativo dovuto ad ostacoli burocratici.',
          'B) Uno strumento promozionale efficace che attira acquirenti.',
          'C) Una truffa immobiliare denunciata dalle associazione dei consumatori.',
          'D) Un progetto riservato esclusivamente a residenti sottomessi.'
        ],
        correctAnswer: 'B',
        explanation: 'L\'autore qualifica l\'iniziativa come "eccezionali calamite pubblicitarie capaci di attirare investitori esteri".'
      },
      {
        id: 18,
        question: '18. Secondo l\'autore, affinché il fenomeno sia sostenibile a lungo termine, occorre:',
        options: [
          'A) Vietare l’accesso ai veicoli a motore all’interno dei borghi storici.',
          'B) Consolidare e incrementare l’erogazione dei servizi essenziali locali.',
          'C) Ridurre il numero complessivo di residenti in ciascuna area rurale.',
          'D) Costruire nuovi complessi alberghieri per incrementare il flusso turistico.'
        ],
        correctAnswer: 'B',
        explanation: 'Si menziona la necessità di "un serio e duraturo potenziamento dei servizi infrastrutturali primari – ospedali di zona, scuole aperte, trasporti...".'
      }
    ]
  },
  {
    id: 'l6',
    title: 'Leggere Parte 2 (Set B - Extra)',
    subtitle: 'La transizione ecologica ed il riciclo della plastica',
    instructions: 'Leggi i due punti di vista (Testo A e Testo B) riguardanti il ciclo di vita della plastica e rispondi ai quesiti (19-23).',
    text: `TESTO A:
La transizione ecologica globale non può prescindere da un approccio radicale e rigoroso sul riciclo meccanico e chimico dei rifiuti polimerici. Troppo spesso, infatti, ci si adagia sull'illusione che l'utilizzo di plastiche bio-compostabili possa risolvere l'inquinamento marino e terrestre. Tuttavia, le bioplastiche richiedono comunque impianti industriali di compostaggio specifici per degradarsi correttamente e il loro rilascio casuale nell'ambiente provoca alterazioni microbiologiche deleterie. Occorre invece concentrare tutti gli investimenti sull'ottimizzazione del recupero della plastica vergine tradizionale, introducendo sanzioni pecuniarie severe per le imprese che non raggiungono percentuali minime di plastica post-consumo nel packaging. Solo in questo modo l'economia circolare cesserà di essere un manifesto utopistico, convertendosi in prassi commerciale quotidiana e redditizia.`,
    textPart2: `TESTO B:
L'adozione diffusa di imballaggi bio-compostabili estratti dal mais e dalla barbabietola rappresenta un caposaldo imprescindibile se vogliamo liberare la nostra catena di distribuzione dalle fonti fossili importate. Il riciclo dei tradizionali idrocarburi plastici è un miraggio ad alta dissipazione energetica, poiché i procedimenti di lavaggio, fusione ed estrusione producono anidride carbonica in quantità spesso superiori alla fabbricazione di plastica vergine ex novo. Dobbiamo scoraggiare la produzione fossile tramite la tassazione progressiva e indirizzare il mercato di massa verso l’autosufficienza ecologica agraria, semplificando le procedure burocratiche d’approvazione di nuovi imballaggi e stimolando i giovani ricercatori a concepire membrane alimentari idrosolubili che scompaiono spontaneamente in acqua.`,
    type: 'matrix',
    items: [
      {
        id: 19,
        question: '19. Ritiene che il riciclo della plastica fossile tradizionale sia preferibile e più efficace delle bioplastiche:',
        options: ['A (Testo A)', 'B (Testo B)', 'C (Entrambi i testi)'],
        correctAnswer: 'A',
        explanation: 'Il Testo A reputa illusorio il beneficio delle bioplastiche e spinge a concentrarsi sul recupero della plastica vergine tradizionale.'
      },
      {
        id: 20,
        question: '20. Propone l’uso di misure fiscali (tasse o sanzioni) per modificare il comportamento dei produttori industriali:',
        options: ['A (Testo A)', 'B (Testo B)', 'C (Entrambi i testi)'],
        correctAnswer: 'C',
        explanation: 'Il Testo A suggerisce "sanzioni pecuniarie severe", mentre il Testo B propone "la tassazione progressiva" della produzione fossile.'
      },
      {
        id: 21,
        question: '21. Afferma che la lavorazione per riciclare la plastica comune richiede alti tassi di consumo energetico e CO2:',
        options: ['A (Testo A)', 'B (Testo B)', 'C (Entrambi i testi)'],
        correctAnswer: 'B',
        explanation: 'Il Testo B evidenzia che il riciclo è "un miraggio ad alta dissipazione energetica" che sprigiona troppa anidride carbonica.'
      },
      {
        id: 22,
        question: '22. Sottolinea che le plastiche biodegradabili necessitano comunque di specifici trattamenti e impianti per decomporsi:',
        options: ['A (Testo A)', 'B (Testo B)', 'C (Entrambi i testi)'],
        correctAnswer: 'A',
        explanation: 'Il Testo A rammenta espressamente che "le bioplastiche richiedono comunque impianti industriali di compostaggio specifici per degradarsi correttamente".'
      },
      {
        id: 23,
        question: '23. Auspica l\'introduzione di soluzioni tecnologiche all\'avanguardia basate su materiali che si sciolgono:',
        options: ['A (Testo A)', 'B (Testo B)', 'C (Entrambi i testi)'],
        correctAnswer: 'B',
        explanation: 'Il Testo B parla di spronare i ricercatori a concepire "membrane alimentari idrosolubili che scompaiono spontaneamente in acqua".'
      }
    ]
  },
  {
    id: 'l7',
    title: 'Leggere Parte 3 (Set B - Extra)',
    subtitle: 'La conservazione della biodiversità marina',
    instructions: 'Scegli fra le opzioni propedeutiche (A-E) quella idonea a colmare i fori 24, 25 e 26.',
    text: `Il bacino del Mar Mediterraneo costituisce uno degli hotspot di biodiversità più fragili dell'intero ecosistema marino terrestre. Pur coprendo meno dell'uno per cento della superficie oceanica liquida complessiva, esso ospita una quota superiore al dieci per cento di tutte le specie marine censite a livello internazionale. Purtroppo l'intensa antropizzazione costiera, il riscaldamento e l'introduzione di specie allogene rischiano di comprometterne irrimediabilmente l'equilibrio.

[FORO 24] ________________ Le praterie di Posidonia oceanica, ad esempio, svolgono un ruolo fondamentale nel contrastare l’erosione delle spiagge sabbiose e fungono da vivaio naturale per innumerevoli specie ittiche.

Per arginare questo deperimento progressivo, molti scienziati chiedono la rapida attuazione di una rete coordinata di Aree Marine Protette (AMP) presidiate da personale scientifico qualificato. Tuttavia, la semplice dichiarazione istituzionale di un'area tutelata non è sufficiente se essa manca di controlli stringenti sull'esercizio della pesca a strascico.

[FORO 25] ________________ Solo laddove si è stabilita una simbiosi produttiva tra guardie forestali, dipartimenti universitari e pescatori locali si è assistito a una ripresa straordinaria della biomassa autoctona.

Un altro pilastro teorico-operativo della biologia contemporanea riguarda la rimozione attiva dei rifiuti solidi sommersi, specialmente le cosiddette "redini fantasma", ossia reti da pesca smarrite sui fondali dai pescherecci.

[FORO 26] ________________ Queste barriere artificiali invisibili finiscono per intrappolare organismi di grandi dimensioni quali tartarughe Caretta caretta e cetacei, innescando una silenziosa catena di mortalità su cui gli scienziati continuano ad indagare con preoccupazione crescente.`,
    type: 'gap-fill',
    items: [
      {
        id: 24,
        question: 'Scegli la parte mancante per il Buco 24:',
        options: [
          'A. Molti studi indicano che l\'innalzamento termico stimola lo sviluppo di patogeni invasivi tropicali...',
          'B. Le zone pelagiche più profonde rimangono sconosciute e inesplorate dalla maggioranza degli oceanografi...',
          'C. In questo contesto, alcune piante sottomarine fungono da termometro biologico per misurare lo stato di salute generale delle acque...',
          'D. Il legame tra pesca artigianale e turismo balneare è fondamentale per incrementare il Prodotto Interno Lordo...',
          'E. La plastica galleggiante è aumentata del trenta percento negli ultimi tre anni consecutivi...'
        ],
        correctAnswer: 'C',
        explanation: 'L\'opzione C introduce coerentemente l\'argomento della "Posidonia oceanica" definendola un "termometro biologico" sottomarino nel periodo successivo.'
      },
      {
        id: 25,
        question: 'Scegli la parte mancante per il Buco 25:',
        options: [
          'A. Molti studi indicano che l\'innalzamento termico accelera...',
          'B. Le aree marine protette rimangono meri parchi di carta inerti in assenza di pattugliamenti effettivi e fondi governativi...',
          'C. In questo contesto, alcune piante sottomarine...',
          'D. Il legame tra pesca artigianale e turismo...',
          'E. La plastica galleggiante è aumentata...'
        ],
        correctAnswer: 'B',
        explanation: 'L\'opzione B affronta l\'inadeguatezza delle riserve "sulla carta" e la necessità di controlli reali, collegandosi bene alla frase che elogia la simbiosi locale attiva.'
      },
      {
        id: 26,
        question: 'Scegli la parte mancante per il Buco 26:',
        options: [
          'A. Le correnti termiche sottomarine trascinano le reti abbandonate fino ai fondali coralligeni, dove rimangono agganciate per decenni...',
          'B. Molti studi indicano che l\'innalzamento termico...',
          'C. In questo contesto, alcune piante sottomarine...',
          'D. Il legame tra pesca artigianale e turismo...',
          'E. La plastica galleggiante è aumentata...'
        ],
        correctAnswer: 'A',
        explanation: 'L\'opzione A spiega dettagliatamente il destino delle "reti fantasma" che si agganciano ai fondali coralligeni, accoppiandosi all\'inizio dell\'affermazione successiva sui pericoli per la fauna.'
      }
    ]
  },
  {
    id: 'l8',
    title: 'Leggere Parte 4 (Set B - Extra)',
    subtitle: 'L\'eredità archeologica di Pompei',
    instructions: 'Abbina ciascuna delle affermazioni (27-30) al corretto paragrafo del testo (B-G) in cui si trova la risposta.',
    text: `A. Il sito archeologico di Pompei rappresenta una finestra incomparabile e tragica sulla vita quotidiana dell'Impero Romano. Seppellita dall'eruzione del Vesuvio nel 79 d.C., la città ha conservato abitazioni, affreschi, templi e persino i calchi degli abitanti sorpresi dalla nube piroclastica.

B. Negli ultimi anni Pompei si è convertita da emblema nostrano di incuria strutturale e crolli – si rammenti il problematico crollo della Schola Armatorum nel 2010 – a modello di indiscusso riscatto internazionale. Grazie ai finanziamenti robusti dello Stato e al "Grande Progetto Pompei", è stato possibile stabilizzare i terreni di confine adiacenti non ancora scavati, riducendo drasticamente le infiltrazioni acquifere meteoriche, ritenute le vere responsabili primarie dei cedimenti strutturali dei muri romani.

C. L’attenzione accademica odierna si focalizza sulle scoperte emblematiche effettuate nella cosiddetta Regio V, un'area settentrionale emersa solo di recente. Gli scavi hanno restituito un Thermopolium (tavola calda dell’antichità) perfettamente e audacemente affrescato, completo di resti biologici di anatre, capre e maiali conservati sul fondo delle anfore in terracotta. Queste porzioni rivelano abitudini dietetiche popolari romane fino ad oggi sconosciute ai classicisti.

D. Uno degli aspetti metodologici più affascinanti è l'approccio multidisciplinare che unisce la ricerca sul campo alle scienze applicate. Geologi, archeobotanici, chimici e antropologi fisici collaborano gomito a gomito per ricreare la flora e la fauna pompeiana antica attraverso l'analisi dei pollini carbonizzati e dei residui microscopici di lipidi rinvenuti sulle stoviglie oleose.

E. Le indagini di genetica molecolare condotte sui resti ossei hanno svelato una straordinaria quanto eclettica eterogeneità biologica della popolazione urbana di Pompei. Lo studio del DNA antico (aDNA) estratto dalle ossa temporali dimostra una composizione cosmopolita dell'Impero, con individui provenienti dal Nord Africa, dall'Asia Minore e dalla Grecia, attratti in Campania dai fervidi traffici portuali e mercantili.

F. Ciononostante, la gestione quotidiana di milioni di passeggeri e turisti determina una sfida gestionale enorme sul fronte del logoramento fisico e del micro-vandalismo involontario. Le autorità del Parco Archeologico hanno pertanto adottato un piano strategico di flussi contingentati ed emanato divieti d'ingresso in settori fragili, prediligendo itinerari turistici alternativi e periferici.

G. Questa sapiente diversificazione dei percorsi non solo salvaguarda l'integrità dei resti millenari, ma redistribuisce a livello commerciale e territoriale la ricchezza economica legata all'indotto culturale verso altri municipi limitrofi della piana vesuviana, spesso emarginati dai flussi di massa tradizionali.`,
    type: 'paragraph-match',
    items: [
      {
        id: 27,
        question: '27. Dove si parla del superamento dell’incuria governativa e del recupero architettonico del sito?',
        options: ['Paragrafo B', 'Paragrafo C', 'Paragrafo D', 'Paragrafo E', 'Paragrafo F', 'Paragrafo G'],
        correctAnswer: 'Paragrafo B',
        explanation: 'Il paragrafo B delinea la metamorfosi da "emblema nostrano di incuria strutturale e crolli" a "modello di indiscusso riscatto internazionale".'
      },
      {
        id: 28,
        question: '28. In quale paragrafo si espongono dettagli dietetici popolari romani scoperti di recente?',
        options: ['Paragrafo B', 'Paragrafo C', 'Paragrafo D', 'Paragrafo E', 'Paragrafo F', 'Paragrafo G'],
        correctAnswer: 'Paragrafo C',
        explanation: 'Nel paragrafo C si spiega la scoperta di un Thermopolium con resti organici di cibi (anatre, capre, maiali) scoprendo abitudini alimentari.'
      },
      {
        id: 29,
        question: '29. In quale sezione viene descritta l’origine geografica varia degli abitanti?',
        options: ['Paragrafo B', 'Paragrafo C', 'Paragrafo D', 'Paragrafo E', 'Paragrafo F', 'Paragrafo G'],
        correctAnswer: 'Paragrafo E',
        explanation: 'Il paragrafo E descrive lo studio del DNA antico che svela la natura cosmopolita degli abitanti con tracce del Nord Africa, Asia Minore e Grecia.'
      },
      {
        id: 30,
        question: '30. Dove si illustra l\'impatto positivo dello smistamento turistico sui municipi circostanti?',
        options: ['Paragrafo B', 'Paragrafo C', 'Paragrafo D', 'Paragrafo E', 'Paragrafo F', 'Paragrafo G'],
        correctAnswer: 'Paragrafo G',
        explanation: 'Il paragrafo G dichiara che la diversificazione dei percorsi "redistribuisce a livello commerciale e territoriale la ricchezza... verso altri municipi limitrofi".'
      }
    ]
  }
];

export const ascoltareSections: AscoltareSection[] = [
  {
    id: 'a1',
    title: 'Ascoltare Parte 1 (Set A)',
    subtitle: 'Il romanzo giallo',
    instructions: 'Associa a ogni brano (1-4) una delle affermazioni elencate qui sotto (A-F). Attenzione: ci sono frasi in più!',
    audioDuration: '5:32',
    transcript: `Brano 0 (Esempio): "Parliamo di giallo: il giallo va in una direzione importante, cioè quella di... la possibilità di leggere dei gialli, con l'investigatore, con l'investigazione classica... uno apre un libro, apre un giallo e una certezza ce l'ha: l'assassino lo troviamo, quindi il giallo lo risolviamo, e questo credo sia uno dei motivi fondanti per cui il giallo alla gente piace, perché almeno da quel punto di vista lì trova... la soluzione che cerca nella vita normale e che non arriva mai." [Corrisponde a G: Soddisfare il desiderio di giustizia del lettore]

Brano 1: "Il mio primo romanzo era autobiografico, in parte autobiografico, nel senso che ho usato una parte della mia storia per raccontare la storia di altri. E questa è stata una scelta ben precisa che mi ha poi incanalato su una scelta che continuo a mantenere cioè il fatto di maneggiare la realtà. Il mondo era quello dell’esilio politico internazionale che io raccontavo attraverso la mia storia. Dopo a tavolino ho scelto di dedicarmi al romanzo poliziesco, al noir, perché sono convinto che scrivere una storia criminale che si svolge in un tempo, in un luogo sia di fatto una scusa per raccontare altro, cioè la realtà storica, politica, economica, sociale che circonda gli avvenimenti narrati nel romanzo. Perché secondo me il ruolo oggi proprio della letteratura di genere, di cui oggi mi sento parte, è proprio questo, raccontare la realtà, le trasformazioni della realtà."

Brano 2: "Ma il giallo… volevo scrivere una storia immaginifica, strana, strampalata, cercavo un escamotage per renderla leggibile però, altrimenti sarebbe stata una cosa forse densa ma poco godibile, poco di intrattenimento e ho pensato alla formula del giallo, sia perché il giallo è qualcosa che si legge in genere volentieri, trascina il lettore dal punto di vista della narrazione, ma anche perché a me piaceva confrontare visioni del mondo del tutto diverse, quelli della polizia, quindi dei giudici, delle indagini, quelli dell’assassino e le visioni strane, strampalate che in questo libro sono proposte mettendo insieme il punto di vista sul mondo, la ricerca dei fatti, la ricerca della spiegazione dei fatti più queste fantasie, avrei avuto occasione di incrociare visioni del mondo diverse e la loro difficile conciliabilità. Quindi anche per questo ho scelto il giallo."

Brano 3: "Scrivere gialli per me significa sostanzialmente indagare sulle mie paure e trovare quella… quella chiave del racconto per cui la mia paura diventa comprensibile e diventa empatica con quella di chi mi legge. Quindi cerco una verità dentro di me, che mi spaventa del presente e del… che mi… della morte, di quello che mi può accadere, del fatto che ci sia un potere immanente che nasconde la verità, e così via. Tutto questo, tutto quello che… paura, rabbia, dolore lo cerco dentro di me e cerco di restituirlo raccontando una storia ai miei lettori. Questo è per me il giallo, il giallo, il noir, il thriller."

Brano 1: "A me piace la verità. Anche se, come ben sai, il nostro protagonista qui, Roberto, fugge dalla verità. E il giallo è una quadratura del cerchio, dove alla fine la verità viene fuori, cosa che nella vita reale quasi mai accade. Ed infatti, io lo dico sempre: io nasco come avvocato e forse morirò come ingegnere, perché mi piace la verità processuale, che adesso sta diventando una verità scientifica. E quindi mi piace questo mio rapporto con la verità, mi piace scoprire e arrivare a una soluzione. Il giallo ci permette di avere delle certezze alla fine, dove tutto ha una sua logica."`,
    type: 'listening-match',
    items: [
      {
        id: '1',
        question: 'Intelletto 1: Qual è lo scopo del giallo per lo scrittore del Brano 1?',
        options: [
          'A. Esplorare tante rappresentazioni della società.',
          'B. Dare delle sicurezze al lettore.',
          'C. Contaminare i generi letterari.',
          'D. Parlare di attualità, cronaca e realtà sociale.',
          'E. Esternare i propri sentimenti e inquietudini.',
          'F. Raggiungere un vasto pubblico disattento.'
        ],
        correctAnswer: 'D',
        explanation: 'Il Brano 1 parla espressamente di usare il noir come scusa "per raccontare la realtà storica, politica, economica, sociale... le trasformazioni della realtà" (Attualità).'
      },
      {
        id: '2',
        question: 'Intelletto 2: Qual è lo scopo del giallo per lo scrittore del Brano 2?',
        options: [
          'A. Esplorare tante rappresentazioni e visioni diverse della società.',
          'B. Dare delle sicurezze al lettore.',
          'C. Contaminare i generi letterari.',
          'D. Parlare di attualità, cronaca e realtà sociale.',
          'E. Esternare i propri sentimenti e inquietudini.',
          'F. Raggiungere un vasto pubblico disattento.'
        ],
        correctAnswer: 'A',
        explanation: 'L\'autore voleva "confrontare visioni del mondo del tutto diverse (polizia, assassino, cittadino)" e rappresentare visioni strampalate collegate.'
      },
      {
        id: '3',
        question: 'Intelletto 3: Qual è lo scopo del giallo per lo scrittore del Brano 3?',
        options: [
          'A. Esplorare tante rappresentazioni della società.',
          'B. Dare delle sicurezze al lettore.',
          'C. Contaminare i generi letterari.',
          'D. Parlare di attualità, cronaca e realtà sociale.',
          'E. Esternare i propri sentimenti ed esorcizzare le paure.',
          'F. Raggiungere un vasto pubblico disattento.'
        ],
        correctAnswer: 'E',
        explanation: 'Nel Brano 3 lo scrittore dice "indagare sulle mie paure... tutto questo, paura, rabbia, dolore lo cerco dentro di me e cerco di restituirlo".'
      },
      {
        id: '4',
        question: 'Intelletto 4: Qual è lo scopo del giallo per lo scrittore del Brano 4?',
        options: [
          'A. Esplorare tante rappresentazioni della società.',
          'B. Dare delle certezze logiche ed investigative al lettore.',
          'C. Contaminare i generi letterari.',
          'D. Parlare di attualità, cronaca e realtà sociale.',
          'E. Esternare i propri sentimenti ed esorcizzare le paure.',
          'F. Raggiungere un vasto pubblico disattento.'
        ],
        correctAnswer: 'B',
        explanation: 'Nel Brano 4 il parlante specifica che "il giallo ci permette di avere delle certezze alla fine, dove tutto ha una sua logica" (Fornire certezze).'
      }
    ]
  },
  {
    id: 'a2',
    title: 'Ascoltare Parte 2 (Set A)',
    subtitle: 'Demografia europea, open-source e la ricerca aziendale',
    instructions: 'Rispondi alle domande a scelta multipla (5-10) basate sui contenuti dei tre estratti d’ascolto.',
    audioDuration: '8:15',
    transcript: `Brano A: "Gli europei oggi sono gli eredi di una popolazione che negli ultimi due secoli si è diffusa nel mondo... Cento anni fa gli Europei rappresentavano un quinto della popolazione del globo. Oggi rappresentano un decimo... l’Europa è stata quasi per 500 anni esportatrice di persone... mentre da qualche decina di anni è diventata importatrice di persone e questo è un cambio storico di grandissima portata... dovremo lavorare con intensità per rendere sempre più omogeneo un continente che è ancora molto diviso."

Brano B: "L'idea di i-Cub nasce dalla necessità di avere una piattaforma sulla quale studiare l'intelligenza artificiale... lo abbiamo fatto piccolo per richiamare l'idea del bambino che apprende, ma anche per una questione pratica: non incute soggezione, non richiede infrastrutture, lo si usa facilmente. E l'altra intuizione è averlo fatto open source... codice condiviso, 5 milioni di righe di codice, partecipazione della comunità scientifica mondiale... e l'altezza è un po' aumentata perché avevamo bisogno di inserire più sensori tattili internamente..."

Brano C: "Il ricercatore in azienda non è solo chi fa libri, ma chi crea processi e prodotti utili per la società... In Italia abbiamo molta ricerca pubblica e poca ricerca privata aziendale. Eppure i dati del Sole 24 ore evidenziano che se la spesa aziendale per l'università è in calo, gli investimenti per la ricerca propria aziendale 'fatta in casa' sono aumentati del 24% dal 2007 (durante la crisi)... le aziende italiane hanno cominciato a rispondere con l'innovazione alle difficoltà."`,
    type: 'multiple-choice',
    items: [
      {
        id: 5,
        question: '5. Il cambiamento demografico radicale evidenziato per l’Europa recente riguarda:',
        options: [
          'A) la proporzione tra immigranti acquisiti ed emigranti partiti.',
          'B) la perdita di ricchezza industriale di alcuni stati mediterranei.',
          'C) l’estensione amministrativa dei suoi effettivi confini continentali.'
        ],
        correctAnswer: 'A',
        explanation: 'Il demografo dichiara che per 500 anni l\'Europa ha esportato persone, e ora ne importa, descrivendolo come un cambiamento storico epocale.'
      },
      {
        id: 6,
        question: '6. La problematica di coesione interna evidenziata risiede nel fatto che:',
        options: [
          'A) regna una paura sproporzionata dei flussi monetari futuri.',
          'B) persiste un elevato tasso di divergenze ed eterogeneità tra i Paesi.',
          'C) si dà priorità alle sole problematiche fiscali continentali.'
        ],
        correctAnswer: 'B',
        explanation: 'Viene menzionato che 50 anni di unificazione non hanno omogeneizzato il continente ("rimasto estremamente eterogeneo", "ancora molto diviso").'
      },
      {
        id: 7,
        question: '7. Lo sviluppo cooperativo in open source sul robot I-Cub ha consentito:',
        options: [
          'A) l’incremento qualitativo della programmazione commerciale protetta.',
          'B) il superamento di gravi sanzioni penali internazionali.',
          'C) la collaborazione attiva della comunità scientifica internazionale.'
        ],
        correctAnswer: 'C',
        explanation: 'L\'intervistato evidenzia la condivisione "con tutto il mondo" e il contributo attivo di una folta comunità scientifica internazionale.'
      },
      {
        id: 8,
        question: '8. L’altezza fisica di I-Cub è cresciuta per quale scopo pratico?',
        options: [
          'A) Renderlo identico all’altezza media del bambino biologico.',
          'B) Alloggiarvi al suo interno nuovi sensori tattili avanzati.',
          'C) Consentirgli l’arrampicata ed altri movimenti complessi.'
        ],
        correctAnswer: 'B',
        explanation: 'Il ricercatore spiega che la nuova versione è più alta perché "avevamo bisogno di mettere più sensori" (quindi più componenti).'
      },
      {
        id: 9,
        question: '9. Qual è lo stato attuale attribuito alla ricerca scientifica aziendale privata in Italia?',
        options: [
          'A) Risulta poco attendibile ed empiricamente infondata.',
          'B) Gode di scarso orientamento all\'innovazione commerciale.',
          'C) Resta scarsamente considerata e valorizzata rispetto alla pubblica.'
        ],
        correctAnswer: 'C',
        explanation: 'L\'intervistato si riferisce alla ricerca privata aziendale dicendo che in Italia emerge con fatica ed è poco valorizzata nel sistema paese.'
      },
      {
        id: 10,
        question: '10. L’espansione degli investimenti in ricerca propria delle aziende è interpretata come:',
        options: [
          'A) Una diretta conseguenza dei finanziamenti in eccesso della ricerca statale.',
          'B) Una risposta difensiva proattiva alla drastica recessione finanziaria.',
          'C) Un cambio d’organico basato su giovani e preparati programmatori.'
        ],
        correctAnswer: 'B',
        explanation: 'Si menziona specificamente che questo aumento si registra nel periodo di crisi dal 2007, come reazione delle aziende per rimanere competitive.'
      }
    ]
  },
  {
    id: 'a3',
    title: 'Ascoltare Parte 3 (Set A)',
    subtitle: 'Stefano Benni e l\'opera "La bottiglia magica"',
    instructions: 'Ascolta l\'intervista allo scrittore Stefano Benni e rispondi ai quesiti (11-14).',
    audioDuration: '6:50',
    transcript: `Intervistatore: "I due protagonisti del libro illustrato La bottiglia magica sono Alina e Pin... Alina è messa in un collegio, 'Villa Apatia', dai genitori per essere rieducata... cos'è questa Villa?"
Stefano Benni: "Alina è semplicemente una ragazza che combatte per la sua unicità: vuole studiare quello che ama, vuole fare la scrittrice... in questo mondo fiabesco questo suo desiderio di intelligenza viene sanzionato e la vogliono rieducare al conformismo, una specie di educazione-maleducazione che fanno alcuni settori della tecnologia, politica, cultura con ragazzi intelligenti chiamandoli 'ipercinetico' o 'borderline'... lei è solo curiosa...
...L'abuso di tecnologia, le bugie e le false promesse della tecnologia sono negative. Se mi dici che serve per comunicare, dico di sì. Se mi dici che serve per vincere la solitudine, è una bugia. La libertà si conquista col corpo a corpo, fuori dalla tecnologia... la gente gira ipnotizzata dallo schermo del cellulare... ma io tengo molto alla comunicazione vis-à-vis, di persona...
...I ragazzi giovani sono fantastici perché sono onnivori, leggono libri, giocano alla Playstation, usano il telefono simultaneamente... hanno molti interessi diversi, ma se si fissano su una sola attività si spengono."`,
    type: 'multiple-choice',
    items: [
      {
        id: 11,
        question: '11. Il personaggio di Alina, nell\'universo fiabesco dell\'opera:',
        options: [
          'A) Manifesta scarso interesse didattico e votazioni basse.',
          'B) Contrasta attivamente l’imposizione dell’uniformità sociale.',
          'C) Soffre di gravi barriere psicologiche nei rapporti interpersonali.'
        ],
        correctAnswer: 'B',
        explanation: 'Lo scrittore spiega che Alina combatte per la sua unicità e viene sanzionata perché rifiuta l\'educazione al conformismo.'
      },
      {
        id: 12,
        question: '12. Secondo Benni, una menzogna insidiosa derivata dalla tecnologia risiede:',
        options: [
          'A) Nell\'idea che la rete sia in grado di eliminare la solitudine umana.',
          'B) Nella falsa giovinezza garantita dai profili visuali.',
          'C) Nel fraintendimento dei canali di programmazione digitale.'
        ],
        correctAnswer: 'A',
        explanation: 'L\'autore indica espressamente: "Se mi dici che serve per vincere la solitudine, è una bugia. La libertà si conquista fuori dalla tecnologia".'
      },
      {
        id: 13,
        question: '13. Lo scrittore preferisce relazionarsi con gli altri individui:',
        options: [
          'A) Tramite i moderni canali radiofonici.',
          'B) Attraverso un’interazione diretta di persona.',
          'C) Prediligendo lo scambio epistolare cartaceo.'
        ],
        correctAnswer: 'B',
        explanation: 'Dice espressamente: "preferisco il corpo a corpo delle intelligenze, comunicare di persona", reputandola la vera forma di interazione profonda.'
      },
      {
        id: 14,
        question: '14. Quale caratteristica positiva è attribuita da Benni alle nuove generazioni?',
        options: [
          'A) Una rigidità ideologica che impedisce errori d\'infatuazione.',
          'B) L\'assenza di timori reverenziali dinanzi agli adulti.',
          'C) Una poliedricità ed ecletticità di passatempi ed interessi.'
        ],
        correctAnswer: 'C',
        explanation: 'Li definisce "onnivori", capaci di interessarsi simultaneamente a libri, videogiochi e attività diverse.'
      }
    ]
  },
  {
    id: 'a4',
    title: 'Ascoltare Parte 4 (Set A)',
    subtitle: 'Giorgio Vasari e Bio Aksxter',
    instructions: 'Completa le frasi (15-18) basate sulla biografia di Vasari e sulle specifiche agronomiche di Bio Aksxter.',
    audioDuration: '5:40',
    transcript: `Brano A: "Giorgio Vasari è noto soprattutto come storico... in realtà l'attività di storiografo per lui era un'attività d'avanguardia ma secondaria o sussidiaria. Giorgio si definiva e firmava come pittore d'Arezzo. Era un pittore incredibilmente prolifico ma anche molto controverso, la sua produzione sterminata ha dato risultati altalenanti, con momenti di grande lirismo alternati a momenti piatti. Ma fu anche un grandissimo architetto, spinto in quell'arte dall'amico Michelangelo."

Brano B: "Bio Aksxter è un disinquinante e fertilizzante innovativo. I fertilizzanti chimici hanno impoverito i terreni. Bio Aksxter invece è in grado di bonificare e risanare i terreni inquinati. Riporta il suolo a coltivabilità eliminando la salinità residua. Inoltre, rende le piante coltivate molto più resistenti agli sbalzi termici, limitando in modo evidente i danni d'estremo calore ed incrementando le difese autoimmunitarie vegetali contro i funghi."`,
    type: 'gap-match',
    items: [
      {
        id: 15,
        question: '15. La scrittura d\'ambito ______ costituiva per Giorgio Vasari un’attività professionale sussidiaria:',
        options: [
          'A) pittorica',
          'B) architettonica',
          'C) editoriale',
          'D) storiografica',
          'E) poetica',
          'F) politica'
        ],
        correctAnswer: 'D',
        explanation: 'Il testo del primo brano dichiara: "in realtà l\'attività di storiografo di Vasari... è un\'attività sussidiaria".'
      },
      {
        id: 16,
        question: '16. Nonostante la dedizione, le opere di natura ______ del Vasari produssero esiti estetici discontinui:',
        options: [
          'A) pittorica',
          'B) architettonica',
          'C) editoriale',
          'D) storiografica',
          'E) poetica',
          'F) politica'
        ],
        correctAnswer: 'A',
        explanation: 'La speaker dice: "pittore molto prolifico, molto controverso come qualità della sua produzione... ha dei momenti di grande lirismo... e dei momenti invece molto più quotidiani e corrivi" (risultati altalenanti).'
      },
      {
        id: 17,
        question: '17. Attraverso il preparato Bio Aksxter è scientificamente possibile ______ i suoli intossicati:',
        options: [
          'A) analizzare',
          'B) isolare',
          'C) risanare',
          'D) coprire',
          'E) recintare',
          'F) monitorare'
        ],
        correctAnswer: 'C',
        explanation: 'La speaker dice: Bio Aksxter è in grado di bonificare i terreni, in pratica di "disinquinarli" e "risanarli" restituendo coltivabilità.'
      },
      {
        id: 18,
        question: '18. I principi vegetali applicati permettono di ______ lo shock cagionato da anomalie del meteo:',
        options: [
          'A) studiare',
          'B) isolare',
          'C) sanzionare',
          'D) raddoppiare',
          'E) limitare',
          'F) prevedere'
        ],
        correctAnswer: 'E',
        explanation: 'Nel testo si afferma che Bio Aksxter limita vistosamente i danni da sbalzi termici ed estremo calore, contrastando efficacemente le anomalie.'
      }
    ]
  },
  {
    id: 'a5',
    title: 'Ascoltare Parte 1 (Set B - Extra)',
    subtitle: 'La salvaguardia dell’artigianato tradizionale in Toscana',
    instructions: 'Associa a ogni estratto (19-22) la corretta affermazione (A-F) sulla conservazione dei mestieri d\'arte.',
    audioDuration: '6:12',
    transcript: `Brano 1: "Lavorare la pelle a mano per me non è semplicemente un mestiere, è un rito che lega la mia famiglia a Firenze da generazioni. Oggi l'industria produce milioni di borse identiche in poche ore. Il pezzo artigianale richiede giorni, pazienza, e ha un profumo differente, unico. Vedo molti giovani spaventati dalla fatica manuale, che preferiscono impieghi digitali. Ma la manualità esprime l'anima e offre una soddisfazione intellettuale enorme che un computer non darà mai."

Brano 2: "Siamo rimasti pochissimi maestri vetrai capaci di soffiare la canna a bocca senza stampi di ghisa. Per conservare questo patrimonio abbiamo inaugurato una scuola-bottega gratuita autofinanziata per accogliere sarti e vetrai novizi. Notiamo che i ragazzi stranieri provenienti dal Giappone o dagli Stati Uniti mostrano un entusiasmo e un rispetto reverenziale superiore persino ai ragazzi locali, che spesso considerano il vetro una reliquia polverosa del nonno."

Brano 3: "La grande sfida dei laboratori è trovare un compromesso con il marketing moderno e l'e-commerce. Senza una vetrina online globale, una bottega di ceramiche artistiche a Montelupo Fiorentino è destinata a chiudere nel giro di pochi anni. Non si tratta di snaturare la purezza dell’argilla, ma di usare la tecnologia digitale per raccontare al mondo il valore del pezzo fatto a mano, intercettando estimatori che risiedono a migliaia di chilometri."

Brano 4: "Spesso le amministrazioni comunali concedono incentivi o sgravi, ma si dimenticano della questione cruciale degli affitti nei centri storici. La gentrificazione e l'esplosione dei canoni per uso turistico stanno letteralmente sfrattando gli storici calzolai ed intagliatori dalle mura medievali, sostituendoli con negozi di souvenir seriali. Se vogliamo salvare l'artigianato toscano occorre bloccare gli affitti commerciali e salvaguardare le botteghe fisiche."`,
    type: 'listening-match',
    items: [
      {
        id: 19,
        question: 'Brano 1: Quale punto di vista esprime il pellettiere sulla manualità?',
        options: [
          'A. I giovani toscani dovrebbero concentrarsi solo sull’uso di strumenti computazionali.',
          'B. Consente una gratificazione intellettuale profonda assente nei lavori informatici.',
          'C. Genera unicamente stanchezza fisica degradante per chi la esegue.',
          'D. Ha perso valore economico sul mercato dei brand di lusso.',
          'E. Costa meno della manifattura asiatica di massa.',
          'F. È un’attività prettamente commerciale priva di legami culturali.'
        ],
        correctAnswer: 'B',
        explanation: 'Il primo brano dichiara che la manualità manuale esprime l\'anima e offre una "soddisfazione intellettuale enorme che un computer non darà mai".'
      },
      {
        id: 20,
        question: 'Brano 2: Cosa emerge a proposito dell’accademia-bottega del vetro d\'arte?',
        options: [
          'A. Riceve cospicui finanziamenti statali europei a fondo perduto.',
          'B. Ha bandito totalmente gli studenti di nazionalità estera.',
          'C. Riscontra un forte interesse e rispetto da parte di allievi stranieri.',
          'D. È stata costretta a chiudere per mancanza totale di iscritti.',
          'E. Utilizza stampi automatici di metallo per sveltire la produzione.',
          'F. È riservata solo a candidati provvisti di laurea in storia dell\'arte.'
        ],
        correctAnswer: 'C',
        explanation: 'La voce del Brano 2 spiega che gli allievi stranieri (come giapponesi o statunitensi) "mostrano un entusiasmo e un rispetto reverenziale superiore" ai locali.'
      },
      {
        id: 21,
        question: 'Brano 3: Che ruolo deve avere l’innovazione tecnologica per il ceramista?',
        options: [
          'A. Sostituire interamente l’argilla con polimeri plastici modellabili.',
          'B. Trasformare le botteghe storiche in uffici di pura programmazione robotica.',
          'C. Fungere da mezzo digitale di racconto e promozione globale della manifattura.',
          'D. È superflua e costituisce unicamente un costo gestionale passivo.',
          'E. Serve per imitare perfettamente i pezzi di fabbrica stranieri.',
          'F. Rendere gli stampi automatici al cento per cento.'
        ],
        correctAnswer: 'C',
        explanation: 'Si menziona l\'importanza di "usare la tecnologia digitale per raccontare al mondo il valore del pezzo fatto a mano, intercettando estimatori lontani".'
      },
      {
        id: 22,
        question: 'Brano 4: Quale ostacolo strutturale viene denunciato nell\'ultimo brano?',
        options: [
          'A. La carenza strutturale di materie prime organiche.',
          'B. L’impossibilità di spedire merci pesanti via mare.',
          'C. L’aumento esponenziale delle spese d’affitto nei centri storici dovuto al turismo.',
          'D. La sottomissione intellettuale dei calzolai alle regole dei brand globali.',
          'E. La burocrazia legata all’acquisizione della cittadinanza.',
          'F. Il rigido rifiuto dei mercati esteri a comprare manufatti italiani.'
        ],
        correctAnswer: 'C',
        explanation: 'Il Brano 4 sottolinea l\'impatto della gentrificazione e dell\'esplosione dei canoni d\'affitto legati al turismo che sfrattano gli artigiani storici.'
      }
    ]
  },
  {
    id: 'a6',
    title: 'Ascoltare Parte 2 (Set B - Extra)',
    subtitle: 'L\'Intelligenza Artificiale applicata al giornalismo moderno',
    instructions: 'Rispondi alle domande (23-28) scegliendo l\'unica opzione corretta in merito allo sviluppo editoriale.',
    audioDuration: '7:40',
    transcript: `Brano A: "Gli algoritmi generativi stanno rivoluzionando la velocità delle redazioni. Per articoli sportivi o bollettini meteo ripetitivi, l'AI scrive bozze eccellenti in un secondo, consentendo ai giornalisti di dedicarsi ad inchieste complesse. Però un rischio reale risiede nella proliferazione incontrollata di fake news verosimili: l'AI unisce informazioni slegate e le presenta con sicurezza indiscutibile, inducendo lettori distratti all'errore."

Brano B: "Nelle testate digitali si sperimenta l'ottimizzazione SEO automatica curata da software intelligenti. Questi software analizzano cosa le persone cercano sui motori di ricerca in tempo reale e modificano i titoli dei nostri scoop per aggregare più clic. È un'arma a doppio taglio: scaliamo Google velocemente, ma distruggiamo lo stile letterario e l'eleganza linguistica che da sempre contraddistinguono la nostra storica testata culturale."

Brano C: "Il vero spartiacque qualitativo del progresso editoriale risiede nella fiducia. I lettori pagano abbonamenti digitali non per leggere bollettini freddi, ma per l'opinione firmata da esperti che si assumono la responsabilità penale e morale di ciò che pubblicano. L’AI riproduce schemi passati del web, ma manca della capacità critica e del coraggio etico di denunciare gli abusi di potere."`,
    type: 'multiple-choice',
    items: [
      {
        id: 23,
        question: '23. Quale vantaggio arreca l\'uso iniziale dell\'AI generativa nelle notizie repentine?',
        options: [
          'A) Libera risorse e tempo affinché i redattori curino inchieste complesse.',
          'B) Garantisce la sparizione totale dei costi di segretariato d’azienda.',
          'C) Assicura l’assenza completa di errori morfosintattici nel testo finale.'
        ],
        correctAnswer: 'A',
        explanation: 'Il testo specifica che "l\'AI scrive bozze eccellenti in un secondo, consentendo ai giornalisti di dedicarsi ad inchieste complesse".'
      },
      {
        id: 24,
        question: '24. Quale temibile minaccia sociale è sollevata nel primo estratto (Brano A)?',
        options: [
          'A) La disoccupazione improvvisa di tutti i grafici impaginatori locali.',
          'B) La diffusione automatica di bufale e notizie fasulle verosimili.',
          'C) L’aumento dei prezzi dei quotidiani cartacei per i consumatori.'
        ],
        correctAnswer: 'B',
        explanation: 'Si menziona "la proliferazione incontrollata di fake news verosimili... inducendo lettori distratti all\'errore".'
      },
      {
        id: 25,
        question: '25. L\'impiego dell\'ottimizzazione SEO automatica nei titoli viene descritto come:',
        options: [
          'A) Un supporto indispensabile gradito a tutti i lettori d\'élite.',
          'B) Uno strumento che accresce la visibilità ma danneggia lo stile del giornale.',
          'C) Una truffa sanzionata formalmente dal sindacato nazionale dei giornalisti.'
        ],
        correctAnswer: 'B',
        explanation: 'Il Brano B diche che è un\'arma a doppio taglio: scala Google in fretta, "ma distrugge lo stile letterario e l\'eleganza linguistica".'
      },
      {
        id: 26,
        question: '26. Nel Brano B, qual è lo scopo iniziale della modifica automatica dei titoli?',
        options: [
          'A) Semplificare la comprensione per gli studenti stranieri di livello B1.',
          'B) Rendere i contenuti accattivanti e conformi ai volumi di ricerca internet.',
          'C) Ridurre il numero di pagine stampate per risparmiare cellulosa forestale.'
        ],
        correctAnswer: 'B',
        explanation: 'Il software "analizza cosa le persone cercano sui motori di ricerca e modifica i titoli per aggregare più clic".'
      },
      {
        id: 27,
        question: '27. Nel Brano C, perché i lettori motivati continuano a comprare abbonamenti digitali?',
        options: [
          'A) Perché desiderano leggere resoconti generati in modo automatico e asettico.',
          'B) Per godere delle analisi firmate e dell\'opinione autorevole di analisti reali.',
          'C) Per ricevere omaggi aziendali ed accumulazione di punti fedeltà.'
        ],
        correctAnswer: 'B',
        explanation: 'La fonte sottolinea che i lettori acquistano abbonamenti "per l’opinione firmata da esperti che si assumono la responsabilità penale e morale".'
      },
      {
        id: 28,
        question: '28. Quale lacuna essenziale caratterizza l’AI rispetto alla coscienza del giornalista?',
        options: [
          'A) L’incapacità totale di tradurre simultaneamente scritti in altre lingue straniere.',
          'B) La mancanza strutturale di capacità di critica e discernimento etico autonomo.',
          'C) L’impossibilità tecnica di organizzare archivi di dati statistici scolastici.'
        ],
        correctAnswer: 'B',
        explanation: 'L\'argomentazione dichiara che "l’AI riproduce schemi passati del web, ma manca della capacità critica e del coraggio etico".'
      }
    ]
  },
  {
    id: 'a7',
    title: 'Ascoltare Parte 3 (Set B - Extra)',
    subtitle: 'Enogastronomia biologica in Puglia',
    instructions: 'Ascolterai un coltivatari pugliese. Rispondi alle frasi (29-32) selezionando l\'opzione appropriata.',
    audioDuration: '5:55',
    transcript: `Intervistatore: "Siamo nella provincia di Bari con Giuseppe Colaianni, produttore d'olio extravergine d'oliva biologico. Giuseppe, molti ritengono che produrre bio sia solo una moda..."
Giuseppe: "La mia scelta biologica è avvenuta quindici anni fa, ben prima delle normative e degli incentivi europei attuali. Non è una moda, è una necessità agraria legata all’aridità del terreno pugliese. Se coltivi usando pesticidi aggressivi, a lungo termine inaridisci la terra, distruggi i microrganismi e rendi la pianta debolissima. Noi uniamo letame organico, pascolo di pecore e potatura manuale attenta dei rami secchi...
...La vera minaccia biologica recente riguarda la Xylella, che ha sterminato milioni di alberi monumentali nel Salento. Per fortuna i nostri alberi si sono rivelati resistenti al vettore perché dotati di difese immunitarie straordinarie nate proprio dalla salute organica del suolo non avvelenato chimicamente...
...Chiediamo ai consumatori di non farsi ingannare dall’olio venduto a cinque euro nei supermercati. Dietro ad un prezzo così sfacciatamente basso si nascondono pesticidi proibiti accumulati all'estero, miscele industriali di dubbia commestibilità e totale sfruttamento dei braccianti agricoli nei campi."`,
    type: 'multiple-choice',
    items: [
      {
        id: 29,
        question: '29. L’agricoltore Giuseppe Colaianni decise di passare ai metodi biologici:',
        options: [
          'A) Subito dopo aver ricevuto cospicui rimborsi finanziari da parte dell\'Unione Europea.',
          'B) Quindici anni fa, spinto da motivazioni di protezione ecologica della terra.',
          'C) In seguito ad una direttiva d’azienda emanata dal consorzio locale.'
        ],
        correctAnswer: 'B',
        explanation: 'Giuseppe precisa: "La mia scelta biologica è avvenuta quindici anni fa, ben prima delle normative e degli incentivi europei, come necessità legata al terreno".'
      },
      {
        id: 30,
        question: '30. Ad avviso del coltivatore, i diserbanti e trattamenti chimici pesanti:',
        options: [
          'A) Risolvono in via definitiva ed economica ogni malattia fitosanitaria della pianta.',
          'B) Compromettono la linfa vitale e inaridiscono il suolo nel lungo periodo.',
          'C) Costituiscono un requisito obbligatorio richiesto per vendere all\'estero.'
        ],
        correctAnswer: 'B',
        explanation: 'Dichiara apertamente: "Se coltivi usando pesticidi aggressivi, a lungo termine inaridisci la terra, distruggi i microrganismi e rendi la pianta debolissima".'
      },
      {
        id: 31,
        question: '31. Come hanno reagito le piante biologiche di Giuseppe all\'epidemia di Xylella?',
        options: [
          'A) Sono decedute rapidamente costringendolo a rifare gli scavi dei vivai ambientali e agricoli.',
          'B) Hanno mostrato una robustezza e resistenza grazie all\'equilibrio biologico del terreno.',
          'C) Hanno necessitato di pesanti iniezioni chimiche introdotte dall’intervistatore.'
        ],
        correctAnswer: 'B',
        explanation: 'Egli sottolinea che le sue piante si sono mostrate resistenti alla Xylella perché dotate di "difese immunitarie straordinarie nate proprio dalla salute organica del suolo".'
      },
      {
        id: 32,
        question: '32. Che implicazioni cela, a suo avviso, un olio d\'oliva acquistato ad un prezzo eccessivamente irrisorio?',
        options: [
          'A) Una straordinaria efficienza organizzativa dei supermercati di provincia.',
          'B) L’impiego di pesticidi illegittimi all’estero e lo sfruttamento sleale della manodopera.',
          'C) Una saggia politica di agevolazione fiscale promossa dalle banche meridionali.'
        ],
        correctAnswer: 'B',
        explanation: 'Giuseppe ammonisce che sotto un costo sfacciato "si nascondono pesticidi proibiti all’estero, miscele industriali di dubbia commestibilità e sfruttamento dei braccianti".'
      }
    ]
  },
  {
    id: 'a8',
    title: 'Ascoltare Parte 4 (Set B - Extra)',
    subtitle: 'La nascita della lingua italiana e il volgare illustre',
    instructions: 'Completa i fori (33-36) con le corrette attribuzioni storiche desunte dal testo.',
    audioDuration: '5:10',
    transcript: `Brano A: "La genesi dell'italiano moderno si fa tradizionalmente risalire al volgare fiorentino del Trecento, consacrato dai capolavori immortali di Dante, Petrarca e Boccaccio. Spesso però si obietta che questa era una lingua prettamente letteraria, d'élite, parlata da una frazione trascurabile di persone alla vigilia dell'Unità d'Italia nel 1861. Fu proprio l'unificazione politica, unita alla leva militare comune, all'emigrazione domestica verso le fabbriche del nord e soprattutto alla radiotelevisione nel secondo dopoguerra, a rendere la lingua nazionale un patrimonio verbale compreso e parlato stabilmente da tutti i ceti sociali."

Brano B: "A differenza dell'italiano letterario, i dialetti locali d'Italia non costituiscono varianti corrotte del fiorentino illustre, bensì lingue sorelle nate direttamente dalla frammentazione geografica del latino parlato (latino volgare). Molti dialetti possiedono grammatiche complesse e letterature gloriose come il napoletano, il veneziano o il siciliano della corte imperiale di Federico II di Svevia. Questo eccezionale bilinguismo storico rende l'Italia un ecosistema filologico unico in Europa occidentale, sebbene rischi oggi una parziale erosione a favore di un italiano standard intriso di forestierismi anglofoni."`,
    type: 'gap-match',
    items: [
      {
        id: 33,
        question: '33. L’influenza della ______ è stata decisiva nel secondo dopoguerra per nazionalizzare la lingua:',
        options: [
          'A) legislazione scolastica',
          'B) radiotelevisione pubblica',
          'C) emigrazione meridionale',
          'D) accademia letteraria',
          'E) stampa industriale',
          'F) diplomazia estera'
        ],
        correctAnswer: 'B',
        explanation: 'Il testo del Brano A dichiara che "soprattutto la radiotelevisione nel secondo dopoguerra" ha reso la lingua nazionale un bene nazionale comune.'
      },
      {
        id: 34,
        question: '34. All\'inizio dell\'Ottocento, la lingua letteraria comune era parlata solo da una ______ della popolazione:',
        options: [
          'A) maggioranza solida',
          'B) frazione trascurabile',
          'C) cerchia ecclesiastica',
          'D) armata straniera',
          'E) totalità di ceti scolastici',
          'F) minoranza militare'
        ],
        correctAnswer: 'B',
        explanation: 'Si menziona esplicitamente che prima del 1861 l\'italiano letterario "era parlato da una frazione trascurabile di persone".'
      },
      {
        id: 35,
        question: '35. I molteplici dialetti italiani si sono originati per evoluzione linguistica spontanea dal ______:',
        options: [
          'A) fiorentino antico della Scala',
          'B) latino volgare parlato',
          'C) siciliano della corte sveva',
          'D) francese d\'oil importato',
          'E) ligure medievale delle navi',
          'F) greco bizantino di Ravenna'
        ],
        correctAnswer: 'B',
        explanation: 'Nel Brano B si spiega che i dialetti locali d\'Italia sono "lingue sorelle nate direttamente dalla frammentazione geografica del latino parlato (latino volgare)".'
      },
      {
        id: 36,
        question: '36. Lo studio constata che il bilinguismo autoctono italiano è attualmente minacciato dall\'apporto di ______:',
        options: [
          'A) dialetti montani alpini',
          'B) forestierismi anglofoni',
          'C) regole grammaticali rigide',
          'D) testi scritti a mano',
          'E) romanzi storici classici',
          'F) riforme statali severe'
        ],
        correctAnswer: 'B',
        explanation: 'Il brano conclude sostenendo che la diversità filologica o bilinguismo "rischia oggi una parziale erosione a favore di un italiano standard intriso di forestierismi anglofoni".'
      }
    ]
  }
];

export const scriverePrompts: ScriverePrompt[] = [
  {
    id: 's1',
    title: 'Scrivere Prima Parte - Rapporto Statistico della Scuola',
    instructions: 'Scrivi un articolo tra 160 e 200 parole rivolto a un sito giovanile per presentare i risultati di un sondaggio somministrato a 80.000 millennial sul sistema scolastico italiano. Presenta i dati principali, evidenzia quelli più significativi, e proponi soluzioni.',
    minWords: 160,
    maxWords: 200,
    charts: [
      { name: 'Scolarizzazione equa', d_accordo: 5, parzial_accordo: 39, parzial_disaccordo: 30, disaccordo: 25 },
      { name: 'Preparazione al lavoro', d_accordo: 2, parzial_accordo: 24, parzial_disaccordo: 34, disaccordo: 39 },
      { name: 'Premiazione del merito', d_accordo: 4, parzial_accordo: 32, parzial_disaccordo: 35, disaccordo: 29 }
    ],
    sourcePromptText: `I dati del sondaggio su 80.000 Millennial indicano:
- Scolarizzazione: Il sistema scolastico garantisce uguali opportunità? Solo il 5% è totalmente d'accordo, il 39% parzialmente d'accordo, il 30% parzialmente in disaccordo, il 25% completamente in disaccordo.
- Preparazione al lavoro: Prepara egregiamente per il lavoro? 2% totalmente d'accordo, 24% parzialmente, 34% parzialmente in disaccordo, 39% totalmente contrari.
- Merito: Premia il merito? 4% totalmente d'accordo, 32% parzialmente d'accordo, 35% parzialmente in disaccordo, 29% totalmente in disaccordo.
- Sentimenti a scuola: 30% Felice, 27% Rispettato, 22% Solo, 20% Infelice, 19% Supportato, 14% Disprezzato.
- Chi deve pagare la formazione? 72% lo Stato, 28% lo studente lavoratore, 26% la famiglia, 14% le aziende, 7% un prestito.`
  },
  {
    id: 's2',
    title: 'Scrivere Seconda Parte - Traccia 1: Social Media ed Umberto Eco',
    instructions: 'Commenta in un post (160-200 parole) le affermazioni di Umberto Eco ("I social hanno dato la parola a legioni di imbecilli...") e Daniele Luttazzi ("Chi interviene è sia osservatore che osservato..."). Prendi posizione, esponi argomentazioni a favore o contro, e spiega come ripenseresti l\'uso dei social.',
    minWords: 160,
    maxWords: 200,
    sourcePromptText: `Post sul blog relativo a:
Umberto Eco: «I social media danno diritto di parola a legioni di imbecilli che prima parlavano solo al bar dopo un bicchiere di vino, senza danneggiare la collettività... ora hanno lo stesso diritto di parola di un Premio Nobel. È l’invasione degli imbecilli».
Daniele Luttazzi: «Chi interviene in un blog è osservatore e osservato. I suoi gusti sono monitorati sempre. La tua personalità viene trasferita interamente in Rete...».`
  },
  {
    id: 's3',
    title: 'Scrivere Prima Parte - Rapporto Mobilità Sostenibile (Set B)',
    instructions: 'Scrivi un saggio breve espositivo (160-200 parole) destinato ad una rivista di ecologia per commentare i dati di un recente sondaggio concernente l\'uso dei mezzi pubblici e di trasporto dolce (bici, monopattini, car-sharing) tra 50.000 cittadini europei.',
    minWords: 160,
    maxWords: 200,
    charts: [
      { name: 'Uso dei mezzi quotidiano', d_accordo: 15, parzial_accordo: 48, parzial_disaccordo: 22, disaccordo: 15 },
      { name: 'Piste ciclabili adeguate', d_accordo: 8, parzial_accordo: 21, parzial_disaccordo: 41, disaccordo: 30 },
      { name: 'Incentivi statali utili', d_accordo: 35, parzial_accordo: 45, parzial_disaccordo: 12, disaccordo: 8 }
    ],
    sourcePromptText: `Sondaggio Mobilità Alternativa (50.000 intervistati):
- Abitudini d'uso: Utilizzo quotidiano dei mezzi pubblici? 15% totalmente favorevole, 48% parzialmente favorevole, 22% parzialmente insoddisfatto, 15% contrario.
- Infrastrutture: Ritieni le piste ciclabili cittadine sicure? Solo l'8% concorda pienamente, il 21% parzialmente, il 41% ritiene vi siano gravi barriere di sicurezza, il 30% esprime assoluto dissenso.
- Interventi richiesti: Gli sgravi e acquisti eco-incentivati sono ritenuti efficaci? 35% d'accordo in toto, 45% parzialmente d'accordo, 12% parzialmente in disaccordo, 8% del tutto scettico.`
  },
  {
    id: 's4',
    title: 'Scrivere Seconda Parte - Traccia 2: AI ed Autorialità (Set B)',
    instructions: 'Scrivi un articolo argomentativo a commento dell\'impatto artistico dell\'intelligenza artificiale (160-200 parole). Valuta se le produzioni artificiali degradino la dignità dell\'ispirazione umana e come definiresti il diritto di autore nell\'ambito dell\'informazione tecnologica.',
    minWords: 160,
    maxWords: 200,
    sourcePromptText: `Riflessione critica sull\'autorialità artificiale e il diritto d\'autore:
- Argomenti contrari: Alcuni intellettuali sostengono che i generatori attingano senza consenso a miliardi di opere protette protette da diritto d'autore, depredando il sostentamento effettivo degli illustratori creativi.
- Argomenti favorevoli: Proponenti dell'ecosistema open-source reputano i modelli meri strumenti tecnologici ausiliari per espandere le capacità dell'artista, alla stregua dei pennelli digitali nel secolo scorso.`
  }
];

export const parlarePrompts: ParlarePrompt[] = [
  {
    id: 'p1',
    title: 'Parlare Competenza 1 - Scenari della Prima Pagina',
    subtitle: 'Interazione tra Candidati (B2 Parlare)',
    instructions: 'Lavorate nella redazione di un giornale locale. Dovete mettervi d\'accordo su quale articolo mettere in prima pagina scegliendo tra proposte diverse. Descrivi la tua opzione, argomenta sul perché è la più adatta per sponsor e lettori, e arriva ad un compromesso amichevole.',
    context: 'Lavori in una redazione di cronaca e devi confrontarti con idee contrastanti.',
    scenarios: [
      'Articolo A: "Il riscaldamento globale influenza la spesa della classe media" (La classe media limita i consumi per preoccupazioni ambientali).',
      'Articolo B: "I benefici della lettura: cosa succede veramente al cervello quando leggiamo."'
    ],
    bullets: [
      'Evidenzia perché il tema scelto sia di grande attualità.',
      'Dimostra come l\'argomento possa attirare sia lettori generici sia sponsor di valore.',
      'Sii collaborativo nei confronti dei suggerimenti della controparte.'
    ]
  },
  {
    id: 'p2',
    title: 'Parlare Competenza 2 - Richiesta Permesso Formazione',
    subtitle: 'Interazione Candidato e Intervistatore',
    instructions: 'Sei un dipendente d\'azienda e credi che partecipare ad un corso sia di vitale importanza. Cerca di persuadere il tuo capoufficio (l\'intervistatore) a concederti un permesso retribuito per completare lo studio.',
    context: 'Discussione con il capoufficio riguardante lo sviluppo professionale.',
    scenarios: [
      'Corso A: Comunicazione efficace e gestione dei conflitti nelle dinamiche relazionali.',
      'Corso B: WordPress e creazione contenuti autonomi sul web.',
      'Corso C: Analisi buste paga, contratti e amministrazione contabile (Paghe e contributi).'
    ],
    bullets: [
      'Presenta le caratteristiche chiave del corso prescelto.',
      'Spiega tecnicamente cosa imparerai e l\'impatto diretto sulla produttività aziendale.',
      'Argomenta sul perché l\'azienda debba concederti il tempo ed un compenso retribuito.'
    ]
  },
  {
    id: 'p3',
    title: 'Parlare Competenza 1 - La Destinazione della Gita (Set B)',
    subtitle: 'Interazione tra Studenti d\'Italiano',
    instructions: 'Devi concordare con i capi classe la meta della gita dell\'ultimo anno accademico. Discuti calorosamente ma amichevolmente, confrontando un itinerario d\'ecoturismo montano verde con un circuito storico delle città d\'arte toscane.',
    context: 'Riunione studentesca intrisa di entusiasmo e preferenze diverse.',
    scenarios: [
      'Meta A: Soggiorno ecologico nel Parco Nazionale del Gran Paradiso (escursioni a piedi, rifugi d’alta quota, impatto rifiuti zero).',
      'Meta B: Itinerario artistico a Siena, Lucca e San Gimignano (musei storici, patrimonio medievale, guide d\'archeologia dedicate).'
    ],
    bullets: [
      'Delinea i benefici naturalistici, economici o didattici della meta che preferisci.',
      'Fai leva sul budget ridotto e la sostenibilità di trasporto della scelta collettiva.',
      'Accetta un compromesso per integrare entrambe le anime del gruppo.'
    ]
  },
  {
    id: 'p4',
    title: 'Parlare Competenza 2 - Richiesta Sponsor Evento Culturale',
    subtitle: 'Interazione con l\'Amministratore Delegato',
    instructions: 'Sei il portavoce di un’associazione no-profit giovanile. Cerca di persuadere l\'Amministratore Delegato di un noto brand d\'abbigliamento (interpretato dall\'intervistatore) ad elargire fondi per sponsorizzare una mostra artistico-fotografica amatoriale sulle periferie.',
    context: 'Incontro formale d’affari volto a promuovere la Corporate Social Responsibility.',
    scenarios: [
      'Mostra A: "Sguardi Marginali" - Reportage fotografico amatoriale incentrato sui casermoni dei quartieri industriali.',
      'Mostra B: "Rigenerazione Urbana" - Progetti d’arte eseguiti da giovani graffitari locali.'
    ],
    bullets: [
      'Illustra sinteticamente il tema e l\'aspetto no-profit dell\'evento sul territorio.',
      'Spiega come l’associazione garantirà massima visibilità visuale e social al brand dello sponsor.',
      'Porgi formule di adesione personalizzate per sventare le obiezioni finanziarie d\'azienda.'
    ]
  }
];

export const grammarDrills: GrammarDrill[] = [
  {
    id: 'g1',
    category: 'Periodo Ipotetico',
    sentence: 'Se io ieri ti ________ (vedere), ti avrei salutato calorosamente.',
    options: ['avessi visto', 'vedessi', 'avrei visto', 'avessi veduto'],
    correctAnswer: 'avessi visto',
    explanation: 'Nel periodo ipotetico dell\'irrealtà nel passato (3° tipo), la protasi (la frase con "se") richiede il congiuntivo trapassato ("se avessi visto").'
  },
  {
    id: 'g2',
    category: 'Congiuntivo Imperfetto',
    sentence: 'Pensavo che voi non ________ (volere) partecipare alla conferenza di ieri.',
    options: ['voleste', 'vogliate', 'vorreste', 'aveste voluto'],
    correctAnswer: 'voleste',
    explanation: 'Con un verbo principale al passato ("Pensavo") che esprime opinione, per esprimere contemporaneità nel passato si usa il congiuntivo imperfetto ("voleste").'
  },
  {
    id: 'g3',
    category: 'Pronomi Combinati',
    sentence: 'Hai dato il libro a Marco? Sì, ________ ho dato stamattina.',
    options: ['glielo', 'melo', 'te lo', 'gliela'],
    correctAnswer: 'glielo',
    explanation: '"A lui" (gli) + "il libro" (lo) si fondono nel pronome combinato "glielo".'
  },
  {
    id: 'g4',
    category: 'Si Passivante',
    sentence: 'In Italia ________ (consumare) moltissimi kg di pasta ogni anno.',
    options: ['si consuma', 'si consumano', 'consumano', 'ci si consuma'],
    correctAnswer: 'si consumano',
    explanation: 'Dato che il soggetto logico "moltissimi kg di pasta" è plurale, anche il verbo con il "si passivante" deve accordarsi al plurale: "si consumano".'
  },
  {
    id: 'g5',
    category: 'Congiunzioni Subordinate',
    sentence: 'Ti presto volentieri i miei appunti a patto che tu me li ________ (restituire) domani.',
    options: ['restituisca', 'restituisci', 'restituissi', 'restituirai'],
    correctAnswer: 'restituisca',
    explanation: 'La locuzione congiuntiva condizionale "a patto che" richiede obbligatoriamente il modo congiuntivo presente ("restituisca").'
  },
  {
    id: 'g6',
    category: 'Periodo Ipotetico',
    sentence: 'Se oggi ci ________ (essere) il sole, andrei sicuramente in spiaggia.',
    options: ['fosse', 'sia', 'sarebbe', 'era'],
    correctAnswer: 'fosse',
    explanation: 'Nel periodo ipotetico della possibilità o irrealtà nel presente (2° tipo), la protasi richiede il congiuntivo imperfetto ("fosse"), accoppiato all\'infinito condizionale.'
  },
  {
    id: 'g7',
    category: 'Passivo con Andare',
    sentence: 'Le regole scolastiche ________ (andare / rispettare) da tutti gli alunni.',
    options: ['vanno rispettate', 'sono rispettate', 'andrebbero rispettate', 'vengono rispettate'],
    correctAnswer: 'vanno rispettate',
    explanation: 'L\'ausiliare "andare" + participio passato esprime un valore di dovere o obbligo ("le regole d\'oro devono essere rispettate" -> "vanno rispettate").'
  },
  {
    id: 'g8',
    category: 'Pronomi Combinati',
    sentence: 'Ti sei ricordata di comprare le mele? No, me ________ sono dimenticata completamente!',
    options: ['ne', 'le', 'di le', 'lo'],
    correctAnswer: 'ne',
    explanation: '"Dimenticarsi di qualcosa" regge il pronome partitivo/argomento "ne". Riflessivo "mi" diventa "me" davanti a "ne": "me ne sono dimenticata".'
  },
  {
    id: 'g9',
    category: 'Condizionale Passato',
    sentence: 'Ero sicuro che i miei amici ________ (arrivare) in orario alla cena.',
    options: ['sarebbero arrivati', 'saranno arrivati', 'fossero arrivati', 'arriverebbero'],
    correctAnswer: 'sarebbero arrivati',
    explanation: 'Per esprimere un "futuro nel passato" in italiano dopo un verbo principale al passato ("ero sicuro che"), si impiega il condizionale passato ("sarebbero arrivati").'
  },
  {
    id: 'g10',
    category: 'Gerundio Composto',
    sentence: '________ (finire) i compiti, Paolo uscì felicemente a giocare a calcio.',
    options: ['Avendo finito', 'Finendo', 'Avendo finiti', 'Essendo finito'],
    correctAnswer: 'Avendo finito',
    explanation: 'Per indicare un\'azione anteriore rispetto al verbo principale ("uscì"), si ricorre al gerundio composto attivo: ausiliare avere al gerundio ("avendo") + participio passato ("finito").'
  },
  {
    id: 'g11',
    category: 'Congiuntivo Passato',
    sentence: 'Dubito forte che loro ________ (ascoltare) l\'ordine impartito dal superiore.',
    options: ['abbiano ascoltato', 'ascoltino', 'ascoltassero', 'avessero ascoltato'],
    correctAnswer: 'abbiano ascoltato',
    explanation: 'La reggente che esprime incertezza / dubbio al presente ("Dubito") richiede il congiuntivo passato per esprimere anteriorità temporale ("abbiano ascoltato").'
  },
  {
    id: 'g12',
    category: 'Stare per + Infinito',
    sentence: 'Sbrigati! Il treno per Roma ________ (stare / partire) tra pochissimi istanti.',
    options: ['sta per partire', 'sta partendo', 'è partito', 'partirebbe'],
    correctAnswer: 'sta per partire',
    explanation: 'La perifrasi "stare per + infinito" esprime imminenza o un\'azione che si realizzerà nell\'immediato futuro ("sta per partire").'
  },
  {
    id: 'g13',
    category: 'Pronomi Relativi',
    sentence: 'La ragazza ________ (con cui) ho parlato ieri sera è una bravissima insegnante.',
    options: ['con cui', 'il cui', 'di cui', 'la quale'],
    correctAnswer: 'con cui',
    explanation: 'Il pronome relativo preceduto da preposizione ("con") richiede la forma "cui" (o "la quale") per riferirsi al termine "parlare con qualcuno".'
  },
  {
    id: 'g14',
    category: 'Infinitive Implicite',
    sentence: 'Credo proprio ________ (di avere / dimenticare) il portafoglio sulla scrivania.',
    options: ['di aver dimenticato', 'di avere dimenticare', 'ho dimenticato', 'che ho dimenticato'],
    correctAnswer: 'di aver dimenticato',
    explanation: 'In presenza di identità di soggetto (io credo + io ho dimenticato), si preferisce l\'infinita implicita introdotta dalla preposizione "di" + infinito passato ("di aver dimenticato").'
  },
  {
    id: 'g15',
    category: 'Espressioni Idiomatiche',
    sentence: 'Nonostante le difficoltà lavorative, noi ________ (farcela) a completare il progetto d\'esame.',
    options: ['ce l\'abbiamo fatta', 'ci abbiamo fatto', 'l\'abbiamo fatta', 've l\'abbiamo fatta'],
    correctAnswer: 'ce l\'abbiamo fatta',
    explanation: 'Il verbo pronominale idiomatico "farcela" (far + ci + la) esprime la riuscita di un compito. Al passato prossimo fa "ce l\'ho fatta", "ce l\'abbiamo fatta" col participio accordato al femminile "la".'
  },
  {
    id: 'g16',
    category: 'Accordo del Participio',
    sentence: 'Le bellissime foto che hai ________ (scattare) in Sicilia sono deliziose.',
    options: ['scattato', 'scattate', 'scattati', 'scattata'],
    correctAnswer: 'scattate',
    explanation: 'Il participio passato dei verbi coniugati con "avere" deve obbligatoriamente accordarsi in genere e numero col pronome relativo oggetto diretto ("che", riferito a "le foto", femminile plurale) che lo precede.'
  },
  {
    id: 'g17',
    category: 'Congiuntivo Trapassato',
    sentence: 'Magari noi ________ (sapere) prima la verità! Avremmo evitato quella spiacevole discussione.',
    options: ['avessimo saputo', 'sapessimo', 'abbiamo saputo', 'saremmo saputi'],
    correctAnswer: 'avessimo saputo',
    explanation: 'Nelle frasi desiderative indipendenti ("Magari...!") volte ad esprimere un forte rammarico irrealizzabile riferito al passato, si impiega tassativamente il congiuntivo trapassato ("avessimo saputo").'
  },
  {
    id: 'g18',
    category: 'Pronomi Combinati',
    sentence: 'Vi piacciono i cioccolatini? Sì, ________ spediamo un pacco intero domani.',
    options: ['ve ne', 'vene', 'celi', 'sene'],
    explanation: 'La fusione di "a voi" (vi -> ve) + "di essi/da essi" (ne) genera il pronome combinato "ve ne" per trasmettere l\'idea di "di essi cioccolatini vi invieremo un pacco".',
    correctAnswer: 've ne'
  },
  {
    id: 'g19',
    category: 'Passivo con Venire',
    sentence: 'Il nuovo palazzo comunale ________ (venire / progettare) da un team di giovani architetti.',
    options: ['viene progettato', 'ha progettato', 'è progettato', 'fu progettando'],
    correctAnswer: 'viene progettato',
    explanation: 'La forma passiva costruita con "venire" sostituisce convenientemente la forma con "essere" senza variarne il significato temporale continuo ("viene progettato" = "è progettato").'
  },
  {
    id: 'g20',
    category: 'Preposizioni Articolate',
    sentence: 'I ragazzi si sono seduti pigramente ________ (su + il) muretto di mattoni rossi.',
    options: ['sul', 'sullo', 'su il', 'sulla'],
    correctAnswer: 'sul',
    explanation: 'La preposizione semplice "su" fusa con l\'articolo determinativo maschile singolare davanti a consonante regolare ("il") dà origine alla preposizione articolata flessa "sul".'
  },
  {
    id: 'g21',
    category: 'Espressioni con "Ne"',
    sentence: 'Sei arrabbiato con Paola? No, non me ________ importa più nulla.',
    options: ['ne', 'lo', 'le', 'ci'],
    correctAnswer: 'ne',
    explanation: 'Il verbo pronominale "importarsi di qualcosa" regge l\'uso del pronome clitico di argomento "ne" ("importarsene di qualcosa" -> "non me ne importa nulla").'
  },
  {
    id: 'g22',
    category: 'Congiuntivo Imperfetto',
    sentence: 'Benché ________ (piovere) a dirotto, siamo andati a correre nel parco comunale.',
    options: ['piovesse', 'pioveva', 'piova', 'avesse piovuto'],
    correctAnswer: 'piovesse',
    explanation: 'La congiunzione concessiva subordinante "benché" regge obbligatoriamente il modo congiuntivo. Per indicare contemporaneità nel passato in rapporto ad una principale al passato ("siamo andati") si adopera il congiuntivo imperfetto ("piovesse").'
  },
  {
    id: 'g23',
    category: 'Futuro Anteriore',
    sentence: 'Appena ________ (finire) l\'esame PLIDA B2, festeggeremo tutta la notte.',
    options: ['avrò finito', 'finirò', 'avessi finito', 'ho finito'],
    correctAnswer: 'avrò finito',
    explanation: 'Nelle temporali introdotte da congiunzioni come "appena" o "quando", si ricorre al futuro anteriore ("avrò finito") per designare un\'azione futura anteriore ad un\'altra anch\'essa futura ("festeggeremo").'
  },
  {
    id: 'g24',
    category: 'Aggettivi Indefiniti',
    sentence: '________ (qualunque) decisione tu prenda, sarò sempre al tuo fianco ad aiutarti.',
    options: ['Qualunque', 'Qualsiasi', 'Nessuno', 'Qualche'],
    correctAnswer: 'Qualunque',
    explanation: 'L\'aggettivo indefinito invariabile "qualunque" significa "qualsiasi sia" ed è preposto al sostantivo singolare di riferimento con valore concessivo subordinato.'
  }
];
