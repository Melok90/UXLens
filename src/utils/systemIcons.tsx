/**
 * Логотипы систем и канонический порядок их отображения. Раньше SVG были
 * продублированы в ComparisonGrid и SystemsPage — вынесено в общий модуль,
 * чтобы таблица сравнения (CompareTable) могла использовать те же иконки без
 * третьей копии.
 */

export const SYSTEM_LOGOS = {
  material: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M12 2L2 19.74h20L12 2z" fill="#4285F4" />
      <circle cx="12" cy="14" r="4" fill="#EA4335" />
      <rect x="9" y="10" width="6" height="6" fill="#FBBC05" />
    </svg>
  ),
  fluent: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect x="2" y="2" width="9" height="9" fill="#F25022" />
      <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
      <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
      <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
    </svg>
  ),
  atlassian: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0052CC">
      <path d="M22.5 12c0-5.8-4.7-10.5-10.5-10.5S1.5 6.2 1.5 12 6.2 22.5 12 22.5 22.5 17.8 22.5 12zm-12.7 5.2l-2.1-4.2 2.1-4.2h4.2l2.1 4.2-2.1 4.2h-4.2z" />
    </svg>
  ),
  carbon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0F62FE">
      <path d="M20 12c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-14 0c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" />
      <rect x="10" y="8" width="4" height="2" />
      <rect x="10" y="11" width="4" height="2" />
      <rect x="10" y="14" width="4" height="2" />
    </svg>
  ),
  polaris: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#008060">
      <path d="M19 6h-2c0-2.8-2.2-5-5-5S7 3.2 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.7 0 3 1.3 3 3H9c0-1.7 1.3-3 3-3zm7 17H5V8h2v2c0 .6.4 1 1 1s1-.4 1-1V8h6v2c0 .6.4 1 1 1s1-.4 1-1V8h2v12z" />
    </svg>
  ),
  ant: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M12 2l10 5.8v11.5L12 22 2 19.3V7.8L12 2zm0 3.5L5.5 8.7v6.6l6.5 3.3 6.5-3.3V8.7L12 5.5z" fill="#1677FF" />
      <path d="M12 8l4 2.3v4.6L12 17l-4-2.3v-4.6L12 8z" fill="#FF4D4F" />
    </svg>
  ),
};

export type SystemKey = keyof typeof SYSTEM_LOGOS;

/** Порядок систем, используемый везде — карточки, таблица, страница систем. */
export const SYSTEM_LIST: { key: SystemKey; title: string }[] = [
  { key: 'material', title: 'Material Design 3' },
  { key: 'fluent', title: 'Fluent UI' },
  { key: 'atlassian', title: 'Atlassian' },
  { key: 'carbon', title: 'IBM Carbon' },
  { key: 'polaris', title: 'Shopify Polaris' },
  { key: 'ant', title: 'Ant Design' },
];

export const SYSTEM_TITLES = SYSTEM_LIST.map(s => s.title);
