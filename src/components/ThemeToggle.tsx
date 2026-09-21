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
      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex items-center justify-center cursor-pointer relative overflow-hidden w-7 h-7 shadow-2xs"
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
          <Moon className="w-3.5 h-3.5 text-zinc-300" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-zinc-700" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
