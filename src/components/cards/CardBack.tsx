import React from 'react';
import { DesignConfig } from '../../types';
import { CardInner } from './CardInner';
import { BrandingPlaceholder } from '../BrandingPlaceholder';
import trophyImg from '../../assets/copa.png';

interface CardBackProps {
  config: DesignConfig;
}

export const CardBack: React.FC<CardBackProps> = ({ config }) => {
  // Override background style for cover/back if specified
  const coverBgStyle: React.CSSProperties = {};
  if (config.coverBgColor) {
    coverBgStyle.backgroundColor = config.coverBgColor;
  }
  if (config.coverBgImageUrl) {
    coverBgStyle.backgroundImage = `url(${config.coverBgImageUrl})`;
    coverBgStyle.backgroundSize = 'cover';
    coverBgStyle.backgroundPosition = 'center';
  }

  return (
    <CardInner config={config} className="relative select-none text-center flex flex-col justify-between items-center h-full w-full">
      {/* Dynamic cover background override */}
      {(config.coverBgColor || config.coverBgImageUrl) && (
        <div
          style={coverBgStyle}
          className="absolute inset-0 z-0 pointer-events-none"
        />
      )}

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
          <div className="text-[12px] font-black text-white tracking-widest uppercase">
            WORLD CUP 2026
          </div>
          <div
            style={{ color: config.coverSubtitleColor || '#ffd700' }}
            className="text-[7.5px] font-extrabold tracking-[0.2em] uppercase"
          >
            Fixture Oficial
          </div>
        </div>

        {/* Branding Badge */}
        <BrandingPlaceholder
          brandSignature={config.brandSignature}
          brandLogoUrl={config.brandLogoUrl}
        />
      </div>
    </CardInner>
  );
};
