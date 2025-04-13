const hPanels = document.getElementById("h-pannels");
const vPanels = document.getElementById("v-pannels");
const totalPanels = document.getElementById("tp");
let total = 0;
let tCost = 0;
let pCost = 0;


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

const LEDList = { value: 'AS5', label: 'AS5 Series', hPixel: 270, vPixel: 480, cost: 86735 }; // FIXED
const LEDGST = 28;

// const selectedValue = document.getElementById("prcsr")?.value;

const processor = document.getElementById("prcsr");
const ProcessorList = [
    { value: '8K', name: '8K', cost: 800000 },
    { value: '4KP', name: '4KP', cost: 450000 },
    { value: '4KH', name: '4KH', cost: 300000 },
    { value: '4KS', name: '4KS', cost: 250000 }
];
const processorGST = 18;
const GST18 = 0;
const tporcessor = document.getElementById("tprocess");

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


// Disable all measurement inputs on page load
[panelHeight_ft, panelWidth_ft, panelHeight_mm, panelWidth_mm, panelHeight_in, panelWidth_in, diagonal, hPix, vPix].forEach(input => {
    input.disabled = true;
});


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
    const diagonalInInches = diagonalLength / 25.4;
    diagonal.value = diagonalInInches.toFixed(2);

    vPix.value = vVal * LEDList.vPixel;
    hPix.value = hVal * LEDList.hPixel;
    iPrice.innerHTML = (install_Pirce).toLocaleString();
    tCost = LEDList.cost * total;
    panelCost.innerHTML = (LEDList.cost).toLocaleString();
    totalCost.innerHTML = (tCost).toLocaleString();
    console.log(tCost);

    GST28 = tCost * (LEDGST / 100) + tCost;
    panelCGST.innerHTML = (GST28).toLocaleString();

    totalPix.innerHTML = (vPix.value * hPix.value).toLocaleString();




}

function updateProcessorCost() {
    const selectedValue = document.getElementById("prcsr")?.value;
    const processor = ProcessorList.find(p => p.value === selectedValue);
    const processorCostElement = document.getElementById("p-price");
    const processorGSTElement = document.getElementById("tprocess");
    // pCost = processor.cost;
    console.log(processor.cost);
    console.log(tCost + processor.cost);


    const GST18 = processor.cost * (processorGST / 100) + processor.cost;

    if (processorCostElement) {
        processorCostElement.innerHTML = processor ? processor.cost.toLocaleString() : "0";
        processorGSTElement.innerHTML = processor ? GST18.toLocaleString() : "0";
    }

    const fc = parseInt(totalCost.innerHTML) + install_Pirce + processor.cost;
    const GST = GST18 + GST28 + install_Pirce;
    FinalCostGST.innerHTML = GST.toLocaleString();
    FinalCost.innerHTML = (tCost + processor.cost + install_Pirce).toLocaleString();

}



[hPanels, vPanels].forEach(el => el.addEventListener("input", updateFromPanelCount));
processor.addEventListener("input", updateProcessorCost);

