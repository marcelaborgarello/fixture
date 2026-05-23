import React from 'react';
import { PlayoffPhase, DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { BrandingPlaceholder } from '../BrandingPlaceholder';
import trofeoImg from '../../assets/trophy.png';

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
  // const effectiveTitleFont = config.applyCoverTypographyToAllCards
  //   ? (config.coverTitleFontFamily && config.coverTitleFontFamily !== 'inherit' ? config.coverTitleFontFamily : config.titleFontFamily)
  //   : config.titleFontFamily;
  // const effectiveTitleColor = config.applyCoverTypographyToAllCards
  //   ? (config.coverTitleColor || config.titleTextColor)
  //   : config.titleTextColor;
  // const effectiveBodyFont = config.applyCoverTypographyToAllCards
  //   ? (config.coverSubtitleFontFamily && config.coverSubtitleFontFamily !== 'inherit' ? config.coverSubtitleFontFamily : config.bodyFontFamily)
  //   : config.bodyFontFamily;
  // const effectiveBodyColor = config.applyCoverTypographyToAllCards
  //   ? (config.coverSubtitleColor || config.bodyTextColor)
  //   : config.bodyTextColor;
  // const matchBackground = config.showMatchRowBackground === false
  //   ? 'transparent'
  //   : (config.cardBgColor || 'rgba(255, 255, 255, 0.08)');
  // const matchBorder = config.borderColor || 'rgba(255, 255, 255, 0.15)';


  const renderPlayoffMatchRow = (match: any) => {
    if (!match) return null;
    const homePlaceholder = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
    const awayPlaceholder = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;

    return (
      <div key={match.id} className="flex flex-col mb-1.5 w-full px-[6px]">
        {/* Meta details */}
        <div
          style={{
            fontFamily: config.bodyFontFamily || 'inherit',
            color: config.bodyTextColor || '#ffffff',
            fontSize: `${7 * (config.fontSizeScale || 1.0)}px`,
            lineHeight: 1.1,
          }}
          className="flex justify-between items-center opacity-70 tracking-widest px-1 mb-0.5 whitespace-nowrap flex-nowrap"
        >
          <span className="font-semibold uppercase whitespace-nowrap truncate max-w-[45%]">{match.time}</span>
          <span className="whitespace-nowrap truncate text-right max-w-[50%]">{formatShortDate(match.date)}</span>
        </div>

        {/* Match traditional print row */}
        <div className="flex items-center justify-center gap-[2px] w-full mt-[1px]">
          {/* Left Code */}
          <div className="w-[24px] flex-shrink-0 flex items-center justify-center overflow-visible">
            <span
              style={{
                color: config.bodyTextColor || '#ffffff',
              }}
              className="text-[5px] font-extrabold uppercase opacity-80 whitespace-nowrap leading-none tracking-tighter text-center"
            >
              {homePlaceholder}
            </span>
          </div>

          {/* Home Team Input */}
          <div className="flex-1 h-[18px] bg-white/90 rounded-[5px] shadow-inner border border-black/20" />

          {/* Home Goal Input */}
          <div className="w-[18px] h-[18px] bg-white/90 rounded-[5px] shadow-inner border border-black/20 shrink-0" />

          {/* Away Goal Input */}
          <div className="w-[18px] h-[18px] bg-white/90 rounded-[5px] shadow-inner border border-black/20 shrink-0" />

          {/* Away Team Input */}
          <div className="flex-1 h-[18px] bg-white/90 rounded-[5px] shadow-inner border border-black/20" />

          {/* Right Code */}
          <div className="w-[24px] flex-shrink-0 flex items-center justify-center overflow-visible">
            <span
              style={{
                color: config.bodyTextColor || '#ffffff',
              }}
              className="text-[5px] font-extrabold uppercase opacity-80 whitespace-nowrap leading-none tracking-tighter text-center"
            >
              {awayPlaceholder}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <CardInner config={config} className="flex flex-col justify-between h-full w-full">
      {/* Sections Container */}
      <div className="flex-1 flex flex-col justify-evenly py-2 w-full my-0.5 overflow-hidden">
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
          <div className="grid grid-cols-1 gap-1 w-full px-[4px]">
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
          <div className="w-full px-[4px]">
            {thirdPlaceMatch && renderPlayoffMatchRow(thirdPlaceMatch)}
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
          <div className="w-full px-[4px]">
            {finalMatch && renderPlayoffMatchRow(finalMatch)}
          </div>
        </div>

        {/* BLOQUE CAMPEÓN DEL MUNDO */}
        <div className="flex flex-row items-center justify-center gap-2 bg-black/20 rounded-xl p-2 w-[90%] mx-auto mt-2 border border-white/10 shadow-md">
          <img
            src={trofeoImg}
            alt="Trofeo"
            className="w-10 h-auto drop-shadow-xl shrink-0"
          />
          <div className="flex flex-col items-center w-full">
            <span className="font-black text-[8px] text-[#ffd700] uppercase tracking-widest mb-1 drop-shadow-md">
              Campeón del Mundo
            </span>
            <div className="w-full h-[24px] bg-white rounded-[5px] shadow-inner border border-black/20"></div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      {config.showBrandingCards !== false && (
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
      )}
    </CardInner>
  );
};
