import { toPng, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';

// Export an HTML element as PNG data URL or trigger download
export const exportToPng = async (element: HTMLElement, filename: string, download = true): Promise<string> => {
  // Ensure the element is rendered fully with proper scale for high print quality
  const dataUrl = await toPng(element, {
    pixelRatio: 4, // 4x scale for crisp printing
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left'
    }
  });

  if (download) {
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  }

  return dataUrl;
};

// Export an HTML element as SVG string or trigger download
export const exportToSvg = async (element: HTMLElement, filename: string, download = true): Promise<string> => {
  const dataUrl = await toSvg(element, {
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left'
    }
  });

  if (download) {
    const link = document.createElement('a');
    link.download = `${filename}.svg`;
    link.href = dataUrl;
    link.click();
  }

  return dataUrl;
};

// Export an HTML element as PDF or trigger download (supports customizable dimensions)
export const exportToPdf = async (
  element: HTMLElement, 
  filename: string, 
  download = true,
  widthMm = 70,
  heightMm = 100
): Promise<jsPDF> => {
  // 1. Generate a high-definition PNG first
  const pngDataUrl = await toPng(element, {
    pixelRatio: 4, // High resolution for vector sharp rendering in PDF
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left'
    }
  });

  // 2. Initialize jsPDF with exactly the customized mm format
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [widthMm, heightMm]
  });

  // 3. Add the image covering the full page
  pdf.addImage(pngDataUrl, 'PNG', 0, 0, widthMm, heightMm);

  if (download) {
    pdf.save(`${filename}.pdf`);
  }

  return pdf;
};

// Batch export all cards and generate a structured ZIP file in the selected custom size
export const exportAllToZip = async (
  cardElements: { name: string; element: HTMLElement }[],
  progressCallback: (current: number, total: number, phase: string) => void,
  widthMm = 70,
  heightMm = 100
): Promise<Blob> => {
  const zip = new JSZip();
  const total = cardElements.length;

  const pngFolder = zip.folder('png');
  const svgFolder = zip.folder('svg');
  const pdfFolder = zip.folder('pdf');

  for (let i = 0; i < total; i++) {
    const item = cardElements[i];
    const indexStr = String(i).padStart(2, '0');
    const filename = `${indexStr}_${item.name.toLowerCase().replace(/\s+/g, '_')}`;

    // Update progress: generating PNG
    progressCallback(i + 1, total, `Generando PNG de ${item.name}...`);
    const pngDataUrl = await exportToPng(item.element, filename, false);
    const pngBase64 = pngDataUrl.split(',')[1];
    pngFolder?.file(`${filename}.png`, pngBase64, { base64: true });

    // Update progress: generating SVG
    progressCallback(i + 1, total, `Generando SVG de ${item.name}...`);
    const svgDataUrl = await exportToSvg(item.element, filename, false);
    const svgContent = decodeURIComponent(svgDataUrl.split(',')[1]);
    svgFolder?.file(`${filename}.svg`, svgContent);

    // Update progress: generating PDF
    progressCallback(i + 1, total, `Generando PDF de ${item.name}...`);
    const pdfInstance = await exportToPdf(item.element, filename, false, widthMm, heightMm);
    const pdfBlob = pdfInstance.output('blob');
    pdfFolder?.file(`${filename}.pdf`, pdfBlob);
  }

  progressCallback(total, total, 'Comprimiendo archivos...');
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  return zipBlob;
};
