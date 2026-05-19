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
  // BG styling logic
  const bgStyle: React.CSSProperties = {};
  if (config.backgroundType === 'gradient') {
    bgStyle.backgroundImage = config.backgroundGradient;
  } else if (config.backgroundType === 'solid') {
    bgStyle.backgroundColor = config.solidColor;
  } else if (config.backgroundType === 'image' && config.backgroundImageUrl) {
    bgStyle.backgroundImage = `url(${config.backgroundImageUrl})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
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
        borderRadius: `${config.borderRadius}px`,
        fontFamily: config.fontFamily,
        ...bgStyle,
      }}
      className="relative overflow-hidden box-border select-none flex flex-col justify-between p-4 text-white border border-white/10 poster-container"
    >
      {/* Background Decorator */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/50 to-black/80 z-0 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <div className="flex items-center gap-3">
          {config.showCoverTrophy && (
            <img
              src={config.coverIllustrationUrl || trophyImg}
              className="h-10 object-contain filter drop-shadow"
              alt="Trophy"
            />
          )}
          <div>
            <h1 className="text-sm font-extrabold tracking-[0.25em] text-brand-accent uppercase leading-none">
              {config.coverTitle || 'WORLD CUP 2026'}
            </h1>
            <span className="text-[9px] text-white/50 tracking-wider font-semibold uppercase">
              {config.coverSubtitle || 'CALENDARIO OFICIAL DE PARTIDOS'}
            </span>
          </div>
        </div>
        <BrandingPlaceholder
          brandSignature={config.brandSignature}
          brandLogoUrl={config.brandLogoUrl}
        />
      </div>

      {/* Grid Content: 4 Columns */}
      <div className="relative z-10 grid grid-cols-4 gap-2 flex-grow overflow-hidden text-[7px]">
        {/* Column 1: Groups A to F */}
        <div className="flex flex-col justify-between gap-1.5 h-full">
          <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5">
            GRUPOS A - F
          </div>
          {groups.slice(0, 6).map((g) => (
            <FlyerGroup key={g.name} group={g} />
          ))}
        </div>

        {/* Column 2: Groups G to L */}
        <div className="flex flex-col justify-between gap-1.5 h-full">
          <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5">
            GRUPOS G - L
          </div>
          {groups.slice(6, 12).map((g) => (
            <FlyerGroup key={g.name} group={g} />
          ))}
        </div>

        {/* Column 3: Round of 32 (Dieciseisavos) */}
        <div className="flex flex-col justify-between gap-1 h-full">
          <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5 border-b border-white/10 pb-[2px]">
            DIECISEISAVOS DE FINAL
          </div>
          <div className="grid grid-cols-1 gap-1 flex-grow overflow-hidden">
            {r32Matches.map((m) => (
              <FlyerPlayoffMatch key={m.id} match={m} />
            ))}
          </div>
        </div>

        {/* Column 4: Octavos, Cuartos, Semis, Final, Campeón */}
        <div className="flex flex-col justify-between gap-2 h-full overflow-hidden">
          {/* Octavos */}
          <div className="flex flex-col">
            <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5 border-b border-white/10 pb-[2px]">
              OCTAVOS DE FINAL
            </div>
            <div className="grid grid-cols-1 gap-1 max-h-[85px] overflow-hidden">
              {r16Matches.slice(0, 8).map((m) => (
                <FlyerPlayoffMatch key={m.id} match={m} />
              ))}
            </div>
          </div>

          {/* Cuartos */}
          <div className="flex flex-col">
            <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5 border-b border-white/10 pb-[2px]">
              CUARTOS DE FINAL
            </div>
            <div className="grid grid-cols-1 gap-1">
              {qfMatches.map((m) => (
                <FlyerPlayoffMatch key={m.id} match={m} />
              ))}
            </div>
          </div>

          {/* Semifinales, Final, Campeón */}
          <div className="flex-grow flex flex-col justify-between gap-1 pt-1 border-t border-white/10">
            <div>
              <div className="text-[7.5px] font-black text-brand-accent tracking-widest text-center uppercase mb-0.5">
                SEMIFINAL Y FINAL
              </div>
              <div className="grid grid-cols-1 gap-1">
                {finalPhaseMatches.slice(0, 2).map((m) => (
                  <FlyerPlayoffMatch key={m.id} match={m} />
                ))}
                {finalPhaseMatches[3] && (
                  <div className="border-t border-brand-accent/20 pt-1 mt-1">
                    <FlyerPlayoffMatch match={finalPhaseMatches[3]} />
                  </div>
                )}
              </div>
            </div>

            {/* Champion Badge */}
            <div className="bg-white/5 border border-brand-accent/30 rounded p-1.5 flex flex-col items-center justify-center relative overflow-hidden select-none">
              <span className="text-[7px] font-black tracking-widest text-brand-accent uppercase mb-1">
                CAMPEÓN DEL MUNDO
              </span>
              <div className="w-full h-3.5 bg-black/40 border border-brand-accent/20 rounded-[1px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PosterA4;
