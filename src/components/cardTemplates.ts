import { Group, PlayoffPhase } from "../types";
import { getFlagSvg } from "../utils/flags";

// Generate inline flag HTML for group stage
const renderFlag = (team: any): string => {
  if (typeof team === "string") {
    return `<div class="team-flag placeholder-flag">${getFlagSvg("TBD")}</div>`;
  }
  return `<div class="team-flag">${getFlagSvg(team.flagCode)}</div>`;
};

// Generate team name / placeholder text for group stage
const renderTeamName = (team: any): string => {
  if (typeof team === "string") {
    return `<span class="team-code placeholder">${team}</span>`;
  }
  return `<span class="team-code" title="${team.name}">${team.code}</span>`;
};

// Format date to a short Spanish version (e.g. Jue 11/6)
const formatShortDate = (dateStr: string): string => {
  return dateStr
    .replace(" de junio", "/6")
    .replace(" de julio", "/7")
    .replace("Jueves", "Jue")
    .replace("Viernes", "Vie")
    .replace("Sábado", "Sáb")
    .replace("Domingo", "Dom")
    .replace("Lunes", "Lun")
    .replace("Martes", "Mar")
    .replace("Miércoles", "Mié");
};

// Helper to conditionally render the branding badge (text and/or custom logo image)
const renderBranding = (
  brandSignature: string,
  brandLogoUrl: string = "",
): string => {
  const hasSig = brandSignature && brandSignature.trim() !== "";
  const hasLogo = brandLogoUrl && brandLogoUrl.trim() !== "";

  if (!hasSig && !hasLogo) return "";

  return `
    <div class="card-branding-badge">
      ${hasLogo ? `<img src="${brandLogoUrl}" class="branding-logo-img" style="height: 12px; max-width: 60px; object-fit: contain; vertical-align: middle; margin-right: 4px;" />` : ""}
      ${hasSig ? `<span>${brandSignature}</span>` : ""}
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
  coverSubtitleColor?: string,
  showCoverYear: boolean = true,
  showCoverFifaText: boolean = true,
): string => {
  const badgeHtml = renderBranding(brandSignature, brandLogoUrl);

  // Handle custom cover background style override
  let coverCustomStyle = "";
  if (coverBgImageUrl) {
    coverCustomStyle += `background-image: url(${coverBgImageUrl}) !important; background-size: cover !important; background-position: center !important;`;
  } else if (coverBgColor) {
    coverCustomStyle += `background-color: ${coverBgColor} !important; background-image: none !important;`;
  }

  let centralIllustrationHtml = "";
  if (coverIllustrationUrl) {
    const scaleFactor = coverIllustrationScale / 100;
    // Align illustration dynamically using scale and Y offsets
    centralIllustrationHtml = `<img src="${coverIllustrationUrl}" class="cover-custom-illustration" style="position: absolute; top: ${coverIllustrationY}px; left: 50%; transform: translateX(-50%) scale(${scaleFactor}); width: 90%; height: 90%; object-fit: contain; z-index: 2; opacity: ${coverIllustrationOpacity}; transition: transform 0.2s ease, top 0.2s ease, opacity 0.2s ease;" />`;
  }

  let trophyHtml = "";
  if (showCoverTrophy) {
    trophyHtml = `
      <img src="/src/assets/copa.png" class="trophy-img" style="${coverIllustrationUrl ? "position: absolute; top: 10%; left: 15%; width: 70%; height: 70%; z-index: 3;" : "width: 100%; height: 100%; z-index: 2; object-fit: contain; pointer-events: none;"}" alt="Trophy" />
    `;
  }

  // Handle custom text styling overrides
  let titleStyle = "";
  if (coverTitleFontFamily) {
    titleStyle += `font-family: ${coverTitleFontFamily} !important;`;
  }
  if (coverTitleColor) {
    titleStyle += `color: ${coverTitleColor} !important;`;
  }
  if (coverTitleSize) {
    titleStyle += `font-size: ${coverTitleSize}rem !important;`;
  }

  let subtitleStyle = "";
  if (coverSubtitleColor) {
    subtitleStyle += `color: ${coverSubtitleColor} !important;`;
  }

  return `
    <div class="card-inner cover-card" style="${coverCustomStyle}">
      <div class="card-overlay"></div>
      <div class="card-content safe-zone">
        <div class="cover-header">
          ${showCoverYear ? `<span class="cover-year-bg">26</span>` : ""}
          <div class="cover-trophy" style="position: relative; width: 130px; height: 175px; display: flex; align-items: center; justify-content: center;">
            ${centralIllustrationHtml}
            ${trophyHtml}
          </div>
          ${showCoverFifaText ? `<div class="cover-logo-text" style="${coverSubtitleColor ? `color: ${coverSubtitleColor} !important;` : ""}">FIFA</div>` : ""}
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
  brandLogoUrl: string = "",
): string => {
  const teamHeaderHtml = group.teams
    .map((t) => `<span class="group-header-team">${t.name}</span>`)
    .join(" • ");

  const matchesHtml = group.matches
    .map((match) => {
      return `
        <div class="match-item">
          <div class="match-meta">
            <span class="match-date">${formatShortDate(match.date)} - ${match.time.replace(" hs.", "")}</span>
            <span class="match-venue">${match.city}</span>
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
    .join("");

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
  brandLogoUrl: string = "",
): string => {
  const matchesHtml = phase.matches
    .map((match) => {
      const homePlaceholder =
        typeof match.homeTeam === "string"
          ? match.homeTeam
          : match.homeTeam.code;
      const awayPlaceholder =
        typeof match.awayTeam === "string"
          ? match.awayTeam
          : match.awayTeam.code;

      return `
        <div class="playoff-match compact">
          <div class="playoff-meta">
            <span class="match-id-badge">${match.time}</span>
            <span class="playoff-date">${formatShortDate(match.date)}</span>
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
    .join("");

  return `
    <div class="card-inner playoff-card dieciseisavos">
      <div class="card-overlay"></div>
      <div class="card-content safe-zone">
        <div class="playoff-card-header">
          <h2 class="playoff-title">${phase.name}</h2>
        </div>
        <div class="playoff-grid two-columns">
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
  brandLogoUrl: string = "",
): string => {
  const matchesHtml = phase.matches
    .map((match) => {
      const homePlaceholder =
        typeof match.homeTeam === "string"
          ? match.homeTeam
          : match.homeTeam.code;
      const awayPlaceholder =
        typeof match.awayTeam === "string"
          ? match.awayTeam
          : match.awayTeam.code;

      return `
        <div class="playoff-match compact">
          <div class="playoff-meta">
            <span class="match-id-badge">${match.time}</span>
            <span class="playoff-date">${formatShortDate(match.date)}</span>
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
    .join("");

  return `
    <div class="card-inner playoff-card octavos">
      <div class="card-overlay"></div>
      <div class="card-content safe-zone">
        <div class="playoff-card-header">
          <h2 class="playoff-title">${phase.name}</h2>
        </div>
        <div class="playoff-grid two-columns">
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
  brandLogoUrl: string = "",
): string => {
  const matchesHtml = phase.matches
    .map((match) => {
      const homePlaceholder =
        typeof match.homeTeam === "string"
          ? match.homeTeam
          : match.homeTeam.code;
      const awayPlaceholder =
        typeof match.awayTeam === "string"
          ? match.awayTeam
          : match.awayTeam.code;

      return `
        <div class="playoff-match wide">
          <div class="playoff-meta">
            <span class="match-id-badge">${match.time}</span>
            <span class="playoff-date">${formatShortDate(match.date)}</span>
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
    .join("");

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
  brandLogoUrl: string = "",
): string => {
  const semifinalMatches = phase.matches.slice(0, 2);
  const thirdPlaceMatch = phase.matches[2];
  const finalMatch = phase.matches[3];

  const renderSinglePlayoffMatch = (
    match: any,
    sizeClass = "medium",
  ): string => {
    const homePlaceholder =
      typeof match.homeTeam === "string" ? match.homeTeam : match.homeTeam.code;
    const awayPlaceholder =
      typeof match.awayTeam === "string" ? match.awayTeam : match.awayTeam.code;
    const pillsClass =
      sizeClass === "compact" ? "compact-pills" : "final-pills";

    return `
      <div class="playoff-match ${sizeClass}">
        <div class="playoff-meta">
          <span class="match-id-badge">${match.time}</span>
          <span class="playoff-date">${formatShortDate(match.date)}</span>
        </div>
        <div class="playoff-row">
          <div class="playoff-team-input home ${pillsClass}">
            <span class="playoff-placeholder-label">${homePlaceholder}</span>
            <div class="playoff-team-pill"></div>
            <div class="playoff-score-pill"></div>
          </div>
          <span class="playoff-vs">vs</span>
          <div class="playoff-team-input away ${pillsClass}">
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
            ${semifinalMatches.map((m) => renderSinglePlayoffMatch(m, "compact")).join("")}
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

// 7. DORSO (REVERSO) DE TARJETA INDIVIDUAL
export const renderCardBackHtml = (
  brandSignature: string = "",
  brandLogoUrl: string = "",
  coverBgColor?: string,
  coverBgImageUrl?: string,
  showCoverTrophy: boolean = true,
): string => {
  let customStyle = "";
  if (coverBgImageUrl) {
    customStyle += `background-image: url(${coverBgImageUrl}) !important; background-size: cover !important; background-position: center !important;`;
  } else if (coverBgColor) {
    customStyle += `background-color: ${coverBgColor} !important; background-image: none !important;`;
  }

  const badgeHtml = renderBranding(brandSignature, brandLogoUrl);

  return `
    <div class="card-inner back-card" style="${customStyle}">
      <div class="card-overlay"></div>
      <div class="card-content safe-zone" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; height: 100%;">
        <div class="back-logo-container" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          ${showCoverTrophy ? `<img src="/src/assets/copa.png" class="back-trophy-img" style="width: 70px; height: 95px; object-fit: contain; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); pointer-events: none;" alt="Trophy" />` : ""}
          <div class="back-title" style="font-size: 0.8rem; font-weight: 800; color: #ffffff; letter-spacing: 1px; margin-top: 5px;">WORLD CUP 2026</div>
          <div class="back-subtitle" style="font-size: 0.5rem; font-weight: 600; color: var(--accent-color, #ffd700); letter-spacing: 2px; text-transform: uppercase;">Fixture Oficial</div>
        </div>
        <div style="margin-top: 20px; width: 100%;">
          ${badgeHtml}
        </div>
      </div>
    </div>
  `;
};

// HELPER FOR FLYER GROUP RENDERING
const renderFlyerGroupHtml = (group: Group): string => {
  const teamsList = group.teams.map((t) => t.code).join(" • ");
  const matchesListHtml = group.matches
    .map((m) => {
      const formattedDate = formatShortDate(m.date);
      // Extract just "11/6" from "Jue 11/6"
      const dateOnly = formattedDate.includes(" ")
        ? formattedDate.split(" ")[1]
        : formattedDate;
      return `
      <div class="flyer-match-row">
        <span class="flyer-match-teams">
          <strong>${typeof m.homeTeam === "string" ? m.homeTeam : m.homeTeam.code}</strong>
          v
          <strong>${typeof m.awayTeam === "string" ? m.awayTeam : m.awayTeam.code}</strong>
        </span>
        <span class="flyer-match-score"></span>
        <span class="flyer-match-meta">${dateOnly} ${m.time.replace(" hs.", "")}</span>
      </div>
    `;
    })
    .join("");

  return `
    <div class="flyer-group-item">
      <div class="flyer-group-header">
        <span class="flyer-group-title">GRUPO ${group.name}</span>
        <span class="flyer-group-subtitle">${teamsList}</span>
      </div>
      <div class="flyer-group-matches">
        ${matchesListHtml}
      </div>
    </div>
  `;
};

// HELPER FOR FLYER PLAYOFF MATCH RENDERING
const renderFlyerPlayoffMatchHtml = (match: any): string => {
  const home =
    typeof match.homeTeam === "string" ? match.homeTeam : match.homeTeam.code;
  const away =
    typeof match.awayTeam === "string" ? match.awayTeam : match.awayTeam.code;
  const formattedDate = formatShortDate(match.date);
  const dateOnly = formattedDate.includes(" ")
    ? formattedDate.split(" ")[1]
    : formattedDate;

  return `
    <div class="flyer-playoff-row">
      <div class="flyer-playoff-meta">
        <span class="flyer-playoff-id">${match.time}</span>
        <span class="flyer-playoff-date">${dateOnly}</span>
      </div>
      <div class="flyer-playoff-teams">
        <span class="flyer-playoff-team home">${home}</span>
        <span class="flyer-playoff-score-box"></span>
        <span class="flyer-playoff-vs">vs</span>
        <span class="flyer-playoff-score-box"></span>
        <span class="flyer-playoff-team away">${away}</span>
      </div>
    </div>
  `;
};

// 8. FLYER FRENTE (12 GRUPOS EN 4 COLUMNAS)
export const renderFlyerFrenteHtml = (
  groups: Group[],
  brandSignature: string = "",
  brandLogoUrl: string = "",
  coverBgColor?: string,
  coverBgImageUrl?: string,
): string => {
  let customStyle = "";
  if (coverBgImageUrl) {
    customStyle += `background-image: url(${coverBgImageUrl}) !important; background-size: cover !important; background-position: center !important;`;
  } else if (coverBgColor) {
    customStyle += `background-color: ${coverBgColor} !important; background-image: none !important;`;
  }

  // Split 12 groups into 4 columns of 3 groups each
  const columnsHtml = [];
  for (let c = 0; c < 4; c++) {
    const colGroups = groups.slice(c * 3, (c + 1) * 3);
    const colGroupsHtml = colGroups
      .map((g) => renderFlyerGroupHtml(g))
      .join("");
    columnsHtml.push(`
      <div class="flyer-column col-${c + 1}">
        ${colGroupsHtml}
      </div>
    `);
  }

  const badgeHtml = renderBranding(brandSignature, brandLogoUrl);

  return `
    <div class="flyer-inner frente" style="${customStyle}">
      <div class="card-overlay"></div>
      <div class="flyer-content safe-zone">
        <div class="flyer-columns-container four-columns">
          ${columnsHtml.join("")}
        </div>
        <div class="flyer-branding-strip">
          <span style="font-size: 0.5rem; font-weight: 800; color: #ffffff; letter-spacing: 1px;">MUNDIAL 2026 - FIXTURE COMPLETO</span>
          ${badgeHtml}
        </div>
      </div>
    </div>
  `;
};

// 9. FLYER DORSO (ARBOL COMPLETO EN 5 COLUMNAS - ESPEJADO OPCIONAL)
export const renderFlyerDorsoHtml = (
  phases: PlayoffPhase[],
  brandSignature: string = "",
  brandLogoUrl: string = "",
  coverBgColor?: string,
  coverBgImageUrl?: string,
  showCoverTrophy: boolean = true,
  isMirrored: boolean = false,
): string => {
  let customStyle = "";
  if (coverBgImageUrl) {
    customStyle += `background-image: url(${coverBgImageUrl}) !important; background-size: cover !important; background-position: center !important;`;
  } else if (coverBgColor) {
    customStyle += `background-color: ${coverBgColor} !important; background-image: none !important;`;
  }

  // Get playoff matches
  // phases[0] = Dieciseisavos Parte 1 (8 partidos)
  // phases[1] = Dieciseisavos Parte 2 (8 partidos) → se combinan en r32
  // phases[2] = Octavos de Final
  // phases[3] = Cuartos de Final
  // phases[4] = Fase Final (Semis + 3er puesto + Final)
  const r32Matches = [
    ...(phases[0]?.matches || []),
    ...(phases[1]?.matches || []),
  ]; // 16 matches total
  const r16Matches = phases[2]?.matches || []; // 8 matches
  const qfMatches = phases[3]?.matches || []; // 4 matches
  const finalPhaseMatches = phases[4]?.matches || []; // 4 matches: 2 semis, 3rd place, final

  // Construct the 5 columns
  const cols: string[] = [];

  // Column 1: Dieciseisavos P1 (Matches 1-8)
  const col1Html = `
    <div class="flyer-column col-1">
      <div class="flyer-column-title">1/16 DE FINAL - A</div>
      <div class="flyer-playoff-list">
        ${r32Matches
          .slice(0, 8)
          .map((m) => renderFlyerPlayoffMatchHtml(m))
          .join("")}
      </div>
    </div>
  `;
  cols.push(col1Html);

  // Column 2: Dieciseisavos P2 (Matches 9-16)
  const col2Html = `
    <div class="flyer-column col-2">
      <div class="flyer-column-title">1/16 DE FINAL - B</div>
      <div class="flyer-playoff-list">
        ${r32Matches
          .slice(8, 16)
          .map((m) => renderFlyerPlayoffMatchHtml(m))
          .join("")}
      </div>
    </div>
  `;
  cols.push(col2Html);

  // Column 3: Octavos de Final (8 matches)
  const col3Html = `
    <div class="flyer-column col-3">
      <div class="flyer-column-title">OCTAVOS DE FINAL</div>
      <div class="flyer-playoff-list">
        ${r16Matches.map((m) => renderFlyerPlayoffMatchHtml(m)).join("")}
      </div>
    </div>
  `;
  cols.push(col3Html);

  // Column 4: Cuartos de Final (4 matches) + Semifinales (2 matches)
  const qfHtml = qfMatches.map((m) => renderFlyerPlayoffMatchHtml(m)).join("");
  const sfHtml = finalPhaseMatches
    .slice(0, 2)
    .map((m) => renderFlyerPlayoffMatchHtml(m))
    .join("");
  const col4Html = `
    <div class="flyer-column col-4">
      <div class="flyer-column-title">CUARTOS DE FINAL</div>
      <div class="flyer-playoff-list" style="margin-bottom: 6px;">
        ${qfHtml}
      </div>
      <div class="flyer-column-title">SEMIFINAL</div>
      <div class="flyer-playoff-list">
        ${sfHtml}
      </div>
    </div>
  `;
  cols.push(col4Html);

  // Column 5: 3er Puesto (1 match) + Final (1 match) + Cover Space
  const thirdPlaceHtml = finalPhaseMatches[2]
    ? renderFlyerPlayoffMatchHtml(finalPhaseMatches[2])
    : "";
  const finalHtml = finalPhaseMatches[3]
    ? renderFlyerPlayoffMatchHtml(finalPhaseMatches[3])
    : "";
  const badgeHtml = renderBranding(brandSignature, brandLogoUrl);
  const col5Html = `
    <div class="flyer-column col-5 flyer-column-cover">
      <div class="flyer-column-title">3ER Y 4TO PUESTO</div>
      <div class="flyer-playoff-list" style="margin-bottom: 4px;">
        ${thirdPlaceHtml}
      </div>
      <div class="flyer-column-title">FINAL</div>
      <div class="flyer-playoff-list" style="margin-bottom: 8px;">
        ${finalHtml}
      </div>
      <div class="flyer-mini-cover-widget">
        ${showCoverTrophy ? `<img src="/src/assets/copa.png" style="height: 38px; width: auto; object-fit: contain;" alt="Trophy" />` : ""}
        <span class="mini-cover-title">WORLD CUP 26</span>
        ${badgeHtml}
      </div>
    </div>
  `;
  cols.push(col5Html);

  // Mirror columns if requested (Duplex flip horizontal match-up)
  if (isMirrored) {
    cols.reverse();
  }

  return `
    <div class="flyer-inner dorso" style="${customStyle}">
      <div class="card-overlay"></div>
      <div class="flyer-content safe-zone">
        <div class="flyer-columns-container five-columns">
          ${cols.join("")}
        </div>
      </div>
    </div>
  `;
};
