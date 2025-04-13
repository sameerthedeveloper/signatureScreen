const hPanels = document.getElementById("h-pannels");
const vPanels = document.getElementById("v-pannels");
const totalPanels = document.getElementById("tp");

let tCost = 0;
let GST28 = 0;

const panelHeight_ft = document.getElementById("height-ft");
const panelWidth_ft = document.getElementById("width-ft");
const panelHeight_mm = document.getElementById("height-mm");
const panelWidth_mm = document.getElementById("width-mm");
const panelHeight_in = document.getElementById("height-in");
const panelWidth_in = document.getElementById("width-in");
const diagonal = document.getElementById("diag");

const seires = document.getElementById("series");
const panelCost = document.getElementById("cost");
const panelCGST = document.getElementById("panelGST");

const LEDList = { value: 'AS5', label: 'AS5 Series', hPixel: 270, vPixel: 480, cost: 86735 };
const LEDGST = 28;

const processor = document.getElementById("prcsr");
const ProcessorList = [
    { value: '8K', name: '8K', cost: 800000 },
    { value: '4KP', name: '4KP', cost: 450000 },
    { value: '4KH', name: '4KH', cost: 300000 },
    { value: '4KS', name: '4KS', cost: 250000 }
];
const processorGST = 18;

const hPix = document.getElementById("h-pixels");
const vPix = document.getElementById("v-pixels");
const totalPix = document.getElementById("tpix");

const iPrice = document.getElementById("i-price");
const install_Pirce = 100000;
iPrice.innerHTML = (install_Pirce).toLocaleString();

const processorCost = document.getElementById("p-price");
const proccesorCGST = document.getElementById("tprocess");

const totalCost = document.getElementById("tcost");
const FinalCostGST = document.getElementById("finalP");
const FinalCost = document.getElementById("fp");

// Quotation section IDs
const quoteNum = document.getElementById("quote-number");
const quoteDate = document.getElementById("quote-date");
const quoteSeries = document.getElementById("quote-series");
const quoteDimensions = document.getElementById("quote-dimensions");
const quoteResolution = document.getElementById("quote-resolution");
const quotePanelCost = document.getElementById("quote-panel-cost");
const quoteProcessorCost = document.getElementById("quote-processor-cost");
const quoteInstallCost = document.getElementById("quote-installation-cost");
const quoteTotal = document.getElementById("quote-total");
const quoteGrandTotal = document.getElementById("quote-grand-total");

// Disable unused inputs
[panelHeight_ft, panelWidth_ft, panelHeight_mm, panelWidth_mm, panelHeight_in, panelWidth_in, diagonal, hPix, vPix].forEach(input => {
    input.disabled = true;
});

const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
const generateQuoteNumber = () => Math.floor(100000 + Math.random() * 900000);
const getCurrentDate = () => new Date().toLocaleDateString('en-GB');

function updateFromPanelCount() {
    const hVal = parseInt(hPanels.value);
    const vVal = parseInt(vPanels.value);
    if (isNaN(hVal) || isNaN(vVal)) return;

    const total = hVal * vVal;
    totalPanels.textContent = total;
    totalPanels.classList.add("font-bold");

    const height_mm = hVal * 337.5;
    const width_mm = vVal * 600;

    panelHeight_mm.value = height_mm.toFixed(2);
    panelWidth_mm.value = width_mm.toFixed(2);
    panelHeight_ft.value = (height_mm / 304.8).toFixed(2);
    panelWidth_ft.value = (width_mm / 304.8).toFixed(2);
    panelHeight_in.value = (height_mm / 25.4).toFixed(2);
    panelWidth_in.value = (width_mm / 25.4).toFixed(2);

    const diagonalLength = Math.sqrt((width_mm ** 2) + (height_mm ** 2));
    diagonal.value = (diagonalLength / 25.4).toFixed(2);

    vPix.value = vVal * LEDList.vPixel;
    hPix.value = hVal * LEDList.hPixel;
    totalPix.innerHTML = (vPix.value * hPix.value).toLocaleString();

    tCost = LEDList.cost * total;
    panelCost.innerHTML = LEDList.cost.toLocaleString();
    totalCost.innerHTML = tCost.toLocaleString();
    GST28 = tCost * (LEDGST / 100) + tCost;
    panelCGST.innerHTML = GST28.toLocaleString();

    // Update quotation section
    if (quoteNum) quoteNum.textContent = generateQuoteNumber();
    if (quoteDate) quoteDate.textContent = getCurrentDate();
    if (quoteSeries) quoteSeries.textContent = LEDList.label;
    if (quoteDimensions) quoteDimensions.textContent = `${panelWidth_ft.value} ft x ${panelHeight_ft.value} ft`;
    if (quoteResolution) quoteResolution.textContent = `${hPix.value} x ${vPix.value}`;
    if (quotePanelCost) quotePanelCost.textContent = formatCurrency(tCost);
    if (quoteInstallCost) quoteInstallCost.textContent = formatCurrency(install_Pirce);
}

function updateProcessorCost() {
    const selectedValue = processor?.value;
    const proc = ProcessorList.find(p => p.value === selectedValue);
    if (!proc) return;

    const GST18 = proc.cost * (processorGST / 100) + proc.cost;

    processorCost.innerHTML = proc.cost.toLocaleString();
    proccesorCGST.innerHTML = GST18.toLocaleString();

    const finalCost = tCost + proc.cost + install_Pirce;
    const finalGST = GST18 + GST28 + install_Pirce;

    FinalCostGST.innerHTML = finalGST.toLocaleString();
    FinalCost.innerHTML = finalCost.toLocaleString();

    // Update quotation section
    if (quoteProcessorCost) quoteProcessorCost.textContent = formatCurrency(proc.cost);
    if (quoteTotal) quoteTotal.textContent = formatCurrency(tCost + proc.cost);
    if (quoteGrandTotal) quoteGrandTotal.textContent = formatCurrency(finalCost);
}

[hPanels, vPanels].forEach(el => el.addEventListener("input", () => {
    updateFromPanelCount();
    updateProcessorCost();
}));

processor.addEventListener("input", updateProcessorCost);
