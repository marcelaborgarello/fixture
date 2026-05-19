import React from 'react';
import { PlayoffPhase, DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { BrandingPlaceholder } from '../BrandingPlaceholder';

interface FaseFinalCardProps {
  phase: PlayoffPhase;
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

export const FaseFinalCard: React.FC<FaseFinalCardProps> = ({ phase, config }) => {
  const semifinalMatches = phase.matches.slice(0, 2);
  const thirdPlaceMatch = phase.matches[2];
  const finalMatch = phase.matches[3];
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
    : (config.cardBgColor || 'rgba(255, 255, 255, 0.08)');
  const matchBorder = config.borderColor || 'rgba(255, 255, 255, 0.15)';
  const matchMetaFontSize = Math.min(8, 7 * (config.fontSizeScale || 1.0));
  const matchLabelFontSize = Math.min(9, 8 * (config.fontSizeScale || 1.0));

  const renderPlayoffMatchRow = (match: any, labelSize = "max-w-[35px]") => {
    if (!match) return null;
    const homePlaceholder = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
    const awayPlaceholder = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;

    return (
      <div key={match.id} style={{ borderRadius: '0px', backgroundColor: matchBackground, borderColor: matchBorder }} className={`flex flex-col border p-2 select-none ${config.showMatchRowBackground === false ? 'bg-transparent' : ''}`}>
        {/* Meta */}
        <div
          style={{
            fontFamily: config.bodyFontFamily || 'inherit',
            color: config.bodyTextColor || '#ffffff',
            fontSize: `${7 * (config.fontSizeScale || 1.0)}px`,
          }}
          className="flex justify-between items-center opacity-60 font-semibold tracking-wider mb-2"
        >
          <span className="uppercase">{match.time}</span>
          <span>{formatShortDate(match.date)}</span>
        </div>
        {/* Row */}
        <div className="grid grid-cols-[max-content_1fr_max-content] items-center gap-2 w-full">
          <span
            style={{
              fontFamily: config.bodyFontFamily || 'inherit',
              color: config.bodyTextColor || '#ffffff',
              fontSize: `${matchLabelFontSize}px`,
            }}
            className="text-right uppercase tracking-tighter truncate max-w-[90px]"
          >
            {homePlaceholder}
          </span>
          <div className={`flex items-center justify-center gap-2 px-2 py-1 rounded ${config.showMatchRowBackground === false ? 'bg-white/5 border border-white/10' : 'bg-black/10 border border-white/10'}`}>
            <div style={{ borderRadius: '0px' }} className="w-[16px] h-[16px] bg-white border border-black/20" />
            <span
              style={{
                fontFamily: config.bodyFontFamily || 'inherit',
                color: config.bodyTextColor || '#ffffff',
                fontSize: `${7 * (config.fontSizeScale || 1.0)}px`,
              }}
              className="font-black"
            >
              vs
            </span>
            <div style={{ borderRadius: '0px' }} className="w-[16px] h-[16px] bg-white border border-black/20" />
          </div>
          <span
            style={{
              fontFamily: config.bodyFontFamily || 'inherit',
              color: config.bodyTextColor || '#ffffff',
              fontSize: `${matchLabelFontSize}px`,
            }}
            className="truncate uppercase tracking-tighter max-w-[90px]"
          >
            {awayPlaceholder}
          </span>
        </div>
      </div>
    );
  };

  return (
    <CardInner config={config} className="flex flex-col justify-between h-full w-full">
      {/* Sections Container */}
      <div className="flex-grow flex flex-col justify-between gap-y-1.5 w-full my-0.5 overflow-hidden">
        {/* Semifinals */}
        <div className="flex flex-col">
          <h3
            style={{
              fontFamily: config.titleFontFamily || 'inherit',
              color: config.titleTextColor || '#ffd700',
              fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px`,
            }}
            className="font-extrabold tracking-widest uppercase mb-0.5 text-center"
          >
            SEMIFINAL
          </h3>
          <div className="grid grid-cols-1 gap-1 w-full">
            {semifinalMatches.map(m => renderPlayoffMatchRow(m))}
          </div>
        </div>

        {/* 3er y 4to Puesto */}
        <div className="flex flex-col">
          <h3
            style={{
              fontFamily: config.titleFontFamily || 'inherit',
              color: config.titleTextColor || '#ffd700',
              fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px`,
            }}
            className="font-extrabold tracking-widest uppercase mb-0.5 text-center"
          >
            3ER Y 4TO PUESTO
          </h3>
          <div className="w-full">
            {thirdPlaceMatch && renderPlayoffMatchRow(thirdPlaceMatch, "max-w-[120px]")}
          </div>
        </div>

        {/* Final */}
        <div className="flex flex-col">
          <h3
            style={{
              fontFamily: config.titleFontFamily || 'inherit',
              color: config.titleTextColor || '#ffd700',
              fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px`,
            }}
            className="font-extrabold tracking-widest uppercase mb-0.5 text-center"
          >
            FINAL
          </h3>
          <div className="w-full">
            {finalMatch && renderPlayoffMatchRow(finalMatch, "max-w-[120px]")}
          </div>
        </div>

        {/* Campeón del Mundo Section */}
        <div style={{ borderRadius: '0px' }} className="flex flex-col items-center justify-center bg-white/5 border border-brand-accent/20 py-[3px] px-2 select-none relative overflow-hidden">
          {/* Subtle trophy background decorator */}
          <div className="absolute right-2 opacity-15">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-brand-accent">
              <path d="M12 2a5 5 0 0 0-5 5v3c0 2 2.2 4 4.5 4.5V18H9v2h6v-2h-2.5v-3.5c2.3-.5 4.5-2.5 4.5-4.5V7a5 5 0 0 0-5-5zM5.5 7h1v3a4.5 4.5 0 0 1-.5 2 3 3 0 0 1-.5-5zm12 5a4.5 4.5 0 0 1-.5-2V7h1a3 3 0 0 1-.5 5z" />
            </svg>
          </div>

          <span
            style={{
              fontFamily: config.titleFontFamily || 'inherit',
              color: config.titleTextColor || '#ffd700',
              fontSize: `${8 * (config.fontSizeScale || 1.0)}px`,
            }}
            className="font-black tracking-widest mb-[2px] uppercase"
          >
            CAMPEÓN DEL MUNDO
          </span>
          <div style={{ borderRadius: '0px' }} className="w-3/4 h-[16px] bg-white border border-black/25 shadow-inner" />
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
