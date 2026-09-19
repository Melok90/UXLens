import React, { useState, ReactNode } from 'react';
import { Eye, Copy, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface ComparisonCardProps {
  title: string;
  icon: React.ReactNode;
  previewType: 'button' | 'code';
  previewContent?: ReactNode;
  codeContent?: string;
  logicTitle: string;
  logicDescription: string;
  accessibilityText: string;
  bestPractices: string[];
  designTokens?: Record<string, any>;
  /** Управляется извне (ComparisonGrid) одним переключателем на все карточки —
   * раньше каждая карточка разворачивалась независимо, и сетка «разъезжалась»:
   * при сравнении шести систем нужно, чтобы они либо все были свёрнуты, либо
   * все развёрнуты, иначе высоты строк скачут и сравнивать неудобно. */
  detailsOpen: boolean;
  onToggleDetails: () => void;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  icon,
  previewType: initialPreviewType,
  previewContent,
  codeContent,
  logicTitle,
  logicDescription,
  accessibilityText,
  bestPractices,
  designTokens,
  detailsOpen,
  onToggleDetails,
}) => {
  const { t } = useLanguage();
  const [view, setView] = useState<'preview' | 'tokens'>('preview');
  const [copiedTokens, setCopiedTokens] = useState(false);

  const handleCopyTokens = () => {
    if (designTokens) {
      navigator.clipboard.writeText(JSON.stringify(designTokens, null, 2));
      setCopiedTokens(true);
      setTimeout(() => setCopiedTokens(false), 2000);
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-[#cfc4c5] rounded-xl overflow-hidden flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-3 border-b border-[#cfc4c5] flex justify-between items-center bg-[#f9f9f9]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <h3 className="text-sm font-bold text-black truncate">{title}</h3>
        </div>
        <div className="flex bg-surface-container-low p-0.5 rounded-md border border-[#cfc4c5] ml-2 shrink-0">
          <button
            onClick={() => setView('preview')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-sm transition-all sm:text-[12px] sm:px-3 sm:py-1 ${view === 'preview' ? 'bg-white shadow-sm text-black' : 'text-[#5d5f5f] hover:text-black'}`}
          >
            UI
          </button>
          {designTokens && (
            <button
              onClick={() => setView('tokens')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-sm transition-all sm:text-[12px] sm:px-3 sm:py-1 ${view === 'tokens' ? 'bg-white shadow-sm text-black' : 'text-[#5d5f5f] hover:text-black'}`}
            >
              JSON
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="border-b border-[#cfc4c5] h-[200px] flex items-center justify-center bg-surface-container relative">
        {view === 'preview' ? (
          <div className="p-6 w-full h-full flex justify-center items-center overflow-auto">
            {previewContent}
          </div>
        ) : (
          <div className="p-4 w-full h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[12px] sm:text-[13px] overflow-auto relative">
            <button
              onClick={handleCopyTokens}
              className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded transition-colors"
              title={t('grid.copyJson')}
            >
              {copiedTokens ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <pre className="!m-0 p-0 !bg-transparent"><code className="language-json">{JSON.stringify(designTokens, null, 2)}</code></pre>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col">
        <button
          onClick={onToggleDetails}
          className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-black hover:bg-surface-container-low transition-colors"
        >
          {logicTitle}
          <motion.span animate={{ rotate: detailsOpen ? 180 : 0 }} transition={{ duration: 0.15 }}>
            <ChevronDown className="w-4 h-4 text-[#5d5f5f]" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {detailsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 flex flex-col gap-4">
                <p className="text-[15px] text-[#5d5f5f] leading-relaxed">{logicDescription}</p>

                <div className="bg-[#f3f4f4] p-3 rounded-lg flex items-start gap-2">
                  <Eye className="text-black w-[18px] h-[18px] mt-[2px] shrink-0" />
                  <p className="text-[13px] text-black">{accessibilityText}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">{t('grid.bestpractices')}</h4>
                  <ul className="list-disc pl-5 text-[15px] text-[#5d5f5f] space-y-1">
                    {bestPractices.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ComparisonCard;
