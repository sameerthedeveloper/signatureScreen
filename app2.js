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
    totalCost: '',
    totalGST: '',
};

let phase1 = false;
let phase2 = false;
let phase3 = false;


const LEDList = { value: 'AS5', label: 'AS5 Series', hPixel: 270, vPixel: 480, cost: 86735 }; // fixed panel
const ProcessorList = [
    { value: '1', label: 'CF40-4K-HDR-40P', cost: 325000 },
    { value: '2', label: 'CF20-4K-SDR-80P', cost: 260000 },
    { value: '3', label: 'CF40-4K-HDR-80P', cost: 700000 },
    { value: '4', label: 'CF40-4K-SDR-160P', cost: 650000 },
    { value: '5', label: 'CF60-4K-HDR-120P', cost: 925000 },
    { value: '6', label: 'CF60-4K-SDR-240P', cost: 850000 },
];
const installOptions = [
    { value: '1', cost: 100000, gst: 118000 },
    { value: '2', cost: 150000, gst: 136000 },
    { value: '3', cost: 200000, gst: 154000 },
];

const LEDGST = 28;
const processorGST = 18;

let tCost = 0;
let panelGST = 0;
let processorCostvalue = 0;

const hPanels = document.getElementById("h-pannels");
const vPanels = document.getElementById("v-pannels");
const totalPanels = document.getElementById("tp");

const panelHeight_ft = document.getElementById("height-ft");
const panelWidth_ft = document.getElementById("width-ft");
const panelHeight_mm = document.getElementById("height-mm");
const panelWidth_mm = document.getElementById("width-mm");
const panelHeight_in = document.getElementById("height-in");
const panelWidth_in = document.getElementById("width-in");

const diagonal = document.getElementById("diag");
const areamm = document.getElementById("areamm");
const areaft = document.getElementById("areaft");

const panelCost = document.getElementById("cost");
const panelCGST = document.getElementById("panelGST");

const processorSelect = document.getElementById("prcsr");
const processorCost = document.getElementById("p-price");
const proccesorCGST = document.getElementById("tprocess");

const hPix = document.getElementById("h-pixels");
const vPix = document.getElementById("v-pixels");
const totalPix = document.getElementById("tpix");

const installSelect = document.getElementById("install");
const installCostElement = document.getElementById("i-price");

const totalCost = document.getElementById("tcost");
const FinalCost = document.getElementById("fp");
const FinalCostGST = document.getElementById("finalP");

function updateFromPanelCount() {
    phase1 = true;

    const hVal = parseInt(hPanels.value);
    const vVal = parseInt(vPanels.value);
    if (isNaN(hVal) || isNaN(vVal)) return;

    const totalPanelsCount = hVal * vVal;
    quotation.whpanels = `${hVal} x ${vVal}`;
    totalPanels.textContent = totalPanelsCount;
    totalPanels.classList.add("font-bold");

    const height_mm = hVal * 337.5;
    const width_mm = vVal * 600;
    const diagInInches = Math.sqrt((height_mm ** 2 + width_mm ** 2)) / 25.4;

    panelHeight_mm.value = height_mm.toFixed(2);
    panelWidth_mm.value = width_mm.toFixed(2);
    panelHeight_ft.value = (height_mm / 304.8).toFixed(2);
    panelWidth_ft.value = (width_mm / 304.8).toFixed(2);
    panelHeight_in.value = (height_mm / 25.4).toFixed(2);
    panelWidth_in.value = (width_mm / 25.4).toFixed(2);
    diagonal.value = diagInInches.toFixed(2);

    quotation.diagonal = diagInInches.toFixed(2);
    quotation.aream = ((height_mm * width_mm) / 1000000).toFixed(2);
    quotation.areaft = ((height_mm * width_mm) / 92900).toFixed(2);
    areamm.innerHTML = quotation.aream;
    areaft.innerHTML = quotation.areaft;

    const totalPixels = (vVal * LEDList.vPixel) * (hVal * LEDList.hPixel);
    vPix.value = vVal * LEDList.vPixel;
    hPix.value = hVal * LEDList.hPixel;
    totalPix.innerHTML = totalPixels.toLocaleString();

    quotation.resolution = `${vPix.value} x ${hPix.value}`;
    quotation.pixels = totalPixels;
    quotation.series = LEDList.label;

    tCost = LEDList.cost * totalPanelsCount;
    panelGST = tCost * (LEDGST / 100);
    quotation.panelprice = tCost;
    quotation.panelGST = panelGST + tCost;

    panelCost.innerHTML = LEDList.cost.toLocaleString();
    panelCGST.innerHTML = (panelGST + tCost).toLocaleString();
    totalCost.innerHTML = tCost.toLocaleString();

    if (phase2) updateProcessorCost();
    if (phase3) updateInstallCost();
}


function updateProcessorCost() {
    if (!phase1) updateFromPanelCount();
    phase2 = true;

    const selected = processorSelect.value;
    const processor = ProcessorList.find(p => p.value === selected);
    if (!processor) return;

    quotation.processor = processor.label;
    quotation.processorCost = processor.cost;
    processorCostvalue = processor.cost;

    const gst = processor.cost * (processorGST / 100);
    console.log(gst);
    console.log(processor.cost + gst);
    
    
    quotation.processorGST = gst + processor.cost;

    processorCost.innerHTML = processor.cost.toLocaleString();
    proccesorCGST.innerHTML = (processor.cost + gst).toLocaleString();

    if (phase3) updateInstallCost();
}


function updateInstallCost() {
    if (!phase1) updateFromPanelCount();
    if (!phase2) updateProcessorCost();
    phase3 = true;

    const selected = installSelect.value;
    const install = installOptions.find(i => i.value === selected);
    if (!install) return;

    quotation.install = install.value;
    quotation.installCost = install.cost;
    quotation.installGST = install.gst;

    installCostElement.innerHTML = install.cost.toLocaleString();

    const grandCost = tCost + processorCostvalue + install.cost;
    const grandGST = quotation.panelGST + quotation.processorGST + install.gst;

    quotation.totalCost = grandCost;
    quotation.totalGST = grandGST;
    console.log(quotation);
    

    FinalCost.innerHTML = grandCost.toLocaleString();
    FinalCostGST.innerHTML = grandGST.toLocaleString();

    updateQuotationSummary();
}


function updateQuotationSummary() {
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
    document.getElementById("quote-install-price").textContent = quotation.installCost.toLocaleString();
    document.getElementById("quote-grand-total").textContent = quotation.totalCost.toLocaleString();
    document.getElementById("quote-grand-total-gst").textContent = quotation.totalGST.toLocaleString();
}


function generatePDF() {
    const targetDiv = document.getElementById("pdf-target");
    const today = new Date().toLocaleDateString();
    html2pdf(targetDiv, {
        filename: `quotation ${today}.pdf`,
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff" // Set a solid background if needed
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      });
      applyTHStyles();
      

  }
  function applyTHStyles() {
    const cd = document.querySelectorAll(".cd");
    cd.forEach(cd => {
      cd.classList.remove("border");
    });
    const thElements = document.querySelectorAll("th");
    thElements.forEach(th => {
      th.style.backgroundColor = "#f3f4f6"; // Tailwind's bg-gray-100
      th.style.color = "#374151";           // Tailwind's text-gray-700
      th.style.padding = "8px";
      th.style.border = "1px solid #e5e7eb";
      th.style.textAlign = "left";
    });
  
    const tdElements = document.querySelectorAll("td");
    tdElements.forEach(td => {
      td.style.padding = "8px";
      td.style.border = "1px solid #e5e7eb";
    });
  
    const table = document.querySelector("table");
    if (table) {
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";
    }
  }

// Event Listeners
[hPanels, vPanels].forEach(el => el.addEventListener("input", updateFromPanelCount));
processorSelect.addEventListener("input", updateProcessorCost);
installSelect.addEventListener("input", updateInstallCost);
