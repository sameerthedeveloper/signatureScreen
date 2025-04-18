async function captureAndShare() {
    const original = document.getElementById('pdf-target');
    if (!original) return alert('Target element not found.');

    // Clone and style for A4 rendering
    const clone = original.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.width = '794px'; // A4 width at 96 DPI
    clone.style.padding = '20px';
    clone.style.zIndex = '-9999';
    clone.style.opacity = '0';

    document.body.appendChild(clone);

    // Wait for rendering
    await new Promise((res) => requestAnimationFrame(res));
    await new Promise((res) => setTimeout(res, 100)); // Slight delay to ensure fonts/layout are rendered

    try {
      const dataUrl = await domtoimage.toPng(clone);

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const blob = pdf.output('blob');
      const file = new File([blob], 'a4-output.pdf', { type: 'application/pdf' });

      document.body.removeChild(clone); // Clean up

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Shared PDF',
          text: 'Generated A4 PDF',
          files: [file],
        });
      } else {
        // Fallback: download if share not supported
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'a4-output.pdf';
        link.click();
        URL.revokeObjectURL(url);
      }

    } catch (err) {
      console.error('PDF generation error:', err);
      document.body.removeChild(clone);
    }
  }