import React from 'react';

interface BrandingPlaceholderProps {
  brandSignature?: string;
  brandLogoUrl?: string;
  brandLogoScale?: number;
  brandInstagram?: string;
  brandPhone?: string;
  brandAddress?: string;
  brandFontFamily?: string;
  brandFontSize?: number;
  brandTextColor?: string;
}

export const BrandingPlaceholder: React.FC<BrandingPlaceholderProps> = ({
  brandSignature = '',
  brandLogoUrl = '',
  brandLogoScale = 100,
  brandInstagram = '',
  brandPhone = '',
  brandAddress = '',
  brandFontFamily = 'inherit',
  brandFontSize = 8,
  brandTextColor = '',
}) => {
  if (!brandSignature && !brandLogoUrl && !brandInstagram && !brandPhone && !brandAddress) {
    return null;
  }

  // Calculate logo height dynamically based on scale
  const logoHeight = Math.round(16 * (brandLogoScale / 100));

  // Custom inline styles for branding text and colors
  const containerStyle: React.CSSProperties = {
    fontFamily: brandFontFamily !== 'inherit' ? brandFontFamily : 'inherit',
    color: brandTextColor || 'rgba(255, 255, 255, 0.5)',
  };

  const signatureStyle: React.CSSProperties = {
    fontSize: `${brandFontSize}px`,
    color: brandTextColor || 'rgba(255, 255, 255, 0.5)',
  };

  const detailsStyle: React.CSSProperties = {
    fontSize: `${brandFontSize * 0.9}px`,
    color: brandTextColor || 'rgba(255, 255, 255, 0.4)',
  };

  const iconStyle: React.CSSProperties = {
    color: brandTextColor || 'rgba(255, 255, 255, 0.4)',
  };

  return (
    <div
      style={containerStyle}
      className="flex flex-col items-center justify-center gap-1 pt-1.5 mt-auto border-t border-white/10 w-full text-center select-none z-10 shrink-0"
    >
      {/* Brand Sign and Logo */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {brandLogoUrl && (
          <img
            src={brandLogoUrl}
            alt="Logo"
            style={{ height: `${logoHeight}px` }}
            className="max-w-[120px] object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        )}
        {brandSignature && (
          <span
            style={signatureStyle}
            className="uppercase tracking-widest font-bold truncate max-w-[180px]"
          >
            {brandSignature}
          </span>
        )}
      </div>

      {/* Shop Details with Premium SVG Icons */}
      {(brandInstagram || brandPhone || brandAddress) && (
        <div
          style={detailsStyle}
          className="flex items-center justify-center gap-3 font-semibold tracking-wide flex-wrap"
        >
          {brandInstagram && (
            <span className="flex items-center gap-1">
              <svg
                style={iconStyle}
                className="w-2.5 h-2.5 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <span>{brandInstagram}</span>
            </span>
          )}
          
          {brandInstagram && (brandPhone || brandAddress) && <span className="opacity-30">•</span>}

          {brandPhone && (
            <span className="flex items-center gap-1">
              <svg
                style={iconStyle}
                className="w-2.5 h-2.5 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.753-7.859-4.164-9.13l2.066-1.011-3.52-6.796-2.066 1.011c-2.73 1.336-4.507 4.13-4.707 7.18-.332 5.061 3.074 11.233 8.354 13.948 5.28 2.713 11.758 2.502 15.428-1.047l-2.066 1.03zm-14.779-11.547c-.12-.349-.176-.707-.17-1.066.082-1.261.802-2.399 1.921-3.042l.504-.246.883 1.706-.505.247c-.562.275-.89.845-.853 1.472.019.324.123.633.303.901l-.883 1.028zm10.74 10.74l-.903-.787.902-.787c.269-.235.614-.383.98-.42.617-.062 1.205.231 1.547.765l.275.429-.884 1.706-.273-.429c-.171-.267-.442-.429-.757-.429-.183 0-.356.053-.504.148z"/>
              </svg>
              <span>{brandPhone}</span>
            </span>
          )}

          {brandPhone && brandAddress && <span className="opacity-30">•</span>}

          {brandAddress && (
            <span className="flex items-center gap-1">
              <svg
                style={iconStyle}
                className="w-2.5 h-2.5 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
              </svg>
              <span>{brandAddress}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
