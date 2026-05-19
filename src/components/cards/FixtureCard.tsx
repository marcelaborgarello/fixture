import React from 'react';
import { DesignConfig } from '../../types';
import { CoverCard } from './CoverCard';
import { GroupCard } from './GroupCard';
import { PlayoffCard } from './PlayoffCard';
import { FaseFinalCard } from './FaseFinalCard';
import { CardBack } from './CardBack';

interface FixtureCardProps {
  type: 'cover' | 'group' | 'dieciseisavos' | 'octavos' | 'cuartos' | 'final' | 'back';
  data?: any;
  config: DesignConfig;
  className?: string;
  style?: React.CSSProperties;
}

export const FixtureCard: React.FC<FixtureCardProps> = ({
  type,
  data,
  config,
  className = '',
  style = {},
}) => {
  // Combine props style with dynamic CSS variables for screen pixel scaling
  const cardStyle = {
    '--card-width-mm': String(config.cardWidthMm),
    '--card-height-mm': String(config.cardHeightMm),
    width: 'var(--card-width)',
    height: 'var(--card-height)',
    borderRadius: `${config.borderRadius ?? 0}px`,
    fontFamily: config.fontFamily || 'inherit',
    ...style,
  } as React.CSSProperties;

  const renderContent = () => {
    switch (type) {
      case 'cover':
        return <CoverCard config={config} />;
      case 'group':
        return <GroupCard group={data} config={config} />;
      case 'dieciseisavos':
      case 'octavos':
      case 'cuartos':
        return <PlayoffCard phase={data} config={config} type={type} />;
      case 'final':
        return <FaseFinalCard phase={data} config={config} />;
      case 'back':
        return <CardBack config={config} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={cardStyle}
      className={`relative shrink-0 select-none overflow-hidden box-border card-container ${className}`}
      data-card-type={type}
    >
      {renderContent()}
    </div>
  );
};
export default FixtureCard;
