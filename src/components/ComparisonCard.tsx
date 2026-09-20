import React, { useState, ReactNode } from 'react';
import { Eye, LockKeyhole, Copy, Check, Code2, Layers } from 'lucide-react';
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
    <div className="bg-surface-container-lowest border border-[#cfc4c5] rounded-xl overflow-hidden flex flex-col shadow-sm relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 pointer-events-none"
          >
            <Check className="w-3.5 h-3.5 text-green-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-3 border-b border-[#cfc4c5] flex justify-between items-center bg-[#f9f9f9]">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <h3 className="text-sm font-bold text-black truncate">{title}</h3>
        </div>

        {/* View Switcher: UI / Code / Tokens */}
        <div className="flex bg-surface-container-low p-0.5 rounded-md border border-[#cfc4c5] ml-2 shrink-0">
          <button
            onClick={() => setView('preview')}
            className={`px-2 py-1 text-[11px] font-medium rounded-sm transition-all sm:text-[12px] sm:px-2.5 ${
              view === 'preview'
                ? 'bg-white shadow-xs text-black font-semibold'
                : 'text-[#5d5f5f] hover:text-black'
            }`}
          >
            {t('grid.tabUi')}
          </button>

          {codeContent && (
            <button
              onClick={() => setView('code')}
              className={`px-2 py-1 text-[11px] font-medium rounded-sm transition-all sm:text-[12px] sm:px-2.5 ${
                view === 'code'
                  ? 'bg-white shadow-xs text-black font-semibold'
                  : 'text-[#5d5f5f] hover:text-black'
              }`}
            >
              {t('grid.tabCode')}
            </button>
          )}

          {designTokens && (
            <button
              onClick={() => setView('tokens')}
              className={`px-2 py-1 text-[11px] font-medium rounded-sm transition-all sm:text-[12px] sm:px-2.5 ${
                view === 'tokens'
                  ? 'bg-white shadow-xs text-black font-semibold'
                  : 'text-[#5d5f5f] hover:text-black'
              }`}
            >
              {t('grid.tabTokens')}
            </button>
          )}
        </div>
      </div>

      {/* Sub-header for Token format switcher */}
      {view === 'tokens' && (
        <div className="bg-[#2d2d2d] px-3 py-1.5 border-b border-[#3d3d3d] flex items-center justify-between">
          <div className="flex items-center gap-1">
            {(['json', 'css', 'tailwind'] as TokenFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setTokenFormat(fmt)}
                className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded font-mono transition-colors ${
                  tokenFormat === fmt
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopyTokens}
            className="flex items-center gap-1 text-[11px] text-gray-300 hover:text-white transition-colors p-1"
            title={t('grid.copyJson')}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{t('grid.copyJson')}</span>
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="border-b border-[#cfc4c5] h-[200px] flex items-center justify-center bg-surface-container relative">
        {view === 'preview' ? (
          <div className="p-6 w-full h-full flex justify-center items-center overflow-auto">
            {previewContent}
          </div>
        ) : view === 'code' ? (
          <div className="p-4 w-full h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[12px] sm:text-[13px] overflow-auto relative">
            <button
              onClick={handleCopyCode}
              className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded transition-colors flex items-center gap-1.5 z-10"
              title={t('grid.copyCode')}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
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
          <div className="p-4 w-full h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px] sm:text-[12px] overflow-auto relative">
            <pre className="!m-0 p-0 !bg-transparent text-[#ce9178] leading-relaxed">
              <code>{getExportedTokensText()}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col gap-4">
        <div>
          <h4 className="text-sm font-semibold text-black mb-1">{logicTitle}</h4>
          <p className="text-[15px] text-[#5d5f5f] leading-relaxed">{logicDescription}</p>
        </div>

        <div className="bg-[#f3f4f4] p-3 rounded-lg flex items-start gap-2">
          <Eye className="text-black w-[18px] h-[18px] mt-[2px] shrink-0" />
          <p className="text-[13px] text-black">{accessibilityText}</p>
        </div>

        <div className="relative">
          <h4 className="text-sm font-semibold text-black mb-1">{t('grid.bestpractices')}</h4>
          <ul className="list-disc pl-5 text-[15px] text-[#5d5f5f] space-y-1 opacity-40 blur-[2px]">
            {bestPractices.map((practice, index) => (
              <li key={index}>{practice}</li>
            ))}
          </ul>
          <div className="absolute inset-0 flex justify-center items-center z-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black text-white text-sm font-medium px-4 py-2 rounded flex items-center gap-2 hover:bg-interactive-charcoal transition-colors shadow-lg cursor-pointer"
            >
              <LockKeyhole className="w-4 h-4" /> {t('pro.cta')}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;
