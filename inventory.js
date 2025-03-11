// Definice produktů s cenami
const inventory = [
    {
        id: 1,
        name: "Vila Černá",
        price: 2000,
        imageUrl: "images/vila_cerna.jpg"
    },
    {
        id: 2,
        name: "Vila Zelená",
        price: 2500,
        imageUrl: "images/vila_zelena.jpg"
    },
    {
        id: 3,
        name: "Vila Bílá",
        price: 1800,
        imageUrl: "images/vila_bila.jpg"
    }
];

// Funkce pro vykreslení produktů na hlavní stránce
function renderInventory() {
    const inventoryContainer = document.getElementById('inventory-container');
    
    // Pokud container neexistuje, jsme pravděpodobně na jiné stránce
    if (!inventoryContainer) return;
    
    inventoryContainer.innerHTML = '';
    
    inventory.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        
        card.innerHTML = `
            <div class="card h-100">
                <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Cena: ${item.price} Kč/noc</p>
                    <button class="btn btn-primary select-vila" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Vybrat</button>
                </div>
            </div>
        `;
        
        inventoryContainer.appendChild(card);
    });
    
    // Přidání event listenerů pro tlačítka "Vybrat"
    addSelectButtonListeners();
}

// Funkce pro přidání event listenerů k tlačítkům "Vybrat"
function addSelectButtonListeners() {
    const selectButtons = document.querySelectorAll('.select-vila');
    
    selectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const villaId = e.target.getAttribute('data-id');
            const villaName = e.target.getAttribute('data-name');
            const villaPrice = e.target.getAttribute('data-price');
            
            // Uložení vybrané vily do localStorage
            localStorage.setItem('selectedVillaId', villaId);
            localStorage.setItem('selectedVillaName', villaName);
            localStorage.setItem('selectedVillaPrice', villaPrice);
            
            // Přesměrování na stránku s rozpočtem
            window.location.href = 'kasa.html';
        });
    });
}

// Funkce pro načtení dat vybrané vily do formuláře na stránce kasa.html
function loadSelectedVillaData() {
    const villaNameElement = document.getElementById('selected-villa-name');
    
    // Pokud element neexistuje, jsme pravděpodobně na hlavní stránce
    if (!villaNameElement) return;
    
    const villaName = localStorage.getItem('selectedVillaName');
    const villaPrice = localStorage.getItem('selectedVillaPrice');
    
    if (villaName && villaPrice) {
        villaNameElement.textContent = villaName;
        
        // Automaticky přidej ubytování jako první položku, pokud je seznam prázdný
        const savedItems = localStorage.getItem('kasaItems');
        if (!savedItems || JSON.parse(savedItems).length === 0) {
            // Vyplň formulář daty vily
            document.getElementById('itemName').value = `Ubytování - ${villaName}`;
            document.getElementById('itemPrice').value = villaPrice;
            document.getElementById('itemQuantity').value = 1;
        }
    } else {
        villaNameElement.textContent = "Nebyla vybrána žádná vila";
    }
}

// Inicializace při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    // Vykresli produkty na hlavní stránce
    renderInventory();
    
    // Načti data vybrané vily na stránce kasa.html
    loadSelectedVillaData();
});