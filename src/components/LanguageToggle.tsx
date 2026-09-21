import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex bg-zinc-100/80 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5">
      <button
        onClick={() => setLanguage('ru')}
        className={`px-2 py-1 text-[11px] font-mono rounded-md transition-all cursor-pointer ${
          language === 'ru'
            ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-2xs'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-[11px] font-mono rounded-md transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-2xs'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
