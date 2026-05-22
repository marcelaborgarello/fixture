import React, { useState, useEffect } from 'react';

import { DesignConfig } from './types';
import { GROUPS, PLAYOFFS } from './data/matchesData';
import { Sidebar } from './components/Sidebar';
import { FixtureCard } from './components/cards/FixtureCard';
import {
  exportToPng,
  exportToPdf,
  exportAllToZip,
  exportPliegoA4Pdf,
  exportPliegoA5Pdf
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
  bindingMargin: 'none',

  // Custom dimensions (in mm)
  cardWidthMm: 70,
  cardHeightMm: 100,

  // Cover details
  showCoverTrophy: true,
  coverIllustrationUrl: '',
  coverBgColor: '',
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


const LOCAL_STORAGE_KEY = 'fixture_config_v5';

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
    return { ...initialConfig, formatMode: 'cards' };
  });

  const handleConfigChange = (newConfig: DesignConfig) => {
    setConfig(newConfig);
  };
  const [zipOption, setZipOption] = useState<'all' | 'png' | 'pdf'>('all');
  const [loadingMsg, setLoadingMsg] = useState<string>('');
  const [progress, setProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Auto-save configuration to localStorage on changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const handleResetConfig = () => {
    setConfig({ ...initialConfig, formatMode: 'cards' });
  };

  // Preload all available sport fonts on mount so they're ready when user selects them
  useEffect(() => {
    const preloadLink = document.createElement('link');
    preloadLink.id = 'sport-fonts-preload';
    preloadLink.rel = 'stylesheet';
    preloadLink.crossOrigin = 'anonymous';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800;900&family=Montserrat:wght@400;700;800;900&family=Poppins:wght@400;700;800&family=Inter:wght@400;700;800&family=Bebas+Neue&family=Anton&family=Russo+One&family=Barlow+Condensed:wght@400;700;800;900&family=Rajdhani:wght@400;600;700&family=Teko:wght@400;600;700&family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;700;800&family=Saira+Condensed:wght@400;700;800&display=swap';
    if (!document.getElementById('sport-fonts-preload')) {
      document.head.appendChild(preloadLink);
    }
  }, []);

  // Dynamic Google Font Loader (for per-config font selections)
  useEffect(() => {
    const fontsToLoad = new Set<string>();
    if (config.fontFamily) fontsToLoad.add(config.fontFamily);
    if (config.titleFontFamily && config.titleFontFamily !== 'inherit') fontsToLoad.add(config.titleFontFamily);
    if (config.bodyFontFamily && config.bodyFontFamily !== 'inherit') fontsToLoad.add(config.bodyFontFamily);
    if (config.coverTitleFontFamily && config.coverTitleFontFamily !== 'inherit') fontsToLoad.add(config.coverTitleFontFamily);
    if (config.brandFontFamily && config.brandFontFamily !== 'inherit') fontsToLoad.add(config.brandFontFamily);
    if (config.backTitleFontFamily && config.backTitleFontFamily !== 'inherit') fontsToLoad.add(config.backTitleFontFamily);

    const fontNames = Array.from(fontsToLoad).map(f => f.split(',')[0].replace(/'/g, '').trim());
    if (fontNames.length === 0) return;

    const linkId = 'dynamic-google-font';
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }

    // Combine into a single Google Fonts request
    const familiesParam = fontNames
      .map(name => `family=${name.replace(/ /g, '+')}:wght@400;700;800;900`)
      .join('&');
    link.href = `https://fonts.googleapis.com/css2?${familiesParam}&display=swap`;
  }, [config.fontFamily, config.titleFontFamily, config.bodyFontFamily, config.coverTitleFontFamily, config.brandFontFamily, config.backTitleFontFamily]);




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
      { id: 'dieciseisavos_1', name: 'Dieciseisavos P1', element: <FixtureCard type="dieciseisavos" data={PLAYOFFS[0]} config={config} /> },
      { id: 'dieciseisavos_2', name: 'Dieciseisavos P2', element: <FixtureCard type="dieciseisavos" data={PLAYOFFS[1]} config={config} /> },
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
        setProgress({ current: 0, total: 20 });

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
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#051810] relative">
      {/* Mobile Top Toggle Button */}
      <div className="md:hidden shrink-0 bg-[#072418] border-b border-[#15462E] p-3 z-10">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full bg-[#1b8555] hover:bg-[#239f67] text-white p-3 rounded-xl shadow-md font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          ⚙️ {isSidebarOpen ? 'Ocultar Configuraciones' : 'Desplegar Configuraciones'}
        </button>
      </div>

      {/* Sidebar controls */}
      <Sidebar
        config={config}
        onChange={handleConfigChange}
        onExport={handleExport}
        zipOption={zipOption}
        setZipOption={setZipOption}
        onResetConfig={handleResetConfig}
        isOpen={isSidebarOpen}
      />

      {/* Main Workspace Workspace */}
      <main className="flex-grow flex flex-col h-full overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-14 border-b border-[#15462E] bg-black/20 flex items-center justify-between px-6 select-none shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-extrabold text-sm uppercase tracking-wider">
              Área de Trabajo y Previsualización
            </h2>
          </div>
        </header>

        {/* Scrollable grid contents */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar relative">

          {/* FORMAT MODE: CARDS GRID (18 CARDS) */}
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
          <FixtureCard type="dieciseisavos" data={PLAYOFFS[0]} config={config} />
        </div>
        <div id="export-card-dieciseisavos_2">
          <FixtureCard type="dieciseisavos" data={PLAYOFFS[1]} config={config} />
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
      </div>
    </div>
  );
};
export default App;
