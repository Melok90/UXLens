import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="max-w-3xl">
      <h1 className="text-[48px] leading-[1.1] font-bold text-black dark:text-white mb-4 tracking-tight">
        {t('hero.title')}
      </h1>
      <p className="text-lg text-[#5d5f5f] dark:text-neutral-300 mb-3 leading-relaxed">
        {t('hero.description')}
      </p>
      <p className="text-sm font-semibold text-accent-blue dark:text-blue-400 tracking-wide">
        {t('hero.stat')}
      </p>
    </section>
  );
}
