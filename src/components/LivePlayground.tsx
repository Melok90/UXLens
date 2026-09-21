import React, { useState } from 'react';
import {
  Sliders,
  RotateCcw,
  Palette,
  Type,
  ChevronDown,
  ChevronUp,
  AlignLeft,
  AlignRight,
  Sparkles,
  LockKeyhole,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';

const BRAND_SWATCHES = [
  { name: 'Linear', color: '#5E6AD2' },
  { name: 'Stripe', color: '#635BFF' },
  { name: 'Spotify', color: '#1DB954' },
  { name: 'Apple', color: '#0071E3' },
  { name: 'Airbnb', color: '#FF385C' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Obsidian', color: '#18181B' },
];

export default function LivePlayground() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);

  const isProUser = useStore((state) => state.isProUser);
  const setIsProUser = useStore((state) => state.setIsProUser);
  const setIsProModalOpen = useStore((state) => state.setIsProModalOpen);

  const customText = useStore((state) => state.customText);
  const customBrandColor = useStore((state) => state.customBrandColor);
  const isRtl = useStore((state) => state.isRtl);
  const setCustomText = useStore((state) => state.setCustomText);
  const setCustomBrandColor = useStore((state) => state.setCustomBrandColor);
  const setIsRtl = useStore((state) => state.setIsRtl);
  const resetPlayground = useStore((state) => state.resetPlayground);

  const hasOverrides = customText.trim().length > 0 || customBrandColor !== null || isRtl;

  const presets = [
    { label: t('playground.preset1'), value: language === 'ru' ? 'Начать работу' : 'Get Started' },
    { label: t('playground.preset2'), value: language === 'ru' ? 'Оформить заказ ($49)' : 'Checkout ($49)' },
    { label: t('playground.preset3'), value: language === 'ru' ? 'Подтвердить перевод' : 'Confirm Transfer' },
    {
      label: '⚠️ Stress Test',
      value: language === 'ru' 
        ? 'Очень длинный текст для проверки обрезки контейнера' 
        : 'Very long label to stress-test container truncation',
    },
  ];

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isProUser) return;
    setCustomBrandColor(e.target.value);
  };

  const handleHexInput = (val: string) => {
    if (!isProUser) return;
    let clean = val.trim();
    if (!clean.startsWith('#')) clean = '#' + clean;
    setCustomBrandColor(clean);
  };

  return (
    <section className="bg-white/80 dark:bg-[#101114]/90 border border-zinc-200 dark:border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-xs linear-card backdrop-blur-xs flex flex-col gap-3 transition-all relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/15 via-indigo-500/15 to-purple-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold shadow-2xs">
            <Sliders className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                {t('playground.title')}
              </h3>

              {/* PRO Tag */}
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-purple-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-300">
                <Sparkles className="w-3 h-3 text-amber-500" />
                {t('playground.proBadge')}
              </span>

              {isProUser && (
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  ● {t('playground.proActive')}
                </span>
              )}

              {hasOverrides && isProUser && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-[#5e6ad2] dark:text-[#828cf5] border border-indigo-500/20 font-semibold animate-pulse">
                  ● {t('playground.activeOverrides')}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
              {t('playground.desc')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isProUser ? (
            <button
              type="button"
              onClick={() => setIsProUser(false)}
              className="px-2.5 py-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors cursor-pointer"
              title="Переключить на бесплатный режим"
            >
              {t('playground.disableDemo')}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsProModalOpen(true)}
              className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-amber-500 to-indigo-600 text-white rounded-lg transition-all hover:opacity-90 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-white" />
              <span>PRO</span>
            </button>
          )}

          {hasOverrides && isProUser && (
            <button
              onClick={resetPlayground}
              className="px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 border border-zinc-200 dark:border-zinc-800 hover:border-rose-300 dark:hover:border-rose-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t('playground.reset')}</span>
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-md transition-colors cursor-pointer"
            title={isOpen ? 'Collapse' : 'Expand'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Controls Grid */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="relative pt-2 border-t border-zinc-100 dark:border-zinc-850"
          >
            {/* Controls Layer */}
            <div
              className={`grid grid-cols-1 lg:grid-cols-12 gap-3 transition-all ${
                !isProUser ? 'filter blur-[1.5px] opacity-30 select-none pointer-events-none' : ''
              }`}
            >
              {/* Control 1: Custom Text & Presets (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-[#5e6ad2]" />
                    <span>{t('playground.customText')}</span>
                  </label>
                  {customText && isProUser && (
                    <button
                      onClick={() => setCustomText('')}
                      className="text-[10px] text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 focus-within:border-[#5e6ad2] focus-within:ring-2 focus-within:ring-[#5e6ad2]/20 transition-all">
                  <input
                    type="text"
                    disabled={!isProUser}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder={t('playground.customTextPlaceholder')}
                    className="w-full bg-transparent border-none outline-none text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[10px] text-zinc-400 font-mono">Presets:</span>
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={!isProUser}
                      onClick={() => setCustomText(p.value)}
                      className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer font-medium ${
                        customText === p.value
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-2xs font-semibold'
                          : 'bg-zinc-100/70 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-950 dark:hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Brand Color Customizer (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{t('playground.brandColor')}</span>
                  </label>
                  {customBrandColor && isProUser && (
                    <button
                      onClick={() => setCustomBrandColor(null)}
                      className="text-[10px] text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                    >
                      Reset color
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Color preview circle with hidden native picker */}
                  <label className="relative w-8 h-8 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0 cursor-pointer shadow-2xs flex items-center justify-center hover:scale-105 transition-transform">
                    <span
                      className="absolute inset-0"
                      style={{ backgroundColor: customBrandColor || '#5E6AD2' }}
                    />
                    <input
                      type="color"
                      disabled={!isProUser}
                      value={customBrandColor || '#5E6AD2'}
                      onChange={handleColorChange}
                      className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                    />
                  </label>

                  {/* HEX Text input */}
                  <div className="flex-1 flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-2.5 py-1.5 focus-within:border-[#5e6ad2] focus-within:ring-2 focus-within:ring-[#5e6ad2]/20 transition-all font-mono text-xs">
                    <input
                      type="text"
                      disabled={!isProUser}
                      value={customBrandColor || ''}
                      onChange={(e) => handleHexInput(e.target.value)}
                      placeholder="#5E6AD2"
                      className="w-full bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 uppercase"
                    />
                  </div>

                  {/* RTL Direction Toggle */}
                  <div className="inline-flex bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-0.5 shrink-0">
                    <button
                      type="button"
                      disabled={!isProUser}
                      onClick={() => setIsRtl(false)}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        !isRtl
                          ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-2xs'
                          : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                      title="LTR (Left-to-Right)"
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={!isProUser}
                      onClick={() => setIsRtl(true)}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        isRtl
                          ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-2xs'
                          : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                      title="RTL (Right-to-Left)"
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Swatches Row */}
                <div className="flex items-center gap-1.5 pt-0.5 overflow-x-auto">
                  <span className="text-[10px] text-zinc-400 font-mono">{t('playground.brandPresets')}:</span>
                  {BRAND_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      disabled={!isProUser}
                      onClick={() => setCustomBrandColor(swatch.color)}
                      className={`w-4.5 h-4.5 rounded-full border transition-transform cursor-pointer shrink-0 ${
                        customBrandColor === swatch.color
                          ? 'ring-2 ring-zinc-900 dark:ring-white scale-110'
                          : 'border-black/15 dark:border-white/20 hover:scale-110'
                      }`}
                      style={{ backgroundColor: swatch.color }}
                      title={`${swatch.name} (${swatch.color})`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Paywall Overlay for Free Users */}
            {!isProUser && (
              <div className="absolute inset-0 z-10 flex items-center justify-center p-3 bg-white/50 dark:bg-[#101114]/70 backdrop-blur-[2px] rounded-xl">
                <div className="max-w-md w-full bg-white dark:bg-[#131418] border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xl text-center flex flex-col items-center gap-2.5 linear-card">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500/20 via-indigo-500/20 to-purple-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-2xs">
                    <LockKeyhole className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white flex items-center justify-center gap-1.5">
                      <span>{t('playground.lockedTitle')}</span>
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed max-w-sm">
                      {t('playground.lockedDesc')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap justify-center pt-1 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsProModalOpen(true)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold text-xs transition-transform hover:scale-102 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
                      <span>{t('playground.unlockPro')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsProUser(true)}
                      className="w-full sm:w-auto px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-850 font-medium text-xs transition-colors cursor-pointer"
                    >
                      <span>{t('playground.testDemo')}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
