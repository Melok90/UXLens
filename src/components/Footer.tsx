import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface dark:bg-[#0e0e10] border-t border-[#cfc4c5] dark:border-neutral-800 mt-auto transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-10 py-10 max-w-[1280px] mx-auto">
        <p className="text-sm text-black dark:text-white mb-4 md:mb-0">
          {t('footer.rights')}
        </p>
        <nav className="flex items-center gap-6">
          <FooterLink href="#" label={t('footer.changelog')} />
          <FooterLink href="#" label={t('footer.privacy')} />
          <FooterLink href="#" label={t('footer.support')} />
        </nav>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="text-sm text-[#A1A1A1] dark:text-neutral-400 hover:text-black dark:hover:text-white hover:underline transition-all">
      {label}
    </a>
  );
}
