// Function to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
};

// Function to generate quote number
const generateQuoteNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// Function to get current date in DD/MM/YYYY format
const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-GB');
};

// Function to calculate total
const calculateTotal = (quantity, unitPrice) => {
    return quantity * unitPrice;
};

// Populate quotation details
document.getElementById('quote-number').textContent = generateQuoteNumber();
document.getElementById('quote-date').textContent = getCurrentDate();

// Sample data - replace with your actual data
const quotationData = {
    panel: {
        description: 'Solar Panel 540W',
        quantity: 10,
        unitPrice: 15000
    },
    processor: {
        description: 'Solar Inverter 5KW',
        price: 45000
    },
    installation: {
        price: 25000
    }
};

// Populate panel details
document.getElementById('panel-description').textContent = quotationData.panel.description;
document.getElementById('panel-quantity').textContent = quotationData.panel.quantity;
document.getElementById('panel-unit-price').textContent = formatCurrency(quotationData.panel.unitPrice);
document.getElementById('panel-total').textContent = formatCurrency(calculateTotal(quotationData.panel.quantity, quotationData.panel.unitPrice));

// Populate processor details
document.getElementById('processor-description').textContent = quotationData.processor.description;
document.getElementById('processor-price').textContent = formatCurrency(quotationData.processor.price);
document.getElementById('processor-total').textContent = formatCurrency(quotationData.processor.price);

// Populate installation details
document.getElementById('installation-price').textContent = formatCurrency(quotationData.installation.price);
document.getElementById('installation-total').textContent = formatCurrency(quotationData.installation.price);