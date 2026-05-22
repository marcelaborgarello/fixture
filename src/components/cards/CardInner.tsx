import React from 'react';
import { DesignConfig } from '../../types';

interface CardInnerProps {
  config: DesignConfig;
  children: React.ReactNode;
  className?: string;
  isCoverOrBack?: boolean;
  showWatermark?: boolean;
}

export const CardInner: React.FC<CardInnerProps> = ({
  config,
  children,
  className = '',
  isCoverOrBack = false,
  showWatermark = false,
}) => {
  // Determine background style
  const bgStyle: React.CSSProperties = {
    borderRadius: `${config.borderRadius ?? 0}px`,
    fontFamily: config.fontFamily || 'inherit',
    color: config.textColor || '#ffffff',
  };

  const bgImageLayerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
  };

  let hasCustomBgImage = false;

  if (isCoverOrBack && config.coverBgColor && config.coverBgColor !== 'GRADIENT') {
    // Solid color override for cover/back
    bgStyle.backgroundColor = config.coverBgColor;
    if (config.coverBgImageUrl) {
      hasCustomBgImage = true;
      bgImageLayerStyle.backgroundImage = `url(${config.coverBgImageUrl})`;
      bgImageLayerStyle.backgroundSize = `${config.bgImageScale ?? 100}%`;
      bgImageLayerStyle.backgroundPosition = `${config.bgImageX ?? 50}% ${config.bgImageY ?? 50}%`;
      bgImageLayerStyle.backgroundRepeat = 'no-repeat';
      bgImageLayerStyle.opacity = (config.bgImageOpacity ?? 100) / 100;
    }
  } else if (isCoverOrBack && config.coverBgColor === 'GRADIENT') {
    // Gradient override for cover: use the general gradient colors
    bgStyle.background = config.backgroundGradient;
    if (config.coverBgImageUrl) {
      hasCustomBgImage = true;
      bgImageLayerStyle.backgroundImage = `url(${config.coverBgImageUrl})`;
      bgImageLayerStyle.backgroundSize = `${config.bgImageScale ?? 100}%`;
      bgImageLayerStyle.backgroundPosition = `${config.bgImageX ?? 50}% ${config.bgImageY ?? 50}%`;
      bgImageLayerStyle.backgroundRepeat = 'no-repeat';
      bgImageLayerStyle.opacity = (config.bgImageOpacity ?? 100) / 100;
    }
  } else {
    // General background (same as all cards)
    if (config.backgroundType === 'gradient') {
      bgStyle.background = config.backgroundGradient;
    } else if (config.backgroundType === 'solid') {
      bgStyle.background = config.solidColor;
    } else if (config.backgroundType === 'image' && config.backgroundImageUrl) {
      hasCustomBgImage = true;
      bgImageLayerStyle.backgroundImage = `url(${config.backgroundImageUrl})`;
      bgImageLayerStyle.backgroundSize = `${config.bgImageScale ?? 100}%`;
      bgImageLayerStyle.backgroundPosition = `${config.bgImageX ?? 50}% ${config.bgImageY ?? 50}%`;
      bgImageLayerStyle.backgroundRepeat = 'no-repeat';
      bgImageLayerStyle.opacity = (config.bgImageOpacity ?? 100) / 100;
    }
    if (isCoverOrBack && config.coverBgImageUrl) {
      hasCustomBgImage = true;
      bgImageLayerStyle.backgroundImage = `url(${config.coverBgImageUrl})`;
      bgImageLayerStyle.backgroundSize = `${config.bgImageScale ?? 100}%`;
      bgImageLayerStyle.backgroundPosition = `${config.bgImageX ?? 50}% ${config.bgImageY ?? 50}%`;
      bgImageLayerStyle.backgroundRepeat = 'no-repeat';
      bgImageLayerStyle.opacity = (config.bgImageOpacity ?? 100) / 100;
    }
  }

  // Handle glassmorphism classes
  const glassClasses = config.glassmorphism
    ? 'backdrop-blur-md bg-white/10 border-none shadow-xl'
    : 'border-none';

  return (
    <div
      style={bgStyle}
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden box-border text-white select-none ${glassClasses} ${className}`}
    >
      {/* Custom background image layer to allow scaling/opacity/position adjustments */}
      {hasCustomBgImage && (
        <div style={bgImageLayerStyle} />
      )}
      {/* Background Image Layer if set and type is not image */}
      {!isCoverOrBack && config.backgroundImageUrl && config.backgroundType !== 'image' && (
        <img
          src={config.backgroundImageUrl}
          alt="background layer"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none z-0"
        />
      )}

      {/* Watermark 2026 centered absolutely at root level */}
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none pointer-events-none">
          <div className="text-[120px] font-black text-white/[0.04] tracking-tighter leading-none">
            2026
          </div>
        </div>
      )}

      {/* Content wrapper with internal padding */}
      <div className={`relative z-10 w-full h-full flex flex-col justify-between box-border p-3 ${config.bindingMargin === 'top' ? 'pt-[12mm]' : ''} ${config.bindingMargin === 'left' ? 'pl-[12mm]' : ''}`}>
        {children}
      </div>
    </div>
  );
};
