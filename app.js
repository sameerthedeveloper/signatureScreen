const hPanels = document.getElementById("h-pannels");
const vPanels = document.getElementById("v-pannels");
const totalPanels = document.getElementById("tp");

const panelHeight = document.getElementById("height");
const panelWidth = document.getElementById("width");

function updateFromPanelCount() {
    const hVal = parseInt(hPanels.value);
    const vVal = parseInt(vPanels.value);

    if (isNaN(hVal) || isNaN(vVal)) return;

    const total = hVal * vVal;
    totalPanels.textContent = total;
    totalPanels.classList.add("font-bold");

    panelHeight.value = Math.round((hVal * 337.5).toFixed(2)) | 0;
    panelWidth.value = Math.round((vVal * 600).toFixed(2)) | 0;
}

function updateFromDimensions() {
    const hDim = parseInt(panelHeight.value)*304.8;
    const vDim = parseInt(panelWidth.value)*304.8;

    if (isNaN(hDim) || isNaN(vDim)) return;

    const hCount = hDim / 337.5;
    const vCount = vDim / 600;
    const total = Math.round(hCount * vCount);

    totalPanels.textContent = total.toFixed(2) | 0;
    totalPanels.classList.add("font-bold");

    hPanels.value = hCount.toFixed(2);
    vPanels.value = vCount.toFixed(2);
}

[hPanels, vPanels].forEach(el => el.addEventListener("input", updateFromPanelCount));
[panelHeight, panelWidth].forEach(el => el.addEventListener("input", updateFromDimensions));
