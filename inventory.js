const inventoryItems = [
    // 1. Nealkoholické nápoje
    { name: 'Coca-Cola', price: 32, currency: 'CZK', image: 'images/cola.png', category: 'non-alcoholic' },
    { name: 'Sprite', price: 32, currency: 'CZK', image: 'images/sprite.png', category: 'non-alcoholic' },
    { name: 'Fanta', price: 32, currency: 'CZK', image: 'images/fanta.png', category: 'non-alcoholic' },
    
    // 2. Alkoholické míchané drinky
    { name: 'Malibu', price: 99, currency: 'CZK', image: 'images/malibu.png', category: 'alcoholic' },
    { name: 'Jack s colou', price: 99, currency: 'CZK', image: 'images/jack.png', category: 'alcoholic' },
    { name: 'Moscow Mule', price: 99, currency: 'CZK', image: 'images/moscow.png', category: 'alcoholic' },
    { name: 'Gin-Tonic', price: 99, currency: 'CZK', image: 'images/gin.png', category: 'alcoholic' },
    { name: 'Mojito', price: 99, currency: 'CZK', image: 'images/mojito.png', category: 'alcoholic' },
    
    // 3. Plechovkové nápoje (piva)
    { name: 'Red Bull', price: 59, currency: 'CZK', image: 'images/redbull.png', category: 'non-alcoholic' },
    { name: 'Budvar', price: 59, currency: 'CZK', image: 'images/budvar.png', category: 'beer' },
    
    // 4. Prosecco
    { name: 'Prosecco', price: 390, currency: 'CZK', image: 'images/prosecco.png', category: 'alcoholic' },
    
    // 5. Piva v sudu
    { name: 'Pivo sud 30l', price: 125, currency: 'EUR', image: 'images/keg.png', category: 'beer' },
    { name: 'Pivo sud 50l', price: 175, currency: 'EUR', image: 'images/pivo50.png', category: 'beer' },
    
    // 6. Wellness a grilly
    { name: 'Plyn', price: 12, currency: 'EUR', image: 'images/Plyn.png', category: 'wellness' },
    { name: 'Gril', price: 20, currency: 'EUR', image: 'images/grill.png', category: 'wellness' },
    { name: 'Wellness', price: 0, currency: 'EUR', image: 'images/wellness.png', category: 'wellness', customPrice: true }
];

const inventory = {
    'oh-yeah': [...inventoryItems],
    'amazing-pool': [...inventoryItems],
    'little-castle': [...inventoryItems]
};