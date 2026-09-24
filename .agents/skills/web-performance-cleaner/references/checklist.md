# Web Performance & Hygiene Audit Checklist

This checklist provides a structured guide for optimizing web applications to achieve sub-second load times, 60fps animations, minimal bundle weight, and green Core Web Vitals.

---

## 1. Core Web Vitals Targets

| Metric | Target (Good) | Needs Improvement | Poor | Primary Causes |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ **2.5s** | 2.5s – 4.0s | > 4.0s | Unoptimized hero images, slow server response, render-blocking JS/CSS |
| **INP** (Interaction to Next Paint) | ≤ **200ms** | 200ms – 500ms | > 500ms | Long JS tasks blocking main thread, un-debounced inputs, heavy state re-renders |
| **CLS** (Cumulative Layout Shift) | ≤ **0.1** | 0.1 – 0.25 | > 0.25 | Images without explicit `width`/`height`, dynamic banners without reserved space, web font swaps |
| **FCP** (First Contentful Paint) | ≤ **1.8s** | 1.8s – 3.0s | > 3.0s | Render-blocking resources, large CSS bundles |
| **TTFB** (Time to First Byte) | ≤ **0.8s** | 0.8s – 1.8s | > 1.8s | Slow edge CDN, un-cached SSR routes |

---

## 2. Bundle & Chunk Splitting Checklist

- [ ] **Lazy Loading for Modals & Dialogs**:
  - All large modals, inspectors, and popups should be loaded on demand via `React.lazy(() => import('./MyModal'))` wrapped with `Suspense`.
- [ ] **Route-Level Splitting**:
  - Each route/page is loaded dynamically with `React.lazy` or router-level lazy loading.
- [ ] **Manual Chunk Splitting in Bundler**:
  - Split large vendor libraries into distinct chunks:
    - `react-vendor`: `['react', 'react-dom']`
    - `motion-vendor`: `['framer-motion']`
    - `icons-vendor`: `['lucide-react']`
  - Prevents breaking browser cache for the entire application when only one component changes.
- [ ] **Target Chunk Sizes**:
  - Initial JS bundle: **< 150 kB gzip** (ideally < 100 kB).
  - Individual vendor chunks: **< 100 kB gzip**.
  - Route/modal chunks: **< 30 kB gzip**.

---

## 3. Dependency & Dead Code Cleanup Checklist

- [ ] **Frontend vs Backend Separation**:
  - Ensure server-side packages (`express`, `dotenv`, `fs-extra`, etc.) are not listed in client `dependencies`.
- [ ] **Dead Export Pruning**:
  - Remove unused utility functions, abandoned components, and unused SVG icons.
- [ ] **Tree-Shaking Icons**:
  - Import only specific icons: `import { Zap } from 'lucide-react'` instead of wildcard imports.
- [ ] **Avoid Duplicate Polyfills**:
  - Modern browsers support modern JS syntax. Avoid obsolete Babel transforms or polyfills for browsers you do not support.

---

## 4. Runtime Performance & 60fps Checklist

- [ ] **Render Loops & Memoization**:
  - Complex computations wrapped in `useMemo`.
  - Callback functions passed to child components or event listeners wrapped in `useCallback`.
  - Components receiving stable props wrapped in `React.memo`.
- [ ] **Avoid Layout Thrashing**:
  - Never interleave reads (`element.offsetHeight`, `getBoundingClientRect()`) with writes (`element.style.height = ...`).
  - Animate only GPU-accelerated CSS properties: `transform` and `opacity`. Avoid animating `height`, `width`, `top`, `left`, `margin`.
- [ ] **Virtualization for Long Lists**:
  - Lists with > 50 complex items should use windowing / virtualization (e.g. `@tanstack/react-virtual` or lightweight windowing).
- [ ] **Event Listener Hygiene**:
  - Use `passive: true` for `wheel`, `touchstart`, and `touchmove` event listeners.
  - Debounce or throttle high-frequency events (`scroll`, `resize`, `mousemove`).

---

## 5. Assets & Media Optimization Checklist

- [ ] **Image Formats & Sizing**:
  - Convert PNG/JPEG to modern WebP or AVIF formats.
  - Supply explicit `width` and `height` attributes to prevent CLS.
  - Use `loading="lazy"` for all below-the-fold images.
  - Use `fetchpriority="high"` for the hero LCP image.
- [ ] **Font Optimization**:
  - Use `font-display: swap` to prevent invisible text during font download.
  - Subset fonts to only required languages (e.g. Latin + Cyrillic).
  - Preload primary critical font files in `<head>`.
- [ ] **SVG Minification**:
  - Strip unnecessary metadata, editor attributes, and comments from inline SVGs.
