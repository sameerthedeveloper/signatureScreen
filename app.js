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

    panelHeight.value = (hVal * 337.5).toFixed(2);
    panelWidth.value = (vVal * 600).toFixed(2);
}

function updateFromDimensions() {
    const hDim = parseInt(panelHeight.value);
    const vDim = parseInt(panelWidth.value);

    if (isNaN(hDim) || isNaN(vDim)) return;

    const hCount = hDim / 337.5;
    const vCount = vDim / 600;
    const total = hCount * vCount;

    totalPanels.textContent = total.toFixed(2);
    totalPanels.classList.add("font-bold");

    hPanels.value = hCount.toFixed(2);
    vPanels.value = vCount.toFixed(2);
}

[hPanels, vPanels].forEach(el => el.addEventListener("input", updateFromPanelCount));
[panelHeight, panelWidth].forEach(el => el.addEventListener("input", updateFromDimensions));
