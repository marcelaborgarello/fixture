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
      {/*
       * py-8: safe zone vertical generoso (≈ 8mm a escala de impresión)
       * px-6: margen lateral limpio sin tocar bordes de guillotina
       * Evitamos duplicar padding con CardInner usando el override directo aquí
       */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-8 px-6">

        {/* ── Header: título limpio, sin bg ni blur ── */}
        <div className="flex flex-col items-center w-full shrink-0">
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
              fontFamily:
                config.coverTitleFontFamily && config.coverTitleFontFamily !== 'inherit'
                  ? config.coverTitleFontFamily
                  : config.titleFontFamily || undefined,
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
              fontFamily:
                config.coverSubtitleFontFamily && config.coverSubtitleFontFamily !== 'inherit'
                  ? config.coverSubtitleFontFamily
                  : config.bodyFontFamily || undefined,
              color: config.coverSubtitleColor || '#ffd700',
              fontSize: `${10 * (config.fontSizeScale || 1.0)}px`,
            }}
            className="font-bold tracking-[0.2em] uppercase mt-2 max-w-[90%]"
          >
            {config.coverSubtitle || 'CALENDARIO'}
          </div>
        </div>

        {/* ── Central Illustration: trofeo prominente y perfectamente centrado ── */}
        <div className="relative flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden my-4">
          {config.showCoverTrophy && (
            <div
              style={{
                transform: `scale(${illustrationScale / 100}) translate(${illustrationX}px, ${illustrationY}px)`,
                opacity: illustrationOpacity,
                transition: 'transform 0.2s ease-out',
              }}
              className="w-[180px] h-[220px] flex items-center justify-center"
            >
              <img
                src={config.coverIllustrationUrl || trophyImg}
                alt="Trophy"
                className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
              />
            </div>
          )}
        </div>

        {/* ── Branding: limpio, sin bg, con safe zone para guillotina inferior ── */}
        {config.showBrandingCover !== false && (
          <div className="shrink-0 pb-2">
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
