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

  // Cover specific background override if set
  if (config.coverBgImageUrl) {
    bgStyle.backgroundImage = `url(${config.coverBgImageUrl})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  } else if (config.coverBgColor) {
    bgStyle.backgroundColor = config.coverBgColor;
    bgStyle.backgroundImage = 'none';
  }

  const r32Matches = phases[0]?.matches || [];
  const r16Matches = phases[1]?.matches || [];
  const qfMatches = phases[2]?.matches || [];
  const finalPhaseMatches = phases[3]?.matches || []; // Semis, 3er puesto, final

  // Construct column elements
  const columns: React.ReactNode[] = [];

  // Column 1: Dieciseisavos - Parte A (Partidos 1-8)
  columns.push(
    <div key="col-1" className="flex flex-col h-full justify-between overflow-hidden">
      <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-1">
        1/16 Final - Grupo A
      </div>
      <div className="grid grid-cols-1 gap-1 flex-grow overflow-hidden">
        {r32Matches.slice(0, 8).map(m => (
          <FlyerPlayoffMatch key={m.id} match={m} />
        ))}
      </div>
    </div>
  );

  // Column 2: Dieciseisavos - Parte B (Partidos 9-16)
  columns.push(
    <div key="col-2" className="flex flex-col h-full justify-between overflow-hidden">
      <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-1">
        1/16 Final - Grupo B
      </div>
      <div className="grid grid-cols-1 gap-1 flex-grow overflow-hidden">
        {r32Matches.slice(8, 16).map(m => (
          <FlyerPlayoffMatch key={m.id} match={m} />
        ))}
      </div>
    </div>
  );

  // Column 3: Octavos de Final (Partidos 1-8)
  columns.push(
    <div key="col-3" className="flex flex-col h-full justify-between overflow-hidden">
      <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-1">
        Octavos de Final
      </div>
      <div className="grid grid-cols-1 gap-1 flex-grow overflow-hidden">
        {r16Matches.map(m => (
          <FlyerPlayoffMatch key={m.id} match={m} />
        ))}
      </div>
    </div>
  );

  // Column 4: Cuartos (Partidos 1-4) + Semifinales (Partidos 1-2)
  columns.push(
    <div key="col-4" className="flex flex-col h-full justify-between overflow-hidden">
      <div>
        <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-0.5">
          Cuartos de Final
        </div>
        <div className="grid grid-cols-1 gap-1 mb-1">
          {qfMatches.map(m => (
            <FlyerPlayoffMatch key={m.id} match={m} />
          ))}
        </div>
      </div>
      <div>
        <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-0.5">
          Semifinales
        </div>
        <div className="grid grid-cols-1 gap-1">
          {finalPhaseMatches.slice(0, 2).map(m => (
            <FlyerPlayoffMatch key={m.id} match={m} />
          ))}
        </div>
      </div>
    </div>
  );

  // Column 5: 3er Puesto + Final + Mini Cover Widget (Logo de tapa / Copa)
  const thirdPlaceMatch = finalPhaseMatches[2];
  const finalMatch = finalPhaseMatches[3];

  columns.push(
    <div key="col-5" className="flex flex-col h-full justify-between overflow-hidden">
      <div>
        <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-0.5">
          3er y 4to Puesto
        </div>
        <div className="grid grid-cols-1 gap-1 mb-1">
          {thirdPlaceMatch && <FlyerPlayoffMatch match={thirdPlaceMatch} />}
        </div>
        <div className="text-[6.5px] font-black text-brand-accent tracking-wider text-center uppercase border-b border-white/10 pb-[2px] mb-0.5">
          Final
        </div>
        <div className="grid grid-cols-1 gap-1">
          {finalMatch && <FlyerPlayoffMatch match={finalMatch} />}
        </div>
      </div>

      {/* Mini Cover branding space */}
      <div className="bg-white/5 border border-brand-accent/20 rounded p-1.5 flex flex-col items-center justify-center text-center select-none mt-1">
        {config.showCoverTrophy && (
          <img
            src={config.coverIllustrationUrl || trophyImg}

            style={{
              opacity: config.coverIllustrationOpacity,
              transform: `scale(${(config.coverIllustrationScale ?? 100) / 100}) translateY(${(config.coverIllustrationY ?? 0) * 0.1}px)`,
            }}
            className="h-6 object-contain mb-0.5 pointer-events-none filter drop-shadow"
            alt="Trophy"
          />
        )}
        <span className="text-[7.5px] font-black text-white tracking-widest uppercase">
          {config.coverTitle || 'WORLD CUP 26'}
        </span>
        <BrandingPlaceholder
          brandSignature={config.brandSignature}
          brandLogoUrl={config.brandLogoUrl}
        />
      </div>
    </div>
  );

  // Mirror column list if requested
  if (isMirrored) {
    columns.reverse();
  }

  return (
    <div
      style={{
        width: '297mm',
        height: '105mm',
        borderRadius: `${config.borderRadius}px`,
        fontFamily: config.fontFamily,
        ...bgStyle,
      }}
      className="relative overflow-hidden box-border select-none flex flex-col justify-between p-3 text-white border border-white/10 flyer-container"
    >
      {/* Dark overlay decorator for high contrast */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-black/75 z-0 pointer-events-none" />

      {/* Main Grid Content */}
      <div className="relative z-10 grid grid-cols-5 gap-2.5 flex-grow h-full overflow-hidden">
        {columns}
      </div>
    </div>
  );
};
export default FlyerDorso;
