import { toPng, toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";
import JSZip from "jszip";

// Helper to capture a pre-rendered DOM element to PNG by its ID with correct scaling
export const captureDomElementToPng = async (
  elementId: string,
  widthMm: number,
  heightMm: number,
): Promise<string> => {
  const wrapper = document.getElementById(elementId);
  if (!wrapper) {
    throw new Error(`Element with id ${elementId} not found in DOM.`);
  }

  // Use the card-container inside, or fallback to the wrapper itself
  const container =
    (wrapper.querySelector(".card-container") as HTMLElement) || wrapper;

  // Calculate pixel size at 4.4px per mm (default)
  const widthPx = Math.round(widthMm * 4.4);
  const heightPx = Math.round(heightMm * 4.4);

  // Use toPng to generate the image
  const dataUrl = await toPng(container, {
    pixelRatio: 4, // 4x scale for crisp printing
    width: widthPx,
    height: heightPx,
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
    },
  });

  return dataUrl;
};

// Helper to capture a pre-rendered DOM element to JPEG by its ID with compression
export const captureDomElementToJpeg = async (
  elementId: string,
  widthMm: number,
  heightMm: number,
): Promise<string> => {
  const wrapper = document.getElementById(elementId);
  if (!wrapper) {
    throw new Error(`Element with id ${elementId} not found in DOM.`);
  }

  // Use the card-container inside, or fallback to the wrapper itself
  const container =
    (wrapper.querySelector(".card-container") as HTMLElement) || wrapper;

  // Calculate pixel size at 4.4px per mm (default)
  const widthPx = Math.round(widthMm * 4.4);
  const heightPx = Math.round(heightMm * 4.4);

  // Use toJpeg to generate the image with lighter settings
  const dataUrl = await toJpeg(container, {
    quality: 0.85,
    backgroundColor: '#ffffff',
    pixelRatio: 2, // reduced from 4 for lighter PDFs
    width: widthPx,
    height: heightPx,
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
    },
  });

  return dataUrl;
};

// ─── Sheet-level capture (NO querySelector .card-container) ──────────────────
// Use these for full-page layouts: LibritoZineA4, FoldingA4, PosterA4, etc.
// Captures the element itself at its actual rendered pixel dimensions.

export const captureSheetToPng = async (
  elementId: string,
  pixelRatio = 3,
): Promise<string> => {
  const el = document.getElementById(elementId);
  if (!el) throw new Error(`Element #${elementId} not found in DOM.`);

  const rect = el.getBoundingClientRect();
  // Use offsetWidth/Height for the off-screen hidden element (getBoundingClientRect is 0 when off-screen)
  const w = el.offsetWidth || Math.round(rect.width);
  const h = el.offsetHeight || Math.round(rect.height);

  const dataUrl = await toPng(el, {
    pixelRatio,
    width: w,
    height: h,
    backgroundColor: '#ffffff',
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left',
    },
  });

  return dataUrl;
};

export const captureSheetToJpeg = async (
  elementId: string,
  pixelRatio = 2,
  quality = 0.90,
): Promise<string> => {
  const el = document.getElementById(elementId);
  if (!el) throw new Error(`Element #${elementId} not found in DOM.`);

  const w = el.offsetWidth;
  const h = el.offsetHeight;

  const dataUrl = await toJpeg(el, {
    pixelRatio,
    quality,
    width: w,
    height: h,
    backgroundColor: '#ffffff',
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left',
    },
  });

  return dataUrl;
};

// Export an HTML element as PNG data URL or trigger download
export const exportToPng = async (
  element: HTMLElement,
  filename: string,
  download = true,
  widthMm?: number,
  heightMm?: number,
): Promise<string> => {
  const options: any = {
    pixelRatio: 4, // 4x scale for crisp printing
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
    },
  };

  if (widthMm && heightMm) {
    options.width = Math.round(widthMm * 4.4);
    options.height = Math.round(heightMm * 4.4);
  }

  const dataUrl = await toPng(element, options);

  if (download) {
    const link = document.createElement("a");
    link.download = `${filename}.png`;
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
  heightMm = 100,
): Promise<jsPDF> => {
  const options: any = {
    pixelRatio: 4, // High resolution for vector sharp rendering in PDF
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
    },
  };

  if (widthMm && heightMm) {
    options.width = Math.round(widthMm * 4.4);
    options.height = Math.round(heightMm * 4.4);
  }

  const pngDataUrl = await toPng(element, options);

  const pdf = new jsPDF({
    orientation: widthMm > heightMm ? "landscape" : "portrait",
    unit: "mm",
    format: [widthMm, heightMm],
  });

  pdf.addImage(
    pngDataUrl,
    "PNG",
    0,
    0,
    widthMm,
    heightMm,
    "undefined" in pdf ? "SLOW" : "FAST",
    "FAST",
  );

  if (download) {
    pdf.save(`${filename}.pdf`);
  }

  return pdf;
};

// Batch export all cards and generate a structured ZIP file using pre-rendered DOM elements
export const exportAllToZip = async (
  cards: { name: string; id: string }[],
  progressCallback: (current: number, total: number, phase: string) => void,
  widthMm = 70,
  heightMm = 100,
  format: "png" | "pdf" | "all" = "all",
): Promise<Blob> => {
  const zip = new JSZip();
  const total = cards.length;

  const pngFolder =
    format === "all" || format === "png" ? zip.folder("png") : null;
  const pdfFolder =
    format === "all" || format === "pdf" ? zip.folder("pdf") : null;

  for (let i = 0; i < total; i++) {
    const item = cards[i];
    const indexStr = String(i).padStart(2, "0");
    const filename = `${indexStr}_${item.name.toLowerCase().replace(/\s+/g, "_")}`;

    progressCallback(i + 1, total, `Capturando ${item.name}...`);
    const pngDataUrl = await captureDomElementToPng(item.id, widthMm, heightMm);
    const pngBase64 = pngDataUrl.split(",")[1];

    if (format === "all" || format === "png") {
      pngFolder?.file(`${filename}.png`, pngBase64, { base64: true });
    }

    if (format === "all" || format === "pdf") {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [widthMm, heightMm],
      });
      pdf.addImage(pngDataUrl, "PNG", 0, 0, widthMm, heightMm, "FAST");
      const pdfBlob = pdf.output("blob");
      pdfFolder?.file(`${filename}.pdf`, pdfBlob);
    }
  }

  progressCallback(total, total, "Comprimiendo archivos...");
  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
};

// Generate an imposing A4 Landscape sheet with 8 cards (2x4 grid)
// Supports double-sided (mirrored backs on page 2) or single-sided (fronts only)
export const exportPliegoA4Pdf = async (
  frontIds: string[],
  backIds: string[],
  hasCutLines: boolean,
  doubleSided: boolean,
  widthMm: number,
  heightMm: number,
  progressCallback: (current: number, total: number, phase: string) => void,
): Promise<jsPDF> => {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const cols = 4;
  const rows = 2;
  const cardsPerPage = cols * rows; // 8
  const totalCards = frontIds.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const marginX = (297 - cols * widthMm) / 2;
  const marginY = (210 - rows * heightMm) / 2;

  // Pre-render fronts and backs from DOM elements
  const frenteImages: string[] = [];
  const dorsoImages: string[] = [];
  const imageCache: Record<string, string> = {};

  const totalSteps = doubleSided ? totalCards * 2 : totalCards;
  for (let i = 0; i < totalCards; i++) {
    progressCallback(
      i + 1,
      totalSteps,
      `Procesando frente ${i + 1} de ${totalCards}...`,
    );
    const fId = frontIds[i];
    if (!imageCache[fId]) {
      imageCache[fId] = await captureDomElementToJpeg(fId, widthMm, heightMm);
    }
    frenteImages.push(imageCache[fId]);

    if (doubleSided) {
      progressCallback(
        totalCards + i + 1,
        totalSteps,
        `Procesando dorso ${i + 1} de ${totalCards}...`,
      );
      const bId = backIds[i];
      if (!imageCache[bId]) {
        imageCache[bId] = await captureDomElementToJpeg(bId, widthMm, heightMm);
      }
      dorsoImages.push(imageCache[bId]);
    }
  }

  // Draw sheets to the document
  for (let p = 0; p < totalPages; p++) {
    if (p > 0) {
      pdf.addPage();
    }

    // PAGE 1: FRENTES
    progressCallback(
      p + 1,
      totalPages,
      `Imponiendo frentes (Hoja ${p + 1}/${totalPages})...`,
    );
    for (let i = 0; i < cardsPerPage; i++) {
      const cardIdx = p * cardsPerPage + i;
      if (cardIdx >= totalCards) break;

      const r = Math.floor(i / cols);
      const c = i % cols;
      const x = marginX + c * widthMm;
      const y = marginY + r * heightMm;

      pdf.addImage(
        frenteImages[cardIdx],
        "JPEG",
        x,
        y,
        widthMm,
        heightMm,
        undefined,
        "FAST",
      );

      if (hasCutLines) {
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.1);
        pdf.setLineDashPattern([1, 1], 0);
        pdf.rect(x, y, widthMm, heightMm, "S");
      }
    }

    // PAGE 2: DORSOS (MIRRORED HORIZONTALLY) - Only if doubleSided is active
    if (doubleSided) {
      pdf.addPage();
      progressCallback(
        p + 1,
        totalPages,
        `Imponiendo dorsos espejados (Hoja ${p + 1}/${totalPages})...`,
      );
      for (let i = 0; i < cardsPerPage; i++) {
        const cardIdx = p * cardsPerPage + i;
        if (cardIdx >= totalCards) break;

        const r = Math.floor(i / cols);
        const c = cols - 1 - (i % cols); // Mirror horizontal column index
        const x = marginX + c * widthMm;
        const y = marginY + r * heightMm;

        pdf.addImage(
          dorsoImages[cardIdx],
          "JPEG",
          x,
          y,
          widthMm,
          heightMm,
          undefined,
          "FAST",
        );

        if (hasCutLines) {
          pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.1);
          pdf.setLineDashPattern([1, 1], 0);
          pdf.rect(x, y, widthMm, heightMm, "S");
        }
      }
    }
  }

  return pdf;
};



// Generate a double flyer page A4 Landscape sheet from DOM element IDs
export const exportFlyerPliegoPdf = async (
  frenteId: string,
  dorsoId: string,
  progressCallback: (current: number, total: number, phase: string) => void,
): Promise<jsPDF> => {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const widthMm = 297;
  const heightMm = 105;

  progressCallback(1, 4, "Capturando frente del flyer...");
  const frenteImg = await captureDomElementToJpeg(frenteId, widthMm, heightMm);

  progressCallback(2, 4, "Capturando dorso del flyer...");
  const dorsoImg = await captureDomElementToJpeg(dorsoId, widthMm, heightMm);

  // Ecotank Print Margins (Scale to fit within safe printable area)
  // Safe area: ~5mm margins on all edges
  // Original ratio: 297x105. Target ratio inside half A4 (297x105) with 5mm margins = 287x95
  // Scale factor based on height to maintain proportions: 95/105 = 0.9047
  // Scaled Width = 297 * 0.9047 = 268.7mm. Scaled Height = 95mm.
  // Center X = (297 - 268.7) / 2 = 14.15mm
  // To have them touch at the central cut line (105mm):
  // Top Flyer bottom must be at 105 -> topY = 105 - 95 = 10
  // Bottom Flyer top must be at 105 -> bottomY = 105
  const printWidth = 268.7;
  const printHeight = 95;
  const marginX = 14.15;
  const topY = 10;
  const bottomY = 105;

  // --- PAGE 1: FRENTES (TOP & BOTTOM) ---
  progressCallback(3, 4, "Armando página de frentes del flyer...");
  pdf.addImage(frenteImg, "JPEG", marginX, topY, printWidth, printHeight, undefined, "FAST");
  pdf.addImage(frenteImg, "JPEG", marginX, bottomY, printWidth, printHeight, undefined, "FAST");

  // Cut guideline in the middle (at exactly 105mm, which is the center of the A4)
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.1);
  pdf.setLineDashPattern([2, 2], 0);
  pdf.line(0, 105, 297, 105);

  // --- PAGE 2: DORSOS (TOP & BOTTOM) ---
  pdf.addPage();
  progressCallback(4, 4, "Armando página de dorsos del flyer...");
  pdf.addImage(dorsoImg, "JPEG", marginX, topY, printWidth, printHeight, undefined, "FAST");
  pdf.addImage(dorsoImg, "JPEG", marginX, bottomY, printWidth, printHeight, undefined, "FAST");

  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.1);
  pdf.setLineDashPattern([2, 2], 0);
  pdf.line(0, 105, 297, 105);

  pdf.save("Fixture_Flyer_Doble_Faz_A4.pdf");
  return pdf;
};
