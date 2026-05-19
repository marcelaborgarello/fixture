import React from 'react';
import { Group, PlayoffPhase, DesignConfig } from '../../types';
import { FlyerGroup } from '../flyer/FlyerGroup';
import { FlyerPlayoffMatch } from '../flyer/FlyerPlayoffMatch';
import { BrandingPlaceholder } from '../BrandingPlaceholder';
import trophyImg from '../../assets/copa.png';

interface PosterA4Props {
  groups: Group[];
  phases: PlayoffPhase[];
  config: DesignConfig;
}

export const PosterA4: React.FC<PosterA4Props> = ({ groups, phases, config }) => {
  // BG styling logic - Poster A4 uses general pliego background settings
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

  const r32Matches = phases[0]?.matches || [];
  const r16Matches = phases[1]?.matches || [];
  const qfMatches = phases[2]?.matches || [];
  const finalPhaseMatches = phases[3]?.matches || [];

  return (
    <div
      style={{
        width: '210mm',
        height: '297mm',
        borderRadius: '0px', // Forced straight corners!
        fontFamily: config.fontFamily,
        paddingTop: '8mm',
        paddingBottom: '6mm',
        paddingLeft: '8mm',
        paddingRight: '8mm',
        ...bgStyle,
      }}
      className="relative overflow-hidden box-border select-none flex flex-col justify-between text-white border border-white/10 poster-container"
    >
      {/* Background Image Layer */}
      {hasCustomBgImage && (
        <div style={bgImageLayerStyle} />
      )}

      {/* Background Decorator */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/50 to-black/80 z-0 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <div className="flex items-center gap-3">
          {config.showCoverTrophy && (
            <img
              src={config.coverIllustrationUrl || trophyImg}
              style={{
                transform: `translate(${config.coverIllustrationX ?? 0}px, ${config.coverIllustrationY ?? 0}px)`,
              }}
              className="h-10 object-contain filter drop-shadow"
              alt="Trophy"
            />
          )}
          <div>
            <h1 className="text-sm font-extrabold tracking-[0.25em] text-brand-accent uppercase leading-none" style={{ fontFamily: config.titleFontFamily || 'inherit', color: config.titleTextColor || '#ffd700', fontSize: `${14 * (config.fontSizeScale || 1.0)}px` }}>
              {config.coverTitle || 'WORLD CUP 2026'}
            </h1>
            <span className="text-[9px] text-white/50 tracking-wider font-semibold uppercase" style={{ fontSize: `${9 * (config.fontSizeScale || 1.0)}px` }}>
              {config.coverSubtitle || 'CALENDARIO OFICIAL DE PARTIDOS'}
            </span>
          </div>
        </div>
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

      {/* Grid Content: 4 Columns */}
      <div className="relative z-10 grid grid-cols-4 gap-2 flex-grow overflow-hidden text-[7px]">
        {/* Column 1: Groups A to F */}
        <div className="flex flex-col justify-between gap-1.5 h-full">
          <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px` }}>
            GRUPOS A - F
          </div>
          {groups.slice(0, 6).map((g) => (
            <FlyerGroup key={g.name} group={g} config={config} />
          ))}
        </div>

        {/* Column 2: Groups G to L */}
        <div className="flex flex-col justify-between gap-1.5 h-full">
          <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px` }}>
            GRUPOS G - L
          </div>
          {groups.slice(6, 12).map((g) => (
            <FlyerGroup key={g.name} group={g} config={config} />
          ))}
        </div>

        {/* Column 3: Round of 32 (Dieciseisavos) */}
        <div className="flex flex-col justify-between gap-1 h-full">
          <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5 border-b border-white/10 pb-[2px]" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px` }}>
            DIECISEISAVOS DE FINAL
          </div>
          <div className="grid grid-cols-1 gap-1 flex-grow overflow-hidden">
            {r32Matches.map((m) => (
              <FlyerPlayoffMatch key={m.id} match={m} config={config} />
            ))}
          </div>
        </div>

        {/* Column 4: Octavos, Cuartos, Semis, Final, Campeón */}
        <div className="flex flex-col justify-between gap-2 h-full overflow-hidden">
          {/* Octavos */}
          <div className="flex flex-col">
            <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5 border-b border-white/10 pb-[2px]" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px` }}>
              OCTAVOS DE FINAL
            </div>
            <div className="grid grid-cols-1 gap-1 max-h-[85px] overflow-hidden">
              {r16Matches.slice(0, 8).map((m) => (
                <FlyerPlayoffMatch key={m.id} match={m} config={config} />
              ))}
            </div>
          </div>

          {/* Cuartos */}
          <div className="flex flex-col">
            <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5 border-b border-white/10 pb-[2px]" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px` }}>
              CUARTOS DE FINAL
            </div>
            <div className="grid grid-cols-1 gap-1">
              {qfMatches.map((m) => (
                <FlyerPlayoffMatch key={m.id} match={m} config={config} />
              ))}
            </div>
          </div>

          {/* Semifinales, Final, Campeón */}
          <div className="flex-grow flex flex-col justify-between gap-1 pt-1 border-t border-white/10">
            <div>
              <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px` }}>
                SEMIFINAL Y FINAL
              </div>
              <div className="grid grid-cols-1 gap-1">
                {finalPhaseMatches.slice(0, 2).map((m) => (
                  <FlyerPlayoffMatch key={m.id} match={m} config={config} />
                ))}
                {finalPhaseMatches[3] && (
                  <div className="border-t border-brand-accent/20 pt-1 mt-1">
                    <FlyerPlayoffMatch match={finalPhaseMatches[3]} config={config} />
                  </div>
                )}
              </div>
            </div>

            {/* Champion Badge */}
            <div style={{ borderRadius: '0px' }} className="bg-white/5 border border-brand-accent/30 p-1.5 flex flex-col items-center justify-center relative overflow-hidden select-none">
              <span className="text-[7px] font-black tracking-widest text-brand-accent uppercase mb-1" style={{ fontSize: `${7 * (config.fontSizeScale || 1.0)}px` }}>
                CAMPEÓN DEL MUNDO
              </span>
              <div style={{ borderRadius: '0px' }} className="w-full h-[15px] bg-white border border-black/25" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterA4;
