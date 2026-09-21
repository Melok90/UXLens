import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="max-w-3xl flex flex-col items-start gap-3">

      <h1 className="text-3xl sm:text-4xl lg:text-[44px] leading-[1.12] font-bold text-zinc-950 dark:text-white tracking-tight">
        {t('hero.title')}
      </h1>

      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
        {t('hero.description')}
      </p>

      <div className="flex items-center gap-3 pt-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{t('hero.stat')}</span>
        </div>
      </div>
    </section>
  );
}
