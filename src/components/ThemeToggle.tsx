import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export const ThemeToggle: React.FC = () => {
  const { effectiveTheme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const isDark = effectiveTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-md border border-[#cfc4c5] dark:border-neutral-700 bg-surface-container-low dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-2xs relative overflow-hidden w-8 h-8"
      title={t('theme.toggle')}
      aria-label={t('theme.toggle')}
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-amber-300" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
