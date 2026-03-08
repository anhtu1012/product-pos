/**
 * ============================================================
 *  COLOR SYSTEM — product-pos
 * ============================================================
 *  Nguồn duy nhất để định nghĩa toàn bộ màu sắc trong dự án.
 *  Import file này bất cứ nơi nào cần dùng màu.
 * ============================================================
 */

// ─── Brand / Primary ────────────────────────────────────────
export const primaryColors = {
  50: '#fdf2f4',
  100: '#fce7eb',
  200: '#f9d0d9',
  300: '#f4aab9',
  400: '#ec7a93',
  500: '#e04f70', // main brand — đỏ hồng đặc trưng (Gogi)
  600: '#cc2e52',
  700: '#ab2044',
  800: '#8f1e3e',
  900: '#7a1d3a',
  950: '#430b1c',
} as const

// ─── Neutral / Gray ─────────────────────────────────────────
export const neutralColors = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
  950: '#030712',
} as const

// ─── Semantic colors ─────────────────────────────────────────
export const semanticColors = {
  success: '#16a34a',
  successLight: '#dcfce7',
  warning: '#d97706',
  warningLight: '#fef3c7',
  error: '#dc2626',
  errorLight: '#fee2e2',
  info: '#2563eb',
  infoLight: '#dbeafe',
} as const

// ─── Background / Surface ────────────────────────────────────
export const surfaceColors = {
  background: '#fff8f9', // nền tổng thể
  surface: '#ffffff', // card, panel
  surfaceAlt: '#fdf2f4', // nền phụ (sidebar, header)
  border: '#f4aab9', // viền nhẹ
  overlay: 'rgba(0,0,0,0.4)',
} as const

// ─── Text ────────────────────────────────────────────────────
export const textColors = {
  primary: '#111827',
  secondary: '#4b5563',
  muted: '#9ca3af',
  inverse: '#ffffff',
  brand: primaryColors[600],
} as const

// ─── Sidebar specific ────────────────────────────────────────
export const sidebarColors = {
  bg: '#1f0a10', // nền sidebar tối — kiểu nhà hàng cao cấp
  bgHover: '#3a1220',
  bgActive: primaryColors[700],
  text: '#f9d0d9',
  textMuted: '#e04f70',
  icon: primaryColors[400],
} as const

// ─── Header specific ─────────────────────────────────────────
export const headerColors = {
  bg: '#ffffff',
  border: neutralColors[200],
  text: neutralColors[800],
  shadow: '0 1px 3px rgba(0,0,0,0.08)',
} as const

// ─── Convenience re-export ───────────────────────────────────
export const colors = {
  primary: primaryColors,
  neutral: neutralColors,
  semantic: semanticColors,
  surface: surfaceColors,
  text: textColors,
  sidebar: sidebarColors,
  header: headerColors,
} as const

export type ColorToken = typeof colors
