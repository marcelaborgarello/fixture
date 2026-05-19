import React from 'react';
import { Group, DesignConfig } from '../../types';
import { FlyerGroup } from './FlyerGroup';
import { BrandingPlaceholder } from '../BrandingPlaceholder';

interface FlyerFrenteProps {
  groups: Group[];
  config: DesignConfig;
}

export const FlyerFrente: React.FC<FlyerFrenteProps> = ({ groups, config }) => {
  // BG styling logic
  const bgStyle: React.CSSProperties = {};
  if (config.backgroundType === 'gradient') {
    bgStyle.backgroundImage = config.backgroundGradient;
  } else if (config.backgroundType === 'solid') {
    bgStyle.backgroundColor = config.solidColor;
  } else if (config.backgroundType === 'image' && config.backgroundImageUrl) {
    bgStyle.backgroundImage = `url(${config.backgroundImageUrl})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }

  // Cover specific background override if set
  if (config.coverBgImageUrl) {
    bgStyle.backgroundImage = `url(${config.coverBgImageUrl})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  } else if (config.coverBgColor) {
    bgStyle.backgroundColor = config.coverBgColor;
    bgStyle.backgroundImage = 'none';
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
        borderRadius: `${config.borderRadius}px`,
        fontFamily: config.fontFamily,
        ...bgStyle,
      }}
      className="relative overflow-hidden box-border select-none flex flex-col justify-between p-3 text-white border border-white/10 flyer-container"
    >
      {/* Dark overlay decorator for high contrast */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-black/70 z-0 pointer-events-none" />

      {/* Main Grid Content */}
      <div className="relative z-10 grid grid-cols-4 gap-3 flex-grow h-[85%] overflow-hidden">
        {columns.map((colGroups, colIdx) => (
          <div key={colIdx} className="flex flex-col justify-between gap-1.5 h-full">
            {colGroups.map((g) => (
              <FlyerGroup key={g.name} group={g} />
            ))}
          </div>
        ))}
      </div>

      {/* Footer Branding Strip */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-1 mt-1 text-[8px] tracking-widest font-black text-brand-accent">
        <span className="uppercase">MUNDIAL 2026 — CALENDARIO COMPLETO DE GRUPOS</span>
        <BrandingPlaceholder
          brandSignature={config.brandSignature}
          brandLogoUrl={config.brandLogoUrl}
        />
      </div>
    </div>
  );
};
export default FlyerFrente;
