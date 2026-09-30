import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  const label =
    language === 'ru'
      ? 'Переключить на английский язык'
      : 'Switch to Russian language';

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex items-center justify-center cursor-pointer relative overflow-hidden min-w-[32px] min-h-[32px] sm:w-7 sm:h-7 shadow-2xs"
      title={label}
      aria-label={label}
    >
      <motion.div
        key={language}
        initial={{ y: -4, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 4, opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.18 }}
        className="flex items-center justify-center pointer-events-none select-none font-mono text-[11px] font-bold leading-none"
      >
        {language.toUpperCase()}
      </motion.div>
    </button>
  );
};

export default LanguageToggle;

