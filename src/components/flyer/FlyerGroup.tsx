import React from 'react';
import { Group, DesignConfig } from '../../types';
import { Flag } from '../cards/Flag';

interface FlyerGroupProps {
  group: Group;
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

export const FlyerGroup: React.FC<FlyerGroupProps> = ({ group, config }) => {
  const teamsList = group.teams.map(t => t.code).join(' • ');

  const titleStyle = {
    fontFamily: config.titleFontFamily || 'inherit',
    color: config.titleTextColor || '#ffd700',
    fontSize: `${8.5 * (config.fontSizeScale || 1.0)}px`
  };

  const bodyStyle = {
    fontFamily: config.bodyFontFamily || 'inherit',
    color: config.bodyTextColor || '#ffffff'
  };

  return (
    <div className="flex flex-col bg-black/10 border border-white/5 rounded p-1 text-[8.5px] select-none hover:bg-white/5 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-0.5 mb-1 font-bold text-[8.5px]">
        <span className="uppercase tracking-wider" style={titleStyle}>GRUPO {group.name}</span>
        <span className="text-white/40 uppercase tracking-tighter truncate max-w-[70px] text-[7.5px]">
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
            <div key={m.id} className="flex items-center justify-between py-[1.5px] border-b border-white/[0.03] last:border-0 h-[14px] leading-none" style={bodyStyle}>
              {/* Home Team */}
              <div className="flex items-center justify-end gap-1 w-[38%] text-right font-semibold">
                <span className="truncate" style={{ fontSize: `${8 * (config.fontSizeScale || 1.0)}px` }}>{homeCode}</span>
                <div className="w-3.5 h-2.5 shrink-0 overflow-hidden shadow-sm" style={{ border: '0.5px solid rgba(255,255,255,0.15)' }}>
                  <Flag code={homeCode} />
                </div>
              </div>

              {/* Goal Boxes */}
              <div className="flex items-center justify-center gap-[1px] shrink-0 mx-1">
                <span className="w-[10px] h-[11px] bg-white border border-black/20 rounded-[1px]" />
                <span className="w-[10px] h-[11px] bg-white border border-black/20 rounded-[1px]" />
              </div>

              {/* Away Team */}
              <div className="flex items-center justify-start gap-1 w-[38%] text-left font-semibold">
                <div className="w-3.5 h-2.5 shrink-0 overflow-hidden shadow-sm" style={{ border: '0.5px solid rgba(255,255,255,0.15)' }}>
                  <Flag code={awayCode} />
                </div>
                <span className="truncate" style={{ fontSize: `${8 * (config.fontSizeScale || 1.0)}px` }}>{awayCode}</span>
              </div>

              {/* Date */}
              <span className="font-semibold tracking-tighter w-[18%] text-right truncate opacity-60" style={{ fontSize: `${6.5 * (config.fontSizeScale || 1.0)}px`, color: config.bodyTextColor || '#ffffff' }}>
                {dateOnly}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
