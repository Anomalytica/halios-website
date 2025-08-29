interface LogoIconProps {
  size?: number;
  variant?: 'default' | 'dark' | 'outline';
}

export function LogoIcon({ size = 48, variant = 'default' }: LogoIconProps) {
  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg"
  };

  if (variant === 'dark') {
    return (
      <svg {...svgProps} aria-label="Helios AI Guarded H Icon for Dark Background">
        <path 
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 10 L90 28 V 72 L50 90 L10 72 V 28 L50 10 Z M25 45 H 75 V 55 H 25 V 45 Z" 
          fill="#7BB3B0" 
        />
      </svg>
    );
  }

  if (variant === 'outline') {
    return (
      <svg {...svgProps} aria-label="Helios AI Guarded H Icon - Outline">
        <path 
          fill="none"
          stroke="#1a4b5c"
          strokeWidth="8"
          strokeLinejoin="round"
          d="M50 10 L90 28 V 72 L50 90 L10 72 V 28 L50 10 Z M25 50 H 75" 
        />
      </svg>
    );
  }

  // Default variant
  return (
    <svg {...svgProps} aria-label="Helios AI Monitored Core Icon">
      <path 
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 10 L90 28 V 72 L50 90 L10 72 V 28 L50 10 Z M25 45 H 75 V 55 H 25 V 45 Z" 
        fill="#1a4b5c" 
      />
    </svg>
  );
}

export function LogoText({ size = "text-2xl", variant = 'default' }: { size?: string, variant?: 'default' | 'dark' }) {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#1a4b5c';
  const aiColor = variant === 'dark' ? '#7BB3B0' : '#7BB3B0'; // Keep original teal color

  return (
    <span className={`${size} font-medium`} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <span style={{ color: textColor }}>halios</span>
      <span style={{ color: aiColor }}>AI</span>
    </span>
  );
}

interface FullLogoProps {
  iconSize?: number;
  textSize?: string;
  variant?: 'default' | 'dark' | 'outline';
}

export function FullLogo({ iconSize = 96, textSize = "text-6xl", variant = 'default' }: FullLogoProps) {
  const textVariant = variant === 'outline' ? 'default' : variant;
  return (
    <div className="flex items-center space-x-3" style={{ display: 'inline-flex', alignItems: 'center' }}>
      <LogoIcon size={iconSize} variant={variant} />
      <LogoText size={textSize} variant={textVariant} />
    </div>
  );
}
