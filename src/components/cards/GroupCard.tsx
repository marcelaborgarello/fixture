import React from 'react';
import { Group, DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { Flag } from './Flag';
import { BrandingPlaceholder } from '../BrandingPlaceholder';

interface GroupCardProps {
  group: Group;
  config: DesignConfig;
}

const getTeamNameSizeClass = (name: string, useFifaCode: boolean): string => {
  if (useFifaCode) return 'text-[10px] font-bold';
  if (name.length > 12) return 'text-[8px] leading-tight';
  if (name.length > 8) return 'text-[9px] leading-tight';
  return 'text-[10px] font-medium';
};

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

export const GroupCard: React.FC<GroupCardProps> = ({ group, config }) => {
  const useFifaCode = config.useFifaCode ?? false;

  // Render header team list
  const teamNamesLine = group.teams
    .map(t => useFifaCode ? t.code : t.name)
    .join(' • ');

  return (
    <CardInner config={config} className="flex flex-col justify-between h-full w-full">
      {/* Card Header */}
      <div className="flex flex-col items-center text-center w-full select-none mb-1">
        <h2 className="text-[13px] font-extrabold tracking-widest text-brand-accent uppercase drop-shadow">
          GRUPO {group.name}
        </h2>
        <div className="text-[7.5px] font-semibold text-white/50 tracking-wider uppercase truncate max-w-[95%] mt-0.5">
          {teamNamesLine}
        </div>
      </div>

      {/* Matches List (Distributed with Flexbox) */}
      <div className="flex-grow flex flex-col justify-between my-1 gap-y-0.5 w-full overflow-hidden">
        {group.matches.map((match) => {
          const isHomeStr = typeof match.homeTeam === 'string';
          const isAwayStr = typeof match.awayTeam === 'string';
          
          const homeName = isHomeStr 
            ? (match.homeTeam as string) 
            : (useFifaCode ? (match.homeTeam as any).code : (match.homeTeam as any).name);
          const awayName = isAwayStr 
            ? (match.awayTeam as string) 
            : (useFifaCode ? (match.awayTeam as any).code : (match.awayTeam as any).name);

          const homeFlag = isHomeStr ? 'TBD' : (match.homeTeam as any).flagCode;
          const awayFlag = isAwayStr ? 'TBD' : (match.awayTeam as any).flagCode;

          return (
            <div
              key={match.id}
              className="flex flex-col justify-center border-b border-white/5 py-[2px] last:border-0 hover:bg-white/5 transition-colors duration-150 px-1 rounded"
            >
              {/* Match Meta (Date & Venue) */}
              <div className="flex justify-between items-center text-[7.5px] text-white/40 font-semibold tracking-wider mb-[2px] select-none">
                <span>
                  {formatShortDate(match.date)} - {match.time.replace(' hs.', '')}
                </span>
                <span className="truncate max-w-[45%] text-right">{match.city}</span>
              </div>

              {/* Match Row (Teams and Score Inputs) */}
              <div className="flex items-center justify-between w-full h-[18px]">
                {/* Home Team */}
                <div className="flex items-center justify-end w-[41%] gap-1 text-right overflow-hidden">
                  <span
                    className={`truncate select-none leading-none ${
                      isHomeStr
                        ? 'text-white/40 italic font-normal text-[9px]'
                        : getTeamNameSizeClass(homeName, useFifaCode)
                    }`}
                  >
                    {homeName}
                  </span>
                  <Flag code={homeFlag} />
                </div>

                {/* Score Boxes (Playable print inputs) */}
                <div className="flex items-center gap-[2px] px-[2px] shrink-0 select-none">
                  <div className="w-[12px] h-[14px] bg-black/25 border border-white/10 rounded-[1px]" />
                  <span className="text-[7px] text-white/30 font-bold shrink-0">-</span>
                  <div className="w-[12px] h-[14px] bg-black/25 border border-white/10 rounded-[1px]" />
                </div>

                {/* Away Team */}
                <div className="flex items-center justify-start w-[41%] gap-1 text-left overflow-hidden">
                  <Flag code={awayFlag} />
                  <span
                    className={`truncate select-none leading-none ${
                      isAwayStr
                        ? 'text-white/40 italic font-normal text-[9px]'
                        : getTeamNameSizeClass(awayName, useFifaCode)
                    }`}
                  >
                    {awayName}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Branding Placeholder */}
      <BrandingPlaceholder
        brandSignature={config.brandSignature}
        brandLogoUrl={config.brandLogoUrl}
      />
    </CardInner>
  );
};
