import React from 'react';
import { Group, PlayoffPhase, DesignConfig } from '../../types';
import { FlyerGroup } from '../flyer/FlyerGroup';
import { FlyerPlayoffMatch } from '../flyer/FlyerPlayoffMatch';
import { BrandingPlaceholder } from '../BrandingPlaceholder';
import trophyImg from '../../assets/copa.png';

interface FoldingA4Props {
  groups: Group[];
  phases: PlayoffPhase[];
  config: DesignConfig;
}

export const FoldingA4: React.FC<FoldingA4Props> = ({ groups, phases, config }) => {
  // BG styling logic
  const bgStyle: React.CSSProperties = {};
  let hasCustomBgImage = false;
  const bgImageLayerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
  };

  if (config.coverBgImageUrl) {
    hasCustomBgImage = true;
    bgImageLayerStyle.backgroundImage = `url(${config.coverBgImageUrl})`;
    bgImageLayerStyle.backgroundSize = `${config.bgImageScale ?? 100}%`;
    bgImageLayerStyle.backgroundPosition = `${config.bgImageX ?? 50}% ${config.bgImageY ?? 50}%`;
    bgImageLayerStyle.backgroundRepeat = 'no-repeat';
    bgImageLayerStyle.opacity = (config.bgImageOpacity ?? 100) / 100;
  } else if (config.coverBgColor) {
    bgStyle.backgroundColor = config.coverBgColor;
  } else {
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
  }

  // phases[0] = Dieciseisavos Parte 1 (8 partidos)
  // phases[1] = Dieciseisavos Parte 2 (8 partidos) → se combinan en r32
  // phases[2] = Octavos de Final
  // phases[3] = Cuartos de Final
  // phases[4] = Fase Final (Semis + 3er puesto + Final)
  const r32Matches = [...(phases[0]?.matches || []), ...(phases[1]?.matches || [])];
  const r16Matches = phases[2]?.matches || [];
  const qfMatches = phases[3]?.matches || [];
  const finalPhaseMatches = phases[4]?.matches || [];
  const thirdPlaceMatch = finalPhaseMatches[2];
  const finalMatch = finalPhaseMatches[3];

  return (
    <div
      id="folding-a4-sheet"
      style={{
        width: '297mm',
        height: '210mm',
        borderRadius: '0px', // Forced straight corners!
        fontFamily: config.fontFamily,
        paddingTop: '8mm',
        paddingBottom: '6mm',
        paddingLeft: '8mm',
        paddingRight: '8mm',
        ...bgStyle,
      }}
      className="relative overflow-hidden box-border select-none text-white border border-white/10 flex flex-col justify-between"
    >
      {/* Background Image Layer */}
      {hasCustomBgImage && (
        <div style={bgImageLayerStyle} />
      )}

      {/* Dark overlay decorator */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/45 to-black/75 z-0 pointer-events-none" />

      {/* Folding grid (4 cols x 2 rows) */}
      <div className="relative z-10 grid grid-cols-4 grid-rows-2 gap-x-4 gap-y-3 h-full w-full overflow-hidden">

        {/* ROW 1, COL 1: Tapa (Cover / Branding / Trophy) */}
        <div style={{ borderRadius: '0px' }} className="flex flex-col h-full justify-between items-center text-center p-1.5 bg-black/25 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <span className="text-[120px] font-black text-white/[0.03] tracking-tighter leading-none">2026</span>
          </div>

          <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center py-2">
            {config.showCoverFifaText && (
              <span className="text-[7px] tracking-[0.25em] text-white/50 font-bold uppercase mb-1" style={{ fontSize: `${7 * (config.fontSizeScale || 1.0)}px` }}>
                FIFA
              </span>
            )}
            {config.showCoverTrophy && (
              <img
                src={config.coverIllustrationUrl || trophyImg}
                style={{
                  opacity: config.coverIllustrationOpacity ?? 1.0,
                  transform: `scale(${((config.coverIllustrationScale ?? 100) / 100) * 1.2}) translate(${((config.coverIllustrationX ?? 0) * 0.1)}px, ${(config.coverIllustrationY ?? 0) * 0.1}px)`,
                }}
                className="h-[55px] object-contain mb-2 pointer-events-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                alt="Trophy"
              />
            )}
            <div className="text-[10px] font-black text-white tracking-[0.2em] uppercase leading-tight" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${10 * (config.fontSizeScale || 1.0)}px` }}>
              {config.coverTitle || 'WORLD CUP'}
            </div>
            <div
              style={{ color: config.coverSubtitleColor || '#ffd700', fontSize: `${7 * (config.fontSizeScale || 1.0)}px` }}
              className="font-black tracking-[0.25em] uppercase mt-1"
            >
              {config.coverSubtitle || 'CALENDARIO'}
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
            />
          </div>
        </div>

        {/* ROW 1, COL 2: Grupos A, B, C */}
        <div className="flex flex-col justify-between gap-1.5 h-full">
          {groups.slice(0, 3).map((g) => (
            <FlyerGroup key={g.name} group={g} config={config} />
          ))}
        </div>

        {/* ROW 1, COL 3: Grupos D, E, F */}
        <div className="flex flex-col justify-between gap-1.5 h-full">
          {groups.slice(3, 6).map((g) => (
            <FlyerGroup key={g.name} group={g} config={config} />
          ))}
        </div>

        {/* ROW 1, COL 4: Grupos G, H, I */}
        <div className="flex flex-col justify-between gap-1.5 h-full">
          {groups.slice(6, 9).map((g) => (
            <FlyerGroup key={g.name} group={g} config={config} />
          ))}
        </div>

        {/* ROW 2, COL 1: Grupos J, K, L */}
        <div className="flex flex-col justify-between gap-1.5 h-full">
          {groups.slice(9, 12).map((g) => (
            <FlyerGroup key={g.name} group={g} config={config} />
          ))}
        </div>

        {/* ROW 2, COL 2: Dieciseisavos de Final (1/16) - Compact matches */}
        <div className="flex flex-col h-full justify-between overflow-hidden">
          <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-0.5 shrink-0" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${6.5 * (config.fontSizeScale || 1.0)}px` }}>
            Dieciseisavos (1/16)
          </div>
          <div className="grid grid-cols-1 gap-[1.5px] flex-grow overflow-hidden pr-0.5">
            {r32Matches.map((m, idx) => (
              <FlyerPlayoffMatch key={m.id || idx} match={m} config={config} compact={true} />
            ))}
          </div>
        </div>

        {/* ROW 2, COL 3: Octavos de Final (1/8) */}
        <div className="flex flex-col h-full justify-between overflow-hidden">
          <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-1 shrink-0" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${6.5 * (config.fontSizeScale || 1.0)}px` }}>
            Octavos de Final (1/8)
          </div>
          <div className="grid grid-cols-1 gap-1 flex-grow overflow-hidden">
            {r16Matches.map((m, idx) => (
              <FlyerPlayoffMatch key={m.id || idx} match={m} config={config} compact={false} />
            ))}
          </div>
        </div>

        {/* ROW 2, COL 4: Cuartos, Semis, Finales, Campeón */}
        <div className="flex flex-col h-full justify-between overflow-hidden">
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

            {/* Finals row */}
            <div className="grid grid-cols-2 gap-1">
              <div>
                <div className="text-[5px] font-black text-brand-accent/70 tracking-tight text-center uppercase border-b border-white/5 pb-[1px] mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${5 * (config.fontSizeScale || 1.0)}px` }}>
                  3er Puesto
                </div>
                {thirdPlaceMatch && <FlyerPlayoffMatch match={thirdPlaceMatch} config={config} compact={true} />}
              </div>
              <div>
                <div className="text-[5px] font-black text-brand-accent/70 tracking-tight text-center uppercase border-b border-white/5 pb-[1px] mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${5 * (config.fontSizeScale || 1.0)}px` }}>
                  Final
                </div>
                {finalMatch && <FlyerPlayoffMatch match={finalMatch} config={config} compact={true} />}
              </div>
            </div>
          </div>

          {/* Campeón Box */}
          <div style={{ borderRadius: '0px' }} className="bg-[#ffd700]/10 border border-[#ffd700]/30 p-1 flex items-center justify-center gap-1 select-none mt-1 shrink-0">
            <span className="text-[6.5px] font-black text-[#ffd700] tracking-wider uppercase" style={{ fontSize: `${6.5 * (config.fontSizeScale || 1.0)}px` }}>
              Campeón:
            </span>
            <div style={{ borderRadius: '0px' }} className="flex-grow h-[13px] bg-white border border-black/25" />
          </div>
        </div>

      </div>

      {/* Folding helper line markers (optional print crop hints) */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 flex items-center justify-center z-20 opacity-30">
        {/* Horizontal fold line */}
        <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-white/30 h-0" />
        {/* Vertical fold lines */}
        <div className="absolute top-0 bottom-0 left-1/4 border-l border-dashed border-white/20 w-0" />
        {/* Middle fold line */}
        <div className="absolute top-0 bottom-0 left-2/4 border-l border-dashed border-white/20 w-0" />
        <div className="absolute top-0 bottom-0 left-3/4 border-l border-dashed border-white/20 w-0" />
      </div>
    </div>
  );
};

export default FoldingA4;
