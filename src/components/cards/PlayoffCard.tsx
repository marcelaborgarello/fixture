import React from 'react';
import { PlayoffPhase, DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { BrandingPlaceholder } from '../BrandingPlaceholder';

interface PlayoffCardProps {
  phase: PlayoffPhase;
  config: DesignConfig;
  type: 'dieciseisavos' | 'octavos' | 'cuartos';
}

const formatShortDate = (dateStr: string): string => {
  return dateStr
    .replace(' de junio', '/6')
    .replace(' de julio', '/7')
    .replace('Jueves', 'Jue')
    .replace('Viernes', 'Vie')
    .replace('Sábado', 'Sáb')
    .replace('Domingo', 'Dom')
    .replace('Lunes', 'Lun')
    .replace('Martes', 'Mar')
    .replace('Miércoles', 'Mié');
};

export const PlayoffCard: React.FC<PlayoffCardProps> = ({ phase, config, type }) => {
  const isWide = type === 'cuartos';
  const gridClass = isWide 
    ? 'grid grid-cols-1 gap-2 flex-grow justify-around' 
    : 'grid grid-cols-2 gap-x-2 gap-y-1';
  
  return (
    <CardInner config={config} className="flex flex-col justify-between h-full w-full">
      {/* Header */}
      <div className="flex flex-col items-center text-center w-full select-none mb-1">
        <h2 className="text-[13px] font-extrabold tracking-widest text-brand-accent uppercase drop-shadow">
          {phase.name}
        </h2>
      </div>

      {/* Playoff Matches Area */}
      <div className="flex-grow flex flex-col justify-center my-1 w-full overflow-hidden">
        <div className={`${gridClass} w-full`}>
          {phase.matches.map((match) => {
            const homePlaceholder = typeof match.homeTeam === 'string' 
              ? match.homeTeam 
              : (match.homeTeam as any).code;
            const awayPlaceholder = typeof match.awayTeam === 'string' 
              ? match.awayTeam 
              : (match.awayTeam as any).code;

            return (
              <div
                key={match.id}
                className="flex flex-col justify-center bg-black/10 border border-white/5 rounded p-1 hover:bg-white/5 transition-colors select-none"
              >
                {/* Meta details */}
                <div className="flex justify-between items-center text-[7.5px] text-white/40 font-semibold tracking-wider mb-1">
                  <span className="bg-black/30 px-1 py-[0.5px] rounded-[1.5px] font-bold">{match.time}</span>
                  <span>{formatShortDate(match.date)}</span>
                </div>

                {/* Match inputs row */}
                <div className="flex items-center justify-between gap-1 w-full">
                  {/* Home team inputs */}
                  <div className="flex-1 flex items-center justify-end gap-1 overflow-hidden relative">
                    <span className="absolute right-7 text-[8px] font-bold text-white/20 select-none uppercase tracking-tighter truncate max-w-[35px] pointer-events-none">
                      {homePlaceholder}
                    </span>
                    <div className="flex-grow h-[15px] bg-black/25 border border-white/10 rounded-[1px]" />
                    <div className="w-[13px] h-[15px] bg-black/40 border border-white/20 rounded-[1px] shrink-0" />
                  </div>

                  <span className="text-[7px] text-white/30 font-black shrink-0">vs</span>

                  {/* Away team inputs */}
                  <div className="flex-1 flex items-center justify-start gap-1 overflow-hidden relative">
                    <div className="w-[13px] h-[15px] bg-black/40 border border-white/20 rounded-[1px] shrink-0" />
                    <div className="flex-grow h-[15px] bg-black/25 border border-white/10 rounded-[1px]" />
                    <span className="absolute left-7 text-[8px] font-bold text-white/20 select-none uppercase tracking-tighter truncate max-w-[35px] pointer-events-none">
                      {awayPlaceholder}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding */}
      <BrandingPlaceholder
        brandSignature={config.brandSignature}
        brandLogoUrl={config.brandLogoUrl}
      />
    </CardInner>
  );
};
