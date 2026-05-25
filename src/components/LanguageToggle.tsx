import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex bg-surface-container-lowest border border-black/10 rounded-lg p-1">
      <button
        onClick={() => setLanguage('ru')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          language === 'ru' ? 'bg-black text-white font-medium' : 'text-gray-600 hover:text-black'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          language === 'en' ? 'bg-black text-white font-medium' : 'text-gray-600 hover:text-black'
        }`}
      >
        EN
      </button>
    </div>
  );
}
