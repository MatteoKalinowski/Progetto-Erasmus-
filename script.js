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

const shopDevices = {
    iphone: [
        { name: "iPhone 15 Pro Max", price: 1499 },
        { name: "iPhone 15 Pro", price: 1299 },
        { name: "iPhone 15", price: 999 },
        { name: "iPhone 14 Pro", price: 1199 },
        { name: "iPhone 14", price: 899 },
        { name: "iPhone 13", price: 799 }
    ],
    mac: [
        { name: "MacBook Pro M3 Max 16”", price: 3499 },
        { name: "MacBook Pro M3 Pro 14”", price: 2499 },
        { name: "MacBook Air M2", price: 1299 },
        { name: "iMac 24” M3", price: 1799 }
    ],
    ipad: [
        { name: "iPad Pro M4", price: 1399 },
        { name: "iPad Air M2", price: 799 },
        { name: "iPad 10th Gen", price: 449 }
    ],
    watch: [
        { name: "Apple Watch Ultra 2", price: 899 },
        { name: "Apple Watch Series 9", price: 499 },
        { name: "Apple Watch SE", price: 299 }
    ],
    airpods: [
        { name: "AirPods Pro 2", price: 279 },
        { name: "AirPods 3rd Gen", price: 199 },
        { name: "AirPods Max", price: 579 }
    ]
};

function switchPage(pageId) {
    const links = document.querySelectorAll('.navbar-nav .nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active-section'));
    const target = document.getElementById(`page-${pageId}`);
    if (target) {
        target.classList.add('active-section');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (pageId === "upcoming") initShopDevices();
    if (pageId === "cables") initCablesShop();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage(link.getAttribute('data-page'));
        });
    });
    document.querySelectorAll('.selection-box').forEach(box => {
        box.addEventListener('click', () => {
            setRepairCategory(box.getAttribute('data-category'));
        });
    });
    const form = document.getElementById('repairForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    const categorySelect = document.getElementById("priceCategorySelect");
    const modelSelect = document.getElementById("priceModelSelect");
    if (categorySelect) {
        categorySelect.addEventListener("change", updatePriceModels);
    }
    if (modelSelect) {
        modelSelect.addEventListener("change", updatePriceLayoutData);
    }
});

function initShopDevices() {
    const container = document.getElementById("page-upcoming");
    if (!container) return;

    const grid = container.querySelector(".row");
    if (!grid) return;

    let html = "";

    Object.keys(shopDevices).forEach(cat => {
        shopDevices[cat].forEach(product => {
            html += `
            <div class="col-md-4">
                <div class="card h-100 p-4 shadow-sm text-center">
                    <h3 class="fw-bold">${product.name}</h3>
                    <p class="text-muted">Original Apple device with warranty and premium quality.</p>
                    <div class="fs-3 fw-bold text-orange mb-3">€${product.price}</div>
                    <button class="btn btn-orange w-100">Buy Now</button>
                </div>
            </div>`;
        });
    });
    grid.innerHTML = html;
}


function initCablesShop() {
    const container = document.getElementById("page-cables");
    if (!container) return;

    const grid = container.querySelector(".row");
    if (!grid) return;

    let html = "";

    Object.values(cablesShop).forEach(cable => {
        html += `
        <div class="col-md-4">
            <div class="card h-100 p-4 shadow-sm text-center">
            <img src="${cable.image}" alt="${cable.name}" class="img-fluid">
                <h3 class="fw-bold">${cable.name}</h3>
                <p class="text-muted">Apple certified high quality accessory.</p>
                <div class="fs-3 fw-bold text-orange mb-3">€${cable.price}</div>
                <button class="btn btn-orange w-100">Buy Now</button>
            </div>
        </div>`;
    });
    grid.innerHTML = html;
}

function setRepairCategory(category) {
    document.getElementById('selectedCategory').value = category;

    const selectModels = document.getElementById('deviceModel');
    const label = document.getElementById('modelLabel');

    label.innerText = `Select model for ${category}`;
    selectModels.innerHTML = "";

    if (modelsDatabase[category]) {
        modelsDatabase[category].forEach(m => {
            const opt = document.createElement("option");
            opt.value = m;
            opt.textContent = m;
            selectModels.appendChild(opt);
        });
    }
}

function updatePriceModels() {
    const category = document.getElementById("priceCategorySelect").value;
    const modelSelect = document.getElementById("priceModelSelect");
    modelSelect.innerHTML = "";

    if (!category || !priceData[category]) {
        const placeholder = document.createElement("option");
        placeholder.textContent = "Select Model";
        placeholder.disabled = true;
        placeholder.selected = true;
        modelSelect.appendChild(placeholder);
        return;
    }

    const models = Object.keys(priceData[category]);
    models.forEach((model, index) => {
        const opt = document.createElement("option");
        opt.value = model;
        opt.textContent = model;
        if (index === 0) {
            opt.selected = true;
        }
        modelSelect.appendChild(opt);
    });
    updatePriceLayoutData();
}

function updatePriceLayoutData() {
    const category = document.getElementById("priceCategorySelect").value;
    const model = document.getElementById("priceModelSelect").value;

    const data = priceData[category][model];

    updatePriceField("cost-swap", data.swap);
    updatePriceField("cost-screen", data.screen);
    updatePriceField("cost-battery", data.battery);
    updatePriceField("cost-camera", data.camera);
    updatePriceField("cost-backglass", data.backglass);
    updatePriceField("cost-faceid", data.faceid);
}

function updatePriceField(id, value) {
    const element = document.getElementById(id);
    if (value === null || value === undefined) {
        element.innerHTML = `
            <span class="not-available">
                Not Available
            </span>
        `;
    } else {
        element.innerHTML = value;
    }
}

const priceData = {
    iphone: {
        'iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max': {
            swap: "€ 799",
            screen: "€ 439",
            battery: "€ 109",
            camera: "€ 249",
            backglass: "€ 229",
            faceid: "€ 299"
        },
        'iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max': {
            swap: "€ 699",
            screen: "€ 399",
            battery: "€ 99",
            camera: "€ 219",
            backglass: "€ 199",
            faceid: "€ 279"
        },
        'iPhone 13 / 13 Mini / 13 Pro / 13 Pro Max': {
            swap: "€ 649",
            screen: "€ 349",
            battery: "€ 95",
            camera: "€ 199",
            backglass: "€ 179",
            faceid: "€ 249"
        },
        'iPhone 12 / 12 Mini / 12 Pro / 12 Pro Max': {
            swap: "€ 599",
            screen: "€ 299",
            battery: "€ 89",
            camera: "€ 179",
            backglass: "€ 159",
            faceid: "€ 229"
        },
        'iPhone 11 / 11 Pro / 11 Pro Max': {
            swap: "€ 499",
            screen: "€ 249",
            battery: "€ 79",
            camera: "€ 149",
            backglass: "€ 139",
            faceid: "€ 199"
        },
        'iPhone SE (2nd & 3rd Generation)': {
            swap: "€ 349",
            screen: "€ 149",
            battery: "€ 69",
            camera: "€ 119",
            backglass: null,
            faceid: null
        },
        'iPhone X / XS / XR / XS Max': {
            swap: "€ 399",
            screen: "€ 219",
            battery: "€ 79",
            camera: "€ 129",
            backglass: "€ 119",
            faceid: "€ 179"
        }
    },


    mac: {
        'MacBook Pro 14" / 16" (M1/M2/M3 Chip)': {
            swap: "€ 1299",
            screen: "€ 599",
            battery: "€ 249",
            camera: null,
            backglass: null,
            faceid: null
        },
        'MacBook Pro 13" (Touch Bar / M1 / M2 Models)': {
            swap: "€ 1099",
            screen: "€ 499",
            battery: "€ 229",
            camera: null,
            backglass: null,
            faceid: null
        },
        'MacBook Air (M1 / M2 / M3 Chip)': {
            swap: "€ 999",
            screen: "€ 449",
            battery: "€ 199",
            camera: null,
            backglass: null,
            faceid: null
        },
        'MacBook Air (Intel Retina Models)': {
            swap: "€ 799",
            screen: "€ 399",
            battery: "€ 179",
            camera: null,
            backglass: null,
            faceid: null
        },
        'iMac 24" (Apple Silicon Chip)': {
            swap: "€ 1199",
            screen: "€ 699",
            battery: null,
            camera: null,
            backglass: null,
            faceid: null
        },
        'iMac 21.5" / 27" (Intel Models)': {
            swap: "€ 999",
            screen: "€ 649",
            battery: null,
            camera: null,
            backglass: null,
            faceid: null
        },
        'Mac Mini / Mac Studio / Mac Pro': {
            swap: "€ 1499",
            screen: null,
            battery: null,
            camera: null,
            backglass: null,
            faceid: null
        }
    },

    ipad: {
        'iPad Pro (All generations)': {
            swap: "€ 899",
            screen: "€ 399",
            battery: "€ 179",
            camera: "€ 199",
            backglass: null,
            faceid: "€ 199"
        },
        'iPad Air (M1 Chip / Previous generations)': {
            swap: "€ 699",
            screen: "€ 299",
            battery: "€ 149",
            camera: "€ 149",
            backglass: null,
            faceid: null
        },
        'iPad Classic (9th / 10th Generation)': {
            swap: "€ 499",
            screen: "€ 219",
            battery: "€ 119",
            camera: "€ 99",
            backglass: null,
            faceid: null
        },
        'iPad Mini': {
            swap: "€ 599",
            screen: "€ 249",
            battery: "€ 129",
            camera: "€ 119",
            backglass: null,
            faceid: null
        }
    },

    watch: {
        'Apple Watch Ultra / Ultra 2': {
            swap: "€ 699",
            screen: "€ 349",
            battery: "€ 179",
            camera: null,
            backglass: null,
            faceid: null
        },
        'Apple Watch Series 7 / 8 / 9': {
            swap: "€ 499",
            screen: "€ 249",
            battery: "€ 129",
            camera: null,
            backglass: null,
            faceid: null
        },
        'Apple Watch Series 4 / 5 / 6': {
            swap: "€ 399",
            screen: "€ 199",
            battery: "€ 99",
            camera: null,
            backglass: null,
            faceid: null
        },
        'Apple Watch SE': {
            swap: "€ 299",
            screen: "€ 149",
            battery: "€ 89",
            camera: null,
            backglass: null,
            faceid: null
        }
    }
};

function updateShopPrice(type, value, targetId) {
    const target = document.getElementById(targetId);
    if (!value) {
        target.innerText = "€ --";
        return;
    }
    target.innerText = `€ ${value}`;
}

const cableData = {
    "lightning": [
        {
            name: "Apple Lightning to USB-C Cable (1m)",
            price: "€25",
            desc: "Standard fast charging cable for iPhone (older models).",
            image: "Images/Apple_USB-C_to_USB-C_Cable_(2m).jpg"
        },
        {
            name: "Apple Lightning to USB-A Cable (1m)",
            price: "€25",
            desc: "Classic charging cable for older chargers and PCs.",
            image: "Images/Apple_Lightning_to_USB-A_Cable_(1m).jpg"
        }
    ],
    "usb-c": [
        {
            name: "Apple USB-C to USB-C Cable (1m)",
            price: "€25",
            desc: "Standard fast charging cable for iPhone 15 and MacBook.",
            image: "Images/Apple_USB-C_to_USB-C_Cable_(1m).jpg"
        },
        {
            name: "Apple USB-C to USB-C Cable (2m)",
            price: "€35",
            desc: "Longer cable for MacBook and fast charging setups.",
            image: "Images/Apple_USB-C_to_USB-C_Cable_(2m).jpg"
        }
    ],
    "magsafe": [
        {
            name: "MagSafe Charger (1st Gen)",
            price: "€45",
            desc: "Wireless magnetic charging for iPhone 12 and newer.",
            image: "Images/Apple_MagSafe_Charger.jpg"
        },
        {
            name: "MagSafe Duo Charger",
            price: "€149",
            desc: "Charge iPhone + Apple Watch at the same time.",
            image: "Images/Apple_MagSafe_Duo_Charger.jpg"
        }
    ],
    "thunderbolt": [
        {
            name: "Apple Thunderbolt 4 Pro Cable (1.8m)",
            price: "€149",
            desc: "Ultra-fast data transfer + pro display support.",
            image: "Images/Apple_Thunderbolt_4_Pro_Cable_(1.8m).jpg"
        },
        {
            name: "Apple USB-C Charge Cable (2m - 240W)",
            price: "€39",
            desc: "High power cable for MacBook Pro charging.",
            image: "Images/Apple_USB-C_Charge_Cable_(2m_-_240W).jpg"
        }
    ]
};

function updateCableShop() {
    const type = document.getElementById("cableSelect").value;
    const grid = document.getElementById("cableGrid");

    grid.innerHTML = "";

    cableData[type].forEach(item => {
        const card = document.createElement("div");
        card.className = "col-md-4";

        card.innerHTML = `
            <div class="card h-100 p-4 shadow-sm text-center">
                <img src="${item.image}" alt="${item.name}" class="img-fluid mb-3">
                <h3 class="fw-bold">${item.name}</h3>
                <p class="text-muted">${item.desc}</p>
                <div class="fs-3 fw-bold text-orange mb-3">${item.price}</div>
                <button class="btn btn-orange w-100">Buy Now</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    updateCableShop();
});

function setRepairCategory(category) {
    document.getElementById('selectedCategory').value = category;

    document.querySelectorAll('.selection-box').forEach(box => {
        box.classList.remove('selected');
        if (box.getAttribute('data-category') === category) {
            box.classList.add('selected');
        }
    });

    const selectModels = document.getElementById('deviceModel');
    const label = document.getElementById('modelLabel');

    label.innerText = `Device: ${category}`;
    selectModels.innerHTML = "";

    if (modelsDatabase[category]) {
        modelsDatabase[category].forEach(m => {
            const opt = document.createElement("option");
            opt.value = m;
            opt.textContent = m;
            selectModels.appendChild(opt);
        });
    }
}

function openRepairWithCategory(category) {
    switchPage('services');


    setTimeout(() => {
        setRepairCategory(category);
        nextStep(2);
    }, 200);
}

function nextStep(step) {
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.add('d-none'));
    document.getElementById(`w-step-${step}`).classList.remove('d-none');


    updateProgress(step);
}

function prevStep(step) {
    nextStep(step);
}

function updateProgress(step) {
    document.querySelectorAll('.progress-step').forEach(el => el.classList.remove('text-orange', 'active'));


    const active = document.getElementById(`p-step-${step}`);
    if (active) active.classList.add('text-orange', 'active');
}