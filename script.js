const modelsDatabase = {
    'Mac': [
        'MacBook Pro 14" / 16" (M1/M2/M3 Chip)',
        'MacBook Pro 13" (Touch Bar / M1 / M2 Models)',
        'MacBook Air (M1 / M2 / M3 Chip)',
        'MacBook Air (Intel Retina Models)',
        'iMac 24" (Apple Silicon Chip)',
        'iMac 21.5" / 27" (Intel Models)',
        'Mac Mini / Mac Studio / Mac Pro'
    ],
    'iPhone': [
        'iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max',
        'iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max',
        'iPhone 13 / 13 Mini / 13 Pro / 13 Pro Max',
        'iPhone 12 / 12 Mini / 12 Pro / 12 Pro Max',
        'iPhone 11 / 11 Pro / 11 Pro Max',
        'iPhone SE (2nd & 3rd Generation)',
        'iPhone X / XS / XR / XS Max'
    ],
    'iPad': [
        'iPad Pro (All generations)',
        'iPad Air (M1 Chip / Previous generations)',
        'iPad Classic (9th / 10th Generation)',
        'iPad Mini'
    ],
    'Watch': [
        'Apple Watch Ultra / Ultra 2',
        'Apple Watch Series 7 / 8 / 9',
        'Apple Watch Series 4 / 5 / 6',
        'Apple Watch SE'
    ]
};

// 2. PAGE NAVIGATION MANAGEMENT (SPA System Engine)
function switchPage(pageId) {
    // Corrected target selector to match bootstrap navbar container architecture
    const links = document.querySelectorAll('.navbar-nav .nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Handle structural display of single page layout views
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active-section'));

    const targetSection = document.getElementById(`page-${pageId}`);
    if (targetSection) {
        targetSection.classList.add('active-section');
        // Smooth scroll animation to viewport top layout
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Global Document Layout Loader Initializer
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            switchPage(page);
        });
    });

    // Step 1 Category Box Activation Matrix
    const categoryBoxes = document.querySelectorAll('.selection-box');
    categoryBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const category = box.getAttribute('data-category');
            setRepairCategory(category);
        });
    });

    // Checkbox block operational functionality alignment + Active style synchronization
    const checkboxGroups = document.querySelectorAll('.checkbox-group');
    checkboxGroups.forEach(group => {
        group.addEventListener('click', (e) => {
            const checkId = group.getAttribute('data-checkbox');
            const checkbox = document.getElementById(checkId);

            if (e.target.tagName !== 'INPUT') {
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    group.classList.toggle('selected', checkbox.checked);
                }
            } else {
                group.classList.toggle('selected', checkbox.checked);
            }
        });
    });

    // Form Interceptor Handling Integration 
    const form = document.getElementById('repairForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

// Deep redirection automation from explicit marketing components straight into wizard configuration
function openRepairWithCategory(categoryName) {
    switchPage('services');
    setRepairCategory(categoryName);
    nextStep(2);
}

// 3. WIZARD INTERACTIVE ENGINE PIPELINE
function setRepairCategory(category) {
    document.getElementById('selectedCategory').value = category;

    const boxes = document.querySelectorAll('.selection-box');
    boxes.forEach(box => {
        box.classList.remove('selected');
        if (box.getAttribute('data-category') === category) {
            box.classList.add('selected');
        }
    });

    // Clear and build the dynamic option elements on runtime view updates
    const selectModels = document.getElementById('deviceModel');
    const labelModels = document.getElementById('modelLabel');

    labelModels.innerText = `Select the specific model for your ${category}:`;
    selectModels.innerHTML = '<option value="">-- Select a model from the list --</option>';

    if (modelsDatabase[category]) {
        modelsDatabase[category].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            selectModels.appendChild(option);
        });
    }
}

// Verification Gatewards before step forward updates are completed
function nextStep(nextStepNumber) {
    if (nextStepNumber === 2) {
        const chosenCategory = document.getElementById('selectedCategory').value;
        if (!chosenCategory) {
            alert('Please select a device category to continue.');
            return;
        }
    }
    if (nextStepNumber === 3) {
        const chosenModel = document.getElementById('deviceModel').value;
        if (!chosenModel) {
            alert('Please select the specific model of your device to proceed.');
            return;
        }
    }

    showSpecificStep(nextStepNumber);
}
function toggleCardVisibility(id, value) {
    const el = document.getElementById(id).parentElement;
    el.style.display = (value === "€ 0") ? "none" : "block";
}

function prevStep(prevStepNumber) {
    showSpecificStep(prevStepNumber);
}

// Core rendering mechanics for current process steps and top wizard progress state
function showSpecificStep(stepNumber) {
    const steps = document.querySelectorAll('.wizard-step');
    steps.forEach(st => st.classList.remove('active-step'));

    document.getElementById(`w-step-${stepNumber}`).classList.add('active-step');

    for (let i = 1; i <= 4; i++) {
        const progressElement = document.getElementById(`p-step-${i}`);
        if (progressElement) {
            if (i === stepNumber) {
                progressElement.className = 'progress-step active fw-bold px-3 py-1 rounded text-orange';
            } else if (i < stepNumber) {
                progressElement.className = 'progress-step completed fw-bold px-3 py-1 rounded text-success';
            } else {
                progressElement.className = 'progress-step fw-bold px-3 py-1 rounded text-muted';
            }
        }
    }
}

// Ticket confirmation generator engine assembling form details
function prepareContactSummary() {
    const category = document.getElementById('selectedCategory').value;
    const model = document.getElementById('deviceModel').value;

    let selectedIssues = [];
    // Corrected bug from index.html IDs reference targeting (issue instead of prob)
    for (let i = 1; i <= 4; i++) {
        const cb = document.getElementById(`issue${i}`);
        if (cb && cb.checked) {
            selectedIssues.push(cb.value);
        }
    }

    const otherText = document.getElementById('issueOther').value.trim();
    if (otherText) {
        selectedIssues.push(`Other issue: "${otherText}"`);
    }

    if (selectedIssues.length === 0) {
        alert('Please select at least one common issue or describe it in the text field to continue.');
        return;
    }

    document.getElementById('sumDevice').innerHTML = `<strong>Selected Device:</strong> ${category} — ${model}`;
    document.getElementById('sumProblems').innerHTML = `<strong>Reported Issues:</strong> ${selectedIssues.join(', ')}`;

    nextStep(4);
}

// Verification simulation output processing execution
function handleFormSubmit(event) {
    event.preventDefault();

    const clientName = document.getElementById('clientName').value;

    alert(`Thank you for your request, ${clientName}!
The OrangeFix technical team has received your ticket. We will get back to you via email or phone within an hour.`);

    // Cleaning structure data logs reset operations
    document.getElementById('repairForm').reset();
    document.getElementById('selectedCategory').value = '';

    const boxes = document.querySelectorAll('.selection-box');
    boxes.forEach(box => box.classList.remove('selected'));

    const checkboxGroups = document.querySelectorAll('.checkbox-group');
    checkboxGroups.forEach(group => group.classList.remove('selected'));

    showSpecificStep(1);
    switchPage('home');
}

const priceData = {
    iphone: {
        iphone15pm: { swap: "€ 799", screen: "€ 439", battery: "€ 109", camera: "€ 249", backglass: "€ 229", faceid: "€ 299" },
        iphone15p: { swap: "€ 749", screen: "€ 399", battery: "€ 109", camera: "€ 219", backglass: "€ 199", faceid: "€ 279" },
        iphone15: { swap: "€ 649", screen: "€ 319", battery: "€ 109", camera: "€ 189", backglass: "€ 169", faceid: "€ 249" }
    },

    mac: {
        macbookpro: { swap: "€ 1299", screen: "€ 599", battery: "€ 249", camera: "€ 0", backglass: "€ 0", faceid: "€ 0" },
        macbookair: { swap: "€ 999", screen: "€ 499", battery: "€ 199", camera: "€ 0", backglass: "€ 0", faceid: "€ 0" },
        imac: { swap: "€ 1199", screen: "€ 699", battery: "€ 0", camera: "€ 0", backglass: "€ 0", faceid: "€ 0" }
    },

    ipad: {
        ipadpro: { swap: "€ 899", screen: "€ 399", battery: "€ 179", camera: "€ 199", backglass: "€ 199", faceid: "€ 0" },
        ipadair: { swap: "€ 699", screen: "€ 299", battery: "€ 149", camera: "€ 149", backglass: "€ 149", faceid: "€ 0" }
    },

    watch: {
        series9: { swap: "€ 499", screen: "€ 249", battery: "€ 129", camera: "€ 0", backglass: "€ 199", faceid: "€ 0" },
        ultra2: { swap: "€ 699", screen: "€ 349", battery: "€ 179", camera: "€ 0", backglass: "€ 249", faceid: "€ 0" }
    }
};

function updatePriceModels() {
    const category = document.getElementById("priceCategorySelect").value;
    const modelSelect = document.getElementById("priceModelSelect");

    modelSelect.innerHTML = "";

    Object.keys(priceData[category]).forEach(model => {
        const option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });

    updatePriceLayoutData();
}

function updatePriceLayoutData() {
    const category = document.getElementById("priceCategorySelect").value;
    const model = document.getElementById("priceModelSelect").value;

    const data = priceData[category][model];

    if (!data) return;

    document.getElementById("cost-swap").innerText = data.swap;
    document.getElementById("cost-screen").innerText = data.screen;
    document.getElementById("cost-battery").innerText = data.battery;
    document.getElementById("cost-camera").innerText = data.camera;
    document.getElementById("cost-backglass").innerText = data.backglass;
    document.getElementById("cost-faceid").innerText = data.faceid;
}

document.addEventListener("DOMContentLoaded", function () {
    updatePriceModels();
});

// Esecuzione immediata al caricamento per non lasciare campi vuoti
document.addEventListener("DOMContentLoaded", function () {
    updatePriceLayoutData();
});