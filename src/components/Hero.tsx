import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="max-w-4xl lg:max-w-5xl flex flex-col items-start gap-3">

      <h1 className="text-2xl sm:text-4xl lg:text-[44px] leading-[1.15] font-bold text-zinc-950 dark:text-white tracking-tight break-words min-h-[56px] sm:min-h-0 flex items-center sm:block">
        {t('hero.title')}
      </h1>

      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl min-h-[92px] sm:min-h-0">
        {t('hero.description')}
      </p>

      <div className="flex items-center gap-3 pt-1 max-w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] sm:text-xs font-mono text-zinc-700 dark:text-zinc-300 max-w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span className="truncate sm:whitespace-normal">{t('hero.stat')}</span>
        </div>
      </div>
    </section>
  );
}
