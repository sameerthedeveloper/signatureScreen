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

const seires = document.getElementById("series");
const panelCost = document.getElementById("cost");

const LEDList = { value: 'AS5', label: 'AS5 Series', hPixel: 270, vPixel: 480, cost: 86735 }; // FIXED

// Disable all measurement inputs on page load
[panelHeight_ft, panelWidth_ft, panelHeight_mm, panelWidth_mm, panelHeight_in, panelWidth_in, diagonal].forEach(input => {
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

    panelCost.innerHTML = (LEDList.cost * total)
}

[hPanels, vPanels].forEach(el => el.addEventListener("input", updateFromPanelCount));
