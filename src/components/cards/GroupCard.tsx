import React from 'react';
import { Group, DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { Flag } from './Flag';
import { BrandingPlaceholder } from '../BrandingPlaceholder';

interface GroupCardProps {
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

export const GroupCard: React.FC<GroupCardProps> = ({ group, config }) => {
  const useFifaCode = config.useFifaCode ?? false;
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

  // Render header team list
  const teamNamesLine = group.teams
    .map(t => useFifaCode ? t.code : t.name)
    .join(' • ');

  const titleScaleSize = 13 * (config.fontSizeScale || 1.0);
  const subtitleScaleSize = 7.5 * (config.fontSizeScale || 1.0);

  return (
    <CardInner config={config} className="flex flex-col justify-between h-full w-full">
      {/* Card Header */}
      <div className="flex flex-col items-center text-center w-full select-none mb-1">
        <h2
          style={{
            fontFamily: effectiveTitleFont || 'inherit',
            color: effectiveTitleColor || '#ffd700',
            fontSize: `${titleScaleSize}px`,
          }}
          className="font-extrabold tracking-widest uppercase drop-shadow"
        >
          GRUPO {group.name}
        </h2>
        <div
          style={{
            fontFamily: effectiveBodyFont || 'inherit',
            color: effectiveBodyColor || '#ffffff',
            opacity: 0.5,
            fontSize: `${subtitleScaleSize}px`,
          }}
          className="font-semibold tracking-wider uppercase truncate max-w-[95%] mt-0.5"
        >
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

          // Compute size classes dynamic sizing with scale
          const getBaseSize = (name: string, useFifa: boolean) => {
            if (useFifa) return 10;
            if (name.length > 12) return 8;
            if (name.length > 8) return 9;
            return 10;
          };

          const homeFontSize = getBaseSize(homeName, useFifaCode) * (config.fontSizeScale || 1.0);
          const awayFontSize = getBaseSize(awayName, useFifaCode) * (config.fontSizeScale || 1.0);

          return (
            <div
              key={match.id}
              style={{
                backgroundColor: matchBackground,
                borderColor: matchBorder,
              }}
              className={`flex flex-col justify-center border-b py-[2px] last:border-0 transition-colors duration-150 px-1 rounded ${config.showMatchRowBackground === false ? '' : 'hover:bg-white/10'}`}
            >
              {/* Match Meta (Date & Venue) */}
              <div
                style={{
                  fontFamily: effectiveBodyFont || 'inherit',
                  color: effectiveBodyColor || '#ffffff',
                  opacity: 0.4,
                  fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px`,
                }}
                className="flex justify-between items-center font-semibold tracking-wider mb-[2px] select-none"
              >
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
                    style={{
                      fontFamily: effectiveBodyFont || 'inherit',
                      color: isHomeStr ? undefined : (effectiveBodyColor || '#ffffff'),
                      fontSize: `${isHomeStr ? 9 * (config.fontSizeScale || 1.0) : homeFontSize}px`,
                    }}
                    className={`truncate select-none leading-none ${isHomeStr
                      ? 'text-white/40 italic font-normal'
                      : 'font-medium'
                      }`}
                  >
                    {homeName}
                  </span>
                  <Flag code={homeFlag} />
                </div>

                {/* Score Boxes (Playable print inputs) */}
                <div className="flex items-center gap-[2px] px-[2px] shrink-0 select-none">
                  <div style={{ borderRadius: '0px' }} className="w-[16px] h-[14px] bg-white border border-black/25" />
                  <span style={{ fontSize: `${7 * (config.fontSizeScale || 1.0)}px` }} className="text-white/30 font-bold shrink-0">-</span>
                  <div style={{ borderRadius: '0px' }} className="w-[16px] h-[14px] bg-white border border-black/25" />
                </div>

                {/* Away Team */}
                <div className="flex items-center justify-start w-[41%] gap-1 text-left overflow-hidden">
                  <Flag code={awayFlag} />
                  <span
                    style={{
                      fontFamily: effectiveBodyFont || 'inherit',
                      color: isAwayStr ? undefined : (effectiveBodyColor || '#ffffff'),
                      fontSize: `${isAwayStr ? 9 * (config.fontSizeScale || 1.0) : awayFontSize}px`,
                    }}
                    className={`truncate select-none leading-none ${isAwayStr
                      ? 'text-white/40 italic font-normal'
                      : 'font-medium'
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
