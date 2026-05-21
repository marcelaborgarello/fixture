/**
 * MultiGroupCard — Muestra 3 grupos en una sola tarjeta compacta.
 * Diseñado para el Librito Zine y el fixture plegable.
 *
 * Se adapta automáticamente al 100% del ancho/alto del contenedor padre.
 * Los textos escalan mediante `config.fontSizeScale`.
 */

import React from 'react';
import { Group, DesignConfig } from '../../types';
import { Flag } from './Flag';

interface MultiGroupCardProps {
  groups: Group[];
  config: DesignConfig;
}

const formatShortDate = (dateStr: string): string => {
  return dateStr
    .replace(' de junio', '/6')
    .replace(' de julio', '/7')
    .replace('Jueves', 'Jue')
    .replace('Viernes', 'Vie')
    .replace('Sábado', 'Sáb')
    .replace('Domingo', 'Dom')
    .replace('Lunes', 'Lun')
    .replace('Martes', 'Mar')
    .replace('Miércoles', 'Mié');
};

export const MultiGroupCard: React.FC<MultiGroupCardProps> = ({ groups, config }) => {
  const useFifaCode = config.useFifaCode ?? false;
  const scale = config.fontSizeScale || 1.0;

  // ── Tipografía efectiva ─────────────────────────────────────────────────
  const titleFont = config.applyCoverTypographyToAllCards
    ? (config.coverTitleFontFamily && config.coverTitleFontFamily !== 'inherit'
      ? config.coverTitleFontFamily
      : config.titleFontFamily)
    : config.titleFontFamily;
  const titleColor = config.applyCoverTypographyToAllCards
    ? (config.coverTitleColor || config.titleTextColor)
    : config.titleTextColor;
  const bodyFont = config.applyCoverTypographyToAllCards
    ? (config.coverSubtitleFontFamily && config.coverSubtitleFontFamily !== 'inherit'
      ? config.coverSubtitleFontFamily
      : config.bodyFontFamily)
    : config.bodyFontFamily;
  const bodyColor = config.applyCoverTypographyToAllCards
    ? (config.coverSubtitleColor || config.bodyTextColor)
    : config.bodyTextColor;

  // ── Fondo del panel ─────────────────────────────────────────────────────
  const bgStyle: React.CSSProperties = {
    borderRadius: `${config.borderRadius ?? 0}px`,
  };
  if (config.backgroundType === 'gradient') {
    bgStyle.background = config.backgroundGradient;
  } else if (config.backgroundType === 'solid') {
    bgStyle.backgroundColor = config.solidColor;
  } else {
    bgStyle.background = config.backgroundGradient; // fallback
  }

  const matchBg = config.showMatchRowBackground === false
    ? 'transparent'
    : (config.cardBgColor || 'rgba(255,255,255,0.06)');
  const borderC = config.borderColor || 'rgba(255,255,255,0.15)';

  // ── Tamaños de fuente (px) ──────────────────────────────────────────────
  const groupTitlePx = 9 * scale;
  const teamSubtitlePx = 5.5 * scale;
  const matchNamePx = 7 * scale;
  const datePx = 5 * scale;
  const scorePx = 5.5 * scale;

  return (
    <div
      style={{
        ...bgStyle,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '6px 8px',
        gap: 3,
        overflow: 'hidden',
        boxSizing: 'border-box',
        color: '#ffffff',
        fontFamily: config.fontFamily || 'inherit',
      }}
    >
      {groups.map((group) => {
        const teamNames = group.teams.map(t => useFifaCode ? t.code : t.name).join(' • ');
        return (
          <div
            key={group.name}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              minHeight: 0,
            }}
          >
            {/* ── Encabezado del grupo ──────────────────────────────── */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottom: `1px solid ${borderC}`,
              paddingBottom: 2,
              marginBottom: 2,
              flexShrink: 0,
            }}>
              <h2 style={{
                fontFamily: titleFont || 'inherit',
                color: titleColor || '#ffd700',
                fontSize: groupTitlePx,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                lineHeight: 1,
                margin: 0,
              }}>
                GRUPO {group.name}
              </h2>
              <span style={{
                fontFamily: bodyFont || 'inherit',
                color: bodyColor || '#ffffff',
                opacity: 0.45,
                fontSize: teamSubtitlePx,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '58%',
                textAlign: 'right',
              }}>
                {teamNames}
              </span>
            </div>

            {/* ── Partidos del grupo ────────────────────────────────── */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              overflow: 'hidden',
            }}>
              {group.matches.map((match) => {
                const isHomeStr = typeof match.homeTeam === 'string';
                const isAwayStr = typeof match.awayTeam === 'string';
                const homeName = isHomeStr
                  ? (match.homeTeam as string)
                  : (useFifaCode ? (match.homeTeam as any).code : (match.homeTeam as any).name);
                const awayName = isAwayStr
                  ? (match.awayTeam as string)
                  : (useFifaCode ? (match.awayTeam as any).code : (match.awayTeam as any).name);
                const homeFlag = isHomeStr ? 'TBD' : (match.homeTeam as any).flagCode;
                const awayFlag = isAwayStr ? 'TBD' : (match.awayTeam as any).flagCode;
                const shortDate = formatShortDate(match.date).replace(/^\w+\s/, ''); // "12/6"

                return (
                  <div
                    key={match.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: matchBg,
                      borderBottom: `1px solid ${borderC}`,
                      padding: '1px 3px',
                      gap: 2,
                    }}
                  >
                    {/* Local */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2, width: '36%', justifyContent: 'flex-end', overflow: 'hidden' }}>
                      <span style={{ fontFamily: bodyFont || 'inherit', color: bodyColor || '#fff', fontSize: matchNamePx, fontWeight: 600, lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {homeName}
                      </span>
                      <div style={{ width: 11, height: 7.5, overflow: 'hidden', flexShrink: 0 }}>
                        <Flag code={homeFlag} />
                      </div>
                    </div>

                    {/* Cajas de resultado */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                      <div style={{ width: 9, height: 9, backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.2)', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: scorePx, fontWeight: 700 }}>-</span>
                      <div style={{ width: 9, height: 9, backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.2)', flexShrink: 0 }} />
                    </div>

                    {/* Visitante */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2, width: '36%', justifyContent: 'flex-start', overflow: 'hidden' }}>
                      <div style={{ width: 11, height: 7.5, overflow: 'hidden', flexShrink: 0 }}>
                        <Flag code={awayFlag} />
                      </div>
                      <span style={{ fontFamily: bodyFont || 'inherit', color: bodyColor || '#fff', fontSize: matchNamePx, fontWeight: 600, lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {awayName}
                      </span>
                    </div>

                    {/* Fecha */}
                    <span style={{ fontFamily: bodyFont || 'inherit', color: bodyColor || '#fff', opacity: 0.4, fontSize: datePx, fontWeight: 600, flexShrink: 0, lineHeight: 1 }}>
                      {shortDate}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultiGroupCard;
