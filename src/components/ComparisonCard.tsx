import React, { useState, ReactNode } from 'react';
import { Eye, LockKeyhole, Copy, Check, Code2, Layers, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { tokensToCssVariables, tokensToTailwind } from '../utils/tokens';

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
  onInspect?: () => void;
}

type CardView = 'preview' | 'code' | 'tokens';
type TokenFormat = 'json' | 'css' | 'tailwind';

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
  onInspect,
}) => {
  const { t } = useLanguage();
  const [view, setView] = useState<CardView>('preview');
  const [tokenFormat, setTokenFormat] = useState<TokenFormat>('json');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setCopied(true);
    setTimeout(() => {
      setToastMessage(null);
      setCopied(false);
    }, 2000);
  };

  const getExportedTokensText = () => {
    if (!designTokens) return '';
    if (tokenFormat === 'css') return tokensToCssVariables(title, designTokens);
    if (tokenFormat === 'tailwind') return tokensToTailwind(title, designTokens);
    return JSON.stringify(designTokens, null, 2);
  };

  const handleCopyCode = () => {
    if (!codeContent) return;
    navigator.clipboard.writeText(codeContent);
    showToast(t('grid.copiedCode'));
  };

  const handleCopyTokens = () => {
    const text = getExportedTokensText();
    if (!text) return;
    navigator.clipboard.writeText(text);
    showToast(t('grid.copiedTokens'));
  };

  return (
    <div className="bg-white dark:bg-[#101114] border border-zinc-200/90 dark:border-zinc-800/80 rounded-xl overflow-hidden flex flex-col linear-card relative transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 pointer-events-none"
          >
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="px-3.5 py-2.5 border-b border-zinc-200/90 dark:border-zinc-800/80 flex justify-between items-center bg-zinc-50/70 dark:bg-[#121316]/90">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <h3 className="text-xs font-bold text-zinc-900 dark:text-white truncate tracking-tight">{title}</h3>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {/* View Switcher: UI / Code / Tokens */}
          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-md border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setView('preview')}
              className={`px-2 py-0.5 text-[11px] rounded transition-all cursor-pointer ${
                view === 'preview'
                  ? 'bg-white dark:bg-zinc-800 shadow-2xs text-zinc-950 dark:text-white font-semibold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {t('grid.tabUi')}
            </button>

            {codeContent && (
              <button
                onClick={() => setView('code')}
                className={`px-2 py-0.5 text-[11px] rounded transition-all cursor-pointer ${
                  view === 'code'
                    ? 'bg-white dark:bg-zinc-800 shadow-2xs text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t('grid.tabCode')}
              </button>
            )}

            {designTokens && (
              <button
                onClick={() => setView('tokens')}
                className={`px-2 py-0.5 text-[11px] rounded transition-all cursor-pointer ${
                  view === 'tokens'
                    ? 'bg-white dark:bg-zinc-800 shadow-2xs text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t('grid.tabTokens')}
              </button>
            )}
          </div>

          {/* Deep-Dive Inspect Button */}
          {onInspect && (
            <button
              onClick={onInspect}
              className="px-2 py-1 bg-white dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors flex items-center gap-1 text-[11px] font-medium cursor-pointer"
              title={t('grid.inspect')}
            >
              <Maximize2 className="w-3 h-3 text-[#5e6ad2]" />
              <span className="hidden lg:inline">{t('grid.inspect')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-header for Token format switcher */}
      {view === 'tokens' && (
        <div className="bg-[#0c0d0e] px-3 py-1.5 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {(['json', 'css', 'tailwind'] as TokenFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setTokenFormat(fmt)}
                className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded font-mono transition-colors cursor-pointer ${
                  tokenFormat === fmt
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopyTokens}
            className="flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white transition-colors p-1 cursor-pointer"
            title={t('grid.copyJson')}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline font-mono text-[10px]">{t('grid.copyJson')}</span>
          </button>
        </div>
      )}

      {/* Content Area with Workbench Grid */}
      <div className="border-b border-zinc-200/90 dark:border-zinc-800/80 h-[205px] flex items-center justify-center bg-zinc-50/60 dark:bg-[#0c0d0f] workbench-grid relative">
        {view === 'preview' ? (
          <div className="p-6 w-full h-full flex justify-center items-center overflow-auto">
            {previewContent}
          </div>
        ) : view === 'code' ? (
          <div className="p-4 w-full h-full bg-[#0c0d0e] text-zinc-300 font-mono text-[12px] overflow-auto relative">
            <button
              onClick={handleCopyCode}
              className="absolute top-3 right-3 p-1.5 bg-white/10 hover:bg-white/20 text-white rounded transition-colors flex items-center gap-1.5 z-10 cursor-pointer"
              title={t('grid.copyCode')}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span className="text-[10px] hidden sm:inline">{t('grid.copyCode')}</span>
            </button>
            <pre className="!m-0 p-0 !bg-transparent text-[#9cdcfe] leading-relaxed">
              <code>{codeContent}</code>
            </pre>
          </div>
        ) : (
          <div className="p-4 w-full h-full bg-[#0c0d0e] text-zinc-300 font-mono text-[11px] sm:text-[12px] overflow-auto relative">
            <pre className="!m-0 p-0 !bg-transparent text-[#ce9178] leading-relaxed">
              <code>{getExportedTokensText()}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col gap-3.5">
        <div>
          <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">{logicTitle}</h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{logicDescription}</p>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/70 p-2.5 rounded-lg flex items-start gap-2">
          <Eye className="text-zinc-700 dark:text-zinc-300 w-4 h-4 mt-0.5 shrink-0" />
          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-snug">{accessibilityText}</p>
        </div>

        <div className="relative pt-1">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
            {t('grid.bestpractices')}
          </h4>
          <ul className="list-disc pl-4 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 opacity-40 blur-[2px]">
            {bestPractices.map((practice, index) => (
              <li key={index}>{practice}</li>
            ))}
          </ul>
          <div className="absolute inset-0 flex justify-center items-center z-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
            >
              <LockKeyhole className="w-3.5 h-3.5" /> {t('pro.cta')}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;
