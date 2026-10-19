import React from 'react';

interface NpLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showText?: boolean;
}

export const NpLogo: React.FC<NpLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
}) => {
  // Determine pixel / Tailwind sizing
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    hero: 'w-28 h-28 sm:w-36 sm:h-36',
  };

  const dimensionClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-3 shrink-0 ${className}`}>
      {/* Scalable Vector Shield Emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${dimensionClass} shrink-0 drop-shadow-sm select-none transition-transform duration-300 hover:scale-105`}
        aria-label="ตราสัญลักษณ์ NP-Safe นครปฐมรู้ทันสแกมเมอร์"
        role="img"
      >
        <defs>
          {/* Outer shield gradient */}
          <linearGradient id="npShieldGrad" x1="10" y1="10" x2="90" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Golden rim gradient */}
          <linearGradient id="npGoldRim" x1="15" y1="5" x2="85" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Chedi Gold Inner Gradient */}
          <linearGradient id="npChediGold" x1="50" y1="20" x2="50" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="25%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Cyan / Tech cyber accent */}
          <linearGradient id="npCyberPulse" x1="20" y1="50" x2="80" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
          </linearGradient>

          {/* Soft inner glow */}
          <radialGradient id="npCenterGlow" cx="50" cy="50" r="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background Shield Outline */}
        <path
          d="M50 6 L88 20 C88 56 68 83 50 94 C32 83 12 56 12 20 Z"
          fill="url(#npShieldGrad)"
          stroke="url(#npGoldRim)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Inner Safety Shield Line */}
        <path
          d="M50 13 L82 25 C82 54 65 77 50 87 C35 77 18 54 18 25 Z"
          fill="url(#npCenterGlow)"
          stroke="#f59e0b"
          strokeWidth="1.2"
          strokeDasharray="3 2"
          strokeOpacity="0.7"
        />

        {/* Radar / Cyber security concentric rings */}
        <circle cx="50" cy="52" r="26" stroke="url(#npCyberPulse)" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="50" cy="52" r="16" stroke="#fbbf24" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 2" />

        {/* Phra Pathom Chedi Landmark Silhouette (Iconic Golden Stupa of Nakhon Pathom) */}
        {/* Spire top pin */}
        <line x1="50" y1="18" x2="50" y2="25" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="18" r="1.5" fill="#fef08a" />

        {/* Tiered Chedi Spire Rings */}
        <polygon points="46,26 54,26 53,29 47,29" fill="#fef08a" />
        <polygon points="45,30 55,30 54,34 46,34" fill="#fbbf24" />

        {/* Bell-shaped Stupa Dome (องค์ระฆังคว่ำ พระปฐมเจดีย์) */}
        <path
          d="M44 35 Q50 34 56 35 Q65 44 64 56 Q63 64 61 68 L39 68 Q37 64 36 56 Q35 44 44 35 Z"
          fill="url(#npChediGold)"
          stroke="#d97706"
          strokeWidth="1"
        />

        {/* Chedi Base plinth */}
        <rect x="36" y="68" width="28" height="4" rx="1.5" fill="#b45309" />
        <rect x="33" y="72" width="34" height="3" rx="1" fill="#78350f" />

        {/* Protective Checkmark / Civic Shield Mark */}
        <path
          d="M41 53 L47 59 L59 47"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-md"
        />

        {/* Small Golden Star at top representing Human Rights and Civic Pride */}
        <circle cx="50" cy="11" r="2" fill="#fbbf24" />
      </svg>

      {/* Optional Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
              NP-Safe ศูนย์คุ้มครองผู้เสียหาย
            </span>
          </div>
          <span className="text-[11px] text-slate-500 tracking-tight whitespace-nowrap">
            เพื่อสิทธิมนุษยชนและศักดิ์ศรีความเป็นมนุษย์ จ.นครปฐม
          </span>
        </div>
      )}
    </div>
  );
};
