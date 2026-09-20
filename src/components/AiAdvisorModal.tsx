import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Settings,
  Key,
  Layers,
  ShieldCheck,
  Zap,
  ArrowLeftRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  AdvisorResult,
  getDesignSystemRecommendation,
  getStoredApiKey,
  saveStoredApiKey,
} from '../utils/geminiAdvisor';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompareSystems?: (systemA: string, systemB: string) => void;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  onCompareSystems,
}) => {
  const { t, language } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
    }
  }, [isOpen]);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickPresets =
    language === 'ru'
      ? [
          { label: '🛒 E-commerce магазин', text: 'Интернет-магазин одежды с каталогом товаров, корзиной и фильтрами по размерам' },
          { label: '📊 B2B CRM и таблицы', text: 'Корпоративная CRM-система со сложными таблицами клиентов, воронками продаж и сделками' },
          { label: '📱 iOS мобильное приложение', text: 'Мобильное приложение для заказа еды и отслеживания курьеров на карте под iOS' },
          { label: '🛠️ Cloud & DevOps консоль', text: 'Панель управления кластерами серверов, метриками нагрузки CPU и логами' },
          { label: '💳 Финтех и банковский сервис', text: 'Личный кабинет малого бизнеса с выписками по счетам, графиками платежей и налогами' },
        ]
      : [
          { label: '🛒 E-commerce Store', text: 'Online clothing store with large product catalogs, cart checkout, and faceted filters' },
          { label: '📊 B2B CRM & Data Tables', text: 'Enterprise CRM dashboard with dense data grids, pipeline charts, and lead tracking' },
          { label: '📱 iOS Consumer App', text: 'Mobile consumer delivery app featuring live maps, touch-first cards, and checkout' },
          { label: '🛠️ Cloud & DevOps Console', text: 'Infrastructure dashboard for server clusters, CPU telemetry graphs, and logs' },
          { label: '💳 FinTech Dashboard', text: 'Commercial banking workspace with wire transactions, balance statements, and tax tools' },
        ];

  const handleRecommend = async (customPrompt?: string) => {
    const targetPrompt = (customPrompt || prompt).trim();
    if (!targetPrompt) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await getDesignSystemRecommendation(targetPrompt, language as 'ru' | 'en');
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    saveStoredApiKey(apiKey);
    setApiKeySaved(true);
    setTimeout(() => setApiKeySaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="w-full max-w-3xl bg-surface-container-lowest dark:bg-[#16161a] border border-[#cfc4c5] dark:border-neutral-700 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto"
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-[#cfc4c5] dark:border-neutral-700 flex items-center justify-between bg-surface-container-low dark:bg-neutral-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-blue to-purple-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-black dark:text-white leading-tight">
                  {language === 'ru' ? 'AI UX Советник' : 'AI Design System Advisor'}
                </h2>
                <span className="text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
                  Gemini GenAI
                </span>
              </div>
              <p className="text-xs text-[#5d5f5f] dark:text-neutral-400">
                {language === 'ru'
                  ? 'Интеллектуальный подбор дизайн-системы под стек и задачи вашего продукта'
                  : 'Tailored architectural design system matching powered by Google Gemini'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title={language === 'ru' ? 'Настройки API ключа' : 'API Key Settings'}
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title={language === 'ru' ? 'Закрыть (Esc)' : 'Close (Esc)'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          {/* Collapsible API Key Settings */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden bg-surface-container-low dark:bg-neutral-900 border border-[#cfc4c5] dark:border-neutral-700 rounded-xl p-4 space-y-2 text-xs"
              >
                <div className="flex items-center gap-2 font-bold text-black dark:text-white">
                  <Key className="w-4 h-4 text-accent-blue" />
                  <span>{language === 'ru' ? 'Google Gemini API Ключ' : 'Google Gemini API Key'}</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {language === 'ru'
                    ? 'Ключ сохраняется локально в вашем браузере. Если ключ не задан, сервис использует встроенный эвристический экспертный движок.'
                    : 'Your key is saved locally in browser storage. If omitted, the advisor uses the built-in domain heuristic engine.'}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="flex-1 bg-surface-container-lowest dark:bg-neutral-800 border border-[#cfc4c5] dark:border-neutral-700 rounded-lg px-3 py-1.5 font-mono text-xs text-black dark:text-white outline-none focus:border-accent-blue"
                  />
                  <button
                    onClick={handleSaveApiKey}
                    className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-lg hover:opacity-85 transition-opacity flex items-center gap-1 cursor-pointer"
                  >
                    {apiKeySaved ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : null}
                    <span>{language === 'ru' ? 'Сохранить' : 'Save'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prompt Input Form */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
              {language === 'ru' ? 'Опишите ваш проект или продукт:' : 'Describe your project or product:'}
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder={
                  language === 'ru'
                    ? 'Например: SaaS-сервис управления закупками со сложными таблицами, фильтрами и быстрой клавиатурной навигацией...'
                    : 'E.g., High-frequency trading tool with dark mode, dense data grids, and keyboard navigation...'
                }
                className="w-full bg-surface-container-lowest dark:bg-neutral-900 border border-[#cfc4c5] dark:border-neutral-700 rounded-xl p-3 text-sm text-black dark:text-white placeholder:text-neutral-400 outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all resize-none"
              />
              <button
                onClick={() => handleRecommend()}
                disabled={loading || !prompt.trim()}
                className="absolute bottom-3 right-3 px-4 py-1.5 bg-accent-blue hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{language === 'ru' ? 'Подобрать систему' : 'Analyze & Match'}</span>
              </button>
            </div>

            {/* Quick Scenario Presets */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                {language === 'ru' ? 'Быстрые сценарии:' : 'Quick archetypes:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setPrompt(preset.text);
                      handleRecommend(preset.text);
                    }}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-surface-container-low dark:bg-neutral-800 border border-[#cfc4c5] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-surface-container dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Animation */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-10 h-10 rounded-full border-3 border-accent-blue/20 border-t-accent-blue animate-spin" />
              <p className="text-sm font-semibold text-black dark:text-white">
                {language === 'ru'
                  ? 'Анализируем паттерны и сопоставляем гайдлайны...'
                  : 'Evaluating architectural guidelines and component specs...'}
              </p>
              <span className="text-xs text-neutral-400">
                Google Gemini 2.5 Flash
              </span>
            </div>
          )}

          {/* Results Display */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 pt-2"
              >
                {/* Primary System Winner Card */}
                <div className="border-2 border-accent-blue/40 bg-gradient-to-br from-accent-blue/[0.04] to-purple-500/[0.04] rounded-2xl p-5 sm:p-6 space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-accent-blue animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-accent-blue">
                        {language === 'ru' ? 'Рекомендованная дизайн-система' : 'Top Recommendation'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-accent-blue text-white text-xs font-bold shadow-xs">
                        {result.matchScore}% {language === 'ru' ? 'совпадение' : 'Match'}
                      </span>
                      {result.isAiGenerated && (
                        <span className="text-[10px] font-mono text-neutral-400 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">
                          AI Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-black dark:text-white tracking-tight">
                      {result.primarySystem}
                    </h3>
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mt-1">
                      {result.headline}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {result.rationale}
                  </p>

                  {/* Component Strategy Highlights */}
                  {result.componentStrategies && result.componentStrategies.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-bold text-black dark:text-white block">
                        {language === 'ru' ? 'Архитектурная стратегия компонентов:' : 'Component Architecture Strategy:'}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {result.componentStrategies.map((strat, i) => (
                          <div
                            key={i}
                            className="bg-white/70 dark:bg-neutral-800/80 border border-[#cfc4c5]/60 dark:border-neutral-700/60 rounded-xl p-3 text-xs space-y-1"
                          >
                            <span className="font-bold text-accent-blue dark:text-blue-400 block">
                              {strat.component}
                            </span>
                            <p className="text-neutral-600 dark:text-neutral-300 text-[11px] leading-snug">
                              {strat.recommendation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Token & Theming Guidance */}
                  {result.tokenGuidance && (
                    <div className="p-3 bg-black/[0.03] dark:bg-white/[0.04] rounded-xl border border-black/5 dark:border-white/5 text-xs text-neutral-700 dark:text-neutral-300">
                      <span className="font-bold mr-1">
                        {language === 'ru' ? 'Совет по токенам:' : 'Design Tokens Tip:'}
                      </span>
                      <span>{result.tokenGuidance}</span>
                    </div>
                  )}
                </div>

                {/* Alternative Runner-up Card */}
                {result.alternativeSystem && (
                  <div className="border border-[#cfc4c5] dark:border-neutral-700 rounded-xl p-4 bg-surface-container-low dark:bg-neutral-900 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                          {language === 'ru' ? 'Ближайшая альтернатива:' : 'Runner-up Alternative:'}
                        </span>
                        <span className="font-bold text-black dark:text-white text-sm">
                          {result.alternativeSystem}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-neutral-500 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full">
                        {result.alternativeMatchScore}% Match
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {result.alternativeComparison}
                    </p>
                  </div>
                )}

                {/* Direct Compare Action */}
                {onCompareSystems && result.alternativeSystem && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        onCompareSystems(result.primarySystem, result.alternativeSystem);
                        onClose();
                      }}
                      className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold text-xs rounded-xl shadow-md hover:opacity-85 transition-opacity flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5 text-accent-blue" />
                      <span>
                        {language === 'ru'
                          ? `Сравнить 1-на-1: ${result.primarySystem} vs ${result.alternativeSystem}`
                          : `Compare 1v1: ${result.primarySystem} vs ${result.alternativeSystem}`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-surface-container-low dark:bg-neutral-900 border-t border-[#cfc4c5] dark:border-neutral-700 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2 text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-accent-blue" />
            <span>
              {language === 'ru'
                ? 'Рекомендации базируются на анализе 7 дизайн-систем'
                : 'Recommendations evaluated across 7 production design systems'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-black dark:text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {language === 'ru' ? 'Закрыть' : 'Close'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AiAdvisorModal;
