import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Sliders, Globe, Layers, Zap, Palette, Type } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';

const COLOR_PRESETS = [
  { label: 'Linear Indigo', hex: '#5E6AD2' },
  { label: 'Emerald', hex: '#10B981' },
  { label: 'Rose Pink', hex: '#F43F5E' },
  { label: 'Amber Gold', hex: '#F59E0B' },
  { label: 'Electric Blue', hex: '#0066FF' },
];

export default function ProUpgradeModal() {
  const { t, language } = useLanguage();
  const isProModalOpen = useStore((state) => state.isProModalOpen);
  const isProUser = useStore((state) => state.isProUser);
  const setIsProUser = useStore((state) => state.setIsProUser);
  const setIsProModalOpen = useStore((state) => state.setIsProModalOpen);

  const [previewText, setPreviewText] = useState(
    language === 'ru' ? 'Оформить заказ' : 'Start Free Trial'
  );
  const [previewColor, setPreviewColor] = useState('#5E6AD2');
  const [activatedSuccess, setActivatedSuccess] = useState(false);

  // Keyboard Escape listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isProModalOpen) {
        setIsProModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProModalOpen, setIsProModalOpen]);

  if (!isProModalOpen) return null;

  const handleActivate = () => {
    setIsProUser(true);
    setActivatedSuccess(true);
    setTimeout(() => {
      setActivatedSuccess(false);
      setIsProModalOpen(false);
    }, 1200);
  };

  const handleClose = () => {
    setIsProModalOpen(false);
  };

  const features = [
    {
      icon: Palette,
      title: t('proModal.f1Title'),
      desc: t('proModal.f1Desc'),
    },
    {
      icon: Type,
      title: t('proModal.f2Title'),
      desc: t('proModal.f2Desc'),
    },
    {
      icon: Globe,
      title: t('proModal.f3Title'),
      desc: t('proModal.f3Desc'),
    },
    {
      icon: Layers,
      title: t('proModal.f4Title'),
      desc: t('proModal.f4Desc'),
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pro-upgrade-title"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="w-full max-w-xl max-h-[92vh] flex flex-col bg-white dark:bg-[#101114] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden linear-card my-auto"
        >
          {/* Top Banner with subtle gradient */}
          <div className="relative p-5 sm:p-6 pb-4 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent border-b border-zinc-100 dark:border-zinc-850 shrink-0">
            <button
              onClick={handleClose}
              aria-label={language === 'ru' ? 'Закрыть окно' : 'Close modal'}
              className="absolute top-4 right-4 p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-purple-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300">
                <Sparkles className="w-3 h-3 text-amber-500" aria-hidden="true" />
                {t('proModal.badge')}
              </span>
              {isProUser && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  ● {t('playground.proActive')}
                </span>
              )}
            </div>

            <h3 id="pro-upgrade-title" className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
              {t('proModal.title')}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
              {t('proModal.subtitle')}
            </p>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
            {/* Live Interactive Sandbox Teaser */}
            <div className="p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#5e6ad2]" />
                  {t('proModal.interactiveTitle')}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">Live Demo</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block mb-1">
                    {t('proModal.interactiveInputLabel')}
                  </label>
                  <input
                    type="text"
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    maxLength={28}
                    className="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:border-[#5e6ad2]"
                    placeholder={t('proModal.interactiveInputLabel')}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block mb-1">
                    {t('proModal.interactiveColorLabel')}
                  </label>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {COLOR_PRESETS.map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => setPreviewColor(col.hex)}
                        title={col.label}
                        aria-label={col.label}
                        className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                          previewColor === col.hex
                            ? 'scale-110 border-zinc-900 dark:border-white shadow-xs'
                            : 'border-transparent hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: col.hex }}
                      />
                    ))}
                    <div
                      className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 ml-1 select-none"
                    >
                      {previewColor}
                    </div>
                  </div>
                </div>
              </div>

              {/* Realtime Live preview results across 3 systems */}
              <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                  {language === 'ru' ? 'Адаптация компонентов:' : 'System Component Adaptation:'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Apple HIG Button Preview */}
                  <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70 flex flex-col items-center justify-center gap-1.5">
                    <span className="text-[10px] font-mono text-zinc-400">Apple HIG</span>
                    <button
                      type="button"
                      style={{ backgroundColor: previewColor }}
                      className="text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xs truncate max-w-[130px] transition-colors"
                    >
                      {previewText || 'Action'}
                    </button>
                  </div>

                  {/* Google Material 3 Button Preview */}
                  <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70 flex flex-col items-center justify-center gap-1.5">
                    <span className="text-[10px] font-mono text-zinc-400">Material 3</span>
                    <button
                      type="button"
                      style={{ backgroundColor: previewColor }}
                      className="text-white text-xs font-medium px-3.5 py-1 rounded-2xl shadow-xs truncate max-w-[130px] transition-colors"
                    >
                      {previewText || 'Action'}
                    </button>
                  </div>

                  {/* Shadcn / ui Button Preview */}
                  <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70 flex flex-col items-center justify-center gap-1.5">
                    <span className="text-[10px] font-mono text-zinc-400">Shadcn / ui</span>
                    <button
                      type="button"
                      style={{ backgroundColor: previewColor }}
                      className="text-white text-xs font-medium px-3 py-1 rounded-md shadow-2xs truncate max-w-[130px] transition-colors"
                    >
                      {previewText || 'Action'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 flex items-start gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#5e6ad2]/10 dark:bg-[#5e6ad2]/15 flex items-center justify-center text-[#5e6ad2] dark:text-[#828cf5] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {feat.title}
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pricing Tagline */}
            <div className="flex items-baseline justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800">
              <div>
                <div className="text-lg font-bold text-zinc-950 dark:text-white">
                  {t('proModal.price')}
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {t('proModal.priceSub')}
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                {t('proModal.trialBadge')}
              </span>
            </div>

            {/* Action Area */}
            <div className="pt-1 space-y-2.5">
              {activatedSuccess ? (
                <div className="w-full py-3 px-4 bg-emerald-500 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm animate-in zoom-in-95">
                  <Check className="w-4 h-4" />
                  <span>{t('proModal.activated')}</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => handleActivate()}
                    className="flex-1 py-3 px-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
                    <span>{t('proModal.cta')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActivate()}
                    className="py-3 px-4 bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t('proModal.quickDemo')}</span>
                  </button>
                </div>
              )}

              {isProUser && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setIsProUser(false)}
                    className="text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                  >
                    {t('playground.disableDemo')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
