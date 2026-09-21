import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-zinc-50/60 dark:bg-[#08090a] border-t border-zinc-200/80 dark:border-zinc-850 mt-auto transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-10 py-8 max-w-[1280px] mx-auto gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-[10px]">
            UX
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            {t('footer.rights')}
          </p>
        </div>
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
    <a href={href} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
      {label}
    </a>
  );
}
