import React from 'react';
import { getFlagSvg } from '../../utils/flags';

interface FlagProps {
  code: string;
  className?: string;
}

export const Flag: React.FC<FlagProps> = ({ code, className = '' }) => {
  const svgContent = getFlagSvg(code);

  return (
    <div
      className={`w-[21px] h-[14px] shrink-0 overflow-hidden rounded-[1px] border border-white/10 shadow-sm flex items-center justify-center ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
