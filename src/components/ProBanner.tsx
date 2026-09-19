import { LockKeyhole } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Раньше каждая из шести карточек несла собственный размытый блок с одинаковым
 * CTA — самый заметный элемент экрана, до того как пользователь успел понять
 * продукт. Один ненавязчивый баннер вместо шести навязчивых.
 */
export default function ProBanner() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#f9f9f9] border border-[#cfc4c5] rounded-xl p-5 w-full min-w-0">
      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
        <LockKeyhole className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <h3 className="text-sm font-semibold text-black">{t('pro.title')}</h3>
        <p className="text-sm text-[#5d5f5f]">{t('pro.description')}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg shrink-0 hover:bg-interactive-charcoal transition-colors"
      >
        {t('pro.cta')}
      </motion.button>
    </div>
  );
}
