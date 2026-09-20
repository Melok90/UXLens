import { Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';

export default function Hero() {
  const { t } = useLanguage();
  const setIsAiAdvisorOpen = useStore((state) => state.setIsAiAdvisorOpen);

  return (
    <section className="max-w-3xl flex flex-col items-start">
      <h1 className="text-[48px] leading-[1.1] font-bold text-black dark:text-white mb-4 tracking-tight">
        {t('hero.title')}
      </h1>
      <p className="text-lg text-[#5d5f5f] dark:text-neutral-300 mb-4 leading-relaxed">
        {t('hero.description')}
      </p>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={() => setIsAiAdvisorOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-blue to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{t('ai.button')}</span>
        </button>

        <p className="text-sm font-semibold text-accent-blue dark:text-blue-400 tracking-wide">
          {t('hero.stat')}
        </p>
      </div>
    </section>
  );
}
