import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { DesignConfig } from './types';
import { GROUPS, PLAYOFFS } from './data/matchesData';
import { Sidebar } from './components/Sidebar';
import { FixtureCard } from './components/cards/FixtureCard';
import { FlyerFrente } from './components/flyer/FlyerFrente';
import { FlyerDorso } from './components/flyer/FlyerDorso';
import { PosterA4 } from './components/cards/PosterA4';
import { FoldingA4 } from './components/cards/FoldingA4';
import {
  exportToPng,
  exportToPdf,
  exportAllToZip,
  exportPliegoA4Pdf,
  exportPliegoA5Pdf,
  exportFlyerPliegoPdf,
  captureDomElementToPng,
  captureDomElementToJpeg
} from './utils/exporter';

const initialConfig: DesignConfig = {
  primaryColor: '#0d5c3a',
  secondaryColor: '#1b8555',
  accentColor: '#ffd700',
  textColor: '#ffffff',
  borderColor: 'rgba(255, 255, 255, 0.15)',
  cardBgColor: 'rgba(14, 52, 37, 0.45)',
  showMatchRowBackground: true,
  fontFamily: "'Outfit', sans-serif",
  borderRadius: 0,
  backgroundType: 'gradient',
  backgroundGradient: 'linear-gradient(135deg, #093c24 0%, #1b8555 100%)',
  solidColor: '#0d5c3a',
  backgroundImageUrl: '',
  glassmorphism: false,
  formatMode: 'cards',

  // Customizations
  brandSignature: '',
  brandLogoUrl: '',
  brandLogoScale: 100,
  brandInstagram: '',
  brandPhone: '',
  brandAddress: '',
  brandFontFamily: 'inherit',
  brandFontSize: 8,
  brandTextColor: 'rgba(255, 255, 255, 0.5)',
  showBrandingCover: true,
  showBrandingBack: true,
  showBrandingCards: true,
  coverTitle: 'WORLD CUP 2026',
  coverSubtitle: 'CALENDARIO DE PARTIDOS',
  cafecitoUrl: 'https://cafecito.app/ginialtech',
  excludeCoverFromSheets: false,
  showCutLines: true,
  pliegoDoubleSided: true,

  // Custom dimensions (in mm)
  cardWidthMm: 70,
  cardHeightMm: 100,

  // Cover details
  showCoverTrophy: true,
  coverIllustrationUrl: '',
  coverBgColor: '#0d5c3a',
  coverBgImageUrl: '',
  coverIllustrationScale: 100,
  coverIllustrationY: 0,
  coverIllustrationOpacity: 1.0,
  coverTitleFontFamily: 'inherit',
  coverTitleColor: '#ffffff',
  coverTitleSize: 2.2,
  coverSubtitleColor: '#ffd700',
  coverSubtitleFontFamily: 'inherit',
  applyCoverTypographyToAllCards: false,
  showCoverYear: true,
  useFifaCode: true,

  // Advanced typography options
  titleFontFamily: 'inherit',
  bodyFontFamily: 'inherit',
  titleTextColor: '#ffd700',
  bodyTextColor: '#ffffff',
  fontSizeScale: 1.0,

  backTitleFontFamily: 'inherit',
  backSubtitleFontFamily: 'inherit',
  backSubtitleTextColor: '#ffd700',
  backBodyFontFamily: 'inherit',

  // Advanced background image controls
  bgImageScale: 100,
  bgImageX: 50,
  bgImageY: 50,
  bgImageOpacity: 100,

  // Trophy horizontal displacement
  coverIllustrationX: 0,
};


const LOCAL_STORAGE_KEY = 'fixture_maker_config_v3';

export const App: React.FC = () => {
  const [config, setConfig] = useState<DesignConfig>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading config from localStorage:', e);
    }
    return initialConfig;
  });
  const [zipOption, setZipOption] = useState<'all' | 'png' | 'pdf'>('all');
  const [loadingMsg, setLoadingMsg] = useState<string>('');
  const [progress, setProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Auto-save configuration to localStorage on changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const handleResetConfig = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setConfig(initialConfig);
  };

  // Dynamic Google Font Loader
  useEffect(() => {
    const fontsToLoad = new Set<string>();
    if (config.fontFamily) fontsToLoad.add(config.fontFamily);
    if (config.titleFontFamily && config.titleFontFamily !== 'inherit') fontsToLoad.add(config.titleFontFamily);
    if (config.bodyFontFamily && config.bodyFontFamily !== 'inherit') fontsToLoad.add(config.bodyFontFamily);
    if (config.coverTitleFontFamily && config.coverTitleFontFamily !== 'inherit') fontsToLoad.add(config.coverTitleFontFamily);

    const fontNames = Array.from(fontsToLoad).map(f => f.split(',')[0].replace(/'/g, '').trim());
    if (fontNames.length === 0) return;

    const linkId = 'dynamic-google-font';
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    // Combine into a single Google Fonts request
    const familiesParam = fontNames
      .map(name => `family=${name.replace(/ /g, '+')}:wght@400;700;800;900`)
      .join('&');
    link.href = `https://fonts.googleapis.com/css2?${familiesParam}&display=swap`;
  }, [config.fontFamily, config.titleFontFamily, config.bodyFontFamily, config.coverTitleFontFamily]);




  // Construct virtual card arrays for PDF, ZIP, and pliegos exports
  const getCardsList = () => {
    const list = [
      { id: 'tapa', name: 'Portada', element: <FixtureCard type="cover" config={config} /> },
    ];

    GROUPS.forEach((g) => {
      list.push({
        id: `grupo_${g.name.toLowerCase()}`,
        name: `Grupo ${g.name}`,
        element: <FixtureCard type="group" data={g} config={config} />,
      });
    });

    list.push(
      { id: 'dieciseisavos_1', name: 'Dieciseisavos - Parte 1', element: <FixtureCard type="dieciseisavos" data={{ ...PLAYOFFS[0], name: 'DIECISEISAVOS - PARTE 1' }} config={config} /> },
      { id: 'dieciseisavos_2', name: 'Dieciseisavos - Parte 2', element: <FixtureCard type="dieciseisavos" data={{ ...PLAYOFFS[1], name: 'DIECISEISAVOS - PARTE 2' }} config={config} /> },
      { id: 'octavos', name: 'Octavos', element: <FixtureCard type="octavos" data={PLAYOFFS[2]} config={config} /> },
      { id: 'cuartos', name: 'Cuartos', element: <FixtureCard type="cuartos" data={PLAYOFFS[3]} config={config} /> },
      { id: 'final', name: 'Fase Final', element: <FixtureCard type="final" data={PLAYOFFS[4]} config={config} /> },
      { id: 'dorso', name: 'Reverso Tarjeta', element: <FixtureCard type="back" config={config} /> }
    );

    return list;
  };

  const handleExport = async (mode: 'pdf' | 'png' | 'zip' | 'pliegoA4' | 'pliegoA5' | 'flyerPliego') => {
    try {
      if (mode === 'zip') {
        setLoadingMsg('Iniciando empaquetado de tarjetas...');
        setProgress({ current: 0, total: 19 });

        const cards = getCardsList().map(c => ({ name: c.name, id: `export-card-${c.id}` }));
        const zipBlob = await exportAllToZip(
          cards,
          (curr, tot, msg) => {
            setProgress({ current: curr, total: tot });
            setLoadingMsg(msg);
          },
          config.cardWidthMm,
          config.cardHeightMm,
          zipOption
        );

        // Download zip
        const link = document.createElement('a');
        link.download = `fixture_2026_pack.zip`;
        link.href = URL.createObjectURL(zipBlob);
        link.click();
      }

      else if (mode === 'pliegoA4') {
        setLoadingMsg('Generando pliego A4...');

        const fronts: string[] = [];
        const backs: string[] = [];

        if (!config.excludeCoverFromSheets) {
          fronts.push('export-card-tapa');
          backs.push('export-card-dorso');
        }

        GROUPS.forEach((g) => {
          fronts.push(`export-card-grupo_${g.name.toLowerCase()}`);
          backs.push('export-card-dorso');
        });

        fronts.push(
          'export-card-dieciseisavos_1',
          'export-card-dieciseisavos_2',
          'export-card-octavos',
          'export-card-cuartos',
          'export-card-final'
        );

        while (backs.length < fronts.length) {
          backs.push('export-card-dorso');
        }

        const pdf = await exportPliegoA4Pdf(
          fronts,
          backs,
          config.showCutLines,
          config.pliegoDoubleSided ?? true,
          config.cardWidthMm,
          config.cardHeightMm,
          (curr, tot, msg) => {
            setProgress({ current: curr, total: tot });
            setLoadingMsg(msg);
          }
        );
        const fazText = config.pliegoDoubleSided ? 'doble_faz' : 'simple_faz';
        pdf.save(`pliego_A4_fixture_${fazText}.pdf`);
      }

      else if (mode === 'pliegoA5') {
        setLoadingMsg('Generando pliego A5...');

        const fronts: string[] = [];
        const backs: string[] = [];

        if (!config.excludeCoverFromSheets) {
          fronts.push('export-card-tapa');
          backs.push('export-card-dorso');
        }

        GROUPS.forEach((g) => {
          fronts.push(`export-card-grupo_${g.name.toLowerCase()}`);
          backs.push('export-card-dorso');
        });

        fronts.push(
          'export-card-dieciseisavos_1',
          'export-card-dieciseisavos_2',
          'export-card-octavos',
          'export-card-cuartos',
          'export-card-final'
        );

        while (backs.length < fronts.length) {
          backs.push('export-card-dorso');
        }

        const pdf = await exportPliegoA5Pdf(
          fronts,
          backs,
          config.showCutLines,
          config.pliegoDoubleSided ?? true,
          config.cardWidthMm,
          config.cardHeightMm,
          (curr, tot, msg) => {
            setProgress({ current: curr, total: tot });
            setLoadingMsg(msg);
          }
        );
        const fazText = config.pliegoDoubleSided ? 'doble_faz' : 'simple_faz';
        pdf.save(`pliego_A5_fixture_${fazText}.pdf`);
      }

      else if (mode === 'flyerPliego') {
        setLoadingMsg('Generando pliego flyer doble faz...');

        const pdf = await exportFlyerPliegoPdf(
          'export-flyer-frente',
          'export-flyer-dorso-mirrored',
          (curr, tot, msg) => {
            setProgress({ current: curr, total: tot });
            setLoadingMsg(msg);
          }
        );
        pdf.save('flyer_A4_horizontal_pliego.pdf');
      }

      else if (mode === 'pdf' && config.formatMode === 'poster') {
        setLoadingMsg('Generando PDF del Póster A4...');
        const jpegData = await captureDomElementToJpeg('export-poster', 210, 297);
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        pdf.addImage(jpegData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
        pdf.save('poster_A4_fixture_2026.pdf');
      }

      else if (mode === 'pdf' && config.formatMode === 'folding') {
        setLoadingMsg('Generando PDF del Plegable A4...');
        const jpegData = await captureDomElementToJpeg('export-folding-a4', 297, 210);
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        pdf.addImage(jpegData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
        pdf.save('fixture_2026_plegable.pdf');
      }

      else if (mode === 'png' && config.formatMode === 'folding') {
        setLoadingMsg('Generando imagen del Plegable A4...');
        const pngData = await captureDomElementToPng('export-folding-a4', 297, 210);
        const link = document.createElement('a');
        link.download = 'fixture_2026_plegable.png';
        link.href = pngData;
        link.click();
      }
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al exportar. Revisa la consola.');
    } finally {
      setLoadingMsg('');
      setProgress({ current: 0, total: 0 });
    }
  };

  const handleDownloadSingle = async (cardId: string, cardName: string, format: 'png' | 'pdf') => {
    let targetId = '';
    let w = config.cardWidthMm;
    let h = config.cardHeightMm;

    if (cardId === 'flyer-frente') {
      targetId = 'export-flyer-frente';
      w = 297;
      h = 105;
    } else if (cardId === 'flyer-dorso') {
      targetId = 'export-flyer-dorso';
      w = 297;
      h = 105;
    } else if (cardId === 'poster') {
      targetId = 'export-poster';
      w = 210;
      h = 297;
    } else if (cardId === 'folding') {
      targetId = 'export-folding-a4';
      w = 297;
      h = 210;
    } else {
      targetId = `export-card-${cardId}`;
    }

    const container = document.getElementById(targetId);
    if (!container) {
      alert(`Error: No se encontró el elemento ${targetId} en el DOM.`);
      return;
    }

    setLoadingMsg(`Generando ${format.toUpperCase()} para ${cardName}...`);
    try {
      const targetEl = container.querySelector('.card-container') as HTMLElement || container;

      if (format === 'png') {
        await exportToPng(targetEl, `${cardId}_fixture`, true, w, h);
      } else if (format === 'pdf') {
        await exportToPdf(targetEl, `${cardId}_fixture`, true, w, h);
      }
    } catch (e) {
      console.error(e);
      alert('Error descargando archivo.');
    } finally {
      setLoadingMsg('');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#051810] relative">
      {/* Black transparent backdrop for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar controls */}
      <Sidebar
        config={config}
        onChange={setConfig}
        onExport={handleExport}
        zipOption={zipOption}
        setZipOption={setZipOption}
        onResetConfig={handleResetConfig}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Floating Gear button for mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-[#1b8555] hover:bg-[#239f67] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center border border-white/20 transition-all active:scale-95 text-lg"
        title="Configuración"
      >
        ⚙️
      </button>

      {/* Main Workspace Workspace */}
      <main className="flex-grow flex flex-col h-full overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-14 border-b border-[#15462E] bg-black/20 flex items-center justify-between px-6 select-none shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-extrabold text-sm uppercase tracking-wider">
              Área de Trabajo y Previsualización
            </h2>
            <span className="text-[10px] text-white/40 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
              {config.formatMode === 'cards' ? 'Tarjetas Separadas' : config.formatMode === 'flyer' ? 'Folleto Horizontal' : config.formatMode === 'folding' ? 'Plegable A4' : 'Póster A4'}
            </span>
          </div>
          <span className="text-[10px] text-[#ffd700] font-black uppercase tracking-widest bg-[#ffd700]/10 border border-[#ffd700]/20 px-2.5 py-0.5 rounded-full">
            Medidas: {config.formatMode === 'cards' ? `${config.cardWidthMm}x${config.cardHeightMm}mm` : config.formatMode === 'flyer' ? '297x105mm' : config.formatMode === 'folding' ? 'A4 Plegable 297x210mm' : 'A4 210x297mm'}
          </span>
        </header>

        {/* Scrollable grid contents */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar relative">

          {/* FORMAT MODE: CARDS GRID (18 CARDS) */}
          {config.formatMode === 'cards' && (
            <div className="flex flex-wrap justify-center gap-8 p-4">
              {getCardsList().map((card) => (
                <div
                  key={card.id}
                  id={`preview-card-${card.id}`}
                  className="flex flex-col items-center bg-black/25 border border-[#15462E]/60 p-4 rounded-xl shadow-xl hover:border-[#15462E] transition-all group w-fit shrink-0"
                >
                  <div className="flex justify-between items-center w-full mb-2 px-1 text-[10px] font-extrabold text-white/50 uppercase tracking-wider">
                    <span>{card.name}</span>
                  </div>

                  {/* Card element wrapper with scale preview style */}
                  <div className="overflow-hidden border border-white/5 rounded shadow-lg bg-black/20 relative">
                    {card.element}
                  </div>

                  {/* Single actions bar */}
                  <div className="flex gap-1.5 w-full mt-3">
                    <button
                      onClick={() => handleDownloadSingle(card.id, card.name, 'png')}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[9px] font-bold py-1 px-1.5 rounded flex items-center justify-center gap-1 transition-all"
                    >
                      PNG
                    </button>
                    <button
                      onClick={() => handleDownloadSingle(card.id, card.name, 'pdf')}
                      className="flex-1 bg-[#1b8555] hover:bg-[#239f67] text-white text-[9px] font-bold py-1 px-1.5 rounded flex items-center justify-center gap-1 transition-all"
                    >
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FORMAT MODE: FLYER PREVIEW */}
          {config.formatMode === 'flyer' && (
            <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">

              {/* Flyer Frente */}
              <div
                id="preview-card-flyer-frente"
                className="flex flex-col items-center bg-black/25 border border-[#15462E]/60 p-4 rounded-xl w-full"
              >
                <div className="flex justify-between items-center w-full mb-3 text-[10px] font-extrabold text-white/50 uppercase tracking-widest">
                  <span>Folleto Frente (4 columnas x 3 grupos)</span>
                  <span className="text-[#ffd700]">297x105mm</span>
                </div>
                <div className="overflow-x-auto w-full flex justify-center pb-2">
                  <div className="border border-white/10 rounded shadow-2xl shrink-0">
                    <FlyerFrente groups={GROUPS} config={config} />
                  </div>
                </div>
                <div className="flex gap-2 w-full mt-3 max-w-xs">
                  <button
                    onClick={() => handleDownloadSingle('flyer-frente', 'Flyer Frente', 'png')}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold py-1.5 px-3 rounded transition-all"
                  >
                    Descargar PNG
                  </button>
                  <button
                    onClick={() => handleDownloadSingle('flyer-frente', 'Flyer Frente', 'pdf')}
                    className="flex-1 bg-[#1b8555] hover:bg-[#239f67] text-white text-[10px] font-bold py-1.5 px-3 rounded transition-all"
                  >
                    Descargar PDF
                  </button>
                </div>
              </div>

              {/* Flyer Dorso */}
              <div
                id="preview-card-flyer-dorso"
                className="flex flex-col items-center bg-black/25 border border-[#15462E]/60 p-4 rounded-xl w-full"
              >
                <div className="flex justify-between items-center w-full mb-3 text-[10px] font-extrabold text-white/50 uppercase tracking-widest">
                  <span>Folleto Dorso (Árbol completo de Fase Final)</span>
                  <span className="text-[#ffd700]">297x105mm</span>
                </div>
                <div className="overflow-x-auto w-full flex justify-center pb-2">
                  <div className="border border-white/10 rounded shadow-2xl shrink-0">
                    <FlyerDorso phases={PLAYOFFS} config={config} isMirrored={false} />
                  </div>
                </div>
                <div className="flex gap-2 w-full mt-3 max-w-xs">
                  <button
                    onClick={() => handleDownloadSingle('flyer-dorso', 'Flyer Dorso', 'png')}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold py-1.5 px-3 rounded transition-all"
                  >
                    Descargar PNG
                  </button>
                  <button
                    onClick={() => handleDownloadSingle('flyer-dorso', 'Flyer Dorso', 'pdf')}
                    className="flex-1 bg-[#1b8555] hover:bg-[#239f67] text-white text-[10px] font-bold py-1.5 px-3 rounded transition-all"
                  >
                    Descargar PDF
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* FORMAT MODE: POSTER PREVIEW */}
          {config.formatMode === 'poster' && (
            <div className="flex flex-col items-center max-w-lg mx-auto">
              <div
                id="preview-card-poster"
                className="flex flex-col items-center bg-black/25 border border-[#15462E]/60 p-4 rounded-xl w-full"
              >
                <div className="flex justify-between items-center w-full mb-3 text-[10px] font-extrabold text-white/50 uppercase tracking-widest">
                  <span>Póster Completo A4</span>
                  <span className="text-[#ffd700]">210x297mm</span>
                </div>
                <div className="border border-white/10 rounded shadow-2xl overflow-hidden">
                  <PosterA4 groups={GROUPS} phases={PLAYOFFS} config={config} />
                </div>
                <div className="flex gap-2 w-full mt-4 max-w-xs">
                  <button
                    onClick={() => handleDownloadSingle('poster', 'Poster A4', 'png')}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold py-2 px-3 rounded transition-all"
                  >
                    Descargar PNG
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex-1 bg-[#1b8555] hover:bg-[#239f67] text-white text-[10px] font-bold py-2 px-3 rounded transition-all"
                  >
                    Descargar PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FORMAT MODE: FOLDING A4 PREVIEW */}
          {config.formatMode === 'folding' && (
            <div className="flex flex-col items-center max-w-4xl mx-auto">
              <div
                id="preview-card-folding"
                className="flex flex-col items-center bg-black/25 border border-[#15462E]/60 p-4 rounded-xl w-full"
              >
                <div className="flex justify-between items-center w-full mb-3 text-[10px] font-extrabold text-white/50 uppercase tracking-widest">
                  <span>Fixture Plegable A4 (Frente Simple Faz para doblar)</span>
                  <span className="text-[#ffd700]">297x210mm</span>
                </div>
                <div className="overflow-x-auto w-full flex justify-center pb-2">
                  <div className="border border-white/10 rounded shadow-2xl shrink-0">
                    <FoldingA4 groups={GROUPS} phases={PLAYOFFS} config={config} />
                  </div>
                </div>
                <div className="flex gap-2 w-full mt-3 max-w-xs">
                  <button
                    onClick={() => handleExport('png')}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold py-1.5 px-3 rounded transition-all"
                  >
                    Descargar PNG
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex-1 bg-[#1b8555] hover:bg-[#239f67] text-white text-[10px] font-bold py-1.5 px-3 rounded transition-all"
                  >
                    Descargar PDF
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Global Loading / Export Overlay Toast */}
        {loadingMsg && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center z-50 select-none">
            <div className="bg-[#072418] border border-[#15462E] p-6 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-2xl animate-fade-in">
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-[#ffd700]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <h3 className="font-extrabold text-[#ffd700] text-sm uppercase tracking-wider">
                Procesando Exportación
              </h3>
              <p className="text-[10px] text-white/50 uppercase tracking-widest">
                Esto puede llevar unos minutos<span className="animate-pulse">...</span>
              </p>
              <p className="text-xs text-white/80 leading-relaxed font-medium mt-2">
                {loadingMsg}
              </p>
              {progress.total > 0 && (
                <div className="w-full space-y-1">
                  <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden border border-white/5">
                    <div
                      style={{ width: `${(progress.current / progress.total) * 100}%` }}
                      className="bg-[#ffd700] h-full rounded-full transition-all duration-300"
                    />
                  </div>
                  <span className="text-[9px] text-white/40 font-bold tracking-wider">
                    PROGRESO: {progress.current} / {progress.total}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Contenedor oculto en el DOM para exportaciones */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: 'auto',
          height: 'auto',
          backgroundColor: 'white',
          // CSS custom properties for elastic card scale inheritance
          '--card-width-mm': `${config.cardWidthMm}`,
          '--card-height-mm': `${config.cardHeightMm}`,
        } as React.CSSProperties}
      >
        {/* Renderizado de todas las 19 tarjetas */}
        <div id="export-card-tapa">
          <FixtureCard type="cover" config={config} />
        </div>
        {GROUPS.map((g) => (
          <div key={`export-card-grupo_${g.name.toLowerCase()}`} id={`export-card-grupo_${g.name.toLowerCase()}`}>
            <FixtureCard type="group" data={g} config={config} />
          </div>
        ))}
        <div id="export-card-dieciseisavos_1">
          <FixtureCard type="dieciseisavos" data={{ ...PLAYOFFS[0], name: 'DIECISEISAVOS - PARTE 1' }} config={config} />
        </div>
        <div id="export-card-dieciseisavos_2">
          <FixtureCard type="dieciseisavos" data={{ ...PLAYOFFS[1], name: 'DIECISEISAVOS - PARTE 2' }} config={config} />
        </div>
        <div id="export-card-octavos">
          <FixtureCard type="octavos" data={PLAYOFFS[2]} config={config} />
        </div>
        <div id="export-card-cuartos">
          <FixtureCard type="cuartos" data={PLAYOFFS[3]} config={config} />
        </div>
        <div id="export-card-final">
          <FixtureCard type="final" data={PLAYOFFS[4]} config={config} />
        </div>
        <div id="export-card-dorso">
          <FixtureCard type="back" config={config} />
        </div>

        {/* Renderizado de Flyers */}
        <div id="export-flyer-frente">
          <FlyerFrente groups={GROUPS} config={config} />
        </div>
        <div id="export-flyer-dorso">
          <FlyerDorso phases={PLAYOFFS} config={config} isMirrored={false} />
        </div>
        <div id="export-flyer-dorso-mirrored">
          <FlyerDorso phases={PLAYOFFS} config={config} isMirrored={true} />
        </div>

        {/* Renderizado de Poster */}
        <div id="export-poster">
          <PosterA4 groups={GROUPS} phases={PLAYOFFS} config={config} />
        </div>

        {/* Renderizado de Folding A4 */}
        <div id="export-folding-a4">
          <FoldingA4 groups={GROUPS} phases={PLAYOFFS} config={config} />
        </div>
      </div>
    </div>
  );
};
export default App;
