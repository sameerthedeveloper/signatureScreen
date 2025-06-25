// function generatePDF() {
//     document.getElementsByClassName('date').valueAsDate = new Date();
//     const targetDiv = document.getElementById("pdf-target");
//     const today = new Date().toLocaleDateString();
//     html2pdf(targetDiv, {
//         filename: `quotation ${today}.pdf`,
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           allowTaint: true,
//           backgroundColor: "#ffffff" // Set a solid background if needed
//         },
//         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//       });
//       applyTHStyles();
      

//   }
//   function applyTHStyles() {
//     const cd = document.querySelectorAll(".cd");
//     cd.forEach(cd => {
//       cd.classList.remove("border");
//     });
//     const thElements = document.querySelectorAll("th");
//     thElements.forEach(th => {
//       th.style.backgroundColor = "#f3f4f6"; // Tailwind's bg-gray-100
//       th.style.color = "#374151";           // Tailwind's text-gray-700
//       th.style.padding = "8px";
//       th.style.border = "1px solid #e5e7eb";
//       th.style.textAlign = "left";
//     });
  
//     const tdElements = document.querySelectorAll("td");
//     tdElements.forEach(td => {
//       if (!td.classList.contains("gt")) {  // Skip if td has an id
//         td.style.padding = "8px";
//         td.style.border = "1px solid #e5e7eb";
//       }
//     });
  
//     const table = document.querySelector("table");
//     if (table) {
//       table.style.borderCollapse = "collapse";
//       table.style.width = "100%";
//     }
//   }


function generatePDF() {
  const titleElement = document.querySelector(".pdf-title");
  titleElement.classList.remove("hidden");
  // Set the date
  const dateInput = document.querySelector('.date');
  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }

  // Remove old break divs
  document.querySelectorAll(".pdf-page-break").forEach(el => el.remove());

  // Inject page-break style
  const style = document.createElement('style');
  style.innerHTML = `
    .pdf-page-break {
      display: block;
      page-break-before: always;
      break-before: page;
      height: 0;
      margin: 0;
      padding: 0;
    }
    @media print {
      .pdf-page-break {
        display: block;
        page-break-before: always;
      }
    }
  `;
  document.head.appendChild(style);

  // Insert page-break div just before the footer container
  const footerSection = document.querySelector(".pdf-footer-section");
  if (footerSection && !footerSection.previousElementSibling?.classList?.contains("pdf-page-break")) {
    const breakDiv = document.createElement("div");
    breakDiv.className = "pdf-page-break";
    footerSection.parentNode.insertBefore(breakDiv, footerSection);
  }

  // Apply table styling
  applyTHStyles();

  // Wait for layout to settle, then export PDF
  setTimeout(() => {
    const targetDiv = document.getElementById("pdf-target");
    const today = new Date().toLocaleDateString();

    html2pdf().set({
      margin: 10,
      filename: `quotation ${today}.pdf`,
      pagebreak: { mode: ['css', 'legacy'] },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    }).from(targetDiv).save();
  }, 100);
}

function applyTHStyles() {
  document.querySelectorAll(".cd").forEach(cd => cd.classList.remove("border"));

  document.querySelectorAll("th").forEach(th => {
    th.style.backgroundColor = "#f3f4f6";
    th.style.color = "#374151";
    th.style.padding = "8px";
    th.style.border = "1px solid #e5e7eb";
    th.style.textAlign = "left";
  });

  document.querySelectorAll("td").forEach(td => {
    if (!td.classList.contains("gt")) {
      td.style.padding = "8px";
      td.style.border = "1px solid #e5e7eb";
    }
  });

  document.querySelectorAll("table").forEach(table => {
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
  });
}
