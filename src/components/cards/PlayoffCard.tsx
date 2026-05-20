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
            fontSize: `${13 * (config.fontSizeScale || 1.0)}px`,
          }}
          className="font-extrabold tracking-widest uppercase drop-shadow"
        >
          {phase.name}
        </h2>
      </div>

      {/* Playoff Matches Area */}
      <div className="flex-1 flex flex-col justify-evenly py-2 w-full overflow-hidden px-[4px]">
        <div className={`${gridClass} w-full`}>
          {phase.matches.map((match) => {
            const homePlaceholder = typeof match.homeTeam === 'string'
              ? match.homeTeam
              : (match.homeTeam as any).code;
            const awayPlaceholder = typeof match.awayTeam === 'string'
              ? match.awayTeam
              : (match.awayTeam as any).code;

            return (
              <div key={match.id} className="flex flex-col mb-1 w-full">
                {/* Meta details */}
                <div
                  style={{
                    fontFamily: effectiveBodyFont || 'inherit',
                    color: effectiveBodyColor || '#ffffff',
                    fontSize: `${matchMetaFontSize}px`,
                    lineHeight: 1.1,
                  }}
                  className="flex justify-between items-center opacity-70 tracking-widest px-1"
                >
                  <span className="font-semibold uppercase truncate max-w-[45%]">{match.time}</span>
                  <span className="truncate text-right max-w-[50%]">{formatShortDate(match.date)}</span>
                </div>
                
                {/* Match traditional print row */}
                <div className="flex items-center gap-[3px] w-full mt-[2px]">
                  {/* Left Code */}
                  <div className="w-[22px] flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <span className="text-[5px] leading-tight break-words text-center font-extrabold uppercase text-white/70">
                      {homePlaceholder}
                    </span>
                  </div>
                  
                  {/* Home Team Input */}
                  <div className="flex-1 h-[14px] bg-white/90 rounded-md shadow-inner border border-black/10" />
                  
                  {/* Home Goal Input */}
                  <div className="w-[13px] h-[14px] bg-white/90 rounded-md shadow-inner border border-black/10 shrink-0" />
                  
                  {/* Away Goal Input */}
                  <div className="w-[13px] h-[14px] bg-white/90 rounded-md shadow-inner border border-black/10 shrink-0" />
                  
                  {/* Away Team Input */}
                  <div className="flex-1 h-[14px] bg-white/90 rounded-md shadow-inner border border-black/10" />
                  
                  {/* Right Code */}
                  <div className="w-[22px] flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <span className="text-[5px] leading-tight break-words text-center font-extrabold uppercase text-white/70">
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
        brandLogoScale={config.brandLogoScale}
        brandInstagram={config.brandInstagram}
        brandPhone={config.brandPhone}
        brandAddress={config.brandAddress}
        brandFontFamily={config.brandFontFamily}
        brandFontSize={config.brandFontSize}
        brandTextColor={config.brandTextColor}
      />
    </CardInner>
  );
};
