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
  const setIsAiAdvisorOpen = useStore((state) => state.setIsAiAdvisorOpen);
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
    <header className="bg-surface-container-lowest dark:bg-[#16161a] border-b border-[#cfc4c5] dark:border-neutral-800 sticky top-0 z-40 transition-colors">
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1280px] mx-auto h-[64px] relative">
        <div className="flex items-center gap-8 flex-1">
          <Link className="text-2xl font-bold text-black dark:text-white tracking-tight" to="/">
            UXLens
          </Link>

          <div className="hidden lg:flex items-center bg-surface-container-low dark:bg-neutral-800/80 px-3 py-1.5 rounded-md border border-[#cfc4c5] dark:border-neutral-700 focus-within:border-accent-blue focus-within:ring-1 focus-within:ring-accent-blue transition-all group relative">
            <Search className="text-[#4c4546] dark:text-neutral-400 w-4.5 h-4.5 mr-2" />
            <input
              className="bg-transparent border-none outline-none text-sm text-black dark:text-white placeholder:text-[#4c4546] dark:placeholder:text-neutral-500 w-48"
              placeholder={t('hero.searchPlaceholder')}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="ml-1 text-[#4c4546] dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-6 h-full pt-1">
          <NavLink to="/" label={t('nav.components')} active={location.pathname === '/'} />
          <NavLink to="/systems" label={t('nav.systems')} active={location.pathname === '/systems'} />
        </nav>

        <div className="flex items-center justify-end gap-2.5 flex-1">
          {/* AI Advisor Button */}
          <button
            onClick={() => setIsAiAdvisorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-accent-blue/10 to-purple-500/10 hover:from-accent-blue/20 hover:to-purple-500/20 border border-accent-blue/30 dark:border-accent-blue/40 rounded-md text-xs font-semibold text-accent-blue dark:text-blue-400 transition-all cursor-pointer shadow-2xs"
            title={t('ai.advisor')}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">{t('ai.advisor')}</span>
          </button>

          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={handleShare}
            className="text-sm font-medium min-w-[110px] justify-center text-black dark:text-white border border-[#cfc4c5] dark:border-neutral-700 px-3 py-1.5 rounded hover:bg-surface-container-low dark:hover:bg-neutral-800 transition-colors hidden sm:flex items-center gap-2 cursor-pointer"
          >
            {isShared ? (
              <>
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" /> {t('nav.share')}
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" /> {t('nav.share')}
              </>
            )}
          </button>
          <button className="text-sm font-semibold min-w-[80px] justify-center bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 rounded hover:opacity-80 transition-opacity cursor-pointer">
            {t('nav.login')}
          </button>
          <button className="md:hidden p-2 text-black dark:text-white cursor-pointer">
            <Menu className="w-6 h-6" />
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
      className={`text-[15px] pb-1 transition-colors duration-200 border-b-2 ${
        active
          ? 'text-black dark:text-white border-accent-blue font-semibold'
          : 'text-[#5d5f5f] dark:text-neutral-400 border-transparent hover:text-black dark:hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}
