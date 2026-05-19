import React from 'react';
import { PlayoffPhase, DesignConfig } from '../../types';
import { FlyerPlayoffMatch } from './FlyerPlayoffMatch';
import { BrandingPlaceholder } from '../BrandingPlaceholder';
import trophyImg from '../../assets/copa.png';

interface FlyerDorsoProps {
  phases: PlayoffPhase[];
  config: DesignConfig;
  isMirrored?: boolean;
}

export const FlyerDorso: React.FC<FlyerDorsoProps> = ({ phases, config, isMirrored = false }) => {
  // BG styling logic for the whole flyer sheet
  const bgStyle: React.CSSProperties = {};
  let hasCustomBgImage = false;
  const bgImageLayerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
  };

  if (config.backgroundType === 'gradient') {
    bgStyle.background = config.backgroundGradient;
  } else if (config.backgroundType === 'solid') {
    bgStyle.backgroundColor = config.solidColor;
  } else if (config.backgroundType === 'image' && config.backgroundImageUrl) {
    hasCustomBgImage = true;
    bgImageLayerStyle.backgroundImage = `url(${config.backgroundImageUrl})`;
    bgImageLayerStyle.backgroundSize = `${config.bgImageScale ?? 100}%`;
    bgImageLayerStyle.backgroundPosition = `${config.bgImageX ?? 50}% ${config.bgImageY ?? 50}%`;
    bgImageLayerStyle.backgroundRepeat = 'no-repeat';
    bgImageLayerStyle.opacity = (config.bgImageOpacity ?? 100) / 100;
  }

  // Cover column BG styling override (applied ONLY to the cover column, not the whole sheet)
  const colCoverBgStyle: React.CSSProperties = {};
  let hasColCoverBgImage = false;
  const colCoverBgImageStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
  };

  if (config.coverBgImageUrl) {
    hasColCoverBgImage = true;
    colCoverBgImageStyle.backgroundImage = `url(${config.coverBgImageUrl})`;
    colCoverBgImageStyle.backgroundSize = 'cover';
    colCoverBgImageStyle.backgroundPosition = 'center';
    colCoverBgImageStyle.backgroundRepeat = 'no-repeat';
  } else if (config.coverBgColor) {
    colCoverBgStyle.backgroundColor = config.coverBgColor;
  }

  const r32Matches = phases[0]?.matches || [];
  const r16Matches = phases[1]?.matches || [];
  const qfMatches = phases[2]?.matches || [];
  const finalPhaseMatches = phases[3]?.matches || []; // Semis, 3er puesto, final

  // Construct column elements (Exactly 4 columns)
  const columns: React.ReactNode[] = [];

  // Column 1: Tapa (Cover / Branding / Trophy)
  columns.push(
    <div
      key="col-cover"
      style={{ borderRadius: '0px', ...colCoverBgStyle }}
      className="flex flex-col h-full justify-between items-center text-center p-2.5 select-none relative overflow-hidden bg-black/20 border border-white/5"
    >
      {/* Background Cover Image Layer */}
      {hasColCoverBgImage && (
        <div style={colCoverBgImageStyle} />
      )}

      {/* Background big text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[120px] font-black text-white/[0.03] tracking-tighter leading-none">26</span>
      </div>

      <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center py-2">
        {config.showCoverTrophy && (
          <img
            src={config.coverIllustrationUrl || trophyImg}
            style={{
              opacity: config.coverIllustrationOpacity ?? 1.0,
              transform: `scale(${((config.coverIllustrationScale ?? 100) / 100) * 1.15}) translate(${((config.coverIllustrationX ?? 0) * 0.1)}px, ${(config.coverIllustrationY ?? 0) * 0.1}px)`,
            }}
            className="h-[52px] object-contain mb-2 pointer-events-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
            alt="Trophy"
          />
        )}
        <div className="text-[9px] font-black text-white tracking-[0.2em] uppercase leading-tight" style={{ fontFamily: config.titleFontFamily || 'inherit', color: config.titleTextColor || '#ffffff', fontSize: `${9 * (config.fontSizeScale || 1.0)}px` }}>
          {config.coverTitle || 'WORLD CUP'}
        </div>
        <div
          style={{ color: config.coverSubtitleColor || '#ffd700', fontSize: `${6.5 * (config.fontSizeScale || 1.0)}px` }}
          className="font-black tracking-[0.25em] uppercase mt-1"
        >
          FASE FINAL
        </div>
      </div>

      <div className="relative z-10 w-full border-t border-white/5 pt-1.5 pb-0.5">
        <BrandingPlaceholder
          brandSignature={config.brandSignature}
          brandLogoUrl={config.brandLogoUrl}
          brandLogoScale={config.brandLogoScale}
          brandInstagram={config.brandInstagram}
          brandPhone={config.brandPhone}
          brandAddress={config.brandAddress}
          brandFontFamily={config.brandFontFamily}
          brandFontSize={config.brandFontSize}
          brandTextColor={config.brandTextColor}
        />
      </div>
    </div>
  );

  // Column 2: Dieciseisavos de Final (All 16 matches - super compact single line)
  columns.push(
    <div key="col-r32" className="flex flex-col h-full justify-between overflow-hidden px-3">
      <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-0.5 shrink-0" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${6.5 * (config.fontSizeScale || 1.0)}px` }}>
        Dieciseisavos de Final (1/16)
      </div>
      <div className="grid grid-cols-1 gap-[2px] flex-grow overflow-hidden pr-0.5">
        {r32Matches.map((m, idx) => (
          <FlyerPlayoffMatch key={m.id || idx} match={m} config={config} compact={true} />
        ))}
      </div>
    </div>
  );

  // Column 3: Octavos de Final (All 8 matches - standard list format)
  columns.push(
    <div key="col-r16" className="flex flex-col h-full justify-between overflow-hidden px-3">
      <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-1 shrink-0" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${6.5 * (config.fontSizeScale || 1.0)}px` }}>
        Octavos de Final (1/8)
      </div>
      <div className="grid grid-cols-1 gap-1 flex-grow overflow-hidden">
        {r16Matches.map((m, idx) => (
          <FlyerPlayoffMatch key={m.id || idx} match={m} config={config} compact={false} />
        ))}
      </div>
    </div>
  );

  // Column 4: Cuartos de Final (4) + Semifinales (2) + Tercer Puesto (1) + Final (1) + Campeón
  const thirdPlaceMatch = finalPhaseMatches[2];
  const finalMatch = finalPhaseMatches[3];

  columns.push(
    <div key="col-finals" className="flex flex-col h-full justify-between overflow-hidden px-3">
      <div className="flex-grow flex flex-col justify-between overflow-hidden gap-y-1">
        {/* Cuartos */}
        <div>
          <div className="text-[6px] font-black text-brand-accent/80 tracking-wide text-center uppercase border-b border-white/5 pb-[1px] mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${6 * (config.fontSizeScale || 1.0)}px` }}>
            Cuartos de Final
          </div>
          <div className="grid grid-cols-1 gap-[2px]">
            {qfMatches.map((m, idx) => (
              <FlyerPlayoffMatch key={m.id || idx} match={m} config={config} compact={true} />
            ))}
          </div>
        </div>

        {/* Semis */}
        <div>
          <div className="text-[6px] font-black text-brand-accent/80 tracking-wide text-center uppercase border-b border-white/5 pb-[1px] mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${6 * (config.fontSizeScale || 1.0)}px` }}>
            Semifinales
          </div>
          <div className="grid grid-cols-1 gap-[2px]">
            {finalPhaseMatches.slice(0, 2).map((m, idx) => (
              <FlyerPlayoffMatch key={m.id || idx} match={m} config={config} compact={true} />
            ))}
          </div>
        </div>

        {/* Final & Tercer Puesto */}
        <div className="grid grid-cols-2 gap-1">
          <div>
            <div className="text-[5.5px] font-black text-brand-accent/70 tracking-tight text-center uppercase border-b border-white/5 pb-[1px] mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${5.5 * (config.fontSizeScale || 1.0)}px` }}>
              3er Puesto
            </div>
            {thirdPlaceMatch && <FlyerPlayoffMatch match={thirdPlaceMatch} config={config} compact={true} />}
          </div>
          <div>
            <div className="text-[5.5px] font-black text-brand-accent/70 tracking-tight text-center uppercase border-b border-white/5 pb-[1px] mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${5.5 * (config.fontSizeScale || 1.0)}px` }}>
              Final
            </div>
            {finalMatch && <FlyerPlayoffMatch match={finalMatch} config={config} compact={true} />}
          </div>
        </div>
      </div>

      {/* World Champion Podium Box */}
      <div style={{ borderRadius: '0px' }} className="bg-[#ffd700]/10 border border-[#ffd700]/30 p-1 flex items-center justify-center gap-1.5 select-none mt-1 shrink-0">
        <span className="text-[6.5px] font-extrabold text-[#ffd700] tracking-wider uppercase" style={{ fontSize: `${6.5 * (config.fontSizeScale || 1.0)}px` }}>
          Campeón del Mundo:
        </span>
        <div style={{ borderRadius: '0px' }} className="flex-grow h-[14px] bg-white border border-black/25" />
      </div>
    </div>
  );

  // Mirror columns horizontally for double-sided print page
  if (isMirrored) {
    columns.reverse();
  }

  return (
    <div
      style={{
        width: '297mm',
        height: '105mm',
        borderRadius: '0px', // Forced straight corners!
        fontFamily: config.fontFamily,
        paddingTop: '6mm',
        paddingBottom: '4mm',
        paddingLeft: '0mm', // Exact 25% columns
        paddingRight: '0mm', // Exact 25% columns
        ...bgStyle,
      }}
      className="relative overflow-hidden box-border select-none flex flex-col justify-between text-white border border-white/10 flyer-container"
    >
      {/* Background Image Layer */}
      {hasCustomBgImage && (
        <div style={bgImageLayerStyle} />
      )}

      {/* Dark overlay decorator for high contrast */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-black/75 z-0 pointer-events-none" />

      {/* Main Grid Content - gap-0 for absolute mathematical symmetry */}
      <div className="relative z-10 grid grid-cols-4 gap-0 flex-grow h-full overflow-hidden">
        {columns}
      </div>
    </div>
  );
};

export default FlyerDorso;
