import React, { useState } from 'react';
import { DesignConfig } from '../types';

interface SidebarProps {
  config: DesignConfig;
  onChange: (newConfig: DesignConfig) => void;
  onExport: (format: 'pdf' | 'png' | 'zip' | 'pliegoA4' | 'pliegoA5' | 'flyerPliego') => void;
  zipOption: 'all' | 'png' | 'pdf';
  setZipOption: (opt: 'all' | 'png' | 'pdf') => void;
  onResetConfig: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  config,
  onChange,
  onExport,
  zipOption,
  setZipOption,
  onResetConfig,
  isOpen = false,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<string>('format');

  const handleGradientPreset = (primary: string, secondary: string) => {
    onChange({
      ...config,
      primaryColor: primary,
      secondaryColor: secondary,
      backgroundGradient: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`
    });
  };

  const updateConfig = (key: keyof DesignConfig, value: any) => {
    const newConfig = { ...config, [key]: value };

    // Auto-enable short names (useFifaCode) if size is standard 70x100 or smaller (60x90)
    if (key === 'cardWidthMm' || key === 'cardHeightMm') {
      const width = key === 'cardWidthMm' ? value : config.cardWidthMm;
      const height = key === 'cardHeightMm' ? value : config.cardHeightMm;
      if ((width <= 70 && height <= 100) || (width <= 60 && height <= 90)) {
        newConfig.useFifaCode = true;
      }
    }

    onChange(newConfig);
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>, key: keyof DesignConfig) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateConfig(key, event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleTab = (tabName: string) => {
    setActiveTab(activeTab === tabName ? '' : tabName);
  };

  return (
    <aside className={`w-80 h-screen bg-[#072418] text-white flex flex-col border-r border-[#15462E] select-none shrink-0 overflow-hidden shadow-2xl transition-transform duration-300 z-40 fixed md:relative top-0 left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
      {/* Brand Header */}
      <div className="p-4 border-b border-[#15462E] bg-black/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#ffd700] rounded-lg flex items-center justify-center font-black text-[#072418] text-sm">
            🏆
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-wider leading-none">FIXTURE MAKER</h1>
            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Mundial 2026</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] bg-[#1b8555] text-white font-bold py-0.5 px-1.5 rounded-full select-none md:inline-block hidden">
            React v3
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden text-white/60 hover:text-white p-1 text-sm font-bold"
              aria-label="Cerrar panel"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Configuration Accordion */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar text-xs">

        {/* SECTION 1: DIMENSIONS & FORMATS */}
        <div className="border border-[#15462E]/60 rounded-lg overflow-hidden bg-black/10">
          <button
            onClick={() => toggleTab('format')}
            className={`w-full p-3 font-bold text-left flex justify-between items-center transition-colors hover:bg-white/5 ${activeTab === 'format' ? 'text-[#ffd700] bg-white/5' : 'text-white/80'
              }`}
          >
            <span>📏 Formato y Dimensiones</span>
            <span>{activeTab === 'format' ? '▲' : '▼'}</span>
          </button>

          {activeTab === 'format' && (
            <div className="p-3 space-y-3 border-t border-[#15462E]/40">
              {/* Output Mode */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Modo de Salida</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['cards', 'flyer', 'poster', 'folding'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => updateConfig('formatMode', m)}
                      className={`py-1.5 px-0.5 font-semibold rounded text-[9px] uppercase border transition-all truncate ${config.formatMode === m
                        ? 'bg-[#ffd700] border-[#ffd700] text-black font-extrabold'
                        : 'border-white/10 text-white hover:bg-white/5'
                        }`}
                    >
                      {m === 'cards' ? 'Tarjetas' : m === 'flyer' ? 'Flyer' : m === 'poster' ? 'Póster' : 'Plegable'}
                    </button>
                  ))}
                </div>
              </div>

              {config.formatMode === 'cards' && (
                <>
                  {/* Short FIFA names toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white/80">Usar nombres cortos (FIFA)</span>
                      <span className="text-[9px] text-white/40">E.g., ARG, MEX, USA</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.useFifaCode ?? false}
                      onChange={(e) => updateConfig('useFifaCode', e.target.checked)}
                      className="w-4 h-4 accent-[#ffd700] rounded focus:outline-none cursor-pointer"
                    />
                  </div>

                  {/* Exclude cover from sheets option */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white/80">Excluir tapa de pliegos</span>
                      <span className="text-[9px] text-white/40">Para imprimir tapa en papel grueso</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.excludeCoverFromSheets ?? false}
                      onChange={(e) => updateConfig('excludeCoverFromSheets', e.target.checked)}
                      className="w-4 h-4 accent-[#ffd700] rounded focus:outline-none cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Show cut lines */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-semibold text-white/80">Líneas de corte impresas</span>
                  <span className="text-[9px] text-white/40">Guías punteadas finas</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.showCutLines ?? false}
                  onChange={(e) => updateConfig('showCutLines', e.target.checked)}
                  className="w-4 h-4 accent-[#ffd700] rounded focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: COVER DESIGN */}
        <div className="border border-[#15462E]/60 rounded-lg overflow-hidden bg-black/10">
          <button
            onClick={() => toggleTab('cover')}
            className={`w-full p-3 font-bold text-left flex justify-between items-center transition-colors hover:bg-white/5 ${activeTab === 'cover' ? 'text-[#ffd700] bg-white/5' : 'text-white/80'
              }`}
          >
            <span>🎨 Diseño de Tapa (Portada)</span>
            <span>{activeTab === 'cover' ? '▲' : '▼'}</span>
          </button>

          {activeTab === 'cover' && (
            <div className="p-3 space-y-3 border-t border-[#15462E]/40">
              {/* Cover Title */}
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Título Tapa</label>
                <input
                  type="text"
                  value={config.coverTitle}
                  onChange={(e) => updateConfig('coverTitle', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1.5 focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              {/* Cover Subtitle */}
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Subtítulo Tapa</label>
                <input
                  type="text"
                  value={config.coverSubtitle}
                  onChange={(e) => updateConfig('coverSubtitle', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1.5 focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              {/* Cover Typography */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Fuente Título</label>
                  <select
                    value={config.coverTitleFontFamily || 'inherit'}
                    onChange={(e) => updateConfig('coverTitleFontFamily', e.target.value)}
                    className="w-full bg-[#051810] border border-[#15462E] rounded px-1.5 py-1 focus:outline-none focus:border-[#ffd700]"
                  >
                    <option value="inherit">General</option>
                    <option value="'Outfit', sans-serif">Outfit</option>
                    <option value="'Inter', sans-serif">Inter</option>
                    <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                    <option value="'Montserrat', sans-serif">Montserrat</option>
                    <option value="'Playfair Display', serif">Playfair</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Tamaño (%)</label>
                  <input
                    type="range"
                    min="1.0"
                    max="4.0"
                    step="0.1"
                    value={config.coverTitleSize || 2.2}
                    onChange={(e) => updateConfig('coverTitleSize', parseFloat(e.target.value))}
                    className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                  />
                </div>
              </div>

              {/* Subtitle font selector */}
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Fuente Subtítulo</label>
                <select
                  value={config.coverSubtitleFontFamily || 'inherit'}
                  onChange={(e) => updateConfig('coverSubtitleFontFamily', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-1.5 py-1 focus:outline-none focus:border-[#ffd700]"
                >
                  <option value="inherit">General</option>
                  <option value="'Outfit', sans-serif">Outfit</option>
                  <option value="'Montserrat', sans-serif">Montserrat</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                  <option value="'Anton', sans-serif">Anton</option>
                  <option value="Arial, sans-serif">Arial</option>
                </select>
              </div>

              {/* Color selectors */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Color Título</label>
                  <div className="flex gap-1.5">
                    <input
                      type="color"
                      value={config.coverTitleColor || '#ffffff'}
                      onChange={(e) => updateConfig('coverTitleColor', e.target.value)}
                      className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.coverTitleColor || '#ffffff'}
                      onChange={(e) => updateConfig('coverTitleColor', e.target.value)}
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[10px] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Color Subtítulo</label>
                  <div className="flex gap-1.5">
                    <input
                      type="color"
                      value={config.coverSubtitleColor || '#ffd700'}
                      onChange={(e) => updateConfig('coverSubtitleColor', e.target.value)}
                      className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.coverSubtitleColor || '#ffd700'}
                      onChange={(e) => updateConfig('coverSubtitleColor', e.target.value)}
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[10px] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Apply cover typography to all cards */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="font-semibold text-white/80">Usar estilo de portada en todas las tarjetas</span>
                  <span className="text-[9px] text-white/40">Misma fuente y colores generales</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.applyCoverTypographyToAllCards ?? false}
                  onChange={(e) => updateConfig('applyCoverTypographyToAllCards', e.target.checked)}
                  className="w-4 h-4 accent-[#ffd700] rounded focus:outline-none cursor-pointer"
                />
              </div>

              {/* Cover BG Override */}
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Fondo Portada (Color)</label>
                <div className="flex gap-1.5">
                  <input
                    type="color"
                    value={config.coverBgColor || '#0d5c3a'}
                    onChange={(e) => updateConfig('coverBgColor', e.target.value)}
                    className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.coverBgColor || '#0d5c3a'}
                    onChange={(e) => updateConfig('coverBgColor', e.target.value)}
                    className="w-full bg-[#051810] border border-[#15462E] rounded px-1.5 py-1 focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover BG image upload */}
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Fondo Portada (Imagen)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFile(e, 'coverBgImageUrl')}
                  className="w-full text-[10px] text-white/60 bg-[#051810] border border-[#15462E] rounded py-1 px-1.5"
                />
                {config.coverBgImageUrl && (
                  <button
                    onClick={() => updateConfig('coverBgImageUrl', '')}
                    className="text-[9px] text-red-400 font-bold hover:underline"
                  >
                    Quitar imagen de fondo
                  </button>
                )}
              </div>

              {/* Show Trophy */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span className="font-semibold text-white/80">Mostrar Copa Central</span>
                <input
                  type="checkbox"
                  checked={config.showCoverTrophy}
                  onChange={(e) => updateConfig('showCoverTrophy', e.target.checked)}
                  className="w-4 h-4 accent-[#ffd700]"
                />
              </div>

              {config.showCoverTrophy && (
                <>
                  {/* Custom Illustration Upload */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/40 font-bold uppercase">Reemplazar Copa (Imagen)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFile(e, 'coverIllustrationUrl')}
                      className="w-full text-[10px] text-white/60 bg-[#051810] border border-[#15462E] rounded py-1 px-1.5"
                    />
                    {config.coverIllustrationUrl && (
                      <button
                        onClick={() => updateConfig('coverIllustrationUrl', '')}
                        className="text-[9px] text-red-400 font-bold hover:underline"
                      >
                        Restaurar copa original
                      </button>
                    )}
                  </div>

                  {/* Illustration scale slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-white/40 font-bold">
                      <span>Escala Copa ({config.coverIllustrationScale}%)</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={config.coverIllustrationScale || 100}
                      onChange={(e) => updateConfig('coverIllustrationScale', parseInt(e.target.value))}
                      className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                    />
                  </div>

                  {/* Illustration Y offset */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-white/40 font-bold">
                        <span>Offset Vertical ({config.coverIllustrationY}px)</span>
                      </div>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        value={config.coverIllustrationY || 0}
                        onChange={(e) => updateConfig('coverIllustrationY', parseInt(e.target.value))}
                        className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-white/40 font-bold">
                        <span>Offset Horizontal ({config.coverIllustrationX ?? 0}px)</span>
                      </div>
                      <input
                        type="range"
                        min="-150"
                        max="150"
                        value={config.coverIllustrationX ?? 0}
                        onChange={(e) => updateConfig('coverIllustrationX', parseInt(e.target.value))}
                        className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                      />
                    </div>
                  </div>


                  {/* Illustration Opacity */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-white/40 font-bold">
                      <span>Opacidad Copa ({Math.round((config.coverIllustrationOpacity || 1.0) * 100)}%)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round((config.coverIllustrationOpacity || 1.0) * 100)}
                      onChange={(e) => updateConfig('coverIllustrationOpacity', parseFloat(e.target.value) / 100)}
                      className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                    />
                  </div>
                </>
              )}

              {/* Show Year and Fifa text */}
              <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/70">Marca de Año "26"</span>
                  <input
                    type="checkbox"
                    checked={config.showCoverYear ?? true}
                    onChange={(e) => updateConfig('showCoverYear', e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#ffd700]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/70">Texto "FIFA"</span>
                  <input
                    type="checkbox"
                    checked={config.showCoverFifaText ?? true}
                    onChange={(e) => updateConfig('showCoverFifaText', e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#ffd700]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: REVERSO / BACK CARD */}
        <div className="border border-[#15462E]/60 rounded-lg overflow-hidden bg-black/10">
          <button
            onClick={() => toggleTab('back')}
            className={`w-full p-3 font-bold text-left flex justify-between items-center transition-colors hover:bg-white/5 ${activeTab === 'back' ? 'text-[#ffd700] bg-white/5' : 'text-white/80'
              }`}
          >
            <span>🔄 Reverso y Tipografía</span>
            <span>{activeTab === 'back' ? '▲' : '▼'}</span>
          </button>

          {activeTab === 'back' && (
            <div className="p-3 space-y-3 border-t border-[#15462E]/40">
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Fuente Título Reverso</label>
                <select
                  value={config.backTitleFontFamily || 'inherit'}
                  onChange={(e) => updateConfig('backTitleFontFamily', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-1.5 py-1 focus:outline-none focus:border-[#ffd700]"
                >
                  <option value="inherit">General</option>
                  <option value="'Outfit', sans-serif">Outfit</option>
                  <option value="'Montserrat', sans-serif">Montserrat</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                  <option value="'Anton', sans-serif">Anton</option>
                  <option value="Arial, sans-serif">Arial</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Color Título Reverso</label>
                <div className="flex gap-1.5">
                  <input
                    type="color"
                    value={config.titleTextColor || '#ffd700'}
                    onChange={(e) => updateConfig('titleTextColor', e.target.value)}
                    className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.titleTextColor || '#ffd700'}
                    onChange={(e) => updateConfig('titleTextColor', e.target.value)}
                    className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[10px] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Fuente Subtítulo Reverso</label>
                <select
                  value={config.backSubtitleFontFamily || 'inherit'}
                  onChange={(e) => updateConfig('backSubtitleFontFamily', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-1.5 py-1 focus:outline-none focus:border-[#ffd700]"
                >
                  <option value="inherit">General</option>
                  <option value="'Outfit', sans-serif">Outfit</option>
                  <option value="'Montserrat', sans-serif">Montserrat</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                  <option value="'Anton', sans-serif">Anton</option>
                  <option value="Arial, sans-serif">Arial</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Color Subtítulo Reverso</label>
                <div className="flex gap-1.5">
                  <input
                    type="color"
                    value={config.backSubtitleTextColor || '#ffd700'}
                    onChange={(e) => updateConfig('backSubtitleTextColor', e.target.value)}
                    className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.backSubtitleTextColor || '#ffd700'}
                    onChange={(e) => updateConfig('backSubtitleTextColor', e.target.value)}
                    className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[10px] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Fuente Texto Reverso</label>
                <select
                  value={config.backBodyFontFamily || 'inherit'}
                  onChange={(e) => updateConfig('backBodyFontFamily', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-1.5 py-1 focus:outline-none focus:border-[#ffd700]"
                >
                  <option value="inherit">General</option>
                  <option value="'Outfit', sans-serif">Outfit</option>
                  <option value="'Montserrat', sans-serif">Montserrat</option>
                  <option value="'Poppins', sans-serif">Poppins</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                  <option value="'Anton', sans-serif">Anton</option>
                  <option value="Arial, sans-serif">Arial</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: CORE DESIGN & COLOR SYSTEM */}
        <div className="border border-[#15462E]/60 rounded-lg overflow-hidden bg-black/10">
          <button
            onClick={() => toggleTab('style')}
            className={`w-full p-3 font-bold text-left flex justify-between items-center transition-colors hover:bg-white/5 ${activeTab === 'style' ? 'text-[#ffd700] bg-white/5' : 'text-white/80'
              }`}
          >
            <span>🎨 Estilo y Paleta General</span>
            <span>{activeTab === 'style' ? '▲' : '▼'}</span>
          </button>

          {activeTab === 'style' && (
            <div className="p-3 space-y-3 border-t border-[#15462E]/40">

              {/* Background style type selector */}
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Tipo de Fondo</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['gradient', 'solid', 'image'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => updateConfig('backgroundType', t)}
                      className={`py-1 px-0.5 rounded text-[9px] uppercase border transition-all ${config.backgroundType === t
                        ? 'bg-[#ffd700] border-[#ffd700] text-black font-extrabold'
                        : 'border-white/10 hover:bg-white/5 text-white'
                        }`}
                    >
                      {t === 'gradient' ? 'Degradado' : t === 'solid' ? 'Sólido' : 'Imagen'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background configurations according to type */}
              {config.backgroundType === 'gradient' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/40 font-bold uppercase">Color Principal</label>
                      <div className="flex gap-1">
                        <input
                          type="color"
                          value={config.primaryColor}
                          onChange={(e) => {
                            const newPrimary = e.target.value;
                            onChange({
                              ...config,
                              primaryColor: newPrimary,
                              backgroundGradient: `linear-gradient(135deg, ${newPrimary} 0%, ${config.secondaryColor} 100%)`
                            });
                          }}
                          className="w-8 h-8 border-0 bg-transparent rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.primaryColor}
                          onChange={(e) => {
                            const newPrimary = e.target.value;
                            onChange({
                              ...config,
                              primaryColor: newPrimary,
                              backgroundGradient: `linear-gradient(135deg, ${newPrimary} 0%, ${config.secondaryColor} 100%)`
                            });
                          }}
                          className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[10px] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/40 font-bold uppercase">Color Secundario</label>
                      <div className="flex gap-1">
                        <input
                          type="color"
                          value={config.secondaryColor}
                          onChange={(e) => {
                            const newSecondary = e.target.value;
                            onChange({
                              ...config,
                              secondaryColor: newSecondary,
                              backgroundGradient: `linear-gradient(135deg, ${config.primaryColor} 0%, ${newSecondary} 100%)`
                            });
                          }}
                          className="w-8 h-8 border-0 bg-transparent rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.secondaryColor}
                          onChange={(e) => {
                            const newSecondary = e.target.value;
                            onChange({
                              ...config,
                              secondaryColor: newSecondary,
                              backgroundGradient: `linear-gradient(135deg, ${config.primaryColor} 0%, ${newSecondary} 100%)`
                            });
                          }}
                          className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[10px] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 text-[8.5px]">
                    <button
                      onClick={() => handleGradientPreset('#093c24', '#15623e')}
                      className="bg-emerald-950/80 border border-emerald-800 rounded py-0.5"
                    >
                      Esmeralda Clásico
                    </button>
                    <button
                      onClick={() => handleGradientPreset('#101014', '#1c1d24')}
                      className="bg-zinc-900 border border-zinc-700 rounded py-0.5"
                    >
                      Carbono Premium
                    </button>
                    <button
                      onClick={() => handleGradientPreset('#0f172a', '#1e293b')}
                      className="bg-slate-900 border border-slate-700 rounded py-0.5"
                    >
                      Azul Cósmico
                    </button>
                    <button
                      onClick={() => handleGradientPreset('#311042', '#4c1d6f')}
                      className="bg-purple-950/80 border border-purple-800 rounded py-0.5"
                    >
                      Violeta Imperial
                    </button>
                  </div>
                </div>
              )}

              {config.backgroundType === 'solid' && (
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Color Sólido</label>
                  <div className="flex gap-1.5">
                    <input
                      type="color"
                      value={config.solidColor}
                      onChange={(e) => updateConfig('solidColor', e.target.value)}
                      className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.solidColor}
                      onChange={(e) => updateConfig('solidColor', e.target.value)}
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-1.5 py-1 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {config.backgroundType === 'image' && (
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Subir Imagen de Fondo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFile(e, 'backgroundImageUrl')}
                    className="w-full text-[10px] text-white/60 bg-[#051810] border border-[#15462E] rounded py-1 px-1.5"
                  />
                  {config.backgroundImageUrl && (
                    <button
                      onClick={() => updateConfig('backgroundImageUrl', '')}
                      className="text-[9px] text-red-400 font-bold hover:underline"
                    >
                      Quitar imagen de fondo
                    </button>
                  )}
                </div>
              )}

              {/* Theme Colors */}
              <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Acento (Oro/Detalles)</label>
                  <div className="flex gap-1.5">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => updateConfig('accentColor', e.target.value)}
                      className="w-5 h-5 border-0 bg-transparent rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.accentColor}
                      onChange={(e) => updateConfig('accentColor', e.target.value)}
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[9px] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Bordes</label>
                  <div className="flex gap-1.5">
                    <input
                      type="color"
                      value={config.borderColor.startsWith('rgba') ? '#ffffff' : config.borderColor}
                      onChange={(e) => updateConfig('borderColor', e.target.value)}
                      className="w-5 h-5 border-0 bg-transparent rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.borderColor}
                      onChange={(e) => updateConfig('borderColor', e.target.value)}
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[9px] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Glassmorphism switch */}
              <div className="flex items-center justify-between border-t border-white/5 pt-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-white/80">Efecto Vidrio (Glassmorphism)</span>
                  <span className="text-[9px] text-white/40">Fondo translúcido con borde suave. Dejar desactivado para impresión plana.</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.glassmorphism}
                  onChange={(e) => updateConfig('glassmorphism', e.target.checked)}
                  className="w-4 h-4 accent-[#ffd700]"
                />
              </div>

              {/* Typography Options */}
              <div className="border-t border-white/5 pt-2 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/40 font-bold uppercase">Fuente Títulos</label>
                    <select
                      value={config.titleFontFamily || 'inherit'}
                      onChange={(e) => updateConfig('titleFontFamily', e.target.value)}
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-1.5 py-1 focus:outline-none focus:border-[#ffd700]"
                    >
                      <option value="inherit">General</option>
                      <option value="'Outfit', sans-serif">Outfit</option>
                      <option value="'Montserrat', sans-serif">Montserrat</option>
                      <option value="'Poppins', sans-serif">Poppins</option>
                      <option value="'Inter', sans-serif">Inter</option>
                      <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                      <option value="'Anton', sans-serif">Anton</option>
                      <option value="Arial, sans-serif">Arial</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/40 font-bold uppercase">Fuente Cuerpo</label>
                    <select
                      value={config.bodyFontFamily || 'inherit'}
                      onChange={(e) => updateConfig('bodyFontFamily', e.target.value)}
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-1.5 py-1 focus:outline-none focus:border-[#ffd700]"
                    >
                      <option value="inherit">General</option>
                      <option value="'Outfit', sans-serif">Outfit</option>
                      <option value="'Montserrat', sans-serif">Montserrat</option>
                      <option value="'Poppins', sans-serif">Poppins</option>
                      <option value="'Inter', sans-serif">Inter</option>
                      <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                      <option value="'Anton', sans-serif">Anton</option>
                      <option value="Arial, sans-serif">Arial</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-white/40 font-bold">
                    <span>Tamaño General Texto ({Math.round((config.fontSizeScale || 1.0) * 100)}%)</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="130"
                    value={Math.round((config.fontSizeScale || 1.0) * 100)}
                    onChange={(e) => updateConfig('fontSizeScale', parseInt(e.target.value) / 100)}
                    className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                  />
                </div>
              </div>

              {/* Match row background */}
              <div className="border-t border-white/5 pt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-bold uppercase">Fondo de fila de partido</span>
                    <span className="text-[9px] text-white/40">Activa o quita el fondo de cada partido.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showMatchRowBackground ?? true}
                    onChange={(e) => updateConfig('showMatchRowBackground', e.target.checked)}
                    className="w-4 h-4 accent-[#ffd700] rounded focus:outline-none"
                  />
                </div>
                {config.showMatchRowBackground !== false && (
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/40 font-bold uppercase">Color fondo partidas</label>
                    <div className="flex gap-1.5">
                      <input
                        type="color"
                        value={config.cardBgColor || '#888888'}
                        onChange={(e) => updateConfig('cardBgColor', e.target.value)}
                        className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.cardBgColor || '#888888'}
                        onChange={(e) => updateConfig('cardBgColor', e.target.value)}
                        className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[9px] focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Text Colors */}
              <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Color de Títulos</label>
                  <div className="flex gap-1">
                    <input
                      type="color"
                      value={config.titleTextColor || '#ffd700'}
                      onChange={(e) => updateConfig('titleTextColor', e.target.value)}
                      className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.titleTextColor || '#ffd700'}
                      onChange={(e) => updateConfig('titleTextColor', e.target.value)}
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[9px] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Color de Cuerpo</label>
                  <div className="flex gap-1">
                    <input
                      type="color"
                      value={config.bodyTextColor || '#ffffff'}
                      onChange={(e) => updateConfig('bodyTextColor', e.target.value)}
                      className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.bodyTextColor || '#ffffff'}
                      onChange={(e) => updateConfig('bodyTextColor', e.target.value)}
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[9px] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Background Image Adjustments */}
              {config.backgroundType === 'image' && config.backgroundImageUrl && (
                <div className="border-t border-white/5 pt-2 space-y-2">
                  <span className="text-[10px] text-white/40 font-bold uppercase block">Ajustes de Fondo</span>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-white/40 font-bold">
                      <span>Escala de Fondo ({config.bgImageScale ?? 100}%)</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="250"
                      value={config.bgImageScale ?? 100}
                      onChange={(e) => updateConfig('bgImageScale', parseInt(e.target.value))}
                      className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-[9px] text-white/40 font-semibold">Posición X ({config.bgImageX ?? 50}%)</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={config.bgImageX ?? 50}
                        onChange={(e) => updateConfig('bgImageX', parseInt(e.target.value))}
                        className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-white/40 font-semibold">Posición Y ({config.bgImageY ?? 50}%)</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={config.bgImageY ?? 50}
                        onChange={(e) => updateConfig('bgImageY', parseInt(e.target.value))}
                        className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-white/40 font-bold">
                      <span>Opacidad de Fondo ({config.bgImageOpacity ?? 100}%)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={config.bgImageOpacity ?? 100}
                      onChange={(e) => updateConfig('bgImageOpacity', parseInt(e.target.value))}
                      className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                    />
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* SECTION 4: STATIONERY & BRANDING */}
        <div className="border border-[#15462E]/60 rounded-lg overflow-hidden bg-black/10">
          <button
            onClick={() => toggleTab('branding')}
            className={`w-full p-3 font-bold text-left flex justify-between items-center transition-colors hover:bg-white/5 ${activeTab === 'branding' ? 'text-[#ffd700] bg-white/5' : 'text-white/80'
              }`}
          >
            <span>💼 Branding e Imprenta</span>
            <span>{activeTab === 'branding' ? '▲' : '▼'}</span>
          </button>

          {activeTab === 'branding' && (
            <div className="p-3 space-y-3 border-t border-[#15462E]/40">

              {/* Brand Signature */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-[10px] text-white/40 font-bold uppercase">Firma Comercial / Marca</label>
                  <span className="text-[8.5px] text-[#ffd700]/70 font-semibold select-none">Aparece abajo</span>
                </div>
                <input
                  type="text"
                  placeholder="E.g., Diseñado por ImprenArt"
                  value={config.brandSignature}
                  onChange={(e) => updateConfig('brandSignature', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1.5 focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              {/* Brand Logo Upload */}
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Cargar Logo Personalizado</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFile(e, 'brandLogoUrl')}
                  className="w-full text-[10px] text-white/60 bg-[#051810] border border-[#15462E] rounded py-1 px-1.5"
                />
                {config.brandLogoUrl && (
                  <div className="flex items-center justify-between pt-1">
                    <img src={config.brandLogoUrl} alt="Vista previa logo" className="h-6 object-contain bg-white/10 p-0.5 rounded" />
                    <button
                      onClick={() => updateConfig('brandLogoUrl', '')}
                      className="text-[9px] text-red-400 font-bold hover:underline"
                    >
                      Quitar logo
                    </button>
                  </div>
                )}
              </div>

              {/* Escala de Logo */}
              {config.brandLogoUrl && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label className="text-[10px] text-white/40 font-bold uppercase">Escala del Logo</label>
                    <span className="font-bold text-[#ffd700]">{config.brandLogoScale || 100}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="200"
                    value={config.brandLogoScale ?? 100}
                    onChange={(e) => updateConfig('brandLogoScale', parseInt(e.target.value))}
                    className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                  />
                </div>
              )}

              {/* Instagram */}
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Instagram de Negocio</label>
                <input
                  type="text"
                  placeholder="@tu_negocio"
                  value={config.brandInstagram ?? ''}
                  onChange={(e) => updateConfig('brandInstagram', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1.5 focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Teléfono de Negocio</label>
                <input
                  type="text"
                  placeholder="+54 9 11 1234-5678"
                  value={config.brandPhone ?? ''}
                  onChange={(e) => updateConfig('brandPhone', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1.5 focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              {/* Dirección */}
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase">Dirección Física</label>
                <input
                  type="text"
                  placeholder="Av. Principal 123, CABA"
                  value={config.brandAddress ?? ''}
                  onChange={(e) => updateConfig('brandAddress', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1.5 focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              {/* Estilo del Branding (Fuentes y Colores) */}
              <div className="border-t border-white/5 pt-2 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/40 font-bold uppercase">Fuente Negocio</label>
                    <select
                      value={config.brandFontFamily || 'inherit'}
                      onChange={(e) => updateConfig('brandFontFamily', e.target.value)}
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-1.5 py-1 text-[11px] focus:outline-none focus:border-[#ffd700]"
                    >
                      <option value="inherit">General</option>
                      <option value="'Outfit', sans-serif">Outfit</option>
                      <option value="'Montserrat', sans-serif">Montserrat</option>
                      <option value="'Poppins', sans-serif">Poppins</option>
                      <option value="'Inter', sans-serif">Inter</option>
                      <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                      <option value="'Anton', sans-serif">Anton</option>
                      <option value="Arial, sans-serif">Arial</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/40 font-bold uppercase">Color Negocio</label>
                    <div className="flex gap-1">
                      <input
                        type="color"
                        value={config.brandTextColor || 'rgba(255, 255, 255, 0.5)'}
                        onChange={(e) => updateConfig('brandTextColor', e.target.value)}
                        className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.brandTextColor || 'rgba(255, 255, 255, 0.5)'}
                        onChange={(e) => updateConfig('brandTextColor', e.target.value)}
                        className="w-full bg-[#051810] border border-[#15462E] rounded px-1 text-[9px] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] text-white/40 font-bold">
                    <span>Tamaño Fuente Negocio</span>
                    <span className="text-[#ffd700] font-bold">{config.brandFontSize || 8}px</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="14"
                    step="0.5"
                    value={config.brandFontSize || 8}
                    onChange={(e) => updateConfig('brandFontSize', parseFloat(e.target.value))}
                    className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                  />
                </div>
              </div>
              
              {/* Toggles de Visibilidad de Branding */}
              <div className="border-t border-white/5 pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/70 font-bold">Mostrar logo en Portada</span>
                  <input
                    type="checkbox"
                    checked={config.showBrandingCover ?? true}
                    onChange={(e) => updateConfig('showBrandingCover', e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#ffd700]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/70 font-bold">Mostrar logo en Reverso</span>
                  <input
                    type="checkbox"
                    checked={config.showBrandingBack ?? true}
                    onChange={(e) => updateConfig('showBrandingBack', e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#ffd700]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/70 font-bold">Mostrar logo en Tarjetas Internas</span>
                  <input
                    type="checkbox"
                    checked={config.showBrandingCards ?? true}
                    onChange={(e) => updateConfig('showBrandingCards', e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#ffd700]"
                  />
                </div>
              </div>

              {/* Cafecito Widget */}
              <div className="space-y-1 border-t border-white/5 pt-2">
                <label className="text-[10px] text-white/40 font-bold uppercase">Link Cafecito ☕</label>
                <input
                  type="text"
                  placeholder="https://cafecito.app/tu-usuario"
                  value={config.cafecitoUrl}
                  onChange={(e) => updateConfig('cafecitoUrl', e.target.value)}
                  className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1.5 focus:outline-none focus:border-[#ffd700]"
                />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* SECTION 5: EXPORTS / ACTION CENTER */}
      <div className="p-4 border-t border-[#15462E] bg-black/40 space-y-2">
        <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider block">Panel de Impresión y Descarga</label>

        {/* Zip configurations (only relevant for cards mode) */}
        {config.formatMode === 'cards' && (
          <div className="flex items-center justify-between gap-2 bg-[#051810] border border-[#15462E] rounded p-1.5">
            <span className="text-[9.5px] font-bold text-white/70">Descargar ZIP:</span>
            <select
              value={zipOption}
              onChange={(e) => setZipOption(e.target.value as any)}
              className="bg-[#072418] border-0 text-white font-bold py-0.5 focus:outline-none cursor-pointer rounded text-[9.5px]"
            >
              <option value="all">PNG + PDF</option>
              <option value="png">Solo PNGs</option>
              <option value="pdf">Solo PDFs</option>
            </select>
          </div>
        )}

        {/* Pliego Simple vs Doble Faz (only relevant for cards mode pliegos) */}
        {config.formatMode === 'cards' && (
          <div className="flex items-center justify-between gap-2 bg-[#051810] border border-[#15462E] rounded p-1.5">
            <span className="text-[9.5px] font-bold text-white/70">Tipo de Pliego:</span>
            <select
              value={config.pliegoDoubleSided ? 'double' : 'simple'}
              onChange={(e) => updateConfig('pliegoDoubleSided', e.target.value === 'double')}
              className="bg-[#072418] border-0 text-white font-bold py-0.5 focus:outline-none cursor-pointer rounded text-[9.5px]"
            >
              <option value="simple">Simple Faz (Solo Frentes)</option>
              <option value="double">Doble Faz (Frente y Dorso)</option>
            </select>
          </div>
        )}

        {/* Master Export Buttons */}
        <div className="space-y-1.5">
          {/* Main download bundle button */}
          {config.formatMode === 'cards' && (
            <button
              onClick={() => onExport('zip')}
              className="w-full bg-[#ffd700] hover:bg-[#ffe55c] active:bg-[#e6c200] text-black font-extrabold py-2 px-3 rounded flex items-center justify-center gap-1.5 shadow-lg select-none transition-all uppercase tracking-wider text-xs"
            >
              📦 Descargar Paquete Individual
            </button>
          )}

          {/* Duplex imposition layouts (Print pliegos) */}
          {config.formatMode === 'cards' && (
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onExport('pliegoA4')}
                className="bg-[#1b8555] hover:bg-[#239f67] text-white font-bold py-2 px-1 rounded flex flex-col items-center justify-center leading-tight transition-all border border-[#15462E]"
              >
                <span>📄 Pliego A4</span>
                <span className="text-[8px] text-white/70 font-semibold mt-0.5">8 Tarjetas</span>
              </button>
              <button
                onClick={() => onExport('pliegoA5')}
                className="bg-[#1b8555] hover:bg-[#239f67] text-white font-bold py-2 px-1 rounded flex flex-col items-center justify-center leading-tight transition-all border border-[#15462E]"
              >
                <span>📄 Pliego A5</span>
                <span className="text-[8px] text-white/70 font-semibold mt-0.5">2 Tarjetas</span>
              </button>
            </div>
          )}

          {config.formatMode === 'flyer' && (
            <button
              onClick={() => onExport('flyerPliego')}
              className="w-full bg-[#1b8555] hover:bg-[#239f67] text-white font-bold py-2 px-3 rounded flex flex-col items-center justify-center leading-tight transition-all border border-[#15462E] uppercase text-[10px] tracking-wider"
            >
              <span>📄 Imprimir Pliego Flyer Doble Faz</span>
              <span className="text-[8px] text-white/70 font-semibold mt-0.5">Hoja A4 - Corte Horizontal</span>
            </button>
          )}

          {config.formatMode === 'poster' && (
            <button
              onClick={() => onExport('pdf')}
              className="w-full bg-[#1b8555] hover:bg-[#239f67] text-white font-bold py-2 px-3 rounded flex flex-col items-center justify-center leading-tight transition-all border border-[#15462E] uppercase text-[10px] tracking-wider"
            >
              <span>📄 Descargar Póster A4 (PDF)</span>
            </button>
          )}

          {config.formatMode === 'folding' && (
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onExport('pdf')}
                className="bg-[#1b8555] hover:bg-[#239f67] text-white font-bold py-2 px-1 rounded flex flex-col items-center justify-center leading-tight transition-all border border-[#15462E] text-[10px] uppercase"
              >
                <span>📄 PDF Plegable</span>
                <span className="text-[8px] text-white/70 font-semibold mt-0.5">A4 Horizontal</span>
              </button>
              <button
                onClick={() => onExport('png')}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-2 px-1 rounded flex flex-col items-center justify-center leading-tight transition-all text-[10px] uppercase"
              >
                <span>🖼️ PNG Plegable</span>
                <span className="text-[8px] text-white/70 font-semibold mt-0.5">A4 Horizontal</span>
              </button>
            </div>
          )}
        </div>

        {/* Restore defaults button */}
        <button
          onClick={onResetConfig}
          className="w-full bg-red-950/20 hover:bg-red-950/40 text-red-300 border border-red-900/40 font-bold py-1 px-3 rounded flex items-center justify-center gap-1 select-none transition-all mt-1 text-[10px]"
        >
          🗑️ Restablecer Configuración
        </button>

        {/* Cafecito Button */}
        {config.cafecitoUrl && (
          <a
            href={config.cafecitoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#97603c]/20 hover:bg-[#97603c]/45 active:bg-[#97603c]/60 text-[#ffb580] border border-[#97603c]/50 font-bold py-1.5 px-3 rounded flex items-center justify-center gap-1.5 select-none transition-all mt-1 text-[11px]"
          >
            ☕ ¿Te sirvió? Invitame un Cafecito
          </a>
        )}
      </div>
    </aside>
  );
};
