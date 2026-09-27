import { ReactNode } from 'react';

/**
 * Логотипы систем и канонический порядок их отображения.
 */

export const SYSTEM_LOGOS: Record<string, ReactNode> = {
  apple: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.08 1.73-.95 2.76 1 .08 2.05-.51 2.68-1.26z" />
    </svg>
  ),
  material: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#6750A4" />
      <path d="M7 17V7l5 5 5-5v10" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  samsung: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#034EA2" />
      <circle cx="12" cy="12" r="5" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
    </svg>
  ),
  fluent: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="9" height="9" rx="1.5" fill="#F25022" />
      <rect x="12.5" y="2.5" width="9" height="9" rx="1.5" fill="#7FBA00" />
      <rect x="2.5" y="12.5" width="9" height="9" rx="1.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="9" height="9" rx="1.5" fill="#FFB900" />
    </svg>
  ),
  atlassian: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      <path d="M11.66 3.65c-.25-.43-.87-.43-1.12 0L5.3 12.87a7.28 7.28 0 0 0 5.48 10.87 7.27 7.27 0 0 0 5.16-2.22c.32-.34.23-.9-.18-1.12L11.66 3.65z" fill="#0052CC" />
      <path d="M12.34 20.35c.25.43.87.43 1.12 0l5.24-9.22a7.28 7.28 0 0 0-5.48-10.87 7.27 7.27 0 0 0-5.16 2.22c-.32.34-.23.9.18 1.12l4.1 16.75z" fill="#2684FF" />
    </svg>
  ),
  carbon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="#0F62FE" strokeWidth="1.5" fill="#0F62FE" fillOpacity="0.08" />
      <rect x="7" y="8" width="10" height="2" rx="1" fill="#0F62FE" />
      <rect x="7" y="11" width="10" height="2" rx="1" fill="#0F62FE" />
      <rect x="7" y="14" width="10" height="2" rx="1" fill="#0F62FE" />
    </svg>
  ),
  polaris: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      <path d="M18.8 5.6h-2.3c-.2-2.5-2-4.5-4.5-4.5s-4.3 2-4.5 4.5H5.2c-.7 0-1.2.6-1.2 1.3l1.8 14.5c.1.8.8 1.4 1.6 1.4h9.2c.8 0 1.5-.6 1.6-1.4l1.8-14.5c0-.7-.5-1.3-1.2-1.3zm-6.8-2.7c1.4 0 2.5 1.1 2.6 2.7H9.4c.1-1.6 1.2-2.7 2.6-2.7zm.8 13.8c-1.8 0-2.8-.9-2.8-2.1 0-1.8 2.4-2.2 2.4-3.1 0-.5-.4-.8-1.1-.8-.8 0-1.5.4-1.8.8l-.8-.8c.6-.7 1.6-1.2 2.6-1.2 1.7 0 2.7.9 2.7 2 0 1.9-2.4 2.3-2.4 3.2 0 .5.4.8 1.1.8.9 0 1.6-.4 2-.9l.7.8c-.6.8-1.6 1.3-2.6 1.3z" fill="#008060" />
    </svg>
  ),
  ant: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      <path d="M12 2.5L3.5 7.5v9L12 21.5l8.5-5v-9L12 2.5z" fill="#E6F4FF" stroke="#1677FF" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 2.5v9m0 0l7.5 4.5M12 11.5L4.5 16" stroke="#1677FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 11.5l4.5 2.5v5L12 21.5l-4.5-2.5v-5L12 11.5z" fill="#1677FF" />
    </svg>
  ),
};

export type SystemKey = 'apple' | 'material' | 'samsung' | 'fluent' | 'atlassian' | 'carbon' | 'polaris' | 'ant';

export interface SystemMeta {
  key: SystemKey;
  title: string;
  platform: 'web' | 'mobile' | 'both';
}

/** Порядок систем, используемый везде — карточки, таблица, страница систем. */
export const SYSTEM_LIST: SystemMeta[] = [
  { key: 'apple', title: 'Apple iOS HIG', platform: 'mobile' },
  { key: 'material', title: 'Material Design 3', platform: 'both' },
  { key: 'samsung', title: 'Samsung One UI', platform: 'mobile' },
  { key: 'fluent', title: 'Fluent UI', platform: 'web' },
  { key: 'atlassian', title: 'Atlassian', platform: 'web' },
  { key: 'carbon', title: 'IBM Carbon', platform: 'web' },
  { key: 'polaris', title: 'Shopify Polaris', platform: 'web' },
  { key: 'ant', title: 'Ant Design', platform: 'web' },
];

export const SYSTEM_TITLES = SYSTEM_LIST.map(s => s.title);
