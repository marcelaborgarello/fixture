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
  const matchBackground = config.showMatchRowBackground === false
    ? 'transparent'
    : 'rgba(255, 255, 255, 0.04)';
  const matchBorder = config.showMatchRowBackground === false
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 255, 255, 0.12)';
  const scale = config.fontSizeScale || 1.0;
  const matchMetaFontSize = Math.min(isCompactPhase ? 6.8 : 7.4, (isCompactPhase ? 6.8 : 7.5) * scale);
  const matchLabelFontSize = Math.min(isCompactPhase ? 7.8 : 8.5, (isCompactPhase ? 7.5 : 8) * scale);
  const matchVsFontSize = Math.min(isCompactPhase ? 6 : 7, (isCompactPhase ? 6 : 6.5) * scale);

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
      <div className="flex-grow flex flex-col justify-start my-1 w-full overflow-hidden">
        <div className={`${gridClass} w-full`}>
          {phase.matches.map((match) => {
            const homePlaceholder = typeof match.homeTeam === 'string'
              ? match.homeTeam
              : (match.homeTeam as any).code;
            const awayPlaceholder = typeof match.awayTeam === 'string'
              ? match.awayTeam
              : (match.awayTeam as any).code;

            return (
              <div
                key={match.id}
                style={{
                  borderRadius: '0px',
                  backgroundColor: matchBackground,
                  borderColor: matchBorder,
                }}
                className={`flex flex-col border px-1 py-0.5 transition-colors select-none ${config.showMatchRowBackground === false ? '' : 'hover:bg-white/10'}`}
              >
                {/* Meta details */}
                <div
                  style={{
                    fontFamily: effectiveBodyFont || 'inherit',
                    color: effectiveBodyColor || '#ffffff',
                    fontSize: `${matchMetaFontSize}px`,
                    lineHeight: 1.1,
                  }}
                  className="flex justify-between items-center opacity-70 tracking-widest"
                >
                  <span className="font-semibold uppercase truncate max-w-[45%]">{match.time}</span>
                  <span className="truncate text-right max-w-[50%]">{formatShortDate(match.date)}</span>
                </div>

                {/* Match inputs row */}
                <div className="flex items-center justify-between gap-2 mt-0.5 w-full">
                  <span
                    style={{
                      fontFamily: effectiveBodyFont || 'inherit',
                      color: effectiveBodyColor || '#ffffff',
                      fontSize: `${matchLabelFontSize}px`,
                    }}
                    className="text-left uppercase tracking-tighter truncate max-w-[40%]"
                  >
                    {homePlaceholder}
                  </span>

                  <span
                    style={{
                      fontFamily: effectiveBodyFont || 'inherit',
                      color: effectiveBodyColor || '#ffffff',
                      fontSize: `${matchVsFontSize}px`,
                    }}
                    className="font-black uppercase"
                  >
                    vs
                  </span>

                  <span
                    style={{
                      fontFamily: effectiveBodyFont || 'inherit',
                      color: effectiveBodyColor || '#ffffff',
                      fontSize: `${matchLabelFontSize}px`,
                    }}
                    className="truncate uppercase tracking-tighter text-right max-w-[40%]"
                  >
                    {awayPlaceholder}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {isCompactPhase && (
          <div className="mt-0.5 pt-0.5 border-t border-white/10">
            <div
              style={{
                fontFamily: effectiveBodyFont || 'inherit',
                color: effectiveBodyColor || '#ffffff',
                fontSize: `${matchMetaFontSize}px`,
              }}
              className="uppercase tracking-widest opacity-60 mb-1"
            >
              Notas
            </div>
            <div className="h-[1px] w-full bg-white/10" />
          </div>
        )}
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
