import React from 'react';
import { DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { BrandingPlaceholder } from '../BrandingPlaceholder';
import trophyImg from '../../assets/copa.png';

interface CoverCardProps {
  config: DesignConfig;
}

export const CoverCard: React.FC<CoverCardProps> = ({ config }) => {
  const illustrationScale = config.coverIllustrationScale ?? 100;
  const illustrationY = config.coverIllustrationY ?? 0;
  const illustrationX = config.coverIllustrationX ?? 0;
  const illustrationOpacity = config.coverIllustrationOpacity ?? 1.0;

  return (
    <CardInner
      config={config}
      isCoverOrBack={true}
      showWatermark={config.showCoverYear}
      className="relative select-none text-center"
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-6 px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center w-full">
          {config.showCoverFifaText && (
            <span
              style={{ fontSize: `${10 * (config.fontSizeScale || 1.0)}px` }}
              className="tracking-[0.3em] text-white/60 font-bold uppercase mb-1"
            >
              FIFA
            </span>
          )}

          <h1
            style={{
              fontFamily: config.coverTitleFontFamily && config.coverTitleFontFamily !== 'inherit' ? config.coverTitleFontFamily : (config.titleFontFamily || undefined),
              color: config.coverTitleColor || '#ffffff',
              fontSize: `${(config.coverTitleSize || 2.2) * (config.fontSizeScale || 1.0)}rem`,
              lineHeight: 1.1,
            }}
            className="font-extrabold uppercase select-none max-w-full break-words tracking-tight"
          >
            {config.coverTitle || 'WORLD CUP'}
          </h1>

          <div
            style={{
              fontFamily: config.coverSubtitleFontFamily && config.coverSubtitleFontFamily !== 'inherit'
                ? config.coverSubtitleFontFamily
                : config.bodyFontFamily || undefined,
              color: config.coverSubtitleColor || '#ffd700',
              fontSize: `${10 * (config.fontSizeScale || 1.0)}px`
            }}
            className="font-bold tracking-[0.2em] uppercase mt-2 max-w-[90%]"
          >
            {config.coverSubtitle || 'CALENDARIO'}
          </div>
        </div>

        {/* Central Illustration Area */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden my-3">
          {config.showCoverTrophy && (
            <div
              style={{
                transform: `scale(${(illustrationScale / 100) * 1.3}) translate(${illustrationX}px, ${illustrationY}px)`, // Added translateX support!
                opacity: illustrationOpacity,
                transition: 'transform 0.2s ease-out',
              }}
              className="w-[120px] h-[160px] flex items-center justify-center"
            >
              <img
                src={config.coverIllustrationUrl || trophyImg}
                alt="Trophy"
                className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
              />
            </div>
          )}
        </div>

        {/* Branding placeholder */}
        {config.showBrandingCover !== false && (
          <div className="mb-2">
            <BrandingPlaceholder
              brandSignature={config.brandSignature}
              brandLogoUrl={config.brandLogoUrl}
              brandLogoScale={config.brandLogoScale}
            brandInstagram={config.brandInstagram}
            brandPhone={config.brandPhone}
            brandAddress={config.brandAddress}
              brandTextColor={config.coverTitleColor || config.brandTextColor}
            />
          </div>
        )}
      </div>
    </CardInner>
  );
};
