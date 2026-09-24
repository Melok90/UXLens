---
name: web-performance-cleaner
description: Audits, profiles, and optimizes web applications for blazing speed, instant loading, 60fps runtime performance, and minimal asset weight. Automatically cleans up dead code, unused dependencies, redundant bundle chunks, unoptimized images, memory leaks, and layout thrashing. Use whenever asked to speed up a website, reduce bundle size, optimize React/Vite/Next.js apps, eliminate cruft, or audit Core Web Vitals (LCP, INP, CLS).
---

# Web Performance & Cleaner Skill

This skill guides the inspection, diagnostics, code-splitting, cruft removal, and runtime optimization of modern web applications (React, Vite, Next.js, Vue, vanilla).

---

## Quick Start Runbook

When invoked to optimize a website or clean up cruft, follow these 5 phases:

```
┌─────────────────┐     ┌──────────────────────┐     ┌────────────────────┐
│ 1. Audit & Scan │ ──> │ 2. Bundle & Splitting│ ──> │ 3. Cruft & Prune   │
└─────────────────┘     └──────────────────────┘     └────────────────────┘
                                                               │
                                                               ▼
┌─────────────────┐     ┌──────────────────────┐     ┌────────────────────┐
│ 5. Verify & Log │ <── │ 4. 60fps Runtime Opt │ <───┘                    │
└─────────────────┘     └──────────────────────┘
```

---

## Phase 1: Audit & Diagnostics

1. **Measure Baseline Bundle Size**:
   Run the bundle analyzer to determine chunk sizes and find overgrown modules:
   ```bash
   node <skillPath>/scripts/analyze-bundle.mjs [dist|build]
   ```
2. **Scan for Dead Code & Unused Dependencies**:
   Find packages declared in `dependencies` that are never imported, and detect orphaned components:
   ```bash
   node <skillPath>/scripts/find-dead-code.mjs
   ```
3. **Inspect Core Web Vitals Bottlenecks**:
   Review [references/checklist.md](references/checklist.md) against the application's DOM, images, and fonts.

---

## Phase 2: Bundle & Chunk Splitting

### 1. Lazy-Load Non-Critical Components & Modals
Heavy dialogs, drawer menus, inspectors, and code editors must **never** load in the initial bundle. Use `React.lazy` with `Suspense`:

```tsx
// ❌ BAD: Static import puts 80kB into initial download
import { AiAdvisorModal } from './components/AiAdvisorModal';

// ✔ GOOD: Dynamic import only downloads chunk when rendered
const AiAdvisorModal = React.lazy(() => 
  import('./components/AiAdvisorModal').then(m => ({ default: m.AiAdvisorModal }))
);

// In JSX:
<Suspense fallback={null}>
  {isOpen && <AiAdvisorModal onClose={handleClose} />}
</Suspense>
```

### 2. Configure Vendor Chunking (Vite / Rollup)
Prevent re-downloading entire vendor code on small app edits:

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
```

---

## Phase 3: Dead Code & Cruft Pruning

1. **Clean Workspace & Build Artifacts**:
   ```bash
   bash <skillPath>/scripts/clean-cruft.sh
   ```
2. **Purge Backend / Server Modules from Frontend**:
   If client `package.json` contains server packages like `express`, `dotenv`, or backend SDKs, move them to `devDependencies` or remove them entirely if obsolete.
3. **Prune Unused Exports**:
   Delete unreferenced mock files, test leftovers, and abandoned components.

---

## Phase 4: Runtime Performance & 60fps Rendering

1. **Prevent Layout Thrashing**:
   - Only animate CSS `transform` and `opacity`.
   - Never animate `width`, `height`, `left`, `top`, or `margin`.
   - Add `will-change: transform` sparingly on continuously animating layers.
2. **Guard High-Frequency Events**:
   - Add `{ passive: true }` to touch/wheel listeners.
   - Debounce search queries and resize handlers by 150-300ms.
3. **Component Render Hygiene**:
   - Memoize expensive data filtering / mapping with `useMemo`.
   - Wrap callbacks passed to memoized children in `useCallback`.
   - Use `React.memo` on list items and heavy cards.

---

## Phase 5: Verification & Benchmarking

1. **Verify TypeScript & Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```
2. **Re-run Bundle Analysis**:
   ```bash
   node <skillPath>/scripts/analyze-bundle.mjs dist
   ```
3. **Calculate Savings**:
   Compare before/after bundle size, chunk count, and initial payload weight.
