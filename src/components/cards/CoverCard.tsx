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
      className="relative select-none text-center"
    >
      {/*
       * ── DISEÑO DE PORTADA ──────────────────────────────────────────────
       * El trofeo ocupa position: absolute inset-0 (z-10) → llena TODA la
       * tarjeta sin restricciones. El layout de header+branding usa z-20
       * para flotar encima del trofeo, sin ningún fondo propio.
       * ──────────────────────────────────────────────────────────────────
       */}

      {/* ── TROFEO: absolute inset-0, llena 88% del alto, centrado ── */}
      {config.showCoverTrophy && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none bg-transparent"
          style={{
            transform: `scale(${illustrationScale / 100}) translate(${illustrationX}px, ${illustrationY}px)`,
            opacity: illustrationOpacity,
            transition: 'transform 0.2s ease-out',
            transformOrigin: 'center center',
          }}
        >
          <img
            src={config.coverIllustrationUrl || trophyImg}
            alt="Trophy"
            className="w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)]"
            style={{ height: '88%', maxHeight: '88%' }}
          />
        </div>
      )}

      {/* ── MARCA DE AGUA 26 ── */}
      {config.showCoverYear && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none bg-transparent"
          style={{
            transform: `scale(${(config.coverYearScale ?? 100) / 100}) translate(${config.coverYearX ?? 0}px, ${config.coverYearY ?? 0}px)`,
            opacity: config.coverYearOpacity ?? 1.0,
            transition: 'transform 0.2s ease-out',
            transformOrigin: 'center center',
          }}
        >
          <span 
             style={{ color: config.coverYearColor || 'rgba(255, 255, 255, 0.04)' }}
             className="text-[120px] font-black tracking-tighter leading-none"
          >
            26
          </span>
        </div>
      )}

      {/* ── LOGO FIFA ── */}
      {config.showCoverFifaText && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none bg-transparent"
          style={{
            transform: `scale(${(config.coverFifaScale ?? 100) / 100}) translate(${config.coverFifaX ?? 0}px, ${config.coverFifaY ?? 0}px)`,
            opacity: config.coverFifaOpacity ?? 1.0,
            transition: 'transform 0.2s ease-out',
            transformOrigin: 'center center',
          }}
        >
          <span 
             style={{ color: config.coverFifaColor || 'rgba(255, 255, 255, 0.6)' }}
             className="text-[30px] tracking-[0.3em] font-bold uppercase"
          >
            FIFA
          </span>
        </div>
      )}

      {/* ── LAYOUT VERTICAL: header top, branding bottom ── */}
      {/* z-20 flota sobre el trofeo. bg-transparent garantiza ningún fondo. */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between items-center py-5 px-5 bg-transparent">

        {/* ── HEADER: FIFA / Título / Subtítulo — sin fondo, sin blur ── */}
        <div className="flex flex-col items-center w-full shrink-0 bg-transparent">
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
            className="font-extrabold uppercase select-none max-w-full break-words tracking-tight bg-transparent"
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
            className="font-bold tracking-[0.2em] uppercase mt-2 max-w-[90%] bg-transparent"
          >
            {config.coverSubtitle || 'CALENDARIO'}
          </div>
        </div>

        {/* ── BRANDING: logo + datos — sin fondo, safe zone guillotina ── */}
        {config.showBrandingCover !== false && (
          <div className="shrink-0 pb-2 w-full bg-transparent">
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
