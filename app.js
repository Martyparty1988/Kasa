let EXCHANGE_RATE = 25.5;
let currentVilla = null;
let cart = [];
let selectedItem = null;
let currentQuantity = 1;
let isCartOpen = false;
let isCategoryMenuOpen = false;

// Updated inventory initialization with blank first item
const inventoryItems = [
    { name: '', price: 0, currency: 'CZK', image: '', category: 'none' }, // Blank first item
    // 1. Nealkoholické nápoje
    { name: 'Coca-Cola', price: 32, currency: 'CZK', image: 'images/cola.png', category: 'non-alcoholic' },
    { name: 'Sprite', price: 32, currency: 'CZK', image: 'images/sprite.png', category: 'non-alcoholic' },
    { name: 'Fanta', price: 32, currency: 'CZK', image: 'images/fanta.png', category: 'non-alcoholic' },
    { name: 'Red Bull', price: 59, currency: 'CZK', image: 'images/redbull.png', category: 'non-alcoholic' },
    // 2. Alkoholické nápoje
    { name: 'Malibu', price: 99, currency: 'CZK', image: 'images/malibu.png', category: 'alcoholic' },
    { name: 'Jack’s Cola', price: 99, currency: 'CZK', image: 'images/jack.png', category: 'alcoholic' },
    { name: 'Moscow Mule', price: 99, currency: 'CZK', image: 'images/moscow.png', category: 'alcoholic' },
    { name: 'Gin Tonic', price: 99, currency: 'CZK', image: 'images/gin.png', category: 'alcoholic' },
    { name: 'Mojito', price: 99, currency: 'CZK', image: 'images/mojito.png', category: 'alcoholic' },
    { name: 'Prosecco', price: 390, currency: 'CZK', image: 'images/prosecco.png', category: 'alcoholic' },
    // 3. Piva
    { name: 'Budvar', price: 59, currency: 'CZK', image: 'images/budvar.png', category: 'beer' },
    { name: 'Sud 30 litrů', price: 125, currency: 'EUR', image: 'images/keg.png', category: 'kegs' },
    { name: 'Sud 50 litrů', price: 175, currency: 'EUR', image: 'images/pivo50.png', category: 'kegs' },
    { name: 'Budvar plechovka', price: 59, currency: 'CZK', image: 'images/budvar.png', category: 'beer' },
    // 4. Relax
    { name: 'Wellness balíček', price: 0, currency: 'EUR', image: 'images/wellness.png', category: 'wellness', customPrice: true },
    { name: 'Grily', price: 20, currency: 'EUR', image: 'images/grill.png', category: 'wellness' },
    { name: 'Plyny do ohňových stolů', price: 12, currency: 'EUR', image: 'images/Plyn.png', category: 'wellness' }
];

const inventory = {
    'oh-yeah': [...inventoryItems],
    'amazing-pool': [...inventoryItems],
    'little-castle': [...inventoryItems]
};

// New function to toggle category menu
function toggleCategoryMenu() {
    const menu = document.getElementById('categoryMenu');
    isCategoryMenuOpen = !isCategoryMenuOpen;
    menu.classList.toggle('active', isCategoryMenuOpen);
    document.getElementById('toggleCategories').classList.toggle('active', isCategoryMenuOpen);
}

// Updated renderInventory to handle new menu
function renderInventory(category = 'all') {
    const inventoryEl = document.getElementById('inventory');
    inventoryEl.innerHTML = '';

    const filteredItems = category === 'all' 
        ? inventory[currentVilla] 
        : inventory[currentVilla].filter(item => item.category === category && item.name); // Exclude blank item

    filteredItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = `item ${currentVilla}`;
        itemEl.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-name">${item.name}</div>
            <div class="item-price">${item.customPrice ? 'Vlastní cena' : `${item.price} ${item.currency}`}</div>
        `;
        itemEl.onclick = () => handleItemClick(item);
        inventoryEl.appendChild(itemEl);
    });

    // Update active button in category menu
    document.querySelectorAll('.category-menu button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category || (category === 'all' && !btn.getAttribute('data-category'))) {
            btn.classList.add('active');
        }
    });
}

// Existing functions remain unchanged unless modified above

// Initialize with category menu
function init() {
    selectVilla('oh-yeah');
    updateStats();
    renderInventory('all'); // Default to all categories
}

// Event Listeners
document.addEventListener('DOMContentLoaded', init);