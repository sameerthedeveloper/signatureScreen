let quotation = {
    series: '',
    whpanels: '',
    diagonal: '',
    aream: '',
    areaft: '',
    resolution: '',
    pixels: '',
    panelprice: '',
    panelGST: '',
    processor: '',
    processorCost: '',
    processorGST: '',
    install: '',
    installCost: '',
    installGST: '',
    totalCost: '',
    totalGST: '',
}

let phase1 = false;
let phase2 = false;
let phase3 = false;





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

const areamm = document.getElementById("areamm");
const areaft = document.getElementById("areaft");

const seires = document.getElementById("series");
const panelCost = document.getElementById("cost");
const panelCGST = document.getElementById("panelGST");

const LEDList = { value: 'AS5', label: 'AS5 Series', hPixel: 270, vPixel: 480, cost: 86735 }; // FIXED
const LEDGST = 28;
let panelGST = 0;

let processorCostvalue = 0;

// const selectedValue = document.getElementById("prcsr")?.value;

const processor = document.getElementById("prcsr");
const ProcessorList = [
    { value: '1', label: 'CF40-4K-HDR-40P', cost: 325000 },
    { value: '2', label: 'CF20-4K-SDR-80P', cost: 260000 },
    { value: '3', label: 'CF40-4K-HDR-80P', cost: 700000 },
    { value: '4', label: 'CF40-4K-SDR-160P', cost: 650000 },
    { value: '5', label: 'CF60-4K-HDR-120P', cost: 925000 },
    { value: '6', label: 'CF60-4K-SDR-240P', cost: 850000 },


];
const processorGST = 18;
const GST18 = 0;
const tporcessor = document.getElementById("tprocess");

const hPix = document.getElementById("h-pixels");
const vPix = document.getElementById("v-pixels");
const totalPix = document.getElementById("tpix");

const iPrice = document.getElementById("install");
const install_Pirce = [
    { value: '1', cost: 100000, gst: 18000 },
    { value: '2', cost: 150000, gst: 36000 },
    { value: '3', cost: 200000, gst: 54000 },
];

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
    quotation.whpanels = total;
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
    quotation.diagonal = diagonalInInches.toFixed(2);
    quotation.aream = ((height_mm * width_mm) / 1000000).toFixed(2);
    quotation.areaft = ((height_mm * width_mm) / 92900).toFixed(2);
    quotation.resolution = `${LEDList.vPixel * vVal} x ${LEDList.hPixel * hVal}`;


    vPix.value = vVal * LEDList.vPixel;
    hPix.value = hVal * LEDList.hPixel;
    // iPrice.innerHTML = (install_Pirce).toLocaleString();
    tCost = LEDList.cost * total;
    quotation.panelprice = tCost;
    quotation.series = LEDList.label;
    quotation.pixels = vPix.value * hPix.value;

    panelCost.innerHTML = (LEDList.cost).toLocaleString();
    totalCost.innerHTML = (tCost).toLocaleString();
    console.log(tCost);
    const GST28 = tCost * (LEDGST / 100) + tCost;
    quotation.panelGST = GST28;
    panelGST = GST28;
    panelCGST.innerHTML = (GST28).toLocaleString();

    totalPix.innerHTML = (vPix.value * hPix.value).toLocaleString();

    areamm.innerHTML = ((height_mm * width_mm) / 1000000).toLocaleString();
    areaft.innerHTML = ((height_mm * width_mm) / 92900).toLocaleString();


    phase1 = true;






}

function updateProcessorCost() {
    
    const selectedValue = document.getElementById("prcsr")?.value;
    const processor = ProcessorList.find(p => p.value === selectedValue);
    quotation.processor = processor.label;

    const processorCostElement = document.getElementById("p-price");
    const processorGSTElement = document.getElementById("tprocess");
    // pCost = processor.cost;
    processorCostvalue = processor.cost;
    quotation.processorCost = processorCostvalue;
    console.log(processor.cost);
    console.log(tCost + processor.cost);


    const GST18 = processor.cost * (processorGST / 100) + processor.cost;
    quotation.processorGST = GST18;

    if (processorCostElement) {
        processorCostElement.innerHTML = processor ? processor.cost.toLocaleString() : "0";
        processorGSTElement.innerHTML = processor ? GST18.toLocaleString() : "0";
    }

    // updateFromPanelCount();

    // const fc = parseInt(totalCost.innerHTML) + install_Pirce + processor.cost;
    // const GST = GST18 + GST28 + install_Pirce;
    // FinalCostGST.innerHTML = GST.toLocaleString();
    // FinalCost.innerHTML = (tCost + processor.cost + install_Pirce).toLocaleString();

}

function updateInstallCost() {
    const selectedValue = document.getElementById("install")?.value;
    const install = install_Pirce.find(p => p.value === selectedValue);
    console.log(install);
    quotation.install = install.value;
    quotation.installCost = install.cost;
    quotation.installGST = install.gst;

    const installCostElement = document.getElementById("i-price");
    const installGSTTotal = document.getElementById("i-total");
    // updateProcessorCost();
    // updateFromPanelCount()






    if (installCostElement) {
        installCostElement.innerHTML = install ? install.cost.toLocaleString() : "0";
        installGSTTotal.innerHTML = install ? (install.cost + install.gst).toLocaleString() : "0";
    }

    const fc = parseInt(tCost) + processorCostvalue + install.cost;
    const GST = GST18 + panelGST + install.cost;
    FinalCostGST.innerHTML = GST.toLocaleString();
    FinalCost.innerHTML = (fc).toLocaleString();

    quotation.totalCost = fc;
    quotation.totalGST = GST;
    console.log(quotation);
    // Quatation 
    document.getElementById("quote-series").textContent = quotation.series;
    document.getElementById("quote-hv-panels").textContent = quotation.whpanels;
    document.getElementById("quote-diag").textContent = quotation.diagonal;
    document.getElementById("quote-area-mm").textContent = quotation.aream;
    document.getElementById("quote-area-ft").textContent = quotation.areaft;
    document.getElementById("quote-res").textContent = quotation.resolution;
    document.getElementById("quote-total-pixels").textContent = quotation.pixels;
    document.getElementById("quote-total-price").textContent = quotation.panelprice.toLocaleString();
    document.getElementById("quote-total-gst").textContent = quotation.panelGST.toLocaleString();
    document.getElementById("quote-processor").textContent = quotation.processor;
    document.getElementById("quote-processor-price").textContent = quotation.processorGST.toLocaleString();
    // document.getElementById("quote-processor-gst").textContent = quotation.processorGST.toLocaleString();
    document.getElementById("quote-install-price").textContent = quotation.installCost.toLocaleString();
    // document.getElementById("quote-install-gst").textContent = quotation.installGST.toLocaleString();
    // document.getElementById("quote-total-price").textContent = quotation.totalCost.toLocaleString();
    document.getElementById("quote-grand-total").textContent = quotation.totalCost.toLocaleString();
    document.getElementById("quote-grand-total-gst").textContent = quotation.totalGST.toLocaleString();


}





[hPanels, vPanels].forEach(el => el.addEventListener("input", updateFromPanelCount));
processor.addEventListener("input", updateProcessorCost);
iPrice.addEventListener("input", updateInstallCost);
