function generatePDF() {
    document.getElementsByClassName('date').valueAsDate = new Date();
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
      if (!td.classList.contains("gt")) {  // Skip if td has an id
        td.style.padding = "8px";
        td.style.border = "1px solid #e5e7eb";
      }
    });
  
    const table = document.querySelector("table");
    if (table) {
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";
    }
  }