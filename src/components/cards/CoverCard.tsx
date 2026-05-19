import React from 'react';
import { DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { BrandingPlaceholder } from '../BrandingPlaceholder';
import trophyImg from '../../assets/copa.png';

interface CoverCardProps {
  config: DesignConfig;
}

export const CoverCard: React.FC<CoverCardProps> = ({ config }) => {
  // Override background style for cover if specified
  const coverBgStyle: React.CSSProperties = {};
  if (config.coverBgColor) {
    coverBgStyle.backgroundColor = config.coverBgColor;
  }
  if (config.coverBgImageUrl) {
    coverBgStyle.backgroundImage = `url(${config.coverBgImageUrl})`;
    coverBgStyle.backgroundSize = 'cover';
    coverBgStyle.backgroundPosition = 'center';
  }

  const illustrationScale = config.coverIllustrationScale ?? 100;
  const illustrationY = config.coverIllustrationY ?? 0;
  const illustrationOpacity = config.coverIllustrationOpacity ?? 1.0;

  return (
    <CardInner config={config} className="relative select-none text-center">
      {/* Dynamic cover background override */}
      {(config.coverBgColor || config.coverBgImageUrl) && (
        <div
          style={coverBgStyle}
          className="absolute inset-0 z-0 pointer-events-none"
        />
      )}

      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-2">
        {/* Header Section */}
        <div className="flex flex-col items-center w-full">
          {config.showCoverFifaText && (
            <span className="text-[10px] tracking-[0.3em] text-white/60 font-bold uppercase mb-1">
              FIFA
            </span>
          )}
          
          <h1
            style={{
              fontFamily: config.coverTitleFontFamily && config.coverTitleFontFamily !== 'inherit' ? config.coverTitleFontFamily : undefined,
              color: config.coverTitleColor || '#ffffff',
              fontSize: `${config.coverTitleSize || 2.2}rem`,
              lineHeight: 1.1,
            }}
            className="font-extrabold uppercase select-none max-w-full break-words tracking-tight"
          >
            {config.coverTitle || 'WORLD CUP'}
          </h1>

          <div
            style={{ color: config.coverSubtitleColor || '#ffd700' }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase mt-2 max-w-[90%]"
          >
            {config.coverSubtitle || 'CALENDARIO'}
          </div>
        </div>

        {/* Central Illustration Area */}
        <div className="relative flex-grow w-full flex items-center justify-center overflow-hidden my-3">
          {config.showCoverYear && (
            <div className="absolute text-[120px] font-black text-white/[0.04] select-none pointer-events-none tracking-tighter leading-none select-none">
              2026
            </div>
          )}

          {config.showCoverTrophy && (
            <div
              style={{
                transform: `scale(${(illustrationScale / 100) * 1.3}) translateY(${illustrationY}px)`, // Increased by 1.3x for larger size!
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
        <BrandingPlaceholder
          brandSignature={config.brandSignature}
          brandLogoUrl={config.brandLogoUrl}
        />
      </div>
    </CardInner>
  );
};
