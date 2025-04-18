async function captureAndShare() {
    const node = document.getElementById('pdf-target');
    if (!node) return alert("Div not found!");

    try {
      const dataUrl = await domtoimage.toPng(node);
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();

      const img = new Image();
      img.src = dataUrl;
      img.onload = async () => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (img.height * pageWidth) / img.width;
        pdf.addImage(img, 'PNG', 0, 0, pageWidth, pageHeight);

        const blob = pdf.output('blob');
        const file = new File([blob], 'div-capture.pdf', { type: 'application/pdf' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Shared PDF',
            text: 'Here is your generated PDF.',
            files: [file],
          });
        } else {
          alert("Web Share API not supported.");
        }
      };
    } catch (err) {
      console.error("Error:", err);
    }
  }