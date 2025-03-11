// Inicializace prázdných polí pro data
let items = [];
let totalAmount = 0;

// Funkce pro načtení dat z localStorage při startu aplikace
function loadDataFromLocalStorage() {
    const savedItems = localStorage.getItem('kasaItems');
    const savedTotal = localStorage.getItem('kasaTotal');
    
    if (savedItems) {
        items = JSON.parse(savedItems);
        renderItems();
    }
    
    if (savedTotal) {
        totalAmount = parseFloat(savedTotal);
        updateTotalDisplay();
    }
}

// Funkce pro uložení dat do localStorage
function saveDataToLocalStorage() {
    localStorage.setItem('kasaItems', JSON.stringify(items));
    localStorage.setItem('kasaTotal', totalAmount.toString());
}

// Funkce pro přidání nové položky
function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemQuantity = document.getElementById('itemQuantity').value;

    // Validace vstupů
    if (itemName.trim() === "") {
        showError("Zadejte název položky.");
        return;
    }

    if (itemPrice.trim() === "") {
        showError("Zadejte cenu položky.");
        return;
    }

    // Kontrola, že cena je platné číslo a není záporná
    const price = parseFloat(itemPrice);
    if (isNaN(price)) {
        showError("Cena musí být číslo.");
        return;
    }

    if (price < 0) {
        showError("Cena nemůže být záporná.");
        return;
    }

    // Kontrola, že množství je platné číslo a není záporné
    const quantity = itemQuantity.trim() !== "" ? parseInt(itemQuantity) : 1;
    if (isNaN(quantity)) {
        showError("Množství musí být číslo.");
        return;
    }

    if (quantity < 0) {
        showError("Množství nemůže být záporné.");
        return;
    }

    // Vytvoření nové položky
    const newItem = {
        id: Date.now(), // Unikátní ID pro každou položku
        name: itemName,
        price: price,
        quantity: quantity,
        total: price * quantity
    };

    // Přidání položky do pole
    items.push(newItem);
    
    // Aktualizace celkové částky
    updateTotal();
    
    // Vykreslení položek
    renderItems();
    
    // Uložení dat do localStorage
    saveDataToLocalStorage();
    
    // Resetování formuláře
    resetForm();
}

// Funkce pro zobrazení chybové hlášky
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Skrytí chybové hlášky po 3 sekundách
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

// Funkce pro resetování formuláře
function resetForm() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemQuantity').value = '';
}

// Funkce pro výpočet celkové částky
function updateTotal() {
    totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    updateTotalDisplay();
    saveDataToLocalStorage();
}

// Funkce pro aktualizaci zobrazení celkové částky
function updateTotalDisplay() {
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2) + ' Kč';
}

// Funkce pro vykreslení položek
function renderItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    
    items.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)} Kč</td>
            <td>${item.quantity}</td>
            <td>${item.total.toFixed(2)} Kč</td>
            <td>
                <button class="btn btn-sm btn-primary edit-btn" data-id="${item.id}">Upravit</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${item.id}">Odstranit</button>
            </td>
        `;
        
        itemList.appendChild(row);
    });
    
    // Přidání event listenerů pro tlačítka
    addButtonEventListeners();
}

// Funkce pro přidání event listenerů k tlačítkům
function addButtonEventListeners() {
    // Event listenery pro tlačítka odstranění
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            deleteItem(itemId);
        });
    });
    
    // Event listenery pro tlačítka úpravy
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            editItem(itemId);
        });
    });
}

// Funkce pro odstranění položky
function deleteItem(itemId) {
    items = items.filter(item => item.id !== itemId);
    updateTotal();
    renderItems();
}

// Funkce pro úpravu položky
function editItem(itemId) {
    const item = items.find(item => item.id === itemId);
    
    if (item) {
        // Naplnění formuláře daty položky
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemPrice').value = item.price;
        document.getElementById('itemQuantity').value = item.quantity;
        
        // Odstranění původní položky
        deleteItem(itemId);
        
        // Změna textu tlačítka
        const addBtn = document.getElementById('addItemBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');
        
        addBtn.textContent = 'Uložit změny';
        cancelBtn.style.display = 'inline-block';
    }
}

// Funkce pro zrušení úpravy
function cancelEdit() {
    resetForm();
    
    // Vrácení původního textu tlačítka
    const addBtn = document.getElementById('addItemBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');
    
    addBtn.textContent = 'Přidat položku';
    cancelBtn.style.display = 'none';
}

// Funkce pro export do PDF
function exportToPDF() {
    if (items.length === 0) {
        showError("Není co exportovat, přidejte nějaké položky.");
        return;
    }
    
    // Vytvoření obsahu pro PDF
    const element = document.querySelector('.invoice-container').cloneNode(true);
    
    // Odstranění tlačítek z exportu
    element.querySelectorAll('button').forEach(button => {
        button.remove();
    });
    
    // Konfigurace pro html2pdf
    const opt = {
        margin: 1,
        filename: 'faktura.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Generování PDF
    html2pdf().set(opt).from(element).save();
}

// Event listenery
document.addEventListener('DOMContentLoaded', () => {
    // Načtení dat z localStorage
    loadDataFromLocalStorage();
    
    // Přidání event listenerů
    document.getElementById('addItemBtn').addEventListener('click', addItem);
    document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);
    document.getElementById('exportPDFBtn').addEventListener('click', exportToPDF);
    
    // Skrytí tlačítka pro zrušení úpravy na začátku
    document.getElementById('cancelEditBtn').style.display = 'none';
});