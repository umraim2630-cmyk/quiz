// 依存ライブラリなしのSVGアイコンセット（ストロークベース、24px viewBox）
// 絵文字の代わりに使用し、UIのトーンを統一する。

const PATHS: Record<string, React.ReactNode> = {
  laptop: (
    <>
      <rect x="3" y="5" width="18" height="11" rx="2" />
      <path d="M2 19h20" />
    </>
  ),
  landmark: (
    <>
      <path d="M3 22h18" />
      <path d="M6 18v-8M10 18v-8M14 18v-8M18 18v-8" />
      <path d="m12 2 8 5H4l8-5Z" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h3l2.6 11.6a2 2 0 0 0 2 1.4h7.6a2 2 0 0 0 2-1.5L21 7H6" />
    </>
  ),
  factory: (
    <>
      <path d="M2 20h20" />
      <path d="M4 20V9l6 4V9l6 4V4h4v16" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M8 17v-5M13 17V7M18 17v-8" />
    </>
  ),
  building: (
    <>
      <path d="M5 22V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v18" />
      <path d="M3 22h18" />
      <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2" />
      <path d="M10 22v-4h4v4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  trendingUp: (
    <>
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </>
  ),
  thumbsUp: (
    <>
      <path d="M7 10v12H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h3Z" />
      <path d="M7 11 11 3a3 3 0 0 1 3 3l-.7 3H19a2 2 0 0 1 2 2.4l-1.5 8A2 2 0 0 1 17.5 21H7" />
    </>
  ),
  flag: (
    <>
      <path d="M4 22V3" />
      <path d="M4 4c3-1.5 5.5 1.5 9 0s6-1 7 0v10c-1-1-3.5-1.5-7 0s-6-1.5-9 0" />
    </>
  ),
  yen: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m8.5 7 3.5 5 3.5-5M12 12v5.5M9.3 13.5h5.4M9.3 16h5.4" />
    </>
  ),
  refresh: (
    <>
      <path d="M3 12a9 9 0 0 1 15.4-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.4 6.4L3 16" />
      <path d="M3 21v-5h5" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  zap: <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />,
  sparkle: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />,
  message: <path d="M8 20a9 9 0 1 0-4-4l-2 6 6-2Z" />,
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 12h20" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </>
  ),
  flame: <path d="M12 22c4 0 7-2.7 7-6.8 0-3.3-2.2-5.5-3.8-7.2-.4 1.6-1.3 2.6-2.2 3-.1-2.8-1.3-6-4-8 .3 2.5-.7 4-2 5.7C5.7 10.4 5 12.4 5 15.2 5 19.3 8 22 12 22Z" />,
  home: (
    <>
      <path d="m3 10.5 9-7.5 9 7.5" />
      <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
    </>
  ),
  fileText: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8" />
    </>
  ),
}

export const STAR_PATH =
  'M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17l-5.9 3 1.2-6.5L2.5 8.9 9.1 8 12 2Z'

interface IconProps {
  name: keyof typeof PATHS | string
  size?: number
  strokeWidth?: number
  className?: string
  filled?: boolean
}

export function Icon({ name, size = 20, strokeWidth = 2, className, filled = false }: IconProps) {
  const body = PATHS[name]
  if (!body) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {body}
    </svg>
  )
}

/** 塗りつぶしの星（評価表示用） */
export function Star({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={STAR_PATH} />
    </svg>
  )
}
