import React from 'react';

interface BrandingPlaceholderProps {
  brandSignature?: string;
  brandLogoUrl?: string;
}

export const BrandingPlaceholder: React.FC<BrandingPlaceholderProps> = ({
  brandSignature = '',
  brandLogoUrl = '',
}) => {
  if (!brandSignature && !brandLogoUrl) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-1 mt-auto border-t border-white/10 w-full text-center min-h-[16px]">
      {brandLogoUrl && (
        <img
          src={brandLogoUrl}
          alt="Logo"
          className="h-4 max-w-[80px] object-contain opacity-70 hover:opacity-100 transition-opacity"
        />
      )}
      {brandSignature && (
        <span className="text-[9px] uppercase tracking-widest text-white/50 font-semibold truncate max-w-[150px]">
          {brandSignature}
        </span>
      )}
    </div>
  );
};
