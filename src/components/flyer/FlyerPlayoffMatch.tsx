import React from 'react';
import { DesignConfig } from '../../types';
import { Flag } from '../cards/Flag';

interface FlyerPlayoffMatchProps {
  match: any;
  config: DesignConfig;
  compact?: boolean;
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

export const FlyerPlayoffMatch: React.FC<FlyerPlayoffMatchProps> = ({ match, config, compact = false }) => {
  if (!match) return null;
  const home = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
  const away = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;
  const formattedDate = formatShortDate(match.date);
  const dateOnly = formattedDate.includes(' ') ? formattedDate.split(' ')[1] : formattedDate;

  const fontStyle = {
    fontFamily: config.bodyFontFamily || 'inherit',
    color: config.bodyTextColor || '#ffffff'
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between bg-black/10 border border-white/5 rounded px-[3px] py-[2px] leading-none gap-[2px] hover:bg-white/5 transition-colors select-none" style={fontStyle}>
        {/* Home */}
        <span className="flex-1 text-[7px] font-extrabold text-white/70 truncate text-right flex items-center justify-end gap-0.5" style={{ fontSize: `${7 * (config.fontSizeScale || 1.0)}px` }}>
          <span className="truncate">{home}</span>
          <span className="w-2.5 h-2 shrink-0 border border-white/10 overflow-hidden shadow-sm"><Flag code={home} /></span>
        </span>

        {/* Goles */}
        <div className="flex items-center gap-[1px] shrink-0">
          <div className="w-[11px] h-[9px] bg-white border border-black/20 rounded-[1px]" />
          <span className="text-[5px] text-white/20 font-black px-[1px]">-</span>
          <div className="w-[11px] h-[9px] bg-white border border-black/20 rounded-[1px]" />
        </div>

        {/* Away */}
        <span className="flex-1 text-[7px] font-extrabold text-white/70 truncate text-left flex items-center justify-start gap-0.5" style={{ fontSize: `${7 * (config.fontSizeScale || 1.0)}px` }}>
          <span className="w-2.5 h-2 shrink-0 border border-white/10 overflow-hidden shadow-sm"><Flag code={away} /></span>
          <span className="truncate">{away}</span>
        </span>

        <span className="text-[5.5px] text-white/40 font-semibold pl-1 shrink-0 scale-90">{dateOnly}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-black/15 border border-white/5 rounded p-[3px] select-none hover:bg-white/5 transition-colors" style={fontStyle}>
      {/* Meta */}
      <div className="flex justify-between items-center text-[6px] text-white/35 font-bold tracking-wider leading-none mb-1">
        <span>{match.time}</span>
        <span>{dateOnly}</span>
      </div>

      {/* Row */}
      <div className="flex items-center justify-between gap-0.5 w-full h-[12px] leading-none">
        {/* Home */}
        <span className="flex-1 text-[7.5px] font-bold text-white/70 tracking-tighter truncate text-right flex items-center justify-end gap-1" style={{ fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px` }}>
          <span className="truncate">{home}</span>
          <span className="w-3.5 h-2.5 shrink-0 border border-white/10 overflow-hidden shadow-sm"><Flag code={home} /></span>
        </span>
        
        {/* Score home */}
        <div className="w-[11px] h-[10px] bg-white border border-black/20 rounded-[1px] shrink-0" />

        <span className="text-[6px] text-white/30 font-black shrink-0 px-[1px]">v</span>

        {/* Score away */}
        <div className="w-[11px] h-[10px] bg-white border border-black/20 rounded-[1px] shrink-0" />

        {/* Away */}
        <span className="flex-1 text-[7.5px] font-bold text-white/70 tracking-tighter truncate text-left flex items-center justify-start gap-1" style={{ fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px` }}>
          <span className="w-3.5 h-2.5 shrink-0 border border-white/10 overflow-hidden shadow-sm"><Flag code={away} /></span>
          <span className="truncate">{away}</span>
        </span>
      </div>
    </div>
  );
};

export default FlyerPlayoffMatch;
