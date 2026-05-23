import React from 'react';
import { PlayoffPhase, DesignConfig } from '../../types';
import { CardInner } from './CardInner';

interface CompactRoundOf32CardProps {
  phases: PlayoffPhase[]; // Dieciseisavos Parte 1 y 2
  config: DesignConfig;
}

export const CompactRoundOf32Card: React.FC<CompactRoundOf32CardProps> = ({ phases, config }) => {
  return (
    <CardInner 
      config={config}
      className="flex flex-col w-full h-full text-white justify-evenly px-[2px] py-[1px]"
    >
      {/* Título Principal */}
      <div 
        className="flex justify-center items-center pb-[2px] mb-[2px] rounded-[2px]"
        style={{ backgroundColor: config.roundOf32TitleBgColor || config.titleBgColor || 'transparent' }}
      >
        <h3 
          className="text-[6px] font-black uppercase tracking-widest mt-[1px]"
          style={{ fontFamily: config.titleFontFamily || 'inherit', color: config.titleTextColor || config.accentColor }}
        >
          Dieciseisavos de Final
        </h3>
      </div>

      <div className="flex flex-col w-full flex-1 justify-start gap-[1px]">
        {phases.map((phase) => (
          <div key={phase.name} className="flex flex-col w-full">
            {/* Opcional: Subtítulo para dividir parte 1 y 2 si hace falta, pero ocupa espacio.
                En el diseño de la imagen, Dieciseisavos está todo junto en una sola lista enorme de 16. */}
            {phase.matches.map((match) => {
              const homeName = typeof match.homeTeam === 'string' ? match.homeTeam : (match.homeTeam as any).code;
              const awayName = typeof match.awayTeam === 'string' ? match.awayTeam : (match.awayTeam as any).code;

              return (
                <div key={match.id} className="flex flex-col w-full my-[1px]">
                {/* Fila 1: N° Partido y Fecha */}
                <div 
                  className="flex justify-start items-center w-full px-[2px] mb-[0.5px] rounded-[1px] h-[7px] relative overflow-hidden"
                  style={{ backgroundColor: config.titleBgColor || 'rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="flex flex-col justify-center absolute left-[2px] w-[400%]"
                    style={{ 
                      top: '50%',
                      transform: 'translateY(-50%) scale(0.25)', 
                      transformOrigin: 'left center'
                    }}
                  >
                    <span 
                      className="text-[24px] font-bold leading-tight" 
                      style={{ color: config.titleTextColor || 'white' }}
                    >
                      {match.time.replace('Part.', 'Partido')} - {match.date}
                    </span>
                  </div>
                </div>

                {/* Fila 2: Origen, Cajas de Nombre y Goles */}
                <div className="flex flex-row items-center justify-between w-full gap-[1px]">
                  
                  {/* Origen 1 */}
                  <div className="w-[14px] shrink-0 h-[14px] relative overflow-hidden">
                    <div
                      className="flex flex-col justify-center absolute right-0 w-[400%]"
                      style={{ 
                        top: '50%',
                        transform: 'translateY(-50%) scale(0.25)', 
                        transformOrigin: 'right center'
                      }}
                    >
                      <span 
                        className="text-[26px] font-bold text-right w-full block truncate" 
                        style={{ color: config.bodyTextColor || 'white' }}
                      >
                        {homeName}
                      </span>
                    </div>
                  </div>
                  
                  {/* Caja Nombre 1 */}
                  <div className="flex-1 h-[14px] bg-white/90 rounded-[5px] shadow-inner border border-black/20"></div>
                  
                  {/* Caja Goles 1 */}
                  <div className="w-[14px] h-[14px] bg-white/90 rounded-[5px] shadow-inner border border-black/20 shrink-0 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-[50%] w-[400%] left-0" style={{ transform: 'translateY(-50%) scale(0.25)', transformOrigin: 'center center' }}>
                      <span className="text-[30px] font-bold text-black block text-center leading-none">{match.homeScore || ''}</span>
                    </div>
                  </div>
                  
                  {/* Caja Goles 2 */}
                  <div className="w-[14px] h-[14px] bg-white/90 rounded-[5px] shadow-inner border border-black/20 shrink-0 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-[50%] w-[400%] left-0" style={{ transform: 'translateY(-50%) scale(0.25)', transformOrigin: 'center center' }}>
                      <span className="text-[30px] font-bold text-black block text-center leading-none">{match.awayScore || ''}</span>
                    </div>
                  </div>
                  
                  {/* Caja Nombre 2 */}
                  <div className="flex-1 h-[14px] bg-white/90 rounded-[5px] shadow-inner border border-black/20"></div>
                  
                  {/* Origen 2 */}
                  <div className="w-[14px] shrink-0 h-[14px] relative overflow-hidden">
                    <div
                      className="flex flex-col justify-center absolute left-0 w-[400%]"
                      style={{ 
                        top: '50%',
                        transform: 'translateY(-50%) scale(0.25)', 
                        transformOrigin: 'left center'
                      }}
                    >
                      <span 
                        className="text-[26px] font-bold text-left w-full block truncate" 
                        style={{ color: config.bodyTextColor || 'white' }}
                      >
                        {awayName}
                      </span>
                    </div>
                  </div>
                  
                </div>
              </div>
              );
            })}
          </div>
        ))}
      </div>
    </CardInner>
  );
};
