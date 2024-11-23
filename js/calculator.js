// Service prices and options
const serviceOptions = {
    laptop: {
        services: [
            { id: 'repair', name: 'General Repair', price: 500 },
            { id: 'screen', name: 'Screen Replacement', price: 3500 },
            { id: 'keyboard', name: 'Keyboard Replacement', price: 1500 },
            { id: 'battery', name: 'Battery Replacement', price: 2500 }
        ],
        additional: [
            { id: 'cleaning', name: 'Deep Cleaning', price: 500 },
            { id: 'data', name: 'Data Backup', price: 800 },
            { id: 'antivirus', name: 'Antivirus Installation', price: 1000 }
        ]
    },
    desktop: {
        services: [
            { id: 'repair', name: 'General Repair', price: 600 },
            { id: 'format', name: 'Format & OS Installation', price: 1500 },
            { id: 'upgrade', name: 'Hardware Upgrade', price: 2000 },
            { id: 'psu', name: 'Power Supply Replacement', price: 2500 }
        ],
        additional: [
            { id: 'cleaning', name: 'Deep Cleaning', price: 700 },
            { id: 'data', name: 'Data Backup', price: 800 },
            { id: 'antivirus', name: 'Antivirus Installation', price: 1000 }
        ]
    },
    printer: {
        services: [
            { id: 'repair', name: 'General Repair', price: 400 },
            { id: 'head', name: 'Print Head Cleaning', price: 800 },
            { id: 'roller', name: 'Roller Replacement', price: 1200 }
        ],
        additional: [
            { id: 'cleaning', name: 'Deep Cleaning', price: 500 },
            { id: 'calibration', name: 'Color Calibration', price: 600 }
        ]
    }
};

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
    const deviceSelect = document.getElementById('deviceType');
    const serviceSelect = document.getElementById('serviceType');
    const additionalServices = document.getElementById('additionalServices');
    const priceDisplay = document.getElementById('estimatedPrice');
    
    // Device selection change handler
    deviceSelect.addEventListener('change', function() {
        const device = this.value;
        updateServiceOptions(device);
        updateAdditionalServices(device);
        calculatePrice();
    });
    
    // Service selection change handler
    serviceSelect.addEventListener('change', calculatePrice);
    
    // Book service button handler
    document.getElementById('bookServiceBtn').addEventListener('click', function() {
        const device = deviceSelect.value;
        const service = serviceSelect.value;
        if (!device || !service) {
            alert('Please select both device and service type');
            return;
        }
        // Open booking modal with pre-filled information
        const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
        bookingModal.show();
    });
});

function updateServiceOptions(device) {
    const serviceSelect = document.getElementById('serviceType');
    serviceSelect.innerHTML = '<option value="">Select Service</option>';
    
    if (device && serviceOptions[device]) {
        serviceOptions[device].services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = `${service.name} - ₹${service.price}`;
            serviceSelect.appendChild(option);
        });
    }
}

function updateAdditionalServices(device) {
    const container = document.getElementById('additionalServices');
    container.innerHTML = '';
    
    if (device && serviceOptions[device]) {
        serviceOptions[device].additional.forEach(service => {
            const div = document.createElement('div');
            div.className = 'service-checkbox';
            div.innerHTML = `
                <input type="checkbox" id="${service.id}" value="${service.price}" 
                       onchange="calculatePrice()">
                <label for="${service.id}">${service.name} - ₹${service.price}</label>
            `;
            container.appendChild(div);
        });
    }
}

function calculatePrice() {
    const device = document.getElementById('deviceType').value;
    const serviceId = document.getElementById('serviceType').value;
    let total = 0;
    
    // Add base service price
    if (device && serviceId) {
        const service = serviceOptions[device].services.find(s => s.id === serviceId);
        if (service) total += service.price;
    }
    
    // Add additional services
    const checkboxes = document.querySelectorAll('#additionalServices input:checked');
    checkboxes.forEach(checkbox => {
        total += parseInt(checkbox.value);
    });
    
    // Update price display
    document.getElementById('estimatedPrice').textContent = `₹${total}`;
} 