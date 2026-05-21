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
  // BG styling logic - Unified for the entire Flyer (no separate cover design as requested)
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

  const r32Matches = [...(phases[0]?.matches || []), ...(phases[1]?.matches || [])];
  const r16Matches = phases[2]?.matches || [];
  const qfMatches = phases[3]?.matches || [];
  const finalPhaseMatches = phases[4]?.matches || [];
  const thirdPlaceMatch = finalPhaseMatches[2];
  const finalMatch = finalPhaseMatches[3];

  const CoverPanel = () => (
    <div className="flex flex-col h-full justify-between items-center text-center relative overflow-hidden p-2">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[120px] font-black text-white/[0.03] tracking-tighter leading-none">2026</span>
      </div>

      <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center">
        {config.showCoverFifaText && (
          <span className="text-[8px] tracking-[0.25em] text-white/50 font-bold uppercase mb-1" style={{ fontSize: `${8 * (config.fontSizeScale || 1.0)}px` }}>
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
            className="h-[60px] object-contain mb-2 pointer-events-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
            alt="Trophy"
          />
        )}
        <div className="text-[11px] font-black text-white tracking-[0.2em] uppercase leading-tight" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${11 * (config.fontSizeScale || 1.0)}px`, color: config.coverTitleColor || '#ffffff' }}>
          {config.coverTitle || 'WORLD CUP'}
        </div>
        <div
          style={{ color: config.coverSubtitleColor || '#ffd700', fontSize: `${8 * (config.fontSizeScale || 1.0)}px` }}
          className="font-black tracking-[0.25em] uppercase mt-1"
        >
          {config.coverSubtitle || 'CALENDARIO'}
        </div>
      </div>

      <div className="relative z-10 w-full border-t border-white/10 pt-2">
        {config.showBrandingCards !== false && (
          <BrandingPlaceholder
            brandSignature={config.brandSignature}
            brandLogoUrl={config.brandLogoUrl}
            brandLogoScale={config.brandLogoScale}
            brandInstagram={config.brandInstagram}
            brandPhone={config.brandPhone}
            brandAddress={config.brandAddress}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 items-center justify-center py-8 max-w-full overflow-x-auto">
      {/* --- CARA FRENTE (FASE FINAL + PORTADA) --- */}
      <div className="text-left w-[297mm] shrink-0">
        <h3 className="text-white/50 font-bold uppercase tracking-wider text-sm mb-2 ml-1">Frente (Fase Final y Tapa)</h3>
        <div
          id="flyer-frente"
          style={{ width: '297mm', height: '105mm', fontFamily: config.fontFamily, ...bgStyle }}
          className="relative box-border select-none text-white border border-white/10 shadow-2xl"
        >
          {hasCustomBgImage && <div style={bgImageLayerStyle} />}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/30 z-0 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-4 h-full w-full divide-x divide-white/10">
            {/* Panel 1: Dieciseisavos */}
            <div className="flex flex-col h-full justify-between overflow-hidden p-2">
              <div className="text-[7.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-0.5 mb-1 shrink-0" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px` }}>
                Dieciseisavos (1/16)
              </div>
              <div className="flex flex-col justify-between flex-grow overflow-hidden">
                {r32Matches.map((m, idx) => (
                  <FlyerPlayoffMatch key={m.id || idx} match={m} config={config} compact={true} />
                ))}
              </div>
            </div>

            {/* Panel 2: Octavos */}
            <div className="flex flex-col h-full justify-between overflow-hidden p-2">
              <div className="text-[7.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-0.5 mb-1 shrink-0" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px` }}>
                Octavos de Final (1/8)
              </div>
              <div className="flex flex-col justify-between flex-grow overflow-hidden">
                {r16Matches.map((m, idx) => (
                  <FlyerPlayoffMatch key={m.id || idx} match={m} config={config} compact={false} />
                ))}
              </div>
            </div>

            {/* Panel 3: Cuartos, Semis, Final */}
            <div className="flex flex-col h-full justify-between overflow-hidden p-2">
              <div className="flex-grow flex flex-col justify-between overflow-hidden gap-y-1">
                <div>
                  <div className="text-[6.5px] font-black text-brand-accent/80 tracking-wide text-center uppercase border-b border-white/5 pb-[1px] mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${6.5 * (config.fontSizeScale || 1.0)}px` }}>
                    Cuartos de Final
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    {qfMatches.map((m, idx) => (
                      <FlyerPlayoffMatch key={m.id || idx} match={m} config={config} compact={true} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[6.5px] font-black text-brand-accent/80 tracking-wide text-center uppercase border-b border-white/5 pb-[1px] mb-0.5" style={{ fontFamily: config.titleFontFamily || 'inherit', fontSize: `${6.5 * (config.fontSizeScale || 1.0)}px` }}>
                    Semifinales
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    {finalPhaseMatches.slice(0, 2).map((m, idx) => (
                      <FlyerPlayoffMatch key={m.id || idx} match={m} config={config} compact={true} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 mt-0.5">
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

              <div className="bg-[#ffd700]/10 border border-[#ffd700]/30 p-1 flex items-center justify-center gap-1 select-none mt-1.5 shrink-0">
                <span className="text-[7px] font-black text-[#ffd700] tracking-wider uppercase" style={{ fontSize: `${7 * (config.fontSizeScale || 1.0)}px` }}>
                  Campeón:
                </span>
                <div className="flex-grow h-[14px] bg-white border border-black/25" />
              </div>
            </div>

            {/* Panel 4: Portada */}
            <CoverPanel />
          </div>
          
          {/* Fold lines helper */}
          <div className="absolute inset-0 pointer-events-none flex z-20 opacity-30">
            <div className="w-1/4 border-r border-dashed border-white/40 h-full" />
            <div className="w-1/4 border-r border-dashed border-white/40 h-full" />
            <div className="w-1/4 border-r border-dashed border-white/40 h-full" />
          </div>
        </div>
      </div>

      {/* --- CARA DORSO (FASE DE GRUPOS) --- */}
      <div className="text-left w-[297mm] shrink-0">
        <h3 className="text-white/50 font-bold uppercase tracking-wider text-sm mb-2 ml-1">Dorso (Fase de Grupos)</h3>
        <div
          id="flyer-dorso"
          style={{ width: '297mm', height: '105mm', fontFamily: config.fontFamily, ...bgStyle }}
          className="relative box-border select-none text-white border border-white/10 shadow-2xl"
        >
          {hasCustomBgImage && <div style={bgImageLayerStyle} />}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/30 z-0 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-4 h-full w-full divide-x divide-white/10">
            {/* Panel 1: Grupos A-C */}
            <div className="flex flex-col justify-between h-full p-2">
              {groups.slice(0, 3).map((g) => (
                <FlyerGroup key={g.name} group={g} config={config} />
              ))}
            </div>

            {/* Panel 2: Grupos D-F */}
            <div className="flex flex-col justify-between h-full p-2">
              {groups.slice(3, 6).map((g) => (
                <FlyerGroup key={g.name} group={g} config={config} />
              ))}
            </div>

            {/* Panel 3: Grupos G-I */}
            <div className="flex flex-col justify-between h-full p-2">
              {groups.slice(6, 9).map((g) => (
                <FlyerGroup key={g.name} group={g} config={config} />
              ))}
            </div>

            {/* Panel 4: Grupos J-L */}
            <div className="flex flex-col justify-between h-full p-2">
              {groups.slice(9, 12).map((g) => (
                <FlyerGroup key={g.name} group={g} config={config} />
              ))}
            </div>
          </div>
          
          {/* Fold lines helper */}
          <div className="absolute inset-0 pointer-events-none flex z-20 opacity-30">
            <div className="w-1/4 border-r border-dashed border-white/40 h-full" />
            <div className="w-1/4 border-r border-dashed border-white/40 h-full" />
            <div className="w-1/4 border-r border-dashed border-white/40 h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoldingA4;
