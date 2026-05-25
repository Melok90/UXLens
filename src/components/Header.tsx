import { Search, Share2, Menu, X } from 'lucide-react';
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

  return (
    <header className="bg-surface-container-lowest border-b border-[#cfc4c5] sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1280px] mx-auto h-[64px]">
        <div className="flex items-center gap-8">
          <Link className="text-2xl font-semibold text-black" to="/">UXLens</Link>
          
          <div className="hidden md:flex items-center bg-surface-container-low px-3 py-1.5 rounded-md border border-[#cfc4c5] focus-within:border-accent-blue focus-within:ring-1 focus-within:ring-accent-blue transition-all group relative">
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

        <nav className="hidden md:flex items-center gap-6 h-full pt-1">
          <NavLink to="/" label={t('nav.components')} active={location.pathname === '/'} />
          <NavLink to="/systems" label={t('nav.systems')} active={location.pathname === '/systems'} />
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button className="text-sm font-medium text-black border border-[#cfc4c5] px-3 py-1.5 rounded hover:bg-surface-container-low transition-colors hidden sm:flex items-center gap-2">
            <Share2 className="w-4 h-4" /> {t('nav.share')}
          </button>
          <button className="text-sm font-medium bg-black text-white px-4 py-1.5 rounded hover:opacity-80 transition-opacity">{t('nav.login')}</button>
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
