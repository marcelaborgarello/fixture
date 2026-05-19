import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { DesignConfig } from './types';
import { GROUPS, PLAYOFFS } from './data/matchesData';
import { Sidebar } from './components/Sidebar';
import { FixtureCard } from './components/cards/FixtureCard';
import { FlyerFrente } from './components/flyer/FlyerFrente';
import { FlyerDorso } from './components/flyer/FlyerDorso';
import { PosterA4 } from './components/cards/PosterA4';
import {
  exportToPng,
  exportToSvg,
  exportToPdf,
  exportAllToZip,
  exportPliegoA4Pdf,
  exportPliegoA5Pdf,
  exportFlyerPliegoPdf
} from './utils/exporter';

const initialConfig: DesignConfig = {
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
  formatMode: 'cards',
  
  // Customizations
  brandSignature: '',
  brandLogoUrl: '',
  coverTitle: 'WORLD CUP 2026',
  coverSubtitle: 'CALENDARIO DE PARTIDOS',
  cafecitoUrl: '',
  excludeCoverFromSheets: false,
  showCutLines: true,

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
  showCoverYear: true,
  showCoverFifaText: true,

  useFifaCode: true,
};

export const App: React.FC = () => {
  const [config, setConfig] = useState<DesignConfig>(initialConfig);
  const [zipOption, setZipOption] = useState<'all' | 'png' | 'pdf'>('all');
  const [loadingMsg, setLoadingMsg] = useState<string>('');
  const [progress, setProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });

  // Dynamic Google Font Loader
  useEffect(() => {
    if (config.fontFamily) {
      const fontName = config.fontFamily.split(',')[0].replace(/'/g, '');
      const linkId = 'dynamic-google-font';
      let link = document.getElementById(linkId) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700;800;900&display=swap`;
    }
  }, [config.fontFamily]);

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
      { id: 'dieciseisavos', name: 'Dieciseisavos', element: <FixtureCard type="dieciseisavos" data={PLAYOFFS[0]} config={config} /> },
      { id: 'octavos', name: 'Octavos', element: <FixtureCard type="octavos" data={PLAYOFFS[1]} config={config} /> },
      { id: 'cuartos', name: 'Cuartos', element: <FixtureCard type="cuartos" data={PLAYOFFS[2]} config={config} /> },
      { id: 'final', name: 'Fase Final', element: <FixtureCard type="final" data={PLAYOFFS[3]} config={config} /> },
      { id: 'dorso', name: 'Reverso Tarjeta', element: <FixtureCard type="back" config={config} /> }
    );

    return list;
  };

  const handleExport = async (mode: 'pdf' | 'png' | 'svg' | 'zip' | 'pliegoA4' | 'pliegoA5' | 'flyerPliego') => {
    try {
      if (mode === 'zip') {
        setLoadingMsg('Iniciando empaquetado de tarjetas...');
        setProgress({ current: 0, total: 18 });
        
        const cards = getCardsList().map(c => ({ name: c.name, element: c.element }));
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
        
        // Split cards into fronts & backs, applying "excludeCover" logic
        const fronts: React.ReactElement[] = [];
        const backs: React.ReactElement[] = [];

        if (!config.excludeCoverFromSheets) {
          fronts.push(<FixtureCard type="cover" config={config} />);
          backs.push(<FixtureCard type="back" config={config} />);
        }

        GROUPS.forEach((g) => {
          fronts.push(<FixtureCard type="group" data={g} config={config} />);
          backs.push(<FixtureCard type="back" config={config} />);
        });

        fronts.push(
          <FixtureCard type="dieciseisavos" data={PLAYOFFS[0]} config={config} />,
          <FixtureCard type="octavos" data={PLAYOFFS[1]} config={config} />,
          <FixtureCard type="cuartos" data={PLAYOFFS[2]} config={config} />,
          <FixtureCard type="final" data={PLAYOFFS[3]} config={config} />
        );

        // All backs are standard CardBack
        for (let i = 0; i < fronts.length - backs.length + 1; i++) {
          backs.push(<FixtureCard type="back" config={config} />);
        }

        const pdf = await exportPliegoA4Pdf(
          fronts,
          backs,
          config.showCutLines,
          config.cardWidthMm,
          config.cardHeightMm,
          (curr, tot, msg) => {
            setProgress({ current: curr, total: tot });
            setLoadingMsg(msg);
          }
        );
        pdf.save('pliego_A4_fixture_doble_faz.pdf');
      }

      else if (mode === 'pliegoA5') {
        setLoadingMsg('Generando pliego A5...');

        const fronts: React.ReactElement[] = [];
        const backs: React.ReactElement[] = [];

        if (!config.excludeCoverFromSheets) {
          fronts.push(<FixtureCard type="cover" config={config} />);
          backs.push(<FixtureCard type="back" config={config} />);
        }

        GROUPS.forEach((g) => {
          fronts.push(<FixtureCard type="group" data={g} config={config} />);
          backs.push(<FixtureCard type="back" config={config} />);
        });

        fronts.push(
          <FixtureCard type="dieciseisavos" data={PLAYOFFS[0]} config={config} />,
          <FixtureCard type="octavos" data={PLAYOFFS[1]} config={config} />,
          <FixtureCard type="cuartos" data={PLAYOFFS[2]} config={config} />,
          <FixtureCard type="final" data={PLAYOFFS[3]} config={config} />
        );

        for (let i = 0; i < fronts.length - backs.length + 1; i++) {
          backs.push(<FixtureCard type="back" config={config} />);
        }

        const pdf = await exportPliegoA5Pdf(
          fronts,
          backs,
          config.showCutLines,
          config.cardWidthMm,
          config.cardHeightMm,
          (curr, tot, msg) => {
            setProgress({ current: curr, total: tot });
            setLoadingMsg(msg);
          }
        );
        pdf.save('pliego_A5_fixture_doble_faz.pdf');
      }

      else if (mode === 'flyerPliego') {
        setLoadingMsg('Generando pliego flyer doble faz...');
        
        const frenteEl = <FlyerFrente groups={GROUPS} config={config} />;
        const dorsoEl = <FlyerDorso phases={PLAYOFFS} config={config} isMirrored={true} />;

        const pdf = await exportFlyerPliegoPdf(
          frenteEl,
          dorsoEl,
          (curr, tot, msg) => {
            setProgress({ current: curr, total: tot });
            setLoadingMsg(msg);
          }
        );
        pdf.save('flyer_A4_horizontal_pliego.pdf');
      }

      else if (mode === 'pdf' && config.formatMode === 'poster') {
        setLoadingMsg('Generando PDF del Póster A4...');
        
        const posterEl = <PosterA4 groups={GROUPS} phases={PLAYOFFS} config={config} />;
        const pngData = await (await import('./utils/exporter')).renderComponentToPng(posterEl, 210, 297);
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        pdf.addImage(pngData, 'PNG', 0, 0, 210, 297);
        pdf.save('poster_A4_fixture_2026.pdf');
      }
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al exportar. Revisa la consola.');
    } finally {
      setLoadingMsg('');
      setProgress({ current: 0, total: 0 });
    }
  };

  const handleDownloadSingle = async (cardId: string, cardName: string, format: 'png' | 'svg' | 'pdf') => {
    const el = document.getElementById(`preview-card-${cardId}`);
    if (!el) return;

    // Find card container inner element
    const container = el.querySelector('.card-container') as HTMLElement;
    if (!container) return;

    setLoadingMsg(`Generando ${format.toUpperCase()} para ${cardName}...`);
    try {
      if (format === 'png') {
        await exportToPng(container, `${cardId}_fixture`);
      } else if (format === 'svg') {
        await exportToSvg(container, `${cardId}_fixture`);
      } else if (format === 'pdf') {
        const w = config.formatMode === 'flyer' ? 297 : config.cardWidthMm;
        const h = config.formatMode === 'flyer' ? 105 : config.cardHeightMm;
        await exportToPdf(container, `${cardId}_fixture`, true, w, h);
      }
    } catch (e) {
      console.error(e);
      alert('Error descargando archivo.');
    } finally {
      setLoadingMsg('');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#051810]">
      {/* Sidebar controls */}
      <Sidebar
        config={config}
        onChange={setConfig}
        onExport={handleExport}
        zipOption={zipOption}
        setZipOption={setZipOption}
      />

      {/* Main Workspace Workspace */}
      <main className="flex-grow flex flex-col h-full overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-14 border-b border-[#15462E] bg-black/20 flex items-center justify-between px-6 select-none shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-extrabold text-sm uppercase tracking-wider">
              Área de Trabajo y Previsualización
            </h2>
            <span className="text-[10px] text-white/40 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
              {config.formatMode === 'cards' ? 'Tarjetas Separadas' : config.formatMode === 'flyer' ? 'Folleto Horizontal' : 'Póster A4'}
            </span>
          </div>
          <span className="text-[10px] text-[#ffd700] font-black uppercase tracking-widest bg-[#ffd700]/10 border border-[#ffd700]/20 px-2.5 py-0.5 rounded-full">
            Medidas: {config.formatMode === 'cards' ? `${config.cardWidthMm}x${config.cardHeightMm}mm` : config.formatMode === 'flyer' ? '297x105mm' : 'A4 210x297mm'}
          </span>
        </header>

        {/* Scrollable grid contents */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
          
          {/* FORMAT MODE: CARDS GRID (18 CARDS) */}
          {config.formatMode === 'cards' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
              {getCardsList().map((card) => (
                <div
                  key={card.id}
                  id={`preview-card-${card.id}`}
                  className="flex flex-col items-center bg-black/25 border border-[#15462E]/60 p-3 rounded-xl shadow-xl hover:border-[#15462E] transition-all group"
                >
                  <div className="flex justify-between items-center w-full mb-2 px-1 text-[10px] font-extrabold text-white/50 uppercase tracking-wider">
                    <span>{card.name}</span>
                    <span className="text-[9px] text-[#ffd700] bg-[#ffd700]/10 px-1 py-[1px] rounded">
                      {config.cardWidthMm}x{config.cardHeightMm}mm
                    </span>
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
                      onClick={() => handleDownloadSingle(card.id, card.name, 'svg')}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[9px] font-bold py-1 px-1.5 rounded flex items-center justify-center gap-1 transition-all"
                    >
                      SVG
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
              <p className="text-xs text-white/80 leading-relaxed font-medium">
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
    </div>
  );
};
export default App;
