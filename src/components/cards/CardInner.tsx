import React from 'react';
import { DesignConfig } from '../../types';

interface CardInnerProps {
  config: DesignConfig;
  children: React.ReactNode;
  className?: string;
}

export const CardInner: React.FC<CardInnerProps> = ({ config, children, className = '' }) => {
  // Determine background style
  const bgStyle: React.CSSProperties = {
    borderRadius: `${config.borderRadius}px`,
  };

  if (config.backgroundType === 'gradient') {
    bgStyle.background = config.backgroundGradient;
  } else if (config.backgroundType === 'solid') {
    bgStyle.background = config.solidColor;
  } else if (config.backgroundType === 'image' && config.backgroundImageUrl) {
    bgStyle.backgroundImage = `url(${config.backgroundImageUrl})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }

  // Handle glassmorphism classes
  const glassClasses = config.glassmorphism
    ? 'backdrop-blur-md bg-white/10 border border-white/20 shadow-xl'
    : 'border border-white/10';

  return (
    <div
      style={bgStyle}
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden p-[6%] box-border text-white select-none ${glassClasses} ${className}`}
    >
      {/* Background Image Layer if set and type is not image */}
      {config.backgroundImageUrl && config.backgroundType !== 'image' && (
        <img
          src={config.backgroundImageUrl}
          alt="background layer"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none z-0"
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
