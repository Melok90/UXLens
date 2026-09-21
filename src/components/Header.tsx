import { useState } from 'react';
import { Search, Share2, Menu, X, Check, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';

export default function Header() {
  const location = useLocation();
  const { t } = useLanguage();
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const isProUser = useStore((state) => state.isProUser);
  const setIsProModalOpen = useStore((state) => state.setIsProModalOpen);
  const [isShared, setIsShared] = useState(false);

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
          <Link className="flex items-center gap-2 group" to="/">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
              UX
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Lens
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-500">
              v2.0
            </span>
          </Link>

          <div className="hidden lg:flex items-center bg-zinc-100/70 dark:bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 focus-within:border-[#5e6ad2] focus-within:ring-2 focus-within:ring-[#5e6ad2]/20 transition-all group relative">
            <Search className="text-zinc-400 dark:text-zinc-500 w-4 h-4 mr-2" />
            <input
              className="bg-transparent border-none outline-none text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 w-48"
              placeholder={t('hero.searchPlaceholder')}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="ml-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden xl:inline-block text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.2 rounded shadow-2xs">
                ⌘K
              </kbd>
            )}
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-7 h-full">
          <NavLink to="/" label={t('nav.components')} active={location.pathname === '/'} />
          <NavLink to="/systems" label={t('nav.systems')} active={location.pathname === '/systems'} />
        </nav>

        <div className="flex items-center justify-end gap-2 flex-1">
          <button
            type="button"
            onClick={() => setIsProModalOpen(true)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              isProUser
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-purple-500/15 border border-amber-500/40 text-amber-600 dark:text-amber-300 hover:opacity-90 shadow-2xs'
            }`}
            title="UX Lens PRO"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span className="font-mono text-[11px] font-bold">{isProUser ? 'PRO Active' : 'PRO'}</span>
          </button>
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={handleShare}
            className="text-xs font-medium min-w-[96px] justify-center text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 px-3 py-1.5 rounded-lg transition-colors hidden sm:flex items-center gap-1.5 cursor-pointer"
          >
            {isShared ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" /> {t('nav.share')}
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" /> {t('nav.share')}
              </>
            )}
          </button>
          <button className="text-xs font-semibold min-w-[72px] justify-center bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-3.5 py-1.5 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs cursor-pointer">
            {t('nav.login')}
          </button>
          <button className="md:hidden p-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, label, active = false }: { to: string; label: string; active?: boolean }) {
  return (
    <Link
      to={to}
      className={`text-xs font-medium transition-colors duration-150 py-1 border-b-2 relative ${
        active
          ? 'text-zinc-950 dark:text-white border-[#5e6ad2] font-semibold'
          : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-zinc-200'
      }`}
    >
      {label}
    </Link>
  );
}
