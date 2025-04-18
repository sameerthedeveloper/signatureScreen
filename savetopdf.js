function generatePDF() {
    const targetDiv = document.getElementById("pdf-target");

    // Get the content of the target div
    const content = targetDiv.innerHTML;

    // Get the hidden iframe
    const iframe = document.getElementById('hidden-iframe');
    const iframeDoc = iframe.contentWindow.document;

    // Inject the content into the iframe document
    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <script src="https://cdn.tailwindcss.com"></script>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20mm; /* Page margins */
              margin: 0;
            }
            .content {
              background-color: #fff;
              padding: 20px;
            }
            .content h1 {
              color: #333;
            }
            /* A4 page size */
            @page {
              size: A4;
              margin: 0;
            }
            body {
              background: #fff;
            }
          </style>
        </head>
        <body>
          <div class="content" id="pdf-target">
            ${content}
          </div>
        </body>
      </html>
    `);
    iframeDoc.close();

    // Wait for the content to load and trigger the print functionality
    iframe.onload = function() {
      setTimeout(function() {
        iframe.contentWindow.print(); // Trigger the print dialog to PDF
        iframe.contentWindow.onafterprint = function() {
          iframe.contentWindow.close(); // Close the iframe after print is done
        }
      }, 1000); // Wait 1 second to ensure content is fully loaded
    };
  }