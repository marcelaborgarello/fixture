import { GROUPS, PLAYOFFS } from './data/matchesData';
import {
  renderCoverCardHtml,
  renderGroupCardHtml,
  renderDieciseisavosCardHtml,
  renderOctavosCardHtml,
  renderCuartosCardHtml,
  renderFaseFinalCardHtml
} from './components/cardTemplates';
import { exportToPng, exportToSvg, exportToPdf, exportAllToZip } from './utils/exporter';
import { DesignConfig } from './types';

// Global state for design configuration
const currentConfig: DesignConfig = {
  primaryColor: '#0d5c3a',
  secondaryColor: '#1b8555',
  accentColor: '#ffd700',
  textColor: '#ffffff',
  borderColor: 'rgba(255, 255, 255, 0.15)',
  cardBgColor: 'rgba(14, 52, 37, 0.45)',
  fontFamily: "'Outfit', sans-serif",
  borderRadius: 12,
  backgroundType: 'gradient',
  backgroundGradient: 'linear-gradient(135deg, #093c24 0%, #15623e 50%, #0d5c3a 100%)',
  solidColor: '#0d5c3a',
  backgroundImageUrl: '',
  glassmorphism: false,
  
  // Premium branding & creative stationery customization
  brandSignature: '',
  brandLogoUrl: '',
  coverTitle: 'WORLD CUP 2026',
  coverSubtitle: 'CALENDARIO DE PARTIDOS',
  cafecitoUrl: 'https://cafecito.app/ginialtech',
  excludeCoverFromSheets: false,
  showCutLines: true,

  // Custom dimensions (in mm)
  cardWidthMm: 70,
  cardHeightMm: 100,

  // Cover layers
  showCoverTrophy: true,
  coverIllustrationUrl: ''
};

// List of all cards to be rendered and exported (18 cards total!)
interface CardItem {
  id: string;
  name: string;
  renderHtml: () => string;
}

const getCardsList = (): CardItem[] => [
  { 
    id: 'tapa',
    name: 'Tapa', 
    renderHtml: () => renderCoverCardHtml(
      currentConfig.coverTitle, 
      currentConfig.coverSubtitle, 
      currentConfig.brandSignature,
      currentConfig.brandLogoUrl,
      currentConfig.showCoverTrophy,
      currentConfig.coverIllustrationUrl
    ) 
  },
  ...GROUPS.map(g => ({
    id: `grupo-${g.name.toLowerCase()}`,
    name: `Grupo ${g.name}`,
    renderHtml: () => renderGroupCardHtml(g, currentConfig.brandSignature, currentConfig.brandLogoUrl)
  })),
  { 
    id: 'dieciseisavos-1',
    name: 'Dieciseisavos - Parte 1', 
    renderHtml: () => renderDieciseisavosCardHtml(PLAYOFFS[0], currentConfig.brandSignature, currentConfig.brandLogoUrl) 
  },
  { 
    id: 'dieciseisavos-2',
    name: 'Dieciseisavos - Parte 2', 
    renderHtml: () => renderDieciseisavosCardHtml(PLAYOFFS[1], currentConfig.brandSignature, currentConfig.brandLogoUrl) 
  },
  { 
    id: 'octavos',
    name: 'Octavos de Final', 
    renderHtml: () => renderOctavosCardHtml(PLAYOFFS[2], currentConfig.brandSignature, currentConfig.brandLogoUrl) 
  },
  { 
    id: 'cuartos',
    name: 'Cuartos de Final', 
    renderHtml: () => renderCuartosCardHtml(PLAYOFFS[3], currentConfig.brandSignature, currentConfig.brandLogoUrl) 
  },
  { 
    id: 'final',
    name: 'Fase Final y Campeón', 
    renderHtml: () => renderFaseFinalCardHtml(PLAYOFFS[4], currentConfig.brandSignature, currentConfig.brandLogoUrl) 
  }
];

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  renderAllCards();
  setupConfigListeners();
  setupExportListeners();
});

// Render cards into the viewer grid
function renderAllCards(): void {
  const gridContainer = document.getElementById('cards-grid');
  if (!gridContainer) return;
  gridContainer.innerHTML = '';

  const cards = getCardsList();

  let cardsProcessed = 0;
  cards.forEach((card) => {
    // 1. Create card wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.id = `card-wrapper-${card.id}`;
    
    // Apply printing layout toggles and dynamic page-breaks
    if (card.id === 'tapa' && currentConfig.excludeCoverFromSheets) {
      wrapper.classList.add('exclude-from-sheets');
      wrapper.classList.add('print-page-break');
    } else {
      cardsProcessed++;
      if (cardsProcessed > 0 && cardsProcessed % 8 === 0) {
        wrapper.classList.add('print-page-break');
      }
    }

    // 2. Create card container with printable helper classes
    const container = document.createElement('div');
    container.className = 'card-container';
    container.id = `card-container-${card.id}`;
    
    if (currentConfig.showCutLines) {
      container.classList.add('has-cut-lines');
    }
    
    container.innerHTML = card.renderHtml();

    // 3. Create actions bar below card
    const actionsBar = document.createElement('div');
    actionsBar.className = 'card-actions-bar';

    // PNG download button
    const pngBtn = document.createElement('button');
    pngBtn.className = 'card-btn';
    pngBtn.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> PNG
    `;
    pngBtn.addEventListener('click', () => {
      showToast(`Descargando PNG de ${card.name}...`);
      exportToPng(container, `${card.id}_fixture`);
    });

    // SVG download button
    const svgBtn = document.createElement('button');
    svgBtn.className = 'card-btn';
    svgBtn.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> SVG
    `;
    svgBtn.addEventListener('click', () => {
      showToast(`Descargando SVG de ${card.name}...`);
      exportToSvg(container, `${card.id}_fixture`);
    });

    // PDF download button
    const pdfBtn = document.createElement('button');
    pdfBtn.className = 'card-btn';
    pdfBtn.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> PDF
    `;
    pdfBtn.addEventListener('click', () => {
      showToast(`Descargando PDF de ${card.name}...`);
      exportToPdf(container, `${card.id}_fixture`, true, currentConfig.cardWidthMm, currentConfig.cardHeightMm);
    });

    actionsBar.appendChild(pngBtn);
    actionsBar.appendChild(svgBtn);
    actionsBar.appendChild(pdfBtn);

    wrapper.appendChild(container);
    wrapper.appendChild(actionsBar);
    gridContainer.appendChild(wrapper);
  });

  // Reapply styles to new elements
  applyStylesToDom();
}

// Attach event listeners for configuration controls
function setupConfigListeners(): void {
  // Colors
  const colorPrimary = document.getElementById('color-primary') as HTMLInputElement;
  colorPrimary?.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentConfig.primaryColor = val;
    document.getElementById('val-primary')!.textContent = val.toUpperCase();
    updateBackgroundGradient();
  });

  const colorSecondary = document.getElementById('color-secondary') as HTMLInputElement;
  colorSecondary?.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentConfig.secondaryColor = val;
    document.getElementById('val-secondary')!.textContent = val.toUpperCase();
    updateBackgroundGradient();
  });

  const colorAccent = document.getElementById('color-accent') as HTMLInputElement;
  colorAccent?.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentConfig.accentColor = val;
    document.getElementById('val-accent')!.textContent = val.toUpperCase();
    applyStylesToDom();
  });

  const colorText = document.getElementById('color-text') as HTMLInputElement;
  colorText?.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    currentConfig.textColor = val;
    document.getElementById('val-text')!.textContent = val.toUpperCase();
    applyStylesToDom();
  });

  // Background types (gradient / solid)
  const bgTypeGradient = document.getElementById('bg-type-gradient');
  const bgTypeSolid = document.getElementById('bg-type-solid');
  const groupGradient = document.getElementById('group-gradient');

  bgTypeGradient?.addEventListener('click', () => {
    bgTypeGradient.classList.add('active');
    bgTypeSolid?.classList.remove('active');
    groupGradient!.style.display = 'block';
    currentConfig.backgroundType = 'gradient';
    applyStylesToDom();
  });

  bgTypeSolid?.addEventListener('click', () => {
    bgTypeSolid.classList.add('active');
    bgTypeGradient?.classList.remove('active');
    groupGradient!.style.display = 'none';
    currentConfig.backgroundType = 'solid';
    applyStylesToDom();
  });

  // Gradient end color change
  const colorGradEnd = document.getElementById('color-grad-end') as HTMLInputElement;
  colorGradEnd?.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    document.getElementById('val-grad-end')!.textContent = val.toUpperCase();
    updateBackgroundGradient();
  });

  // Background Image Upload
  const fileBgImage = document.getElementById('file-bg-image') as HTMLInputElement;
  const imagePreview = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img') as HTMLImageElement;
  const previewFilename = document.getElementById('preview-filename');
  const btnRemoveBgImage = document.getElementById('btn-remove-bg-image');
  const uploadLabel = document.getElementById('upload-label');

  fileBgImage?.addEventListener('change', (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        currentConfig.backgroundImageUrl = dataUrl;
        
        previewImg.src = dataUrl;
        previewFilename!.textContent = file.name;
        imagePreview!.style.display = 'flex';
        uploadLabel!.textContent = 'Cambiar Imagen';

        applyStylesToDom();
      };
      reader.readAsDataURL(file);
    }
  });

  btnRemoveBgImage?.addEventListener('click', () => {
    currentConfig.backgroundImageUrl = '';
    fileBgImage.value = '';
    imagePreview!.style.display = 'none';
    uploadLabel!.textContent = 'Subir Imagen (.PNG, .JPG)';
    applyStylesToDom();
  });

  // Card dimensions select
  const selectDimensions = document.getElementById('select-dimensions') as HTMLSelectElement;
  selectDimensions?.addEventListener('change', (e) => {
    const val = (e.target as HTMLSelectElement).value;
    if (val === '70x100') {
      currentConfig.cardWidthMm = 70;
      currentConfig.cardHeightMm = 100;
    } else if (val === '80x115') {
      currentConfig.cardWidthMm = 80;
      currentConfig.cardHeightMm = 115;
    } else if (val === '90x130') {
      currentConfig.cardWidthMm = 90;
      currentConfig.cardHeightMm = 130;
    } else if (val === '60x90') {
      currentConfig.cardWidthMm = 60;
      currentConfig.cardHeightMm = 90;
    }
    applyStylesToDom();
    renderAllCards();
  });

  // Font family select
  const selectFont = document.getElementById('select-font') as HTMLSelectElement;
  selectFont?.addEventListener('change', (e) => {
    currentConfig.fontFamily = (e.target as HTMLSelectElement).value;
    applyStylesToDom();
  });

  // Border radius slider
  const rangeRadius = document.getElementById('range-radius') as HTMLInputElement;
  rangeRadius?.addEventListener('input', (e) => {
    const val = parseInt((e.target as HTMLInputElement).value);
    currentConfig.borderRadius = val;
    document.getElementById('val-radius')!.textContent = `${val}px`;
    applyStylesToDom();
  });

  // Glassmorphism switch
  const switchGlass = document.getElementById('switch-glass') as HTMLInputElement;
  switchGlass?.addEventListener('change', (e) => {
    currentConfig.glassmorphism = (e.target as HTMLInputElement).checked;
    applyStylesToDom();
  });

  // DYNAMIC COVER AND BRAND CUSTOMIZATIONS
  const inputCoverTitle = document.getElementById('input-cover-title') as HTMLInputElement;
  inputCoverTitle?.addEventListener('input', (e) => {
    currentConfig.coverTitle = (e.target as HTMLInputElement).value || 'WORLD CUP 2026';
    renderAllCards(); // Rerender cover content
  });

  const inputCoverSubtitle = document.getElementById('input-cover-subtitle') as HTMLInputElement;
  inputCoverSubtitle?.addEventListener('input', (e) => {
    currentConfig.coverSubtitle = (e.target as HTMLInputElement).value || 'CALENDARIO DE PARTIDOS';
    renderAllCards(); // Rerender cover content
  });

  const switchShowTrophy = document.getElementById('switch-show-trophy') as HTMLInputElement;
  switchShowTrophy?.addEventListener('change', (e) => {
    currentConfig.showCoverTrophy = (e.target as HTMLInputElement).checked;
    renderAllCards();
  });

  // Cover Illustration Image Upload
  const fileCoverIllustration = document.getElementById('file-cover-illustration') as HTMLInputElement;
  const coverPreview = document.getElementById('cover-preview');
  const coverPreviewImg = document.getElementById('cover-preview-img') as HTMLImageElement;
  const coverPreviewFilename = document.getElementById('cover-preview-filename');
  const btnRemoveCoverIllustration = document.getElementById('btn-remove-cover-illustration');
  const coverUploadLabel = document.getElementById('cover-upload-label');

  fileCoverIllustration?.addEventListener('change', (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        currentConfig.coverIllustrationUrl = dataUrl;
        
        coverPreviewImg.src = dataUrl;
        coverPreviewFilename!.textContent = file.name;
        coverPreview!.style.display = 'flex';
        coverUploadLabel!.textContent = 'Cambiar Ilustración';

        renderAllCards();
      };
      reader.readAsDataURL(file);
    }
  });

  btnRemoveCoverIllustration?.addEventListener('click', () => {
    currentConfig.coverIllustrationUrl = '';
    fileCoverIllustration.value = '';
    coverPreview!.style.display = 'none';
    coverUploadLabel!.textContent = 'Subir Imagen de Tapa';
    renderAllCards();
  });

  // Brand text signature
  const inputBrandSig = document.getElementById('input-brand-sig') as HTMLInputElement;
  inputBrandSig?.addEventListener('input', (e) => {
    currentConfig.brandSignature = (e.target as HTMLInputElement).value;
    renderAllCards(); // Rerender all watermarks
  });

  // Brand Logo Image Upload
  const fileBrandLogo = document.getElementById('file-brand-logo') as HTMLInputElement;
  const logoPreview = document.getElementById('logo-preview');
  const logoPreviewImg = document.getElementById('logo-preview-img') as HTMLImageElement;
  const logoPreviewFilename = document.getElementById('logo-preview-filename');
  const btnRemoveBrandLogo = document.getElementById('btn-remove-brand-logo');
  const logoUploadLabel = document.getElementById('logo-upload-label');

  fileBrandLogo?.addEventListener('change', (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        currentConfig.brandLogoUrl = dataUrl;
        
        logoPreviewImg.src = dataUrl;
        logoPreviewFilename!.textContent = file.name;
        logoPreview!.style.display = 'flex';
        logoUploadLabel!.textContent = 'Cambiar Logo';

        renderAllCards();
      };
      reader.readAsDataURL(file);
    }
  });

  btnRemoveBrandLogo?.addEventListener('click', () => {
    currentConfig.brandLogoUrl = '';
    fileBrandLogo.value = '';
    logoPreview!.style.display = 'none';
    logoUploadLabel!.textContent = 'Subir Logo de Marca (.PNG transparente)';
    renderAllCards();
  });

  // PRINTING OPTIONS
  const switchCutLines = document.getElementById('switch-cut-lines') as HTMLInputElement;
  switchCutLines?.addEventListener('change', (e) => {
    currentConfig.showCutLines = (e.target as HTMLInputElement).checked;
    
    // Toggle class on screen wrappers for visual feedback
    const containers = document.querySelectorAll('.card-container');
    containers.forEach(el => {
      if (currentConfig.showCutLines) {
        el.classList.add('has-cut-lines');
      } else {
        el.classList.remove('has-cut-lines');
      }
    });
  });

  const switchExcludeCover = document.getElementById('switch-exclude-cover') as HTMLInputElement;
  switchExcludeCover?.addEventListener('change', (e) => {
    currentConfig.excludeCoverFromSheets = (e.target as HTMLInputElement).checked;
    
    // Update cover wrapper
    const coverWrapper = document.getElementById('card-wrapper-tapa');
    if (coverWrapper) {
      if (currentConfig.excludeCoverFromSheets) {
        coverWrapper.classList.add('exclude-from-sheets');
        coverWrapper.classList.add('print-page-break');
      } else {
        coverWrapper.classList.remove('exclude-from-sheets');
        coverWrapper.classList.remove('print-page-break');
      }
    }
    renderAllCards();
  });


}

// Update the gradient formula based on primary and ending color
function updateBackgroundGradient(): void {
  const gradEnd = (document.getElementById('color-grad-end') as HTMLInputElement).value;
  currentConfig.backgroundGradient = `linear-gradient(135deg, ${gradEnd} 0%, ${currentConfig.secondaryColor} 50%, ${currentConfig.primaryColor} 100%)`;
  applyStylesToDom();
}

// Push all layout and dynamic design parameters to CSS custom variables and DOM classes
function applyStylesToDom(): void {
  const root = document.documentElement;

  // Set style variables dynamically
  root.style.setProperty('--card-width-mm', String(currentConfig.cardWidthMm));
  root.style.setProperty('--card-height-mm', String(currentConfig.cardHeightMm));
  
  root.style.setProperty('--font-family', currentConfig.fontFamily);
  root.style.setProperty('--border-radius', `${currentConfig.borderRadius}px`);
  root.style.setProperty('--primary-color', currentConfig.primaryColor);
  root.style.setProperty('--secondary-color', currentConfig.secondaryColor);
  root.style.setProperty('--accent-color', currentConfig.accentColor);
  root.style.setProperty('--text-primary', currentConfig.textColor);
  
  // High contrast adjustments for icons and scores text
  root.style.setProperty('--score-text', currentConfig.primaryColor);

  // Borders opacity based on primary
  root.style.setProperty('--border-color', `${currentConfig.textColor}26`); // 15% opacity hex
  root.style.setProperty('--card-bg', `${currentConfig.primaryColor}73`); // 45% opacity hex

  if (currentConfig.backgroundType === 'gradient') {
    root.style.setProperty('--bg-gradient', currentConfig.backgroundGradient);
    root.style.setProperty('--solid-color', currentConfig.primaryColor);
  } else {
    root.style.setProperty('--bg-gradient', currentConfig.primaryColor);
    root.style.setProperty('--solid-color', currentConfig.primaryColor);
  }

  // Handle background image layer
  const cardInners = document.querySelectorAll('.card-inner');
  cardInners.forEach(card => {
    // Glassmorphism check
    if (currentConfig.glassmorphism) {
      card.classList.add('glass-active');
    } else {
      card.classList.remove('glass-active');
    }

    // Custom background image layer
    const existingImg = card.querySelector('.card-bg-image-layer');
    if (currentConfig.backgroundImageUrl) {
      card.classList.add('has-bg-image');
      if (existingImg) {
        (existingImg as HTMLImageElement).src = currentConfig.backgroundImageUrl;
      } else {
        const bgImg = document.createElement('img');
        bgImg.className = 'card-bg-image-layer';
        bgImg.src = currentConfig.backgroundImageUrl;
        card.insertBefore(bgImg, card.firstChild);
      }
    } else {
      card.classList.remove('has-bg-image');
      existingImg?.remove();
    }
  });
}

// Setup ZIP and Print trigger actions
function setupExportListeners(): void {
  // ZIP download button
  const btnDownloadZip = document.getElementById('btn-download-zip');
  const modalProgress = document.getElementById('modal-progress');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const progressTitle = document.getElementById('progress-title');

  btnDownloadZip?.addEventListener('click', async () => {
    // Collect all card container DOM elements
    const elementsToExport: { name: string; element: HTMLElement }[] = [];
    const cards = getCardsList();

    cards.forEach((card) => {
      const el = document.getElementById(`card-container-${card.id}`);
      if (el) {
        elementsToExport.push({ name: card.name, element: el });
      }
    });

    if (elementsToExport.length === 0) return;

    // Show progress modal
    modalProgress?.classList.add('active');
    progressTitle!.textContent = 'Preparando Archivos';
    progressText!.textContent = 'Estableciendo formatos vectoriales...';
    progressBar!.style.width = '0%';

    try {
      // Trigger batch exporter
      const zipBlob = await exportAllToZip(
        elementsToExport, 
        (current, total, phase) => {
          const percent = Math.round((current / total) * 100);
          progressBar!.style.width = `${percent}%`;
          progressText!.textContent = `${phase} (${percent}%)`;
        },
        currentConfig.cardWidthMm,
        currentConfig.cardHeightMm
      );

      // Trigger download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `fixture_mundial_2026_${currentConfig.cardWidthMm}x${currentConfig.cardHeightMm}mm.zip`;
      link.click();

      showToast('¡Archivo ZIP descargado con éxito!');
    } catch (err) {
      console.error(err);
      showToast('Ocurrió un error al generar el ZIP.', '#ef4444');
    } finally {
      // Close progress modal
      setTimeout(() => {
        modalProgress?.classList.remove('active');
      }, 500);
    }
  });

  // Direct browser printing
  const btnPrintNative = document.getElementById('btn-print-native');
  btnPrintNative?.addEventListener('click', () => {
    showToast('Abriendo ventana de impresión...');
    window.print();
  });
}

// Show a temporary success toast notification
function showToast(message: string, bgColor = '#10b981'): void {
  const toast = document.getElementById('toast-message');
  if (!toast) return;

  toast.textContent = message;
  toast.style.backgroundColor = bgColor;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}
