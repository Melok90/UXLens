import { useState, useEffect } from 'react';
import { Search, Share2, Menu, X, Check, Sparkles, Layers, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';

export default function Header() {
  const location = useLocation();
  const { t, language } = useLanguage();
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const isProUser = useStore((state) => state.isProUser);
  const setIsProModalOpen = useStore((state) => state.setIsProModalOpen);
  const [isShared, setIsShared] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'UXLens',
          url: url,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  return (
    <header className="bg-white/80 dark:bg-[#08090a]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 sticky top-0 z-40 transition-colors">
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1280px] mx-auto h-[60px] relative">
        <div className="flex items-center gap-8 flex-1">
          <Link className="flex items-center gap-2 group min-h-[44px]" to="/" aria-label="UXLens Home">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
              UX
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Lens
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-750 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200">
              v2.0
            </span>
          </Link>

          <div className="hidden lg:flex items-center bg-zinc-100/70 dark:bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 focus-within:border-[#5e6ad2] focus-within:ring-2 focus-within:ring-[#5e6ad2]/20 transition-all group relative">
            <Search className="text-zinc-500 dark:text-zinc-400 w-4 h-4 mr-2" aria-hidden="true" />
            <input
              aria-label={t('hero.searchPlaceholder')}
              className="bg-transparent border-none outline-none text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 w-48"
              placeholder={t('hero.searchPlaceholder')}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={language === 'ru' ? 'Очистить поиск' : 'Clear search'}
                className="ml-1 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer p-1"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            ) : (
              <kbd className="hidden xl:inline-block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.2 rounded shadow-2xs">
                ⌘K
              </kbd>
            )}
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-7 h-full" aria-label={t('nav.components')}>
          <NavLink to="/" label={t('nav.components')} active={location.pathname === '/'} />
          <NavLink to="/systems" label={t('nav.systems')} active={location.pathname === '/systems'} />
        </nav>

        <div className="flex items-center justify-end gap-2 flex-1">
          <LanguageToggle />
          <ThemeToggle />

          {/* Unobtrusive PRO Entry Point */}
          <button
            type="button"
            onClick={() => setIsProModalOpen(true)}
            aria-label={t('nav.unlockPro') || 'UX Lens Pro'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-amber-400/60 dark:hover:border-amber-500/50 hover:text-zinc-950 dark:hover:text-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 transition-transform group-hover:scale-110 shrink-0" aria-hidden="true" />
            <span className="font-mono tracking-tight font-bold">PRO</span>
            {isProUser && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={handleShare}
            aria-label={t('nav.share')}
            className="text-xs font-medium min-w-[96px] justify-center text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 px-3 py-1.5 rounded-lg transition-colors hidden sm:flex items-center gap-1.5 cursor-pointer"
          >
            {isShared ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" /> {t('nav.share')}
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" /> {t('nav.share')}
              </>
            )}
          </button>
          <button
            type="button"
            className="hidden sm:flex items-center text-xs font-semibold min-w-[72px] justify-center bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-3.5 py-1.5 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs cursor-pointer"
          >
            {t('nav.login')}
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMobileMenuOpen
              ? (language === 'ru' ? 'Закрыть меню' : 'Close menu')
              : (language === 'ru' ? 'Открыть меню навигации' : 'Open navigation menu')}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'ru' ? 'Мобильное меню' : 'Mobile menu'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-[#0c0d10]/95 backdrop-blur-xl px-4 py-5 shadow-2xl overflow-hidden flex flex-col gap-4"
          >
            {/* Mobile Search */}
            <div className="flex items-center bg-zinc-100/90 dark:bg-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-[#5e6ad2] focus-within:ring-2 focus-within:ring-[#5e6ad2]/20 transition-all">
              <Search className="text-zinc-500 dark:text-zinc-400 w-4 h-4 mr-2.5 shrink-0" aria-hidden="true" />
              <input
                aria-label={t('hero.searchPlaceholder')}
                className="bg-transparent border-none outline-none text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 w-full"
                placeholder={t('hero.searchPlaceholder')}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={language === 'ru' ? 'Очистить поиск' : 'Clear search'}
                  className="ml-1 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer p-1"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#5e6ad2]" aria-hidden="true" />
                  {t('nav.components')}
                </span>
                {location.pathname === '/' && (
                  <span className="w-2 h-2 rounded-full bg-[#5e6ad2]" aria-hidden="true" />
                )}
              </Link>

              <Link
                to="/systems"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === '/systems'
                    ? 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#5e6ad2]" aria-hidden="true" />
                  {t('nav.systems')}
                </span>
                {location.pathname === '/systems' && (
                  <span className="w-2 h-2 rounded-full bg-[#5e6ad2]" aria-hidden="true" />
                )}
              </Link>
            </nav>

            <div className="h-[1px] bg-zinc-200/80 dark:bg-zinc-800/80" />

            {/* Actions in Drawer */}
            <div className="flex flex-col gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsProModalOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-500/30 text-zinc-900 dark:text-white hover:border-amber-500/50 transition-all cursor-pointer shadow-2xs"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  <span>UX Lens Pro</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold uppercase">
                  {isProUser ? t('playground.proActive') : t('proModal.badge')}
                </span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-850 text-xs font-medium transition-colors cursor-pointer"
                >
                  {isShared ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                      <span>{t('nav.share')}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t('nav.share')}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="flex-1 flex items-center justify-center px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs cursor-pointer"
                >
                  {t('nav.login')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ to, label, active = false }: { to: string; label: string; active?: boolean }) {
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={`text-xs font-medium transition-colors duration-150 py-1 border-b-2 relative ${
        active
          ? 'text-zinc-950 dark:text-white border-[#5e6ad2] font-semibold'
          : 'text-zinc-600 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-zinc-200'
      }`}
    >
      {label}
    </Link>
  );
}
