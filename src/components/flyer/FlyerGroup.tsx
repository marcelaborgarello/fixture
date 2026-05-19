import React from 'react';
import { Group } from '../../types';

interface FlyerGroupProps {
  group: Group;
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

export const FlyerGroup: React.FC<FlyerGroupProps> = ({ group }) => {
  const teamsList = group.teams.map(t => t.code).join(' • ');

  return (
    <div className="flex flex-col bg-black/10 border border-white/5 rounded p-1 text-[8.5px] select-none hover:bg-white/5 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-0.5 mb-1 font-bold text-[8.5px]">
        <span className="text-brand-accent uppercase tracking-wider">GRUPO {group.name}</span>
        <span className="text-white/40 uppercase tracking-tighter truncate max-w-[70px]">
          {teamsList}
        </span>
      </div>

      {/* Matches */}
      <div className="space-y-0.5 flex-grow flex flex-col justify-between">
        {group.matches.map((m) => {
          const formattedDate = formatShortDate(m.date);
          const dateOnly = formattedDate.includes(' ') ? formattedDate.split(' ')[1] : formattedDate;
          const homeCode = typeof m.homeTeam === 'string' ? m.homeTeam : m.homeTeam.code;
          const awayCode = typeof m.awayTeam === 'string' ? m.awayTeam : m.awayTeam.code;

          return (
            <div key={m.id} className="flex items-center justify-between py-[1px] border-b border-white/[0.03] last:border-0 h-[11px] leading-none">
              <span className="font-semibold text-white/80 tracking-tighter w-[45%] truncate text-right">
                {homeCode} <span className="text-white/30 font-normal">v</span> {awayCode}
              </span>
              <span className="w-[11px] h-[10px] bg-black/30 border border-white/15 rounded-[1px] shrink-0" />
              <span className="text-[7.5px] text-white/40 font-semibold tracking-tighter w-[40%] text-left pl-1">
                {dateOnly} {m.time.replace(' hs.', '')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
