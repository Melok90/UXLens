import React, { useState, useEffect, ReactNode } from 'react';
import {
  X,
  Ruler,
  Eye,
  Sparkles,
  ArrowLeftRight,
  Check,
  Copy,
  Layers,
  ShieldCheck,
  Activity,
  Maximize2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { ComponentType, ComponentVariant, ComponentState } from '../App';
import { COMPONENT_ANATOMY, SystemAnatomySpec } from '../data/componentAnatomy';

export interface CardPreviewData {
  title: string;
  icon: ReactNode;
  previewContent?: ReactNode;
  codeContent?: string;
  logicTitle?: string;
  logicDescription?: string;
  accessibilityText?: string;
  bestPractices?: string[];
  designTokens?: Record<string, any>;
}

interface ComponentInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSystem?: string;
  activeComponent: ComponentType;
  activeVariant: ComponentVariant;
  activeState: ComponentState;
  allCards: CardPreviewData[];
}

type ModalTab = 'anatomy' | 'compare';

export const ComponentInspectorModal: React.FC<ComponentInspectorModalProps> = ({
  isOpen,
  onClose,
  initialSystem = 'Material Design 3',
  activeComponent,
  activeVariant,
  activeState,
  allCards,
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<ModalTab>('anatomy');
  const [selectedSystem, setSelectedSystem] = useState<string>(initialSystem);
  const [compareSystemA, setCompareSystemA] = useState<string>(initialSystem);
  const [compareSystemB, setCompareSystemB] = useState<string>('Apple HIG');
  const [showGuides, setShowGuides] = useState(true);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Sync selectedSystem when initialSystem changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSystem(initialSystem);
      setCompareSystemA(initialSystem);
      const other = initialSystem === 'Apple HIG' ? 'Material Design 3' : 'Apple HIG';
      setCompareSystemB(other);
    }
  }, [isOpen, initialSystem]);

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

  // List of all known systems for this component
  const anatomyMap = COMPONENT_ANATOMY[activeComponent] || {};
  const availableSystems = Object.keys(anatomyMap);

  // Fallback spec if exact system not in map
  const activeSpec: SystemAnatomySpec =
    anatomyMap[selectedSystem] ||
    anatomyMap['Material Design 3'] || {
      system: selectedSystem,
      creator: 'Generic',
      platform: 'Web',
      height: '40px',
      padding: '8px 16px',
      borderRadius: '8px',
      typography: { font: 'sans-serif', size: '14px', weight: '500', lineHeight: '20px' },
      elevation: 'None',
      touchTarget: '40×40px',
      wcag: { ratio: '4.5:1', level: 'AA', notesRu: 'Соответствует стандарту WCAG AA', notesEn: 'Compliant with WCAG AA' },
      motion: { easing: 'ease', duration: '150ms', physics: 'Standard transition' },
      philosophyRu: 'Сбалансированное поведение компонента.',
      philosophyEn: 'Balanced component behavior.',
      highlightsRu: [{ label: 'Стандарт', value: 'Web standard' }],
      highlightsEn: [{ label: 'Standard', value: 'Web standard' }],
      tokens: [],
    };

  const specA = anatomyMap[compareSystemA] || activeSpec;
  const specB = anatomyMap[compareSystemB] || anatomyMap['Apple HIG'] || activeSpec;

  // Find preview contents from cards
  const getCardPreview = (sysName: string) => {
    const card = allCards.find(
      (c) => c.title.toLowerCase() === sysName.toLowerCase()
    );
    return card?.previewContent;
  };

  const handleCopyToken = (val: string, name: string) => {
    navigator.clipboard.writeText(val);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="w-full max-w-5xl bg-surface-container-lowest border border-[#cfc4c5] dark:border-neutral-700 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto"
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-[#cfc4c5] dark:border-neutral-700 flex items-center justify-between bg-surface-container-low dark:bg-neutral-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue font-bold">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-black dark:text-white leading-tight capitalize">
                  {activeComponent}
                </h2>
                <span className="text-[11px] font-medium bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-300">
                  {activeVariant}
                </span>
                <span className="text-[11px] font-medium bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded">
                  {activeState}
                </span>
              </div>
              <p className="text-xs text-[#5d5f5f] dark:text-neutral-400">
                {language === 'ru'
                  ? 'Глубокий анализ параметров, отступов и сравнение с другими дизайн-системами'
                  : 'Deep inspection of geometry, box model, tokens, and 1-on-1 comparator'}
              </p>
            </div>
          </div>

          {/* Tab Switcher & Close */}
          <div className="flex items-center gap-3">
            <div className="flex bg-surface-container dark:bg-neutral-800 p-1 rounded-lg border border-[#cfc4c5] dark:border-neutral-700">
              <button
                onClick={() => setActiveTab('anatomy')}
                className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
                  activeTab === 'anatomy'
                    ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-xs'
                    : 'text-[#5d5f5f] dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <Ruler className="w-3.5 h-3.5 text-accent-blue" />
                <span>{language === 'ru' ? 'Анатомия и метрики' : 'Anatomy & Metrics'}</span>
              </button>
              <button
                onClick={() => setActiveTab('compare')}
                className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
                  activeTab === 'compare'
                    ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-xs'
                    : 'text-[#5d5f5f] dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-500" />
                <span>{language === 'ru' ? 'Сравнение 1-на-1' : '1-on-1 Side-by-Side'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title={language === 'ru' ? 'Закрыть (Esc)' : 'Close (Esc)'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          {activeTab === 'anatomy' ? (
            /* ============================================================ */
            /* TAB 1: ANATOMY & METRICS                                     */
            /* ============================================================ */
            <div className="space-y-6">
              {/* System selector pill row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs font-semibold text-neutral-500 shrink-0 mr-1">
                  {language === 'ru' ? 'Система:' : 'System:'}
                </span>
                {availableSystems.map((sys) => (
                  <button
                    key={sys}
                    onClick={() => setSelectedSystem(sys)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      selectedSystem === sys
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm font-semibold'
                        : 'bg-surface-container-low dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-surface-container dark:hover:bg-neutral-700 border border-[#cfc4c5] dark:border-neutral-700'
                    }`}
                  >
                    {sys}
                  </button>
                ))}
              </div>

              {/* Anatomy Canvas with Box Model Guides */}
              <div className="bg-surface-container dark:bg-neutral-900 border border-[#cfc4c5] dark:border-neutral-700 rounded-xl overflow-hidden flex flex-col">
                <div className="px-4 py-2.5 bg-surface-container-low dark:bg-neutral-800/80 border-b border-[#cfc4c5] dark:border-neutral-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black dark:text-white">{activeSpec.system}</span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-500">{activeSpec.creator}</span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-500">{activeSpec.platform}</span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showGuides}
                      onChange={(e) => setShowGuides(e.target.checked)}
                      className="rounded text-accent-blue focus:ring-accent-blue cursor-pointer"
                    />
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">
                      {language === 'ru' ? '📐 Направляющие отступов' : '📐 Show Box Model'}
                    </span>
                  </label>
                </div>

                {/* Center preview stage */}
                <div className="min-h-[220px] p-8 flex flex-col items-center justify-center relative bg-radial from-transparent to-black/[0.02] dark:to-white/[0.02]">
                  {/* Outer Dimension badges if guides are enabled */}
                  {showGuides && (
                    <div className="flex items-center gap-4 mb-3 text-[11px] font-mono text-neutral-600 dark:text-neutral-300">
                      <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                        Padding: {activeSpec.padding}
                      </span>
                      <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">
                        Height: {activeSpec.height}
                      </span>
                      <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded">
                        Radius: {activeSpec.borderRadius}
                      </span>
                    </div>
                  )}

                  {/* Component Wrapper with Box Model Guides */}
                  <div
                    className={`relative p-2 rounded transition-all ${
                      showGuides
                        ? 'border border-dashed border-accent-blue/50 bg-accent-blue/[0.03]'
                        : ''
                    }`}
                  >
                    {/* Visual guide markers */}
                    {showGuides && (
                      <>
                        {/* Height callout bracket */}
                        <div className="absolute -left-10 top-0 bottom-0 flex items-center">
                          <div className="h-full border-l-2 border-accent-blue flex items-center relative">
                            <span className="absolute -left-1 text-[10px] font-mono text-accent-blue font-bold -rotate-90 origin-center whitespace-nowrap">
                              {activeSpec.height}
                            </span>
                          </div>
                        </div>

                        {/* Touch target outline indicator */}
                        <div
                          className="absolute inset-0 -m-3 border border-dotted border-amber-500/40 rounded pointer-events-none"
                          title={language === 'ru' ? 'Область касания (Touch Target)' : 'Touch Target area'}
                        />
                      </>
                    )}

                    {/* Live interactive component preview */}
                    <div className="relative z-10">
                      {getCardPreview(selectedSystem) || (
                        <div className="px-5 py-2.5 bg-accent-blue text-white rounded-lg font-medium text-sm shadow">
                          {activeComponent}
                        </div>
                      )}
                    </div>
                  </div>

                  {showGuides && (
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-4 font-mono">
                      {language === 'ru'
                        ? `Область касания: ${activeSpec.touchTarget}`
                        : `Touch target standard: ${activeSpec.touchTarget}`}
                    </span>
                  )}
                </div>
              </div>

              {/* Anatomy Metrics 6-Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Dimensions */}
                <div className="p-4 bg-surface-container-lowest border border-[#cfc4c5] dark:border-neutral-700 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-semibold uppercase tracking-wider">
                      {language === 'ru' ? 'Размеры и отступы' : 'Dimensions & Padding'}
                    </span>
                    <Ruler className="w-3.5 h-3.5 text-accent-blue" />
                  </div>
                  <div className="text-lg font-bold text-black dark:text-white">
                    {activeSpec.height}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {language === 'ru' ? 'Внутренний отступ:' : 'Padding:'}{' '}
                    <span className="font-semibold font-mono text-black dark:text-white">
                      {activeSpec.padding}
                    </span>
                  </p>
                </div>

                {/* 2. Shape & Radius */}
                <div className="p-4 bg-surface-container-lowest border border-[#cfc4c5] dark:border-neutral-700 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-semibold uppercase tracking-wider">
                      {language === 'ru' ? 'Скругление углов' : 'Corner Radius'}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  </div>
                  <div className="text-lg font-bold text-black dark:text-white">
                    {activeSpec.borderRadius}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {language === 'ru' ? 'Глубина тени:' : 'Elevation:'}{' '}
                    <span className="font-medium text-black dark:text-white">
                      {activeSpec.elevation}
                    </span>
                  </p>
                </div>

                {/* 3. Typography */}
                <div className="p-4 bg-surface-container-lowest border border-[#cfc4c5] dark:border-neutral-700 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-semibold uppercase tracking-wider">
                      {language === 'ru' ? 'Типографика' : 'Typography'}
                    </span>
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  <div className="text-sm font-bold text-black dark:text-white truncate">
                    {activeSpec.typography.font}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                    {activeSpec.typography.size} • {activeSpec.typography.weight} • LH:{' '}
                    {activeSpec.typography.lineHeight}
                  </p>
                </div>

                {/* 4. Accessibility */}
                <div className="p-4 bg-surface-container-lowest border border-[#cfc4c5] dark:border-neutral-700 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-semibold uppercase tracking-wider">
                      {language === 'ru' ? 'Доступность WCAG' : 'WCAG Accessibility'}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-black dark:text-white">
                      {activeSpec.wcag.ratio}
                    </span>
                    <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20">
                      WCAG {activeSpec.wcag.level}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                    {language === 'ru' ? activeSpec.wcag.notesRu : activeSpec.wcag.notesEn}
                  </p>
                </div>

                {/* 5. Motion */}
                <div className="p-4 bg-surface-container-lowest border border-[#cfc4c5] dark:border-neutral-700 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-semibold uppercase tracking-wider">
                      {language === 'ru' ? 'Анимация и отклик' : 'Motion & Physics'}
                    </span>
                    <Activity className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-lg font-bold text-black dark:text-white">
                    {activeSpec.motion.duration}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono truncate">
                    {activeSpec.motion.physics}
                  </p>
                </div>

                {/* 6. Philosophy */}
                <div className="p-4 bg-surface-container-lowest border border-[#cfc4c5] dark:border-neutral-700 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-semibold uppercase tracking-wider">
                      {language === 'ru' ? 'Философия системы' : 'Design Philosophy'}
                    </span>
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-3">
                    {language === 'ru' ? activeSpec.philosophyRu : activeSpec.philosophyEn}
                  </p>
                </div>
              </div>

              {/* Design Tokens Table */}
              {activeSpec.tokens && activeSpec.tokens.length > 0 && (
                <div className="border border-[#cfc4c5] dark:border-neutral-700 rounded-xl overflow-hidden bg-surface-container-lowest">
                  <div className="px-4 py-3 bg-surface-container-low dark:bg-neutral-800/80 border-b border-[#cfc4c5] dark:border-neutral-700 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                      {language === 'ru' ? 'Спецификация токенов' : 'Token Specifications'}
                    </h3>
                    <span className="text-[11px] text-neutral-500">
                      {activeSpec.tokens.length}{' '}
                      {language === 'ru' ? 'токенов определено' : 'tokens defined'}
                    </span>
                  </div>

                  <div className="divide-y divide-[#cfc4c5]/60 dark:divide-neutral-700/60">
                    {activeSpec.tokens.map((tok) => (
                      <div
                        key={tok.name}
                        className="px-4 py-2.5 flex items-center justify-between text-xs hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="font-mono font-semibold text-accent-blue dark:text-blue-400">
                            {tok.name}
                          </div>
                          <div className="text-[11px] text-neutral-500">{tok.role}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <code className="font-mono bg-surface-container dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-800 dark:text-neutral-200">
                            {tok.value}
                          </code>
                          <button
                            onClick={() => handleCopyToken(tok.value, tok.name)}
                            className="p-1 text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                            title={language === 'ru' ? 'Скопировать значение' : 'Copy value'}
                          >
                            {copiedToken === tok.name ? (
                              <Check className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ============================================================ */
            /* TAB 2: 1-ON-1 SIDE-BY-SIDE COMPARATOR                         */
            /* ============================================================ */
            <div className="space-y-6">
              {/* Selectors for System A and System B */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container-low dark:bg-neutral-900 p-4 rounded-xl border border-[#cfc4c5] dark:border-neutral-700">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    {language === 'ru' ? 'Система A (Слева):' : 'System A (Left):'}
                  </label>
                  <select
                    value={compareSystemA}
                    onChange={(e) => setCompareSystemA(e.target.value)}
                    className="w-full bg-surface-container-lowest dark:bg-neutral-800 border border-[#cfc4c5] dark:border-neutral-700 rounded-lg px-3 py-2 text-xs font-semibold text-black dark:text-white outline-none focus:border-accent-blue"
                  >
                    {availableSystems.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    {language === 'ru' ? 'Система B (Справа):' : 'System B (Right):'}
                  </label>
                  <select
                    value={compareSystemB}
                    onChange={(e) => setCompareSystemB(e.target.value)}
                    className="w-full bg-surface-container-lowest dark:bg-neutral-800 border border-[#cfc4c5] dark:border-neutral-700 rounded-lg px-3 py-2 text-xs font-semibold text-black dark:text-white outline-none focus:border-accent-blue"
                  >
                    {availableSystems.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Side-by-side live component canvases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column A */}
                <div className="border border-[#cfc4c5] dark:border-neutral-700 rounded-xl overflow-hidden bg-surface-container-lowest flex flex-col">
                  <div className="px-4 py-3 bg-surface-container-low dark:bg-neutral-800 border-b border-[#cfc4c5] dark:border-neutral-700 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-black dark:text-white leading-tight">
                        {specA.system}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {specA.creator} • {specA.platform}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono font-bold bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded">
                      {specA.height}
                    </span>
                  </div>

                  <div className="h-[180px] p-6 flex items-center justify-center bg-surface-container dark:bg-neutral-900/60 overflow-auto">
                    {getCardPreview(compareSystemA) || (
                      <div className="px-5 py-2.5 bg-accent-blue text-white rounded-lg font-medium text-sm shadow">
                        {activeComponent}
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2 border-t border-[#cfc4c5] dark:border-neutral-700 text-xs">
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {language === 'ru' ? specA.philosophyRu : specA.philosophyEn}
                    </p>
                  </div>
                </div>

                {/* Column B */}
                <div className="border border-[#cfc4c5] dark:border-neutral-700 rounded-xl overflow-hidden bg-surface-container-lowest flex flex-col">
                  <div className="px-4 py-3 bg-surface-container-low dark:bg-neutral-800 border-b border-[#cfc4c5] dark:border-neutral-700 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-black dark:text-white leading-tight">
                        {specB.system}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {specB.creator} • {specB.platform}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded">
                      {specB.height}
                    </span>
                  </div>

                  <div className="h-[180px] p-6 flex items-center justify-center bg-surface-container dark:bg-neutral-900/60 overflow-auto">
                    {getCardPreview(compareSystemB) || (
                      <div className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm shadow">
                        {activeComponent}
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2 border-t border-[#cfc4c5] dark:border-neutral-700 text-xs">
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {language === 'ru' ? specB.philosophyRu : specB.philosophyEn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Comparison Matrix Table */}
              <div className="border border-[#cfc4c5] dark:border-neutral-700 rounded-xl overflow-hidden bg-surface-container-lowest">
                <div className="px-4 py-3 bg-surface-container-low dark:bg-neutral-800/80 border-b border-[#cfc4c5] dark:border-neutral-700">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                    {language === 'ru'
                      ? 'Сравнительная матрица спецификаций'
                      : 'Side-by-Side Specification Matrix'}
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-surface-container-low/50 dark:bg-neutral-800/50 text-neutral-500 uppercase tracking-wider font-semibold border-b border-[#cfc4c5] dark:border-neutral-700">
                      <tr>
                        <th className="px-4 py-2.5 w-1/4">
                          {language === 'ru' ? 'Параметр' : 'Parameter'}
                        </th>
                        <th className="px-4 py-2.5 w-3/8 text-accent-blue font-bold">
                          {specA.system}
                        </th>
                        <th className="px-4 py-2.5 w-3/8 text-indigo-600 dark:text-indigo-400 font-bold">
                          {specB.system}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#cfc4c5]/60 dark:divide-neutral-700/60">
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-neutral-600 dark:text-neutral-400">
                          {language === 'ru' ? 'Высота (Height)' : 'Height'}
                        </td>
                        <td className="px-4 py-2.5 font-mono font-medium text-black dark:text-white">
                          {specA.height}
                        </td>
                        <td className="px-4 py-2.5 font-mono font-medium text-black dark:text-white">
                          {specB.height}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-neutral-600 dark:text-neutral-400">
                          {language === 'ru' ? 'Внутренние отступы' : 'Padding'}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-black dark:text-white">
                          {specA.padding}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-black dark:text-white">
                          {specB.padding}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-neutral-600 dark:text-neutral-400">
                          {language === 'ru' ? 'Радиус скругления' : 'Corner Radius'}
                        </td>
                        <td className="px-4 py-2.5 text-black dark:text-white font-medium">
                          {specA.borderRadius}
                        </td>
                        <td className="px-4 py-2.5 text-black dark:text-white font-medium">
                          {specB.borderRadius}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-neutral-600 dark:text-neutral-400">
                          {language === 'ru' ? 'Типографика' : 'Typography'}
                        </td>
                        <td className="px-4 py-2.5 text-black dark:text-white">
                          {specA.typography.font} ({specA.typography.size}, {specA.typography.weight})
                        </td>
                        <td className="px-4 py-2.5 text-black dark:text-white">
                          {specB.typography.font} ({specB.typography.size}, {specB.typography.weight})
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-neutral-600 dark:text-neutral-400">
                          {language === 'ru' ? 'Тач-таргет (WCAG)' : 'Touch Target'}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-black dark:text-white">
                          {specA.touchTarget}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-black dark:text-white">
                          {specB.touchTarget}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-neutral-600 dark:text-neutral-400">
                          {language === 'ru' ? 'Физика перехода' : 'Motion Physics'}
                        </td>
                        <td className="px-4 py-2.5 text-black dark:text-white">
                          {specA.motion.physics} ({specA.motion.duration})
                        </td>
                        <td className="px-4 py-2.5 text-black dark:text-white">
                          {specB.motion.physics} ({specB.motion.duration})
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-semibold text-neutral-600 dark:text-neutral-400">
                          {language === 'ru' ? 'Глубина / Тень' : 'Elevation / Depth'}
                        </td>
                        <td className="px-4 py-2.5 text-black dark:text-white">
                          {specA.elevation}
                        </td>
                        <td className="px-4 py-2.5 text-black dark:text-white">
                          {specB.elevation}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-surface-container-low dark:bg-neutral-900 border-t border-[#cfc4c5] dark:border-neutral-700 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2 text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'ru'
                ? 'Спецификации подтверждены официальными гайдлайнами компаний'
                : 'Specifications verified against official vendor guidelines'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-lg hover:opacity-85 transition-opacity"
          >
            {language === 'ru' ? 'Закрыть' : 'Close'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
