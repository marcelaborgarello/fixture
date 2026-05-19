import React from 'react';

interface FlyerPlayoffMatchProps {
  match: any;
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

export const FlyerPlayoffMatch: React.FC<FlyerPlayoffMatchProps> = ({ match }) => {
  if (!match) return null;
  const home = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
  const away = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;
  const formattedDate = formatShortDate(match.date);
  const dateOnly = formattedDate.includes(' ') ? formattedDate.split(' ')[1] : formattedDate;

  return (
    <div className="flex flex-col bg-black/15 border border-white/5 rounded p-[3px] select-none hover:bg-white/5 transition-colors">
      {/* Meta */}
      <div className="flex justify-between items-center text-[6px] text-white/35 font-bold tracking-wider leading-none mb-1">
        <span>{match.time}</span>
        <span>{dateOnly}</span>
      </div>

      {/* Row */}
      <div className="flex items-center justify-between gap-0.5 w-full h-[12px] leading-none">
        {/* Home */}
        <span className="flex-1 text-[7.5px] font-bold text-white/70 tracking-tighter truncate text-right">
          {home}
        </span>
        
        {/* Score home */}
        <div className="w-[10px] h-[10.5px] bg-black/35 border border-white/10 rounded-[1px] shrink-0" />

        <span className="text-[6px] text-white/30 font-black shrink-0 px-[1px]">v</span>

        {/* Score away */}
        <div className="w-[10px] h-[10.5px] bg-black/35 border border-white/10 rounded-[1px] shrink-0" />

        {/* Away */}
        <span className="flex-1 text-[7.5px] font-bold text-white/70 tracking-tighter truncate text-left">
          {away}
        </span>
      </div>
    </div>
  );
};
export default FlyerPlayoffMatch;
