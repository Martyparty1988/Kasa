const inventoryItems = [
    // 1. Nealkoholické nápoje
    { name: 'Coca-Cola', price: 32, currency: 'CZK', image: 'images/cola.png' },
    { name: 'Sprite', price: 32, currency: 'CZK', image: 'images/sprite.png' },
    { name: 'Fanta', price: 32, currency: 'CZK', image: 'images/fanta.png' },
    
    // 2. Alkoholické míchané drinky
    { name: 'Malibu', price: 99, currency: 'CZK', image: 'images/malibu.png' },
    { name: 'Jack s colou', price: 99, currency: 'CZK', image: 'images/jack.png' },
    { name: 'Moscow Mule', price: 99, currency: 'CZK', image: 'images/moscow.png' },
    { name: 'Gin-Tonic', price: 99, currency: 'CZK', image: 'images/gin.png' },
    { name: 'Mojito', price: 99, currency: 'CZK', image: 'images/mojito.png' },
    
    // 3. Plechovkové nápoje
    { name: 'Red Bull', price: 59, currency: 'CZK', image: 'images/redbull.png' },
    { name: 'Budvar', price: 59, currency: 'CZK', image: 'images/budvar.png' },
    
    // 4. Prosecco
    { name: 'Prosecco', price: 390, currency: 'CZK', image: 'images/prosecco.png' },
    
    // 5. Piva v sudu
    { name: 'Pivo sud 30l', price: 125, currency: 'EUR', image: 'images/keg.png' },
    { name: 'Pivo sud 50l', price: 175, currency: 'EUR', image: 'images/pivo50.png' },
    
    // 6. Wellness a grilly
    { name: 'Plyn', price: 12, currency: 'EUR', image: 'images/Plyn.png' },
    { name: 'Gril', price: 20, currency: 'EUR', image: 'images/grill.png' },
    { name: 'Wellness', price: 0, currency: 'EUR', image: 'images/wellness.png', customPrice: true }
];

const inventory = {
    'oh-yeah': [...inventoryItems],
    'amazing-pool': [...inventoryItems],
    'little-castle': [...inventoryItems]
};

function renderInventory(category = 'all') {
    const inventoryEl = document.getElementById('inventory');
    inventoryEl.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? inventory[currentVilla] 
        : inventory[currentVilla].filter(item => {
            // Příklad kategorií podle názvu nebo vlastnosti
            if (category === 'drinks') return ['Coca-Cola', 'Sprite', 'Fanta', 'Red Bull'].includes(item.name);
            if (category === 'alcohol') return item.name.includes('Malibu') || item.name.includes('Gin');
            return false;
        });

    filteredItems.forEach(item => {
        // Stejný kód jako v původní funkci renderInventory
    });
}
// HTML pro filtry
<div class="filters">
    <button onclick="renderInventory('all')">Vše</button>
    <button onclick="renderInventory('drinks')">Nápoje</button>
    <button onclick="renderInventory('alcohol')">Alkohol</button>
</div>