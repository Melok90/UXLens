import { useState } from 'react';
import { Search, Share2, Menu, X, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';

export default function Header() {
  const location = useLocation();
  const { t } = useLanguage();
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const [isShared, setIsShared] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'UXLens',
          url: url
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
    <header className="bg-surface-container-lowest border-b border-[#cfc4c5] sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1280px] mx-auto h-[64px] relative">
        <div className="flex items-center gap-8 flex-1">
          <Link className="text-2xl font-semibold text-black" to="/">UXLens</Link>
          
          <div className="hidden lg:flex items-center bg-surface-container-low px-3 py-1.5 rounded-md border border-[#cfc4c5] focus-within:border-accent-blue focus-within:ring-1 focus-within:ring-accent-blue transition-all group relative">
            <Search className="text-[#4c4546] w-4.5 h-4.5 mr-2" />
            <input 
              className="bg-transparent border-none outline-none text-sm text-black placeholder:text-[#4c4546] w-48" 
              placeholder={t('hero.searchPlaceholder')} 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-1 text-[#4c4546] hover:text-black cursor-pointer"
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

        <div className="flex items-center justify-end gap-3 flex-1">
          <LanguageToggle />
          <button 
            onClick={handleShare}
            className="text-sm font-medium min-w-[120px] justify-center text-black border border-[#cfc4c5] px-3 py-1.5 rounded hover:bg-surface-container-low transition-colors hidden sm:flex items-center gap-2"
          >
            {isShared ? <><Check className="w-4 h-4 text-green-600" /> {t('nav.share')}</> : <><Share2 className="w-4 h-4" /> {t('nav.share')}</>}
          </button>
          <button className="text-sm font-medium min-w-[80px] justify-center bg-black text-white px-4 py-1.5 rounded hover:opacity-80 transition-opacity">{t('nav.login')}</button>
          <button className="md:hidden p-2 text-black">
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
          ? 'text-black border-accent-blue font-semibold' 
          : 'text-[#5d5f5f] border-transparent hover:text-black hover:text-accent-blue'
      }`}
    >
      {label}
    </Link>
  );
}
