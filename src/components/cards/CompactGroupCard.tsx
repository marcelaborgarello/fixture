import React from 'react';
import { Group, DesignConfig } from '../../types';
import { Flag } from './Flag';
import { CardInner } from './CardInner';

interface CompactGroupCardProps {
  groups: Group[];
  config: DesignConfig;
}

export const CompactGroupCard: React.FC<CompactGroupCardProps> = ({ groups, config }) => {
  return (
    <CardInner
      config={config}
      className="flex flex-col w-full h-full text-white justify-between px-[2px] py-[1px]"
    >
      {groups.map((group) => (
        <div key={group.name} className="flex flex-col w-full items-start gap-[2px]">
          {/* Encabezado del Grupo - CONTENEDOR PRINCIPAL */}
          <div
            className="flex flex-row justify-between gap-[6px] items-center w-full px-[3px] py-[2px] mb-[1px] mt-[1.5px] rounded-[2px]"
            style={{ backgroundColor: config.groupsTitleBgColor || config.titleBgColor || 'rgba(255, 255, 255, 0.18)' }}
          >
            {/* Div 1: Nombre del grupo */}
            <div
              className="text-[9px] font-black uppercase leading-none shrink-0"
              style={{ fontFamily: config.titleFontFamily || 'inherit', color: config.titleTextColor || 'white' }}
            >
              GRUPO {group.name}
            </div>

            {/* Div 2: Nombres de los equipos */}
            <div
              className="w-[170px] text-[4.5px] font-normal leading-tight truncate text-right"
              style={{ color: config.titleTextColor || 'white' }}
            >
              {group.teams.map(t => t.code).join(' - ')}
            </div>
          </div>

          {/* Partidos del Grupo */}
          <div className="flex flex-col w-full">
            {group.matches.map((match) => {
              const isHomeStr = typeof match.homeTeam === 'string';
              const isAwayStr = typeof match.awayTeam === 'string';

              // Usamos el código FIFA según la directiva
              const homeName = isHomeStr ? match.homeTeam : (match.homeTeam as any).code;
              const awayName = isAwayStr ? match.awayTeam : (match.awayTeam as any).code;

              const homeFlag = isHomeStr ? 'TBD' : (match.homeTeam as any).flagCode;
              const awayFlag = isAwayStr ? 'TBD' : (match.awayTeam as any).flagCode;

              return (
                <div key={match.id} className="flex flex-row items-center w-full gap-[2px] mb-[1px]">

                  {/* Lado Izquierdo (Fechas y Estadios - Ocupa el espacio sobrante) */}
                  <div className="flex-1 h-[12px] min-w-0 text-left pr-[2px] relative overflow-hidden">
                    <div 
                      className="flex flex-col justify-center absolute left-0 w-[400%]"
                      style={{ 
                        top: '50%',
                        transform: 'translateY(-50%) scale(0.25)', 
                        transformOrigin: 'left center'
                      }}
                    >
                      <span
                        className="text-[26px] font-extrabold leading-tight truncate"
                        style={{ color: config.bodyTextColor || 'white' }}
                      >
                        {match.date} - {match.time}
                      </span>
                      <span
                        className="text-[22px] leading-tight truncate font-semibold"
                        style={{ color: config.bodyTextColor || 'white', opacity: 0.9 }}
                      >
                        Estadio de {match.city}
                      </span>
                    </div>
                  </div>

                  {/* Lado Derecho (Equipos y Goles - Ancho fijo e inamovible) */}
                  <div className="flex flex-row items-center justify-end gap-[1.5px] shrink-0">
                    <div
                      className="w-[28px] text-right text-[6px] font-black shrink-0"
                      style={{ color: config.bodyTextColor || 'white' }}
                    >
                      {homeName}
                    </div>

                    {/* Bandera Local */}
                    <div className="w-[12px] h-[8px] shrink-0 rounded-[1px] overflow-hidden flex items-center justify-center bg-white/10">
                      <Flag code={homeFlag} />
                    </div>

                    {/* CAJAS DE GOLES FIJAS */}
                    <div className="w-[14px] h-[12px] bg-white rounded-sm border border-black/20 shrink-0 flex items-center justify-center">
                      <span className="text-[4.5px] font-bold text-black leading-none">{match.homeScore || ''}</span>
                    </div>
                    <div className="w-[14px] h-[12px] bg-white rounded-sm border border-black/20 shrink-0 flex items-center justify-center">
                      <span className="text-[4.5px] font-bold text-black leading-none">{match.awayScore || ''}</span>
                    </div>

                    {/* Bandera Visitante */}
                    <div className="w-[12px] h-[8px] shrink-0 rounded-[1px] overflow-hidden flex items-center justify-center bg-white/10">
                      <Flag code={awayFlag} />
                    </div>

                    <div
                      className="w-[28px] text-left text-[6px] font-black shrink-0"
                      style={{ color: config.bodyTextColor || 'white' }}
                    >
                      {awayName}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </CardInner>
  );
};
