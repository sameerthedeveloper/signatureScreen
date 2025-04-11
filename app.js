const hPanels = document.getElementById("h-pannels");
const vPanels = document.getElementById("v-pannels");
const totalPanels = document.getElementById("tp");

const panelHeight_ft = document.getElementById("height-ft");
const panelWidth_ft = document.getElementById("width-ft");
const panelHeight_mm = document.getElementById("height-mm");
const panelWidth_mm = document.getElementById("width-mm");
const panelHeight_in = document.getElementById("height-in");
const panelWidth_in = document.getElementById("width-in");

function updateFromPanelCount() {
    const hVal = parseInt(hPanels.value);
    const vVal = parseInt(vPanels.value);

    if (isNaN(hVal) || isNaN(vVal)) return;

    const total = hVal * vVal;
    totalPanels.textContent = total;
    totalPanels.classList.add("font-bold");

    panelHeight_mm.value = (hVal * 337.5).toFixed(2) ;
    panelWidth_mm.value = (vVal * 600).toFixed(2) | 0;

    panelHeight_ft.value = (hVal * 337.5).toFixed(2)/304.8 .toFixed(2);
    panelWidth_ft.value = (vVal * 600).toFixed(2)/304.8.toFixed(2);

    panelHeight_in.value = (hVal * 337.5).toFixed(2)/25.4.toFixed(2);
    panelWidth_in.value = (vVal * 600).toFixed(2)/25.4.toFixed(2);




}


[hPanels, vPanels].forEach(el => el.addEventListener("input", updateFromPanelCount));
