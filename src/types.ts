export interface Team {
  name: string;
  code: string;
  flagCode: string; // Used to lookup the SVG flag
}

export interface Match {
  id: number;
  date: string;
  time: string;
  stadium: string;
  city: string;
  homeTeam: Team | string;
  awayTeam: Team | string;
  homeScore?: string;
  awayScore?: string;
}

export interface Group {
  name: string;
  teams: Team[];
  matches: Match[];
}

export interface PlayoffPhase {
  name: string;
  matches: Match[];
}

export interface DesignConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  cardBgColor: string;
  borderColor: string;
  fontFamily: string;
  borderRadius: number;
  backgroundType: "gradient" | "solid" | "image";
  backgroundGradient: string;
  solidColor: string;
  backgroundImageUrl: string;
  glassmorphism: boolean;

  // Premium customization for Creative Stationery & Freebies
  brandSignature: string; // E.g., "Diseñado por MiMarca"
  brandLogoUrl: string; // Base64 brand logo image upload
  coverTitle: string;
  coverSubtitle: string;
  cafecitoUrl: string;
  excludeCoverFromSheets: boolean; // Option to print cover separately on thicker paper
  showCutLines: boolean; // Printable cut guidelines

  // Custom dimensions (in mm)
  cardWidthMm: number;
  cardHeightMm: number;

  // Cover layers
  showCoverTrophy: boolean; // Toggle central trophy
  coverIllustrationUrl: string; // Custom uploaded cover main image (e.g. layers)

  // Advanced cover layer customization
  coverBgColor?: string;
  coverBgImageUrl?: string;
  coverIllustrationScale?: number;
  coverIllustrationY?: number;
  coverIllustrationOpacity?: number;
  coverTitleFontFamily?: string;
  coverTitleColor?: string;
  coverTitleSize?: number;
  coverSubtitleColor?: string;
  coverSubtitleFontFamily?: string;
  applyCoverTypographyToAllCards?: boolean;

  // Toggles for FIFA and 26 graphics
  showCoverYear?: boolean;
  showCoverFifaText?: boolean;

  // Format mode toggle
  formatMode?: "cards" | "flyer" | "poster" | "folding" | "zine";

  // Use 3-letter FIFA code for team names (e.g. ARG, MEX)
  useFifaCode?: boolean;

  // Pliego configuration
  pliegoDoubleSided?: boolean;
  bindingMargin?: 'none' | 'top' | 'left';

  // Business branding options
  brandLogoScale?: number;
  brandInstagram?: string;
  brandPhone?: string;
  brandAddress?: string;
  brandFontFamily?: string;
  brandFontSize?: number;
  brandTextColor?: string;
  showBrandingCover?: boolean;
  showBrandingBack?: boolean;
  showBrandingCards?: boolean;

  // Advanced typography options
  titleFontFamily?: string;
  bodyFontFamily?: string;
  titleTextColor?: string;
  bodyTextColor?: string;
  fontSizeScale?: number;
  showMatchRowBackground?: boolean;

  // Reverso card typography overrides
  backTitleFontFamily?: string;
  backSubtitleFontFamily?: string;
  backSubtitleTextColor?: string;
  backBodyFontFamily?: string;

  // Advanced background image controls
  bgImageScale?: number;
  bgImageX?: number;
  bgImageY?: number;
  bgImageOpacity?: number;

  // Trophy horizontal displacement
  coverIllustrationX?: number;
}
