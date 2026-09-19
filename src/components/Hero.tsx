import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="max-w-3xl">
      <h1 className="text-[48px] leading-[1.1] font-semibold text-black mb-4 tracking-tight">
        {t('hero.title')}
      </h1>
      <p className="text-lg text-[#5d5f5f] mb-3">
        {t('hero.description')}
      </p>
      <p className="text-sm font-medium text-accent-blue tracking-wide">
        {t('hero.stat')}
      </p>
    </section>
  );
}
