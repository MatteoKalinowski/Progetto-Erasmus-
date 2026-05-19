const databaseModelli = {
    'Mac': [
        'MacBook Pro 14" / 16" (Chip M1/M2/M3)',
        'MacBook Pro 13" (Modelli Touch Bar / M1 / M2)',
        'MacBook Air (Chip M1 / M2 / M3)',
        'MacBook Air (Modelli Intel Retina)',
        'iMac 24" (Chip Apple Silicon)',
        'iMac 21.5" / 27" (Modelli Intel)',
        'Mac Mini / Mac Studio / Mac Pro'
    ],
    'iPhone': [
        'iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max',
        'iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max',
        'iPhone 13 / 13 Mini / 13 Pro / 13 Pro Max',
        'iPhone 12 / 12 Mini / 12 Pro / 12 Pro Max',
        'iPhone 11 / 11 Pro / 11 Pro Max',
        'iPhone SE (Seconda e Terza Generazione)',
        'iPhone X / XS / XR / XS Max'
    ],
    'iPad': [
        'iPad Pro (Tutte le generazioni)',
        'iPad Air (Chip M1 / Generazioni precedenti)',
        'iPad Classico (9a / 10a Generazione)',
        'iPad Mini'
    ],
    'Watch': [
        'Apple Watch Ultra / Ultra 2',
        'Apple Watch Series 7 / 8 / 9',
        'Apple Watch Series 4 / 5 / 6',
        'Apple Watch SE'
    ]
};

// 2. GESTIONE DELLA NAVIGAZIONE FRA LE PAGINE (SPA)
function switchPage(pageId) {
    // Aggiorna lo stato dei link di navigazione
    const links = document.querySelectorAll('.nav-menu .nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Mostra la sezione corretta nascondendo le altre
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active-section'));
   
    const targetSection = document.getElementById(`page-${pageId}`);
    if (targetSection) {
        targetSection.classList.add('active-section');
        // Scorrimento fluido verso l'alto all'apertura di una nuova pagina
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Associa l'evento click ai link di navigazione
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            switchPage(page);
        });
    });

    // Inizializza i listener per i box grafici delle categorie al Passo 1
    const categoryBoxes = document.querySelectorAll('.selection-box');
    categoryBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const categoria = box.getAttribute('data-category');
            impostaCategoriaRiparazione(categoria);
        });
    });

    // Rendi cliccabili gli interi blocchi checkbox per facilitare l'uso
    const checkboxGroups = document.querySelectorAll('.checkbox-group');
    checkboxGroups.forEach(group => {
        group.addEventListener('click', (e) => {
            // Impedisce il doppio click se si preme direttamente sull'input input
            if (e.target.tagName !== 'INPUT') {
                const checkId = group.getAttribute('data-checkbox');
                const checkbox = document.getElementById(checkId);
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
            }
        });
    });

    // Listener per l'invio finale del modulo
    const form = document.getElementById('repairForm');
    if (form) {
        form.addEventListener('submit', gestisciInvioForm);
    }
});

// Funzione rapida usata dalle pagine dei singoli prodotti per saltare al modulo
function openRiparazioneConCategoria(nomeCategoria) {
    switchPage('servizi');
    impostaCategoriaRiparazione(nomeCategoria);
    nextStep(2);
}

// 3. LOGICA DEL WIZARD (MODULO GUIDATO)
function impostaCategoriaRiparazione(categoria) {
    document.getElementById('selectedCategory').value = categoria;
   
    // Aggiorna l'aspetto visivo dei box (rimuove selezione precedente e aggiunge la nuova)
    const boxes = document.querySelectorAll('.selection-box');
    boxes.forEach(box => {
        box.classList.remove('selected');
        if (box.getAttribute('data-category') === categoria) {
            box.classList.add('selected');
        }
    });

    // Svuota e ripopola dinamicamente la lista del Passo 2
    const selectModelli = document.getElementById('deviceModel');
    const labelModelli = document.getElementById('modelLabel');
   
    labelModelli.innerText = `Seleziona il modello specifico di ${categoria}:`;
    selectModelli.innerHTML = '<option value="">-- Seleziona un modello dalla lista --</option>';
   
    if (databaseModelli[categoria]) {
        databaseModelli[categoria].forEach(modello => {
            const opzione = document.createElement('option');
            opzione.value = modello;
            opzione.textContent = modello;
            selectModelli.appendChild(opzione);
        });
    }
}

// Navigazione in Avanti con controlli e verifiche intuitive
function nextStep(prossimoStep) {
    // Validazione Passo 1: Verifica che sia stata scelta una categoria
    if (prossimoStep === 2) {
        const catScelta = document.getElementById('selectedCategory').value;
        if (!catScelta) {
            alert('Per favore, seleziona prima una delle categorie di dispositivi per continuare.');
            return;
        }
    }
    // Validazione Passo 2: Verifica che sia stato scelto un modello specifico
    if (prossimoStep === 3) {
        const modelloScelto = document.getElementById('deviceModel').value;
        if (!modelloScelto) {
            alert('Seleziona il modello specifico del tuo dispositivo per andare avanti.');
            return;
        }
    }

    mostraStepSpecifico(prossimoStep);
}

// Navigazione all'Indietro semplice
function prevStep(stepPrecedente) {
    mostraStepSpecifico(stepPrecedente);
}

// Cambia la visualizzazione delle schede interne del modulo e aggiorna la barra di avanzamento
function mostraStepSpecifico(numeroStep) {
    // Nascondi tutti i passi del modulo
    const steps = document.querySelectorAll('.wizard-step');
    steps.forEach(st => st.classList.remove('active-step'));

    // Mostra quello selezionato
    document.getElementById(`w-step-${numeroStep}`).classList.add('active-step');

    // Aggiorna lo stato visivo dei testi di avanzamento in alto
    for (let i = 1; i <= 4; i++) {
        const elementoProgresso = document.getElementById(`p-step-${i}`);
        if (i === numeroStep) {
            elementoProgresso.className = 'progress-step active';
        } else if (i < numeroStep) {
            elementoProgresso.className = 'progress-step completed';
        } else {
            elementoProgresso.className = 'progress-step';
        }
    }
}

// Organizza le informazioni inserite e compone la finestra di riepilogo
function preparaRiepilogoContatti() {
    const categoria = document.getElementById('selectedCategory').value;
    const modello = document.getElementById('deviceModel').value;
   
    // Raccoglie i problemi spuntati
    let elencoProblemi = [];
    for (let i = 1; i <= 4; i++) {
        const cb = document.getElementById(`prob${i}`);
        if (cb && cb.checked) {
            elencoProblemi.push(cb.value);
        }
    }
   
    // Controlla se c'è testo scritto nel campo libero "altro"
    const testoAltro = document.getElementById('probAltro').value.trim();
    if (testoAltro) {
        elencoProblemi.push(`Altro problema descritto: "${testoAltro}"`);
    }

    // Blocca se l'utente non ha inserito o spuntato alcun problema
    if (elencoProblemi.length === 0) {
        alert('Seleziona almeno un problema comune o descrivilo nel campo di testo per continuare.');
        return;
    }

    // Inserisce i dati nel box riepilogativo finale
    document.getElementById('sumDevice').innerHTML = `<strong>Dispositivo scelto:</strong> ${categoria} — ${modello}`;
    document.getElementById('sumProblems').innerHTML = `<strong>Problemi selezionati:</strong> ${elencoProblemi.join(', ')}`;

    // Passa all'ultimo step dei dati personali
    nextStep(4);
}

// Gestione dell'invio del modulo
function gestisciInvioForm(event) {
    event.preventDefault(); // Blocca l'invio effettivo al server per la simulazione
   
    const nomeCliente = document.getElementById('clientName').value;
   
    // Finestra di conferma chiara e amichevole per l'utente
    alert(`Grazie per la richiesta, ${nomeCliente}!
I tecnici di OrangeFix hanno preso in carico la tua segnalazione. Ti risponderemo tramite email o telefono entro un'ora.`);
   
    // Svuota i campi e ripulisce le selezioni effettuate
    document.getElementById('repairForm').reset();
    document.getElementById('selectedCategory').value = '';
   
    const boxes = document.querySelectorAll('.selection-box');
    boxes.forEach(box => box.classList.remove('selected'));
   
    // Riporta il modulo al Passo 1 e rimanda l'utente alla Home Page
    mostraStepSpecifico(1);
    switchPage('home');
}