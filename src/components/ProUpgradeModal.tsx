import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, LockKeyhole, Zap, Layers, Globe, Sliders } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';

export default function ProUpgradeModal() {
  const { t } = useLanguage();
  const isProModalOpen = useStore((state) => state.isProModalOpen);
  const isProUser = useStore((state) => state.isProUser);
  const setIsProUser = useStore((state) => state.setIsProUser);
  const setIsProModalOpen = useStore((state) => state.setIsProModalOpen);

  const [activatedSuccess, setActivatedSuccess] = useState(false);

  if (!isProModalOpen) return null;

  const handleActivate = () => {
    setIsProUser(true);
    setActivatedSuccess(true);
    setTimeout(() => {
      setActivatedSuccess(false);
      setIsProModalOpen(false);
    }, 1400);
  };

  const handleClose = () => {
    setIsProModalOpen(false);
  };

  const features = [
    { icon: Sliders, text: t('proModal.f1') },
    { icon: Sparkles, text: t('proModal.f2') },
    { icon: Globe, text: t('proModal.f3') },
    { icon: Layers, text: t('proModal.f4') },
    { icon: Zap, text: t('proModal.f5') },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="w-full max-w-lg bg-white dark:bg-[#101114] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden linear-card my-auto"
        >
          {/* Top Banner with subtle gradient */}
          <div className="relative p-6 pb-5 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent border-b border-zinc-100 dark:border-zinc-850">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-purple-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-300">
                <Sparkles className="w-3 h-3 text-amber-500" />
                {t('proModal.badge')}
              </span>
              {isProUser && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  ● {t('playground.proActive')}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
              {t('proModal.title')}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {t('proModal.subtitle')}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5">
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
              <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                7 дней trial
              </span>
            </div>

            {/* Feature List */}
            <div className="space-y-2.5">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-5 h-5 rounded-md bg-[#5e6ad2]/10 flex items-center justify-center text-[#5e6ad2] dark:text-[#828cf5] shrink-0 mt-0.5">
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                      {feat.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Action Area */}
            <div className="pt-2 space-y-2">
              {activatedSuccess ? (
                <div className="w-full py-2.5 px-4 bg-emerald-500 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm animate-in zoom-in-95">
                  <Check className="w-4 h-4" />
                  <span>{t('proModal.activated')}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleActivate}
                  className="w-full py-2.5 px-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
                  <span>{t('proModal.cta')}</span>
                </button>
              )}

              {isProUser && (
                <button
                  type="button"
                  onClick={() => setIsProUser(false)}
                  className="w-full text-center text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer pt-1"
                >
                  {t('playground.disableDemo')}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
