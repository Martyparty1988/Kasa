const inventoryItems = [
    // 1. Nealkoholické nápoje
    { name: 'Coca-Cola', price: 32, currency: 'CZK', image: 'images/cola.png', category: 'nealko' },
    { name: 'Sprite', price: 32, currency: 'CZK', image: 'images/sprite.png', category: 'nealko' },
    { name: 'Fanta', price: 32, currency: 'CZK', image: 'images/fanta.png', category: 'nealko' },
    
    // 2. Alkoholické míchané drinky
    { name: 'Malibu', price: 99, currency: 'CZK', image: 'images/malibu.png', category: 'alkohol' },
    { name: 'Jack s colou', price: 99, currency: 'CZK', image: 'images/jack.png', category: 'alkohol' },
    { name: 'Moscow Mule', price: 99, currency: 'CZK', image: 'images/moscow.png', category: 'alkohol' },
    { name: 'Gin-Tonic', price: 99, currency: 'CZK', image: 'images/gin.png', category: 'alkohol' },
    { name: 'Mojito', price: 99, currency: 'CZK', image: 'images/mojito.png', category: 'alkohol' },
    
    // 3. Plechovkové nápoje (piva)
    { name: 'Red Bull', price: 59, currency: 'CZK', image: 'images/redbull.png', category: 'nealko' },
    { name: 'Budvar', price: 59, currency: 'CZK', image: 'images/budvar.png', category: 'piva' },
    
    // 4. Prosecco
    { name: 'Prosecco', price: 390, currency: 'CZK', image: 'images/prosecco.png', category: 'alkohol' },
    
    // 5. Sudy (nová kategorie)
    { name: 'Pivo sud 30l', price: 125, currency: 'EUR', image: 'images/keg.png', category: 'piva' },
    { name: 'Pivo sud 50l', price: 175, currency: 'EUR', image: 'images/pivo50.png', category: 'piva' },
    
    // 6. Wellness a grilly
    { name: 'Plyn', price: 12, currency: 'EUR', image: 'images/Plyn.png', category: 'relax' },
    { name: 'Gril', price: 20, currency: 'EUR', image: 'images/grill.png', category: 'relax' },
    { name: 'Wellness', price: 0, currency: 'EUR', image: 'images/wellness.png', category: 'relax', customPrice: true }
];

const inventory = {
    'oh-yeah': [...inventoryItems],
    'amazing-pool': [...inventoryItems],
    'little-castle': [...inventoryItems]
};