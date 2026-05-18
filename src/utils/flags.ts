// Lightweight SVG flags for the 48 World Cup 2026 teams
// This avoids loading heavy external images and guarantees perfect offline vector scaling for PDF/SVG/PNG export.

const SVG_WRAPPER = (content: string, viewBox = "0 0 30 20"): string => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%">${content}</svg>`;
};

export const FLAGS: Record<string, string> = {
  // GRUPO A
  MEX: SVG_WRAPPER(`
    <rect width="10" height="20" fill="#006847"/>
    <rect x="10" width="10" height="20" fill="#FFFFFF"/>
    <rect x="20" width="10" height="20" fill="#C8102E"/>
    <!-- Simplified Eagle Emblem -->
    <circle cx="15" cy="10" r="2.5" fill="#8B5A2B"/>
    <path d="M 14,8.5 Q 15,6 16,8.5" stroke="#1D70B8" stroke-width="0.5" fill="none"/>
    <circle cx="15" cy="11.5" r="1.2" fill="#006847"/>
  `),
  RSA: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#C8102E"/>
    <rect y="10" width="30" height="10" fill="#007A33"/>
    <path d="M 0,0 L 15,10 L 0,20 Z" fill="#000000"/>
    <path d="M 0,0 L 13,10 L 0,20" stroke="#FFB612" stroke-width="2" fill="none"/>
    <path d="M 0,10 H 30" stroke="#FFFFFF" stroke-width="4" fill="none"/>
    <path d="M 0,10 H 30" stroke="#007A33" stroke-width="2" fill="none"/>
    <path d="M 0,0 L 15,10 L 0,20" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <path d="M 0,0 L 13,10 L 0,20" stroke="#007A33" stroke-width="2" fill="none"/>
    <!-- Base stripes adjusted -->
    <rect y="0" width="30" height="7" fill="#E21A1A"/>
    <rect y="13" width="30" height="7" fill="#001489"/>
    <path d="M 0,0 L 15,10 L 0,20 Z" fill="#000000"/>
    <path d="M 0,-1 L 16.5,10 L 0,21" stroke="#FFFFFF" stroke-width="3" fill="none"/>
    <path d="M -1,-1 L 15,10 L -1,21" stroke="#FFB612" stroke-width="1.5" fill="none"/>
    <path d="M 12,10 L -3,20 H 35 L 35,0 H -3 Z" fill="#007A33" clip-path="polygon(0 0, 15 10, 0 20)"/>
    <path d="M 0,10 H 30" stroke="#FFFFFF" stroke-width="3" fill="none"/>
    <path d="M 0,10 L 15,10 H 30 M 0,0 L 15,10 L 0,20" stroke="#007A33" stroke-width="2.2" fill="none"/>
  `),
  KOR: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5"/>
    <!-- Taegeuk -->
    <path d="M 15,7 A 3,3 0 0,0 15,13 A 3,3 0 0,0 15,7" fill="#C8102E"/>
    <path d="M 15,13 A 3,3 0 0,1 15,7 A 1.5,1.5 0 0,1 13.5,8.5 A 1.5,1.5 0 0,0 15,10" fill="#0047A0"/>
    <path d="M 15,7 A 1.5,1.5 0 0,1 16.5,8.5 A 1.5,1.5 0 0,0 15,10" fill="#C8102E"/>
    <circle cx="15" cy="10" r="3" fill="none"/>
    <path d="M 15,7 A 3,3 0 0,1 15,13 A 1.5,1.5 0 0,1 13.5,11.5 A 1.5,1.5 0 0,0 15,10" fill="#0047A0"/>
    <!-- Simple representation of trigrams -->
    <path d="M 9.5,6.3 L 11.5,4.3 M 9,6.8 L 11,4.8 M 10,5.8 L 12,3.8" stroke="#000000" stroke-width="0.8"/>
    <path d="M 18,3.8 L 20,5.8 M 18.5,4.3 L 20.5,6.3 M 19,4.8 L 21,6.8" stroke="#000000" stroke-width="0.8"/>
    <path d="M 9.5,13.7 L 11.5,15.7 M 9,13.2 L 11,15.2 M 10,14.2 L 12,16.2" stroke="#000000" stroke-width="0.8"/>
    <path d="M 18,16.2 L 20,14.2 M 18.5,15.7 L 20.5,13.7 M 19,15.2 L 21,13.2" stroke="#000000" stroke-width="0.8"/>
  `),
  CZE: SVG_WRAPPER(`
    <rect width="30" height="10" fill="#FFFFFF"/>
    <rect y="10" width="30" height="10" fill="#D92121"/>
    <path d="M 0,0 L 15,10 L 0,20 Z" fill="#11457E"/>
  `),

  // GRUPO B
  CAN: SVG_WRAPPER(`
    <rect width="7.5" height="20" fill="#D80621"/>
    <rect x="7.5" width="15" height="20" fill="#FFFFFF"/>
    <rect x="22.5" width="7.5" height="20" fill="#D80621"/>
    <!-- Simplified Maple Leaf -->
    <path d="M 15,6 L 16,8.5 L 18.5,8 L 17.5,10 L 19.5,11.5 L 16.5,12 L 17,14.5 L 15,13.5 L 13,14.5 L 13.5,12 L 10.5,11.5 L 12.5,10 L 11.5,8 L 14,8.5 Z" fill="#D80621"/>
    <rect x="14.6" y="13" width="0.8" height="2.5" fill="#D80621"/>
  `),
  QAT: SVG_WRAPPER(`
    <rect width="9" height="20" fill="#FFFFFF"/>
    <rect x="9" width="21" height="20" fill="#8A1538"/>
    <!-- Serrated border -->
    <path d="M 9,0 L 11,1.1 L 9,2.2 L 11,3.3 L 9,4.4 L 11,5.5 L 9,6.6 L 11,7.7 L 9,8.8 L 11,9.9 L 9,11 L 11,12.1 L 9,13.2 L 11,14.3 L 9,15.4 L 11,16.5 L 9,17.6 L 11,18.7 L 9,20 Z" fill="#FFFFFF"/>
  `),
  SUI: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#D52B1E"/>
    <!-- Swiss Cross -->
    <rect x="13.5" y="4" width="3" height="12" fill="#FFFFFF"/>
    <rect x="9" y="8.5" width="12" height="3" fill="#FFFFFF"/>
  `, "0 0 30 20"),
  BIH: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#002F6C"/>
    <!-- Yellow Triangle -->
    <path d="M 8.5,0 H 23.5 V 15 Z" fill="#FECB00"/>
    <!-- White Stars -->
    <path d="M 7,3 L 7.5,4.5 L 9,4.5 L 7.8,5.4 L 8.2,6.9 L 7,6 L 5.8,6.9 L 6.2,5.4 L 5,4.5 L 6.5,4.5 Z M 9,5.5 L 9.5,7 L 11,7 L 9.8,7.9 L 10.2,9.4 L 9,8.5 L 7.8,9.4 L 8.2,7.9 L 7,7 L 8.5,7 Z M 11,8 L 11.5,9.5 L 13,9.5 L 11.8,10.4 L 12.2,11.9 L 11,11 L 9.8,11.9 L 10.2,10.4 L 9,9.5 L 10.5,9.5 Z M 13,10.5 L 13.5,12 L 15,12 L 13.8,12.9 L 14.2,14.4 L 13,13.5 L 11.8,14.4 L 12.2,12.9 L 11,12 L 12.5,12 Z M 15,13 L 15.5,14.5 L 17,14.5 L 15.8,15.4 L 16.2,16.9 L 15,16 L 13.8,16.9 L 14.2,15.4 L 13,14.5 L 14.5,14.5 Z" fill="#FFFFFF"/>
  `),

  // GRUPO C
  BRA: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#009739"/>
    <!-- Yellow Rhombus -->
    <path d="M 15,2 L 27,10 L 15,18 L 3,10 Z" fill="#FFDF00"/>
    <!-- Blue Circle -->
    <circle cx="15" cy="10" r="4.5" fill="#002776"/>
    <!-- White Curved Band -->
    <path d="M 10.5,10.5 Q 15,8 19.5,10.5" stroke="#FFFFFF" stroke-width="0.8" fill="none"/>
    <!-- Tiny Stars -->
    <circle cx="14" cy="12" r="0.2" fill="#FFFFFF"/>
    <circle cx="16" cy="12" r="0.2" fill="#FFFFFF"/>
    <circle cx="15" cy="13" r="0.2" fill="#FFFFFF"/>
    <circle cx="15" cy="8.2" r="0.15" fill="#FFFFFF"/>
  `),
  MAR: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#C1272D"/>
    <!-- Green Pentagram (Seal of Solomon) -->
    <path d="M 15,6 L 17.5,14 L 11,9.5 H 19 L 12.5,14 Z" stroke="#006233" stroke-width="1.2" fill="none" stroke-linejoin="bevel"/>
  `),
  ESC: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#005EB8"/>
    <!-- White Saltire -->
    <path d="M 0,0 L 30,20 M 30,0 L 0,20" stroke="#FFFFFF" stroke-width="4.5"/>
  `),
  HAI: SVG_WRAPPER(`
    <rect width="30" height="10" fill="#00209F"/>
    <rect y="10" width="30" height="10" fill="#D21034"/>
    <!-- Coat of arms in center -->
    <rect x="12" y="7.5" width="6" height="5" fill="#FFFFFF" rx="0.5"/>
    <path d="M 15,8.2 L 15,11.5" stroke="#007A33" stroke-width="0.8"/>
    <path d="M 13.5,11 L 16.5,11" stroke="#8B5A2B" stroke-width="0.6"/>
    <circle cx="15" cy="8.5" r="0.5" fill="#FECB00"/>
  `),

  // GRUPO D
  USA: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#FFFFFF"/>
    <!-- 7 Red Stripes -->
    <rect width="30" height="1.54" fill="#B22234"/>
    <rect y="3.08" width="30" height="1.54" fill="#B22234"/>
    <rect y="6.16" width="30" height="1.54" fill="#B22234"/>
    <rect y="9.24" width="30" height="1.54" fill="#B22234"/>
    <rect y="12.32" width="30" height="1.54" fill="#B22234"/>
    <rect y="15.4" width="30" height="1.54" fill="#B22234"/>
    <rect y="18.46" width="30" height="1.54" fill="#B22234"/>
    <!-- Blue Canton -->
    <rect width="12" height="10.8" fill="#3C3B6E"/>
    <!-- Stars (Simplified grid of dots) -->
    <circle cx="2" cy="1.8" r="0.3" fill="#FFFFFF"/>
    <circle cx="4" cy="1.8" r="0.3" fill="#FFFFFF"/>
    <circle cx="6" cy="1.8" r="0.3" fill="#FFFFFF"/>
    <circle cx="8" cy="1.8" r="0.3" fill="#FFFFFF"/>
    <circle cx="10" cy="1.8" r="0.3" fill="#FFFFFF"/>
    <circle cx="3" cy="3.6" r="0.3" fill="#FFFFFF"/>
    <circle cx="5" cy="3.6" r="0.3" fill="#FFFFFF"/>
    <circle cx="7" cy="3.6" r="0.3" fill="#FFFFFF"/>
    <circle cx="9" cy="3.6" r="0.3" fill="#FFFFFF"/>
    <circle cx="2" cy="5.4" r="0.3" fill="#FFFFFF"/>
    <circle cx="4" cy="5.4" r="0.3" fill="#FFFFFF"/>
    <circle cx="6" cy="5.4" r="0.3" fill="#FFFFFF"/>
    <circle cx="8" cy="5.4" r="0.3" fill="#FFFFFF"/>
    <circle cx="10" cy="5.4" r="0.3" fill="#FFFFFF"/>
    <circle cx="3" cy="7.2" r="0.3" fill="#FFFFFF"/>
    <circle cx="5" cy="7.2" r="0.3" fill="#FFFFFF"/>
    <circle cx="7" cy="7.2" r="0.3" fill="#FFFFFF"/>
    <circle cx="9" cy="7.2" r="0.3" fill="#FFFFFF"/>
    <circle cx="2" cy="9.0" r="0.3" fill="#FFFFFF"/>
    <circle cx="4" cy="9.0" r="0.3" fill="#FFFFFF"/>
    <circle cx="6" cy="9.0" r="0.3" fill="#FFFFFF"/>
    <circle cx="8" cy="9.0" r="0.3" fill="#FFFFFF"/>
    <circle cx="10" cy="9.0" r="0.3" fill="#FFFFFF"/>
  `),
  PAR: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#D11919"/>
    <rect y="6.6" width="30" height="6.8" fill="#FFFFFF"/>
    <rect y="13.4" width="30" height="6.6" fill="#0038A8"/>
    <!-- Coat of Arms -->
    <circle cx="15" cy="10" r="1.8" fill="#FFFFFF" stroke="#0038A8" stroke-width="0.3"/>
    <circle cx="15" cy="10" r="1" fill="#FFD700"/>
    <circle cx="15" cy="10" r="0.4" fill="#008000"/>
  `),
  AUS: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#00008B"/>
    <!-- Mini Union Jack in Canton -->
    <rect width="15" height="10" fill="#00008B"/>
    <path d="M 0,0 L 15,10 M 15,0 L 0,10" stroke="#FFFFFF" stroke-width="1.8"/>
    <path d="M 0,0 L 15,10 M 15,0 L 0,10" stroke="#C8102E" stroke-width="0.8"/>
    <path d="M 7.5,0 V 10 M 0,5 H 15" stroke="#FFFFFF" stroke-width="2.5"/>
    <path d="M 7.5,0 V 10 M 0,5 H 15" stroke="#C8102E" stroke-width="1.2"/>
    <!-- Commonwealth Star -->
    <path d="M 7.5,13 L 8,14.5 L 9.5,14.5 L 8.3,15.4 L 8.8,16.9 L 7.5,16 L 6.2,16.9 L 6.7,15.4 L 5.5,14.5 L 7,14.5 Z" fill="#FFFFFF"/>
    <!-- Southern Cross Stars -->
    <circle cx="22.5" cy="4" r="0.4" fill="#FFFFFF"/>
    <circle cx="25.5" cy="7.5" r="0.4" fill="#FFFFFF"/>
    <circle cx="22.5" cy="11" r="0.4" fill="#FFFFFF"/>
    <circle cx="22.5" cy="16" r="0.6" fill="#FFFFFF"/>
    <circle cx="20.5" cy="9.5" r="0.3" fill="#FFFFFF"/>
  `),
  TUR: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#E30A17"/>
    <!-- Crescent Moon -->
    <circle cx="13.5" cy="10" r="4.5" fill="#FFFFFF"/>
    <circle cx="15.2" cy="10" r="3.6" fill="#E30A17"/>
    <!-- Star -->
    <path d="M 18.5,8.8 L 19,10.2 L 20.4,10.2 L 19.3,11 L 19.7,12.4 L 18.5,11.5 L 17.3,12.4 L 17.7,11 L 16.6,10.2 L 18,10.2 Z" fill="#FFFFFF"/>
  `),

  // GRUPO E
  ALE: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#000000"/>
    <rect y="6.6" width="30" height="6.8" fill="#DD0000"/>
    <rect y="13.4" width="30" height="6.6" fill="#FFCC00"/>
  `),
  CDM: SVG_WRAPPER(`
    <rect width="10" height="20" fill="#FF8200"/>
    <rect x="10" width="10" height="20" fill="#FFFFFF"/>
    <rect x="20" width="10" height="20" fill="#009A44"/>
  `),
  ECU: SVG_WRAPPER(`
    <rect width="30" height="10" fill="#FFDD00"/>
    <rect y="10" width="30" height="5" fill="#001489"/>
    <rect y="15" width="30" height="5" fill="#D21034"/>
    <!-- Coat of Arms -->
    <ellipse cx="15" cy="11.5" rx="1.5" ry="2" fill="#001489" stroke="#8B5A2B" stroke-width="0.3"/>
    <path d="M 13.5,9.5 L 16.5,9.5 L 15,8 Z" fill="#D21034"/>
    <path d="M 15,9.5 V 13.5" stroke="#FFDD00" stroke-width="0.4"/>
  `),
  CUR: SVG_WRAPPER(`
    <rect width="30" height="12" fill="#002B7F"/>
    <rect y="12" width="30" height="3" fill="#F9E814"/>
    <rect y="15" width="30" height="5" fill="#002B7F"/>
    <!-- Stars -->
    <path d="M 5,3.5 L 5.3,4.3 L 6.1,4.3 L 5.5,4.8 L 5.7,5.6 L 5,5.1 L 4.3,5.6 L 4.5,4.8 L 3.9,4.3 L 4.7,4.3 Z" fill="#FFFFFF"/>
    <path d="M 8,6.5 L 8.2,7.1 L 8.8,7.1 L 8.3,7.5 L 8.5,8.1 L 8,7.7 L 7.5,8.1 L 7.7,7.5 L 7.2,7.1 L 7.8,7.1 Z" fill="#FFFFFF"/>
  `),

  // GRUPO F
  PBA: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#AE1C28"/>
    <rect y="6.6" width="30" height="6.8" fill="#FFFFFF"/>
    <rect y="13.4" width="30" height="6.6" fill="#21468B"/>
  `),
  SUE: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#006AA7"/>
    <!-- Swedish Yellow Cross -->
    <rect x="9" width="4" height="20" fill="#FECC00"/>
    <rect y="8" width="30" height="4" fill="#FECC00"/>
  `),
  JAP: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5"/>
    <circle cx="15" cy="10" r="6" fill="#BC002D"/>
  `),
  TUN: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#E30A17"/>
    <!-- White Circle -->
    <circle cx="15" cy="10" r="5" fill="#FFFFFF"/>
    <!-- Crescent and Star -->
    <circle cx="15.8" cy="10" r="3.2" fill="#E30A17"/>
    <circle cx="17.2" cy="10" r="2.6" fill="#FFFFFF"/>
    <circle cx="15.8" cy="10" r="3.2" fill="none"/>
    <!-- Red crescent redraw over white -->
    <path d="M 15.8,6.8 A 3.2,3.2 0 0,0 15.8,13.2 A 2.6,2.6 0 0,1 17.5,10 A 2.6,2.6 0 0,1 15.8,6.8" fill="#E30A17"/>
    <!-- Red Star -->
    <path d="M 14.5,9.2 L 14.8,10.2 L 15.8,10.2 L 15,10.8 L 15.3,11.8 L 14.5,11.2 L 13.7,11.8 L 14,10.8 L 13.2,10.2 L 14.2,10.2 Z" fill="#E30A17"/>
  `),

  // GRUPO G
  BEL: SVG_WRAPPER(`
    <rect width="10" height="20" fill="#000000"/>
    <rect x="10" width="10" height="20" fill="#FDDA24"/>
    <rect x="20" width="10" height="20" fill="#EF3340"/>
  `),
  IRA: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#239F40"/>
    <rect y="6.6" width="30" height="6.8" fill="#FFFFFF"/>
    <rect y="13.4" width="30" height="6.6" fill="#DA251D"/>
    <!-- Emblem -->
    <circle cx="15" cy="10" r="1.5" fill="none" stroke="#DA251D" stroke-width="0.8"/>
    <line x1="15" y1="8" x2="15" y2="12" stroke="#DA251D" stroke-width="0.6"/>
  `),
  EGY: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#C8102E"/>
    <rect y="6.6" width="30" height="6.8" fill="#FFFFFF"/>
    <rect y="13.4" width="30" height="6.6" fill="#000000"/>
    <!-- Eagle of Saladin -->
    <path d="M 14,9 L 15,8 L 16,9 L 15.5,11 L 14.5,11 Z" fill="#C19A6B"/>
    <path d="M 13.5,10 H 16.5" stroke="#C19A6B" stroke-width="0.4"/>
  `),
  NZL: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#00247D"/>
    <!-- Mini Union Jack in Canton -->
    <rect width="15" height="10" fill="#00247D"/>
    <path d="M 0,0 L 15,10 M 15,0 L 0,10" stroke="#FFFFFF" stroke-width="1.8"/>
    <path d="M 0,0 L 15,10 M 15,0 L 0,10" stroke="#CC142B" stroke-width="0.8"/>
    <path d="M 7.5,0 V 10 M 0,5 H 15" stroke="#FFFFFF" stroke-width="2.5"/>
    <path d="M 7.5,0 V 10 M 0,5 H 15" stroke="#CC142B" stroke-width="1.2"/>
    <!-- Red stars with white borders -->
    <!-- Southern Cross -->
    <path d="M 22.5,4 L 22.8,4.8 H 23.6 L 23,5.3 L 23.2,6.1 L 22.5,5.6 L 21.8,6.1 L 22,5.3 L 21.4,4.8 H 22.2 Z" fill="#CC142B" stroke="#FFFFFF" stroke-width="0.4"/>
    <path d="M 25.5,7.5 L 25.8,8.3 H 26.6 L 26,8.8 L 26.2,9.6 L 25.5,9.1 L 24.8,9.6 L 25,8.8 L 24.4,8.3 H 25.2 Z" fill="#CC142B" stroke="#FFFFFF" stroke-width="0.4"/>
    <path d="M 22.5,11 L 22.8,11.8 H 23.6 L 23,12.3 L 23.2,13.1 L 22.5,12.6 L 21.8,13.1 L 22,12.3 L 21.4,11.8 H 22.2 Z" fill="#CC142B" stroke="#FFFFFF" stroke-width="0.4"/>
    <path d="M 22.5,16 L 22.8,16.8 H 23.6 L 23,17.3 L 23.2,18.1 L 22.5,17.6 L 21.8,18.1 L 22,17.3 L 21.4,16.8 H 22.2 Z" fill="#CC142B" stroke="#FFFFFF" stroke-width="0.4"/>
  `),

  // GRUPO H
  ESP: SVG_WRAPPER(`
    <rect width="30" height="5" fill="#C8102E"/>
    <rect y="5" width="30" height="10" fill="#FFD100"/>
    <rect y="15" width="30" height="5" fill="#C8102E"/>
    <!-- Simplified Spanish Coat of Arms -->
    <rect x="6" y="7.5" width="2" height="3.5" fill="#C8102E" rx="0.3"/>
    <rect x="7" y="7.5" width="1" height="3.5" fill="#FFF"/>
    <circle cx="7" cy="6.8" r="0.6" fill="#C8102E"/>
    <line x1="4.8" y1="7" x2="4.8" y2="11.5" stroke="#8B5A2B" stroke-width="0.5"/>
    <line x1="9.2" y1="7" x2="9.2" y2="11.5" stroke="#8B5A2B" stroke-width="0.5"/>
  `),
  URU: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#FFFFFF"/>
    <!-- 4 Blue Stripes -->
    <rect y="2.2" width="30" height="2.2" fill="#0038A8"/>
    <rect y="6.6" width="30" height="2.2" fill="#0038A8"/>
    <rect y="11" width="30" height="2.2" fill="#0038A8"/>
    <rect y="15.4" width="30" height="2.2" fill="#0038A8"/>
    <!-- Canton with Sun of May -->
    <rect width="10" height="10" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.2"/>
    <circle cx="5" cy="5" r="2.2" fill="#FCD116"/>
    <!-- Simple sun rays -->
    <path d="M 5,1 V 9 M 1,5 H 9 M 2,2 L 8,8 M 8,2 L 2,8" stroke="#FCD116" stroke-width="0.6"/>
  `),
  ARA: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#006C35"/>
    <!-- White Sword -->
    <path d="M 8,14.5 H 22" stroke="#FFFFFF" stroke-width="1"/>
    <path d="M 8,13.5 V 15.5" stroke="#FFFFFF" stroke-width="0.8"/>
    <!-- White Arabic Script representation -->
    <path d="M 10,8 Q 12,6 15,8 Q 17,9 20,7" stroke="#FFFFFF" stroke-width="1.2" fill="none"/>
  `),
  CAB: SVG_WRAPPER(`
    <rect width="30" height="10" fill="#002B7F"/>
    <rect y="10" width="30" height="1" fill="#FFFFFF"/>
    <rect y="11" width="30" height="2" fill="#CE1126"/>
    <rect y="13" width="30" height="1" fill="#FFFFFF"/>
    <rect y="14" width="30" height="6" fill="#002B7F"/>
    <!-- Ring of stars (Simplified 6 stars in arc) -->
    <circle cx="8" cy="12" r="2.5" fill="none" stroke="#F9E814" stroke-dasharray="1,1.5" stroke-width="1"/>
  `),

  // GRUPO I
  FRA: SVG_WRAPPER(`
    <rect width="10" height="20" fill="#0055A5"/>
    <rect x="10" width="10" height="20" fill="#FFFFFF"/>
    <rect x="20" width="10" height="20" fill="#EF4135"/>
  `),
  SEN: SVG_WRAPPER(`
    <rect width="10" height="20" fill="#008543"/>
    <rect x="10" width="10" height="20" fill="#FDEF42"/>
    <rect x="20" width="10" height="20" fill="#E31B23"/>
    <!-- Green Star -->
    <path d="M 15,7.2 L 15.6,9.2 L 17.6,9.2 L 16,10.4 L 16.6,12.4 L 15,11.2 L 13.4,12.4 L 14,10.4 L 12.4,9.2 L 14.4,9.2 Z" fill="#008543"/>
  `),
  NOR: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#BA0C2F"/>
    <!-- Blue Cross with white borders -->
    <rect x="7" width="6" height="20" fill="#FFFFFF"/>
    <rect y="7" width="30" height="6" fill="#FFFFFF"/>
    <rect x="8" width="4" height="20" fill="#00205B"/>
    <rect y="8" width="30" height="4" fill="#00205B"/>
  `),
  IRK: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#C8102E"/>
    <rect y="6.6" width="30" height="6.8" fill="#FFFFFF"/>
    <rect y="13.4" width="30" height="6.6" fill="#000000"/>
    <!-- Inscription representation (Takbir in green) -->
    <path d="M 10,10 Q 12,9 14,10 M 16,10 Q 18,9 20,10" stroke="#007A33" stroke-width="0.8" fill="none"/>
  `),

  // GRUPO J
  ARG: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#74ACDF"/>
    <rect y="6.6" width="30" height="6.8" fill="#FFFFFF"/>
    <rect y="13.4" width="30" height="6.6" fill="#74ACDF"/>
    <!-- Sun of May -->
    <circle cx="15" cy="10" r="1.8" fill="#F9A812"/>
    <circle cx="15" cy="10" r="1" fill="#84540C"/>
    <circle cx="15" cy="10" r="0.8" fill="#F9A812"/>
    <path d="M 15,7.5 V 12.5 M 12.5,10 H 17.5 M 13.2,8.2 L 16.8,11.8 M 16.8,8.2 L 13.2,11.8" stroke="#F9A812" stroke-width="0.4"/>
  `),
  ALG: SVG_WRAPPER(`
    <rect width="15" height="20" fill="#006233"/>
    <rect x="15" width="15" height="20" fill="#FFFFFF"/>
    <!-- Red Crescent and Star in center -->
    <circle cx="15" cy="10" r="4.2" fill="#D21034"/>
    <circle cx="16.5" cy="10" r="3.6" fill="#FFFFFF"/>
    <circle cx="15" cy="10" r="4.2" fill="none"/>
    <path d="M 15,5.8 A 4.2,4.2 0 0,0 15,14.2 A 3.6,3.6 0 0,1 17,10 A 3.6,3.6 0 0,1 15,5.8" fill="#D21034"/>
    <!-- Star -->
    <path d="M 17,8.2 L 17.3,9.4 L 18.5,9.4 L 17.5,10.2 L 17.8,11.4 L 16.8,10.6 L 15.8,11.4 L 16.1,10.2 L 15.1,9.4 L 16.3,9.4 Z" fill="#D21034"/>
  `),
  AUT: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#C8102E"/>
    <rect y="6.6" width="30" height="6.8" fill="#FFFFFF"/>
    <rect y="13.4" width="30" height="6.6" fill="#C8102E"/>
  `),
  JOR: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#000000"/>
    <rect y="6.6" width="30" height="6.8" fill="#FFFFFF"/>
    <rect y="13.4" width="30" height="6.6" fill="#1A75CF"/>
    <!-- Red Triangle -->
    <path d="M 0,0 L 12,10 L 0,20 Z" fill="#E62215"/>
    <!-- White 7-pointed star -->
    <circle cx="4" cy="10" r="1" fill="#FFFFFF"/>
  `),

  // GRUPO K
  POR: SVG_WRAPPER(`
    <rect width="12" height="20" fill="#006600"/>
    <rect x="12" width="18" height="20" fill="#FF0000"/>
    <!-- Coat of Arms -->
    <circle cx="12" cy="10" r="3" fill="#FFE600"/>
    <rect x="10.8" y="8.8" width="2.4" height="2.4" fill="#FFFFFF" stroke="#D21034" stroke-width="0.4"/>
    <rect x="11.6" y="9.6" width="0.8" height="0.8" fill="#002B7F"/>
  `),
  COL: SVG_WRAPPER(`
    <rect width="30" height="10" fill="#FCD116"/>
    <rect y="10" width="30" height="5" fill="#0038A8"/>
    <rect y="15" width="30" height="5" fill="#CE1126"/>
  `),
  UZB: SVG_WRAPPER(`
    <rect width="30" height="6" fill="#00B5E2"/>
    <rect y="6" width="30" height="0.5" fill="#CE1126"/>
    <rect y="6.5" width="30" height="7" fill="#FFFFFF"/>
    <rect y="13.5" width="30" height="0.5" fill="#CE1126"/>
    <rect y="14" width="30" height="6" fill="#1EB960"/>
    <!-- Crescent and Stars (Simplified representation) -->
    <circle cx="6" cy="9.5" r="1.5" fill="#FFFFFF"/>
    <circle cx="7" cy="9.5" r="1.3" fill="#00B5E2"/>
    <circle cx="9" cy="8.2" r="0.25" fill="#FFFFFF"/>
    <circle cx="10" cy="8.2" r="0.25" fill="#FFFFFF"/>
    <circle cx="9" cy="9.5" r="0.25" fill="#FFFFFF"/>
  `),
  RDC: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#007FFF"/>
    <!-- Yellow bordered red diagonal stripe -->
    <path d="M 0,20 L 30,0" stroke="#FFD700" stroke-width="4.5"/>
    <path d="M 0,20 L 30,0" stroke="#D21034" stroke-width="2.5"/>
    <!-- Star in canton -->
    <path d="M 5,3 L 5.3,4.2 L 6.5,4.2 L 5.5,5 L 5.8,6.2 L 5,5.4 L 4.2,6.2 L 4.5,5 L 3.5,4.2 L 4.7,4.2 Z" fill="#FFD700"/>
  `),

  // GRUPO L
  ING: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#FFFFFF" stroke="#EEEEEE" stroke-width="0.5"/>
    <!-- Red Cross of St George -->
    <rect x="13.5" width="3" height="20" fill="#CE1126"/>
    <rect y="8.5" width="30" height="3" fill="#CE1126"/>
  `),
  GHA: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#DA291C"/>
    <rect y="6.6" width="30" height="6.8" fill="#F4B41A"/>
    <rect y="13.4" width="30" height="6.6" fill="#006B3F"/>
    <!-- Black Star -->
    <path d="M 15,7.2 L 15.6,9.2 L 17.6,9.2 L 16,10.4 L 16.6,12.4 L 15,11.2 L 13.4,12.4 L 14,10.4 L 12.4,9.2 L 14.4,9.2 Z" fill="#000000"/>
  `),
  CRO: SVG_WRAPPER(`
    <rect width="30" height="6.6" fill="#FF0000"/>
    <rect y="6.6" width="30" height="6.8" fill="#FFFFFF"/>
    <rect y="13.4" width="30" height="6.6" fill="#0000FF"/>
    <!-- Coat of Arms -->
    <rect x="13.5" y="6" width="3" height="3.5" fill="#FFFFFF" stroke="#FF0000" stroke-width="0.3"/>
    <!-- Red/white checkers representation -->
    <rect x="13.7" y="6.5" width="1.2" height="1.2" fill="#FF0000"/>
    <rect x="15.1" y="7.5" width="1.2" height="1.2" fill="#FF0000"/>
    <!-- Tiny crown -->
    <path d="M 13.5,5.8 L 14,5.4 L 15,5.8 L 16,5.4 L 16.5,5.8 Z" fill="#0000FF"/>
  `),
  PAN: SVG_WRAPPER(`
    <rect width="15" height="10" fill="#FFFFFF"/>
    <rect x="15" width="15" height="10" fill="#D21034"/>
    <rect y="10" width="15" height="10" fill="#002F6C"/>
    <rect x="15" y="10" width="15" height="10" fill="#FFFFFF"/>
    <!-- Stars -->
    <path d="M 7.5,3 L 7.7,3.8 L 8.5,3.8 L 7.8,4.3 L 8,5.1 L 7.5,4.6 L 7,5.1 L 7.2,4.3 L 6.5,3.8 L 7.3,3.8 Z" fill="#002F6C"/>
    <path d="M 22.5,13 L 22.7,13.8 L 23.5,13.8 L 22.8,14.3 L 23,15.1 L 22.5,14.6 L 22,15.1 L 22.2,14.3 L 21.5,13.8 L 22.3,13.8 Z" fill="#D21034"/>
  `),

  // Placeholder Flag for TBD teams
  TBD: SVG_WRAPPER(`
    <rect width="30" height="20" fill="#EAEAEA" stroke="#CCCCCC" stroke-width="0.5"/>
    <path d="M 0,0 L 30,20 M 30,0 L 0,20" stroke="#CCCCCC" stroke-width="0.5"/>
    <circle cx="15" cy="10" r="3" fill="#CCCCCC"/>
    <circle cx="15" cy="10" r="2.5" fill="#EAEAEA"/>
  `)
};

export const getFlagSvg = (code: string): string => {
  return FLAGS[code.toUpperCase()] || FLAGS.TBD;
};
