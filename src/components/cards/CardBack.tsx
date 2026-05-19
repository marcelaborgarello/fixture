import React from 'react';
import { DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { BrandingPlaceholder } from '../BrandingPlaceholder';
import trophyImg from '../../assets/copa.png';

interface CardBackProps {
  config: DesignConfig;
}

export const CardBack: React.FC<CardBackProps> = ({ config }) => {
  const effectiveBackTitleFont = config.backTitleFontFamily && config.backTitleFontFamily !== 'inherit'
    ? config.backTitleFontFamily
    : config.titleFontFamily;
  const effectiveBackTitleColor = config.titleTextColor || '#ffffff';
  const effectiveBackSubtitleFont = config.backSubtitleFontFamily && config.backSubtitleFontFamily !== 'inherit'
    ? config.backSubtitleFontFamily
    : config.bodyFontFamily;
  const effectiveBackSubtitleColor = config.backSubtitleTextColor || config.bodyTextColor || '#ffd700';

  return (
    <CardInner config={config} isCoverOrBack={true} className="relative select-none text-center flex flex-col justify-between items-center h-full w-full">

      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-4 my-auto">
        {/* Center Contents */}
        <div className="flex-grow flex flex-col items-center justify-center gap-2">
          {config.showCoverTrophy && (
            <img
              src={config.coverIllustrationUrl || trophyImg}
              alt="Trophy"
              className="w-[50px] h-[70px] object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] pointer-events-none mb-1"
            />
          )}
          <div
            style={{
              fontFamily: effectiveBackTitleFont || 'inherit',
              color: effectiveBackTitleColor,
              fontSize: `${12 * (config.fontSizeScale || 1.0)}px`,
            }}
            className="font-black tracking-widest uppercase"
          >
            WORLD CUP 2026
          </div>
          <div
            style={{
              fontFamily: effectiveBackSubtitleFont || 'inherit',
              color: effectiveBackSubtitleColor,
              fontSize: `${7.5 * (config.fontSizeScale || 1.0)}px`,
            }}
            className="font-extrabold tracking-[0.2em] uppercase"
          >
            Fixture Oficial
          </div>
        </div>

        {/* Branding Badge */}
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
    </CardInner>
  );
};
