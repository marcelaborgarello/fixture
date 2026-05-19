import React from 'react';
import { PlayoffPhase, DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { BrandingPlaceholder } from '../BrandingPlaceholder';

interface FaseFinalCardProps {
  phase: PlayoffPhase;
  config: DesignConfig;
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

export const FaseFinalCard: React.FC<FaseFinalCardProps> = ({ phase, config }) => {
  const semifinalMatches = phase.matches.slice(0, 2);
  const thirdPlaceMatch = phase.matches[2];
  const finalMatch = phase.matches[3];

  const renderPlayoffMatchRow = (match: any, labelSize = "max-w-[35px]") => {
    if (!match) return null;
    const homePlaceholder = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
    const awayPlaceholder = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;

    return (
      <div key={match.id} className="flex flex-col bg-black/15 border border-white/5 rounded p-[3px] select-none">
        {/* Meta */}
        <div className="flex justify-between items-center text-[6.5px] text-white/40 font-semibold tracking-wider mb-[2px]">
          <span>{match.time}</span>
          <span>{formatShortDate(match.date)}</span>
        </div>
        {/* Row */}
        <div className="flex items-center justify-between gap-1 w-full h-[14px]">
          {/* Home */}
          <div className="flex-1 flex items-center justify-end gap-1 overflow-hidden relative">
            <span className={`absolute right-5 text-[7px] font-bold text-white/20 uppercase tracking-tighter truncate ${labelSize} pointer-events-none`}>
              {homePlaceholder}
            </span>
            <div className="flex-grow h-[12px] bg-black/25 border border-white/10 rounded-[1px]" />
            <div className="w-[10px] h-[12px] bg-black/40 border border-white/20 rounded-[1px] shrink-0" />
          </div>
          
          <span className="text-[6px] text-white/30 font-black shrink-0">vs</span>

          {/* Away */}
          <div className="flex-1 flex items-center justify-start gap-1 overflow-hidden relative">
            <div className="w-[10px] h-[12px] bg-black/40 border border-white/20 rounded-[1px] shrink-0" />
            <div className="flex-grow h-[12px] bg-black/25 border border-white/10 rounded-[1px]" />
            <span className={`absolute left-5 text-[7px] font-bold text-white/20 uppercase tracking-tighter truncate ${labelSize} pointer-events-none`}>
              {awayPlaceholder}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <CardInner config={config} className="flex flex-col justify-between h-full w-full">
      {/* Sections Container */}
      <div className="flex-grow flex flex-col justify-between gap-y-1.5 w-full my-0.5 overflow-hidden">
        {/* Semifinals */}
        <div className="flex flex-col">
          <h3 className="text-[7.5px] font-extrabold tracking-widest text-brand-accent uppercase mb-0.5 text-center">
            SEMIFINAL
          </h3>
          <div className="grid grid-cols-2 gap-1 w-full">
            {semifinalMatches.map(m => renderPlayoffMatchRow(m))}
          </div>
        </div>

        {/* 3er y 4to Puesto */}
        <div className="flex flex-col">
          <h3 className="text-[7.5px] font-extrabold tracking-widest text-brand-accent uppercase mb-0.5 text-center">
            3ER Y 4TO PUESTO
          </h3>
          <div className="w-full">
            {thirdPlaceMatch && renderPlayoffMatchRow(thirdPlaceMatch, "max-w-[120px]")}
          </div>
        </div>

        {/* Final */}
        <div className="flex flex-col">
          <h3 className="text-[7.5px] font-extrabold tracking-widest text-brand-accent uppercase mb-0.5 text-center">
            FINAL
          </h3>
          <div className="w-full">
            {finalMatch && renderPlayoffMatchRow(finalMatch, "max-w-[120px]")}
          </div>
        </div>

        {/* Campeón del Mundo Section */}
        <div className="flex flex-col items-center justify-center bg-white/5 border border-brand-accent/20 rounded py-[3px] px-2 select-none relative overflow-hidden">
          {/* Subtle trophy background decorator */}
          <div className="absolute right-2 opacity-15">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-brand-accent">
              <path d="M12 2a5 5 0 0 0-5 5v3c0 2 2.2 4 4.5 4.5V18H9v2h6v-2h-2.5v-3.5c2.3-.5 4.5-2.5 4.5-4.5V7a5 5 0 0 0-5-5zM5.5 7h1v3a4.5 4.5 0 0 1-.5 2 3 3 0 0 1-.5-5zm12 5a4.5 4.5 0 0 1-.5-2V7h1a3 3 0 0 1-.5 5z" />
            </svg>
          </div>
          
          <span className="text-[8px] font-black tracking-widest text-brand-accent mb-[2px] uppercase">
            CAMPEÓN DEL MUNDO
          </span>
          <div className="w-3/4 h-3.5 bg-black/35 border border-brand-accent/30 rounded-[1px] shadow-inner" />
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
