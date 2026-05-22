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
  const isCompactPhase = type === 'dieciseisavos' || type === 'octavos';
  const gridClass = 'grid grid-cols-1 gap-1';

  const effectiveTitleFont = config.applyCoverTypographyToAllCards
    ? (config.coverTitleFontFamily && config.coverTitleFontFamily !== 'inherit' ? config.coverTitleFontFamily : config.titleFontFamily)
    : config.titleFontFamily;
  const effectiveTitleColor = config.applyCoverTypographyToAllCards
    ? (config.coverTitleColor || config.titleTextColor)
    : config.titleTextColor;
  const effectiveBodyFont = config.applyCoverTypographyToAllCards
    ? (config.coverSubtitleFontFamily && config.coverSubtitleFontFamily !== 'inherit' ? config.coverSubtitleFontFamily : config.bodyFontFamily)
    : config.bodyFontFamily;
  const effectiveBodyColor = config.applyCoverTypographyToAllCards
    ? (config.coverSubtitleColor || config.bodyTextColor)
    : config.bodyTextColor;

  const scale = config.fontSizeScale || 1.0;
  const matchMetaFontSize = Math.min(isCompactPhase ? 6.8 : 7.4, (isCompactPhase ? 6.8 : 7.5) * scale);


  return (
    <CardInner config={config} className="flex flex-col justify-between h-full w-full">
      {/* Header */}
      <div className="flex flex-col items-center text-center w-full select-none mb-1">
        <h2
          style={{
            fontFamily: effectiveTitleFont || 'inherit',
            color: effectiveTitleColor || '#ffd700',
            fontSize: `${(phase.name.length > 15 ? 11 : 13) * (config.fontSizeScale || 1.0)}px`,
          }}
          className="font-extrabold tracking-widest uppercase drop-shadow leading-none"
        >
          {phase.name}
        </h2>
      </div>

      {/* Playoff Matches Area */}
      <div className="flex-1 flex flex-col justify-evenly py-0.5 w-full px-1">
        <div className={`${gridClass} w-full`}>
          {phase.matches.map((match) => {
            const homePlaceholder = typeof match.homeTeam === 'string'
              ? match.homeTeam
              : (match.homeTeam as any).code;
            const awayPlaceholder = typeof match.awayTeam === 'string'
              ? match.awayTeam
              : (match.awayTeam as any).code;

            return (
              <div key={match.id} className={`flex flex-col mb-0.5 w-full px-[6px]`}>
                {/* Meta details */}
                <div
                  style={{
                    fontFamily: effectiveBodyFont || 'inherit',
                    color: effectiveBodyColor || '#ffffff',
                    fontSize: `${matchMetaFontSize}px`,
                    lineHeight: 1.1,
                  }}
                  className="flex justify-between items-center opacity-70 tracking-widest px-0.5"
                >
                  <span className="font-semibold uppercase truncate max-w-[45%]">{match.time}</span>
                  <span className="truncate text-right max-w-[50%]">{formatShortDate(match.date)}</span>
                </div>
                
                {/* Match traditional print row */}
                <div className={`flex items-center gap-[2px] w-full mt-[1px]`}>
                  {/* Left Code */}
                  <div className={`w-[28px] flex-shrink-0 text-center flex items-center justify-center`}>
                    <span 
                      style={{ 
                        color: effectiveBodyColor || '#ffffff',
                        fontSize: homePlaceholder.length > 5 ? '3.5px' : '5px'
                      }}
                      className="font-extrabold uppercase opacity-80 whitespace-nowrap overflow-hidden text-ellipsis leading-[1.1] block w-full"
                    >
                      {homePlaceholder}
                    </span>
                  </div>
                  
                  {/* Home Team Input */}
                  <div className={`flex-1 h-[14px] bg-white/90 rounded-[1px] shadow-inner border border-black/10`} />
                  
                  {/* Home Goal Input */}
                  <div className={`w-[14px] h-[14px] bg-white/90 rounded-[1px] shadow-inner border border-black/10 shrink-0`} />
                  
                  {/* Away Goal Input */}
                  <div className={`w-[14px] h-[14px] bg-white/90 rounded-[1px] shadow-inner border border-black/10 shrink-0`} />
                  
                  {/* Away Team Input */}
                  <div className={`flex-1 h-[14px] bg-white/90 rounded-[1px] shadow-inner border border-black/10`} />
                  
                  {/* Right Code */}
                  <div className={`w-[28px] flex-shrink-0 text-center flex items-center justify-center`}>
                    <span 
                      style={{ 
                        color: effectiveBodyColor || '#ffffff',
                        fontSize: awayPlaceholder.length > 5 ? '3.5px' : '5px'
                      }}
                      className="font-extrabold uppercase opacity-80 whitespace-nowrap overflow-hidden text-ellipsis leading-[1.1] block w-full"
                    >
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
      <div className="shrink-0 mt-auto flex items-end justify-center pt-1" style={{ maxHeight: '40px' }}>
        {config.showBrandingCards !== false && (
          <div className="scale-75 origin-bottom">
            <BrandingPlaceholder
              brandSignature={config.brandSignature}
              brandLogoUrl={config.brandLogoUrl}
              brandLogoScale={config.brandLogoScale}
              brandInstagram={config.brandInstagram}
              brandPhone={config.brandPhone}
              brandAddress={config.brandAddress}
              brandFontFamily={config.brandFontFamily}
              brandFontSize={config.brandFontSize}
              brandTextColor={config.brandTextColor}
            />
          </div>
        )}
      </div>
    </CardInner>
  );
};
