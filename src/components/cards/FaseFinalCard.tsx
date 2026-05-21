import React from 'react';
import { PlayoffPhase, DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { BrandingPlaceholder } from '../BrandingPlaceholder';
import trophyImg from '../../assets/trophy.png';

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
          className="flex justify-between items-center opacity-70 tracking-widest px-1 mb-0.5"
        >
          <span className="font-semibold uppercase truncate max-w-[45%]">{match.time}</span>
          <span className="truncate text-right max-w-[50%]">{formatShortDate(match.date)}</span>
        </div>
        
        {/* Match traditional print row */}
        <div className="flex items-center gap-[3px] w-full mt-[2px]">
          {/* Left Code */}
          <div className="w-[24px] flex-shrink-0 text-center leading-[1.1] break-words overflow-visible flex items-center justify-center">
            <span 
              style={{ color: config.bodyTextColor || '#ffffff' }}
              className="text-[5px] font-extrabold uppercase opacity-80"
            >
              {homePlaceholder}
            </span>
          </div>
          
          {/* Home Team Input */}
          <div className="flex-1 h-[16px] bg-white/90 rounded-md shadow-inner border border-black/10" />
          
          {/* Home Goal Input */}
          <div className="w-[14px] h-[16px] bg-white/90 rounded-md shadow-inner border border-black/10 shrink-0" />
          
          {/* Away Goal Input */}
          <div className="w-[14px] h-[16px] bg-white/90 rounded-md shadow-inner border border-black/10 shrink-0" />
          
          {/* Away Team Input */}
          <div className="flex-1 h-[16px] bg-white/90 rounded-md shadow-inner border border-black/10" />
          
          {/* Right Code */}
          <div className="w-[24px] flex-shrink-0 text-center leading-[1.1] break-words overflow-visible flex items-center justify-center">
            <span 
              style={{ color: config.bodyTextColor || '#ffffff' }}
              className="text-[5px] font-extrabold uppercase opacity-80"
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

        {/* Campeón del Mundo Section */}
        <div className="flex flex-row items-center justify-center gap-2 bg-white/5 border border-brand-accent/20 py-2 px-2 select-none relative overflow-hidden rounded mx-[4px]">
          {/* Trophy image */}
          <img src={trophyImg} alt="Trofeo" className="w-7 h-auto drop-shadow-md" />
          
          <div className="flex flex-col flex-1 items-center justify-center">
            <span
              style={{
                fontFamily: config.titleFontFamily || 'inherit',
                color: config.titleTextColor || '#ffd700',
                fontSize: `${10 * (config.fontSizeScale || 1.0)}px`,
              }}
              className="font-bold tracking-widest mb-1.5 uppercase text-center"
            >
              CAMPEÓN DEL MUNDO
            </span>
            <div className="w-full h-[20px] bg-white/90 border border-black/25 shadow-inner rounded-md" />
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
