/* =========================
   ORIGINAL DATABASES
========================= */

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

/* =========================
   SHOP DEVICES (NEW)
========================= */

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

/* =========================
   CABLES SHOP (NEW FIXED)
========================= */

const cablesShop = {
    lightning: { name: "Lightning Cable (1m)", price: 19 },
    usbC: { name: "USB-C Cable (1m braided)", price: 25 },
    usbc2m: { name: "USB-C Cable (2m)", price: 35 },
    magsafe: { name: "MagSafe Charger", price: 45 },
    thunderbolt: { name: "Thunderbolt 4 Cable", price: 79 }
};

/* =========================
   NAVIGATION SYSTEM
========================= */

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

    // INIT SHOP PAGES
    if (pageId === "upcoming") initShopDevices();
    if (pageId === "cables") initCablesShop();
}

/* =========================
   WIZARD INIT (unchanged core)
========================= */

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
    if (form) form.addEventListener('submit', handleFormSubmit);

    updatePriceModels();
    updatePriceLayoutData();
});

/* =========================
   SHOP DEVICES RENDER
========================= */

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
                    <div class="display-3 mb-3">🍎</div>
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

/* =========================
   CABLE SHOP FIXED
========================= */

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
                <div class="display-3 mb-3">🔌</div>
                <h3 class="fw-bold">${cable.name}</h3>
                <p class="text-muted">Apple certified high quality accessory.</p>
                <div class="fs-3 fw-bold text-orange mb-3">€${cable.price}</div>
                <button class="btn btn-orange w-100">Buy Now</button>
            </div>
        </div>`;
    });

    grid.innerHTML = html;
}

/* =========================
   REPAIR WIZARD (UNCHANGED CORE)
========================= */

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

/* =========================
   PRICE SYSTEM FIX (IMPORTANT BUG FIX)
========================= */

function updatePriceModels() {
    const category = document.getElementById("priceCategorySelect").value;
    const modelSelect = document.getElementById("priceModelSelect");

    modelSelect.innerHTML = "";

    const models = Object.keys(priceData[category]);
    models.forEach(model => {
        const opt = document.createElement("option");
        opt.value = model;
        opt.textContent = model;
        modelSelect.appendChild(opt);
    });

    modelSelect.selectedIndex = 0;
    updatePriceLayoutData();
}

function updatePriceLayoutData() {
    const category = document.getElementById("priceCategorySelect").value;
    const model = document.getElementById("priceModelSelect").value;

    if (!priceData[category] || !priceData[category][model]) return;

    const data = priceData[category][model];

    document.getElementById("cost-swap").innerText = data.swap;
    document.getElementById("cost-screen").innerText = data.screen;
    document.getElementById("cost-battery").innerText = data.battery;
    document.getElementById("cost-camera").innerText = data.camera;
    document.getElementById("cost-backglass").innerText = data.backglass;
    document.getElementById("cost-faceid").innerText = data.faceid;
}

/* =========================
   PRICE DATABASE (UNCHANGED)
========================= */

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
            icon: "⚡"
        },
        {
            name: "Apple Lightning to USB-A Cable (1m)",
            price: "€25",
            desc: "Classic charging cable for older chargers and PCs.",
            icon: "🔌"
        }
    ],

    "usb-c": [
        {
            name: "Apple USB-C to USB-C Cable (1m)",
            price: "€25",
            desc: "Standard fast charging cable for iPhone 15 and MacBook.",
            icon: "⚡"
        },
        {
            name: "Apple USB-C to USB-C Cable (2m)",
            price: "€35",
            desc: "Longer cable for MacBook and fast charging setups.",
            icon: "🔋"
        }
    ],

    "magsafe": [
        {
            name: "MagSafe Charger (1st Gen)",
            price: "€45",
            desc: "Wireless magnetic charging for iPhone 12 and newer.",
            icon: "🧲"
        },
        {
            name: "MagSafe Duo Charger",
            price: "€149",
            desc: "Charge iPhone + Apple Watch at the same time.",
            icon: "⚡"
        }
    ],

    "thunderbolt": [
        {
            name: "Apple Thunderbolt 4 Pro Cable (1.8m)",
            price: "€149",
            desc: "Ultra-fast data transfer + pro display support.",
            icon: "🚀"
        },
        {
            name: "Apple USB-C Charge Cable (2m - 240W)",
            price: "€39",
            desc: "High power cable for MacBook Pro charging.",
            icon: "💻"
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
                <div class="display-3 mb-3">${item.icon}</div>
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