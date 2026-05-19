import React, { useState } from 'react';
import { DesignConfig } from '../types';

interface SidebarProps {
  config: DesignConfig;
  onChange: (newConfig: DesignConfig) => void;
  onExport: (format: 'pdf' | 'png' | 'svg' | 'zip' | 'pliegoA4' | 'pliegoA5' | 'flyerPliego') => void;
  zipOption: 'all' | 'png' | 'pdf';
  setZipOption: (opt: 'all' | 'png' | 'pdf') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  config,
  onChange,
  onExport,
  zipOption,
  setZipOption,
}) => {
  const [activeTab, setActiveTab] = useState<string>('format');

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

  const handleSizePreset = (presetName: string) => {
    let width = 70;
    let height = 100;
    let useFifa = false;

    if (presetName === 'pocket') {
      width = 60;
      height = 90;
      useFifa = true;
    } else if (presetName === 'standard') {
      width = 70;
      height = 100;
      useFifa = true;
    } else if (presetName === 'medium') {
      width = 80;
      height = 115;
      useFifa = false;
    } else if (presetName === 'large') {
      width = 90;
      height = 130;
      useFifa = false;
    }

    onChange({
      ...config,
      cardWidthMm: width,
      cardHeightMm: height,
      useFifaCode: useFifa,
    });
  };

  return (
    <aside className="w-80 h-screen bg-[#072418] text-white flex flex-col border-r border-[#15462E] select-none shrink-0 overflow-hidden shadow-2xl">
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
        <span className="text-[9px] bg-[#1b8555] text-white font-bold py-0.5 px-1.5 rounded-full select-none">
          React v3
        </span>
      </div>

      {/* Configuration Accordion */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar text-xs">
        
        {/* SECTION 1: DIMENSIONS & FORMATS */}
        <div className="border border-[#15462E]/60 rounded-lg overflow-hidden bg-black/10">
          <button
            onClick={() => toggleTab('format')}
            className={`w-full p-3 font-bold text-left flex justify-between items-center transition-colors hover:bg-white/5 ${
              activeTab === 'format' ? 'text-[#ffd700] bg-white/5' : 'text-white/80'
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
                <div className="grid grid-cols-3 gap-1">
                  {(['cards', 'flyer', 'poster'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => updateConfig('formatMode', m)}
                      className={`py-1.5 px-1 font-semibold rounded text-[10px] uppercase border transition-all ${
                        config.formatMode === m
                          ? 'bg-[#ffd700] border-[#ffd700] text-black font-extrabold'
                          : 'border-white/10 text-white hover:bg-white/5'
                      }`}
                    >
                      {m === 'cards' ? 'Tarjetas' : m === 'flyer' ? 'Flyer' : 'Póster'}
                    </button>
                  ))}
                </div>
              </div>

              {config.formatMode === 'cards' && (
                <>
                  {/* Presets */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Tamaño de Tarjeta</label>
                    <select
                      onChange={(e) => handleSizePreset(e.target.value)}
                      value={
                        config.cardWidthMm === 60 && config.cardHeightMm === 90 ? 'pocket' :
                        config.cardWidthMm === 70 && config.cardHeightMm === 100 ? 'standard' :
                        config.cardWidthMm === 80 && config.cardHeightMm === 115 ? 'medium' :
                        config.cardWidthMm === 90 && config.cardHeightMm === 130 ? 'large' : 'custom'
                      }
                      className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1.5 focus:outline-none focus:border-[#ffd700]"
                    >
                      <option value="pocket">Bolsillo (60x90 mm)</option>
                      <option value="standard">Estándar (70x100 mm)</option>
                      <option value="medium">Mediana (80x115 mm)</option>
                      <option value="large">Grande (90x130 mm)</option>
                      <option value="custom">Personalizado</option>
                    </select>
                  </div>

                  {/* Custom values if custom is selected */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/40 font-bold uppercase">Ancho (mm)</label>
                      <input
                        type="number"
                        value={config.cardWidthMm}
                        onChange={(e) => updateConfig('cardWidthMm', parseInt(e.target.value) || 70)}
                        className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1 focus:outline-none focus:border-[#ffd700]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/40 font-bold uppercase">Alto (mm)</label>
                      <input
                        type="number"
                        value={config.cardHeightMm}
                        onChange={(e) => updateConfig('cardHeightMm', parseInt(e.target.value) || 100)}
                        className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1 focus:outline-none focus:border-[#ffd700]"
                      />
                    </div>
                  </div>

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
            className={`w-full p-3 font-bold text-left flex justify-between items-center transition-colors hover:bg-white/5 ${
              activeTab === 'cover' ? 'text-[#ffd700] bg-white/5' : 'text-white/80'
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
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-white/40 font-bold">
                      <span>Posición Vertical (Offset: {config.coverIllustrationY}px)</span>
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

        {/* SECTION 3: CORE DESIGN & COLOR SYSTEM */}
        <div className="border border-[#15462E]/60 rounded-lg overflow-hidden bg-black/10">
          <button
            onClick={() => toggleTab('style')}
            className={`w-full p-3 font-bold text-left flex justify-between items-center transition-colors hover:bg-white/5 ${
              activeTab === 'style' ? 'text-[#ffd700] bg-white/5' : 'text-white/80'
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
                      className={`py-1 px-0.5 rounded text-[9px] uppercase border transition-all ${
                        config.backgroundType === t
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
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase">CSS Degradado</label>
                  <input
                    type="text"
                    value={config.backgroundGradient}
                    onChange={(e) => updateConfig('backgroundGradient', e.target.value)}
                    className="w-full bg-[#051810] border border-[#15462E] rounded px-2 py-1.5 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-1 text-[8.5px]">
                    <button
                      onClick={() => updateConfig('backgroundGradient', 'linear-gradient(135deg, #093c24 0%, #15623e 50%, #0d5c3a 100%)')}
                      className="bg-emerald-950/80 border border-emerald-800 rounded py-0.5"
                    >
                      Esmeralda Clásico
                    </button>
                    <button
                      onClick={() => updateConfig('backgroundGradient', 'linear-gradient(135deg, #101014 0%, #1c1d24 50%, #0a0a0c 100%)')}
                      className="bg-zinc-900 border border-zinc-700 rounded py-0.5"
                    >
                      Carbono Premium
                    </button>
                    <button
                      onClick={() => updateConfig('backgroundGradient', 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)')}
                      className="bg-slate-900 border border-slate-700 rounded py-0.5"
                    >
                      Azul Cósmico
                    </button>
                    <button
                      onClick={() => updateConfig('backgroundGradient', 'linear-gradient(135deg, #311042 0%, #4c1d6f 50%, #1a0526 100%)')}
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
                  <span className="text-[9px] text-white/40">Filtro de desenfoque y reflejos</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.glassmorphism}
                  onChange={(e) => updateConfig('glassmorphism', e.target.checked)}
                  className="w-4 h-4 accent-[#ffd700]"
                />
              </div>

              {/* Border Radius */}
              <div className="space-y-1 border-t border-white/5 pt-2">
                <div className="flex justify-between text-[10px] text-white/40 font-bold">
                  <span>Esquinas Redondeadas ({config.borderRadius}px)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={config.borderRadius}
                  onChange={(e) => updateConfig('borderRadius', parseInt(e.target.value))}
                  className="w-full h-1 bg-[#15462E] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: STATIONERY & BRANDING */}
        <div className="border border-[#15462E]/60 rounded-lg overflow-hidden bg-black/10">
          <button
            onClick={() => toggleTab('branding')}
            className={`w-full p-3 font-bold text-left flex justify-between items-center transition-colors hover:bg-white/5 ${
              activeTab === 'branding' ? 'text-[#ffd700] bg-white/5' : 'text-white/80'
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
        
        {/* Zip configurations */}
        <div className="flex items-center justify-between gap-2 bg-[#051810] border border-[#15462E] rounded p-1.5">
          <span className="text-[9.5px] font-bold text-white/70">Descargar ZIP:</span>
          <select
            value={zipOption}
            onChange={(e) => setZipOption(e.target.value as any)}
            className="bg-[#072418] border-0 text-white font-bold py-0.5 focus:outline-none cursor-pointer rounded"
          >
            <option value="all">PNG + PDF</option>
            <option value="png">Solo PNGs</option>
            <option value="pdf">Solo PDFs</option>
          </select>
        </div>

        {/* Master Export Buttons */}
        <div className="space-y-1.5">
          {/* Main download bundle button */}
          <button
            onClick={() => onExport('zip')}
            className="w-full bg-[#ffd700] hover:bg-[#ffe55c] active:bg-[#e6c200] text-black font-extrabold py-2 px-3 rounded flex items-center justify-center gap-1.5 shadow-lg select-none transition-all uppercase tracking-wider text-xs"
          >
            📦 Descargar Paquete Individual
          </button>

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
              <span>📄 Descargar Póster A4</span>
            </button>
          )}
        </div>

        {/* Cafecito Button */}
        {config.cafecitoUrl && (
          <a
            href={config.cafecitoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#97603c]/20 hover:bg-[#97603c]/45 active:bg-[#97603c]/60 text-[#ffb580] border border-[#97603c]/50 font-bold py-1.5 px-3 rounded flex items-center justify-center gap-1.5 select-none transition-all mt-1"
          >
            ☕ ¿Te sirvió? Invitame un Cafecito
          </a>
        )}
      </div>
    </aside>
  );
};
