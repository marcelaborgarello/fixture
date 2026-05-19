import React from 'react';
import { Group, DesignConfig } from '../../types';
import { FlyerGroup } from './FlyerGroup';
import { BrandingPlaceholder } from '../BrandingPlaceholder';

interface FlyerFrenteProps {
  groups: Group[];
  config: DesignConfig;
}

export const FlyerFrente: React.FC<FlyerFrenteProps> = ({ groups, config }) => {
  // BG styling logic - flyer uses general pliego background
  const bgStyle: React.CSSProperties = {};
  let hasCustomBgImage = false;
  const bgImageLayerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
  };

  if (config.backgroundType === 'gradient') {
    bgStyle.background = config.backgroundGradient;
  } else if (config.backgroundType === 'solid') {
    bgStyle.backgroundColor = config.solidColor;
  } else if (config.backgroundType === 'image' && config.backgroundImageUrl) {
    hasCustomBgImage = true;
    bgImageLayerStyle.backgroundImage = `url(${config.backgroundImageUrl})`;
    bgImageLayerStyle.backgroundSize = `${config.bgImageScale ?? 100}%`;
    bgImageLayerStyle.backgroundPosition = `${config.bgImageX ?? 50}% ${config.bgImageY ?? 50}%`;
    bgImageLayerStyle.backgroundRepeat = 'no-repeat';
    bgImageLayerStyle.opacity = (config.bgImageOpacity ?? 100) / 100;
  }

  // Split the 12 groups into 4 columns of 3 groups each
  const columns = [];
  for (let c = 0; c < 4; c++) {
    columns.push(groups.slice(c * 3, (c + 1) * 3));
  }

  return (
    <div
      style={{
        width: '297mm',
        height: '105mm',
        borderRadius: '0px', // Forced straight corners!
        fontFamily: config.fontFamily,
        paddingTop: '6mm',
        paddingBottom: '4mm',
        paddingLeft: '0mm', // Mathematical 25% columns
        paddingRight: '0mm', // Mathematical 25% columns
        ...bgStyle,
      }}
      className="relative overflow-hidden box-border select-none flex flex-col justify-between text-white border border-white/10 flyer-container"
    >
      {/* Background Image Layer */}
      {hasCustomBgImage && (
        <div style={bgImageLayerStyle} />
      )}

      {/* Dark overlay decorator for high contrast */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/44 to-black/70 z-0 pointer-events-none" />

      {/* Main Grid Content - gap-0 to ensure exact 25% folding alignment */}
      <div className="relative z-10 grid grid-cols-4 gap-0 flex-grow h-[85%] overflow-hidden">
        {columns.map((colGroups, colIdx) => (
          <div
            key={colIdx}
            className="flex flex-col justify-between gap-1.5 h-full px-3" // Safety internal padding per panel!
          >
            {colGroups.map((g) => (
              <FlyerGroup key={g.name} group={g} config={config} />
            ))}
          </div>
        ))}
      </div>

      {/* Footer Branding Strip with safe horizontal padding */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-1 mt-1 text-[8px] tracking-widest font-black text-brand-accent px-4">
        <span className="uppercase" style={{ fontFamily: config.titleFontFamily || 'inherit', color: config.titleTextColor || '#ffd700', fontSize: `${8 * (config.fontSizeScale || 1.0)}px` }}>
          MUNDIAL 2026 — CALENDARIO COMPLETO DE GRUPOS
        </span>
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
    </div>
  );
};

export default FlyerFrente;
