import { Group, PlayoffPhase } from '../types';
import { getFlagSvg } from '../utils/flags';

// Generate inline flag HTML for group stage
const renderFlag = (team: any): string => {
  if (typeof team === 'string') {
    return `<div class="team-flag placeholder-flag">${getFlagSvg('TBD')}</div>`;
  }
  return `<div class="team-flag">${getFlagSvg(team.flagCode)}</div>`;
};

// Generate team name / placeholder text for group stage
const renderTeamName = (team: any): string => {
  if (typeof team === 'string') {
    return `<span class="team-code placeholder">${team}</span>`;
  }
  return `<span class="team-code" title="${team.name}">${team.code}</span>`;
};

// Helper to conditionally render the branding badge (text and/or custom logo image)
const renderBranding = (brandSignature: string, brandLogoUrl: string = ""): string => {
  const hasSig = brandSignature && brandSignature.trim() !== '';
  const hasLogo = brandLogoUrl && brandLogoUrl.trim() !== '';
  
  if (!hasSig && !hasLogo) return '';
  
  return `
    <div class="card-branding-badge">
      ${hasLogo ? `<img src="${brandLogoUrl}" class="branding-logo-img" style="height: 12px; max-width: 60px; object-fit: contain; vertical-align: middle; margin-right: 4px;" />` : ''}
      ${hasSig ? `<span>${brandSignature}</span>` : ''}
    </div>
  `;
};

// 1. TAPA (COVER) WITH LAYERS AND CUSTOM CENTRAL IMAGE
export const renderCoverCardHtml = (
  title: string = "WORLD CUP 2026",
  subtitle: string = "CALENDARIO DE PARTIDOS",
  brandSignature: string = "",
  brandLogoUrl: string = "",
  showCoverTrophy: boolean = true,
  coverIllustrationUrl: string = "",
  coverBgColor?: string,
  coverBgImageUrl?: string,
  coverIllustrationScale: number = 100,
  coverIllustrationY: number = 0,
  coverIllustrationOpacity: number = 1.0,
  coverTitleFontFamily?: string,
  coverTitleColor?: string,
  coverTitleSize?: number,
  coverSubtitleColor?: string
): string => {
  const badgeHtml = renderBranding(brandSignature, brandLogoUrl);
  
  // Handle custom cover background style override
  let coverCustomStyle = '';
  if (coverBgImageUrl) {
    coverCustomStyle += `background-image: url(${coverBgImageUrl}) !important; background-size: cover !important; background-position: center !important;`;
  } else if (coverBgColor) {
    coverCustomStyle += `background-color: ${coverBgColor} !important; background-image: none !important;`;
  }
  
  let centralIllustrationHtml = '';
  if (coverIllustrationUrl) {
    const scaleFactor = coverIllustrationScale / 100;
    // Align illustration dynamically using scale and Y offsets
    centralIllustrationHtml = `<img src="${coverIllustrationUrl}" class="cover-custom-illustration" style="position: absolute; top: ${coverIllustrationY}px; left: 50%; transform: translateX(-50%) scale(${scaleFactor}); width: 90%; height: 90%; object-fit: contain; z-index: 2; opacity: ${coverIllustrationOpacity}; transition: transform 0.2s ease, top 0.2s ease, opacity 0.2s ease;" />`;
  }
  
  let trophyHtml = '';
  if (showCoverTrophy) {
    trophyHtml = `
      <svg viewBox="0 0 100 150" class="trophy-svg" style="${coverIllustrationUrl ? 'position: absolute; top: 10%; left: 15%; width: 70%; height: 70%; z-index: 3;' : 'width: 100%; height: 100%; z-index: 2;'}">
        <path d="M35,30 Q50,0 65,30 Q75,70 50,110 Q25,70 35,30 Z" fill="url(#trophy-gold)" />
        <path d="M40,110 L60,110 L65,125 L35,125 Z" fill="#D4AF37" />
        <rect x="30" y="125" width="40" height="15" fill="#2E2A20" rx="2" />
        <rect x="35" y="129" width="30" height="2" fill="#E5C158" />
        <path d="M42,20 Q50,35 58,20" stroke="#FFF" stroke-width="1.5" fill="none" opacity="0.6"/>
        <ellipse cx="50" cy="5" rx="10" ry="3" fill="#6ba4ff" opacity="0.3" filter="blur(2px)"/>
        <defs>
          <linearGradient id="trophy-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF2B2" />
            <stop offset="30%" stop-color="#D4AF37" />
            <stop offset="70%" stop-color="#AA7C11" />
            <stop offset="100%" stop-color="#F3E5AB" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
  
  // Handle custom text styling overrides
  let titleStyle = '';
  if (coverTitleFontFamily) {
    titleStyle += `font-family: ${coverTitleFontFamily} !important;`;
  }
  if (coverTitleColor) {
    titleStyle += `color: ${coverTitleColor} !important;`;
  }
  if (coverTitleSize) {
    titleStyle += `font-size: ${coverTitleSize}rem !important;`;
  }
  
  let subtitleStyle = '';
  if (coverSubtitleColor) {
    subtitleStyle += `color: ${coverSubtitleColor} !important;`;
  }

  return `
    <div class="card-inner cover-card" style="${coverCustomStyle}">
      <div class="card-overlay"></div>
      <div class="card-content safe-zone">
        <div class="cover-header">
          <span class="cover-year-bg">26</span>
          <div class="cover-trophy" style="position: relative; width: 110px; height: 150px; display: flex; align-items: center; justify-content: center;">
            ${centralIllustrationHtml}
            ${trophyHtml}
          </div>
          <div class="cover-logo-text" style="${coverSubtitleColor ? `color: ${coverSubtitleColor} !important;` : ''}">FIFA</div>
        </div>
        <div class="cover-footer">
          <h1 class="cover-title" style="${titleStyle}">${title}</h1>
          <h2 class="cover-subtitle" style="${subtitleStyle}">${subtitle}</h2>
          ${badgeHtml}
        </div>
      </div>
    </div>
  `;
};

// 2. GRUPO CARD
export const renderGroupCardHtml = (
  group: Group, 
  brandSignature: string = "", 
  brandLogoUrl: string = ""
): string => {
  const teamHeaderHtml = group.teams
    .map(t => `<span class="group-header-team">${t.name}</span>`)
    .join(' • ');

  const matchesHtml = group.matches
    .map(match => {
      return `
        <div class="match-item">
          <div class="match-meta">
            <span class="match-date">${match.date} - ${match.time}</span>
            <span class="match-venue">${match.stadium}</span>
          </div>
          <div class="match-row">
            <div class="match-team home">
              ${renderTeamName(match.homeTeam)}
              ${renderFlag(match.homeTeam)}
            </div>
            <div class="match-score">
              <span class="score-box"></span>
              <span class="score-divider"></span>
              <span class="score-box"></span>
            </div>
            <div class="match-team away">
              ${renderFlag(match.awayTeam)}
              ${renderTeamName(match.awayTeam)}
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="card-inner group-card">
      <div class="card-overlay"></div>
      <div class="card-content safe-zone">
        <div class="group-card-header">
          <h2 class="group-title">GRUPO ${group.name}</h2>
          <div class="group-teams-subtitle">${teamHeaderHtml}</div>
        </div>
        <div class="group-matches">
          ${matchesHtml}
        </div>
        ${renderBranding(brandSignature, brandLogoUrl)}
      </div>
    </div>
  `;
};

// 3. DIECISEISAVOS DE FINAL (ROUND OF 32)
export const renderDieciseisavosCardHtml = (
  phase: PlayoffPhase, 
  brandSignature: string = "", 
  brandLogoUrl: string = ""
): string => {
  const matchesHtml = phase.matches
    .map(match => {
      const homePlaceholder = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
      const awayPlaceholder = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;

      return `
        <div class="playoff-match medium">
          <div class="playoff-meta">
            <span class="match-id-badge">${match.time}</span>
            <span class="playoff-date">${match.date.replace(' de junio', '-06').replace(' de julio', '-07')}</span>
          </div>
          <div class="playoff-row">
            <div class="playoff-team-input home compact-pills">
              <span class="playoff-placeholder-label">${homePlaceholder}</span>
              <div class="playoff-team-pill"></div>
              <div class="playoff-score-pill"></div>
            </div>
            <span class="playoff-vs">vs</span>
            <div class="playoff-team-input away compact-pills">
              <div class="playoff-score-pill"></div>
              <div class="playoff-team-pill"></div>
              <span class="playoff-placeholder-label">${awayPlaceholder}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="card-inner playoff-card dieciseisavos">
      <div class="card-overlay"></div>
      <div class="card-content safe-zone">
        <div class="playoff-card-header">
          <h2 class="playoff-title">${phase.name}</h2>
        </div>
        <div class="playoff-grid single-column">
          ${matchesHtml}
        </div>
        ${renderBranding(brandSignature, brandLogoUrl)}
      </div>
    </div>
  `;
};

// 4. OCTAVOS DE FINAL (ROUND OF 16)
export const renderOctavosCardHtml = (
  phase: PlayoffPhase, 
  brandSignature: string = "", 
  brandLogoUrl: string = ""
): string => {
  const matchesHtml = phase.matches
    .map(match => {
      const homePlaceholder = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
      const awayPlaceholder = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;

      return `
        <div class="playoff-match medium">
          <div class="playoff-meta">
            <span class="match-id-badge">${match.time}</span>
            <span class="playoff-date">${match.date}</span>
          </div>
          <div class="playoff-row">
            <div class="playoff-team-input home compact-pills">
              <span class="playoff-placeholder-label">${homePlaceholder}</span>
              <div class="playoff-team-pill"></div>
              <div class="playoff-score-pill"></div>
            </div>
            <span class="playoff-vs">vs</span>
            <div class="playoff-team-input away compact-pills">
              <div class="playoff-score-pill"></div>
              <div class="playoff-team-pill"></div>
              <span class="playoff-placeholder-label">${awayPlaceholder}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="card-inner playoff-card octavos">
      <div class="card-overlay"></div>
      <div class="card-content safe-zone">
        <div class="playoff-card-header">
          <h2 class="playoff-title">${phase.name}</h2>
        </div>
        <div class="playoff-grid single-column">
          ${matchesHtml}
        </div>
        ${renderBranding(brandSignature, brandLogoUrl)}
      </div>
    </div>
  `;
};

// 5. CUARTOS DE FINAL (QUARTERFINALS)
export const renderCuartosCardHtml = (
  phase: PlayoffPhase, 
  brandSignature: string = "", 
  brandLogoUrl: string = ""
): string => {
  const matchesHtml = phase.matches
    .map(match => {
      const homePlaceholder = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
      const awayPlaceholder = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;

      return `
        <div class="playoff-match wide">
          <div class="playoff-meta">
            <span class="match-id-badge">${match.time}</span>
            <span class="playoff-date">${match.date}</span>
          </div>
          <div class="playoff-row">
            <div class="playoff-team-input home standard-playoff-pills">
              <span class="playoff-placeholder-label">${homePlaceholder}</span>
              <div class="playoff-team-pill"></div>
              <div class="playoff-score-pill"></div>
            </div>
            <span class="playoff-vs">vs</span>
            <div class="playoff-team-input away standard-playoff-pills">
              <div class="playoff-score-pill"></div>
              <div class="playoff-team-pill"></div>
              <span class="playoff-placeholder-label">${awayPlaceholder}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="card-inner playoff-card cuartos">
      <div class="card-overlay"></div>
      <div class="card-content safe-zone">
        <div class="playoff-card-header">
          <h2 class="playoff-title">${phase.name}</h2>
        </div>
        <div class="playoff-grid single-column">
          ${matchesHtml}
        </div>
        ${renderBranding(brandSignature, brandLogoUrl)}
      </div>
    </div>
  `;
};

// 6. FASE FINAL (SEMIFINAL, 3RD PLACE, FINAL & CHAMPION)
export const renderFaseFinalCardHtml = (
  phase: PlayoffPhase, 
  brandSignature: string = "", 
  brandLogoUrl: string = ""
): string => {
  const semifinalMatches = phase.matches.slice(0, 2);
  const thirdPlaceMatch = phase.matches[2];
  const finalMatch = phase.matches[3];

  const renderSinglePlayoffMatch = (match: any, sizeClass = "medium"): string => {
    const homePlaceholder = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.code;
    const awayPlaceholder = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.code;

    return `
      <div class="playoff-match ${sizeClass}">
        <div class="playoff-meta">
          <span class="match-id-badge">${match.time}</span>
          <span class="playoff-date">${match.date}</span>
        </div>
        <div class="playoff-row">
          <div class="playoff-team-input home final-pills">
            <span class="playoff-placeholder-label">${homePlaceholder}</span>
            <div class="playoff-team-pill"></div>
            <div class="playoff-score-pill"></div>
          </div>
          <span class="playoff-vs">vs</span>
          <div class="playoff-team-input away final-pills">
            <div class="playoff-score-pill"></div>
            <div class="playoff-team-pill"></div>
            <span class="playoff-placeholder-label">${awayPlaceholder}</span>
          </div>
        </div>
      </div>
    `;
  };

  return `
    <div class="card-inner playoff-card final-phase">
      <div class="card-overlay"></div>
      <div class="card-content safe-zone">
        <!-- Semifinals -->
        <div class="final-section">
          <h3 class="final-section-title">SEMIFINAL</h3>
          <div class="playoff-grid two-columns">
            ${semifinalMatches.map(m => renderSinglePlayoffMatch(m, "compact")).join('')}
          </div>
        </div>

        <!-- 3er y 4to Puesto -->
        <div class="final-section">
          <h3 class="final-section-title">3ER Y 4TO PUESTO</h3>
          <div class="playoff-grid single-column">
            ${renderSinglePlayoffMatch(thirdPlaceMatch, "compact")}
          </div>
        </div>

        <!-- Final -->
        <div class="final-section">
          <h3 class="final-section-title">FINAL</h3>
          <div class="playoff-grid single-column">
            ${renderSinglePlayoffMatch(finalMatch, "compact")}
          </div>
        </div>

        <!-- Campeón del Mundo -->
        <div class="champion-section">
          <div class="champion-decor">
            <svg viewBox="0 0 24 24" class="champion-mini-trophy">
              <path d="M12 2a5 5 0 0 0-5 5v3c0 2 2.2 4 4.5 4.5V18H9v2h6v-2h-2.5v-3.5c2.3-.5 4.5-2.5 4.5-4.5V7a5 5 0 0 0-5-5zM5.5 7h1v3a4.5 4.5 0 0 1-.5 2 3 3 0 0 1-.5-5zm12 5a4.5 4.5 0 0 1-.5-2V7h1a3 3 0 0 1-.5 5z" fill="#FFD700"/>
            </svg>
          </div>
          <div class="champion-text-box">
            <span class="champion-label">CAMPEÓN DEL MUNDO</span>
            <div class="champion-name-pill"></div>
          </div>
        </div>
        ${renderBranding(brandSignature, brandLogoUrl)}
      </div>
    </div>
  `;
};
