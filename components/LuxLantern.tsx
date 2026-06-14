type Props = {
  light: number;
  size?: number;
};

export function LuxLantern({ light, size = 200 }: Props) {
  const t = Math.max(0, Math.min(100, light)) / 100;
  const glow = 0.25 + t * 0.75;
  const flameOpacity = 0.4 + t * 0.6;

  return (
    <div
      className="relative flex items-center justify-center animate-flicker"
      style={{ width: size, height: size * 1.25 }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: size * 1.6,
          height: size * 1.6,
          background: `radial-gradient(circle, rgba(103,232,249,${0.35 * glow}) 0%, rgba(246,211,101,${0.18 * glow}) 35%, rgba(5,6,10,0) 70%)`,
        }}
      />
      <svg
        viewBox="0 0 120 150"
        width={size}
        height={size * 1.25}
        className="relative lux-glow"
        style={{ filter: `drop-shadow(0 0 ${10 + t * 30}px rgba(103,232,249,${glow}))` }}
      >
        <defs>
          <radialGradient id="flame" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#FFF4C2" stopOpacity={flameOpacity} />
            <stop offset="45%" stopColor="#F6D365" stopOpacity={flameOpacity * 0.8} />
            <stop offset="100%" stopColor="#67E8F9" stopOpacity={flameOpacity * 0.4} />
          </radialGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#20334D" />
            <stop offset="100%" stopColor="#0D1320" />
          </linearGradient>
        </defs>

        {/* 吊り下げのリング */}
        <circle cx="60" cy="10" r="7" fill="none" stroke="#20334D" strokeWidth="3" />
        <line x1="60" y1="17" x2="60" y2="26" stroke="#20334D" strokeWidth="3" />

        {/* 上蓋 */}
        <path d="M40 30 L80 30 L72 40 L48 40 Z" fill="url(#metal)" />

        {/* ガラスの胴体 */}
        <rect
          x="44"
          y="40"
          width="32"
          height="64"
          rx="6"
          fill="rgba(13,19,32,0.6)"
          stroke="#20334D"
          strokeWidth="2"
        />

        {/* 内側の光 */}
        <ellipse cx="60" cy="74" rx="16" ry="24" fill="url(#flame)" />
        <ellipse
          cx="60"
          cy="78"
          rx="6"
          ry="12"
          fill="#FFF4C2"
          opacity={flameOpacity}
        />

        {/* ひび割れ */}
        <path
          d="M52 50 L57 64 L54 72"
          fill="none"
          stroke="rgba(168,176,189,0.35)"
          strokeWidth="1"
        />

        {/* 底 */}
        <path d="M40 104 L80 104 L76 116 L44 116 Z" fill="url(#metal)" />
      </svg>
    </div>
  );
}
