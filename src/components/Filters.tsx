import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ComponentType, ComponentState, ComponentVariant } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import CustomSelect from './CustomSelect';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Smartphone,
  Layers,
  LayoutGrid,
  MousePointer2,
  Keyboard,
  ToggleLeft,
  ListFilter,
  Calendar,
  AppWindow,
  CircleDot,
  Tag,
  SlidersHorizontal,
  RotateCcw,
  ExternalLink,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Search,
  Check,
  X,
} from 'lucide-react';
import {
  COMPONENT_LABEL_KEYS,
  COMPONENT_MATRIX,
  COMPONENT_TYPES,
  STATE_LABEL_KEYS,
  VARIANT_LABEL_KEYS,
  statesFor,
  variantsFor,
} from '../utils/stateMatrix';

const COMPONENT_ICONS: Record<ComponentType, React.FC<{ className?: string }>> = {
  button: MousePointer2,
  input: Keyboard,
  switch: ToggleLeft,
  select: ListFilter,
  datepicker: Calendar,
  modal: AppWindow,
  radio: CircleDot,
  tag: Tag,
};

export default function Filters() {
  const { t, language } = useLanguage();

  const activeComponent = useStore((state) => state.activeComponent);
  const activeState = useStore((state) => state.activeState);
  const activeVariant = useStore((state) => state.activeVariant);
  const platformFilter = useStore((state) => state.platformFilter);
  const setActiveComponent = useStore((state) => state.setActiveComponent);
  const setActiveState = useStore((state) => state.setActiveState);
  const setActiveVariant = useStore((state) => state.setActiveVariant);
  const setPlatformFilter = useStore((state) => state.setPlatformFilter);

  // Mobile Bottom Sheet state
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetSearch, setBottomSheetSearch] = useState('');
  const selectorBtnRef = useRef<HTMLButtonElement>(null);
  const wasSheetOpenRef = useRef(false);

  // Restore focus to trigger button when bottom sheet closes
  useEffect(() => {
    if (wasSheetOpenRef.current && !isBottomSheetOpen) {
      selectorBtnRef.current?.focus();
    }
    wasSheetOpenRef.current = isBottomSheetOpen;
  }, [isBottomSheetOpen]);

  // Prevent background scroll when bottom sheet is open
  useEffect(() => {
    if (isBottomSheetOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsBottomSheetOpen(false);
          setBottomSheetSearch('');
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isBottomSheetOpen]);

  const onComponentChange = (type: ComponentType) => {
    const spec = COMPONENT_MATRIX[type];
    setActiveComponent(type);
    setActiveVariant(spec.defaultVariant);
    setActiveState(spec.defaultState);
  };

  const resetFilters = () => {
    setPlatformFilter('all');
    onComponentChange('button');
  };

  const scrollToGrid = () => {
    const el = document.getElementById('comparison-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const variantOptions = variantsFor(activeComponent).map((variant) => ({
    value: variant,
    label: t(VARIANT_LABEL_KEYS[variant]),
  }));

  const stateOptions = statesFor(activeComponent).map((state) => ({
    value: state,
    label: t(STATE_LABEL_KEYS[state]),
  }));

  const ActiveComponentIcon = COMPONENT_ICONS[activeComponent] || MousePointer2;

  // Filtered components for the Bottom Sheet search
  const filteredComponentTypes = COMPONENT_TYPES.filter((type) => {
    if (!bottomSheetSearch.trim()) return true;
    const q = bottomSheetSearch.toLowerCase().trim();
    const localized = t(COMPONENT_LABEL_KEYS[type]).toLowerCase();
    return type.toLowerCase().includes(q) || localized.includes(q);
  });

  return (
    <section className="bg-white dark:bg-[#101114] border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-5 sm:p-6 shadow-xs linear-card">
      {/* ============================================================ */}
      {/* DESKTOP VIEW (Direct horizontal pills, compact selects)      */}
      {/* ============================================================ */}
      <div className="hidden md:flex md:flex-col space-y-4 sm:space-y-5">
        {/* Desktop Card Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
              {t('filters.title')}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {t('filters.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 pt-0.5">
            <Link
              to="/systems"
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <span>{t('filters.openDocs')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Row 1: Platform (Segmented Control) */}
        <div className="flex items-center flex-wrap gap-3 sm:gap-4">
          <div className="w-24 sm:w-28 shrink-0 flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <Smartphone className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            <span>{t('filters.platform')}</span>
          </div>
          <div role="tablist" aria-label={t('filters.platform')} className="inline-flex p-1 bg-zinc-100/90 dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
            <button
              type="button"
              role="tab"
              aria-selected={platformFilter === 'all'}
              onClick={() => setPlatformFilter('all')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                platformFilter === 'all'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-2xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium'
              }`}
            >
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('filters.platform.all')}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={platformFilter === 'web'}
              onClick={() => setPlatformFilter('web')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                platformFilter === 'web'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-2xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium'
              }`}
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('filters.platform.web')}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={platformFilter === 'mobile'}
              onClick={() => setPlatformFilter('mobile')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                platformFilter === 'mobile'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-2xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('filters.platform.mobile')}</span>
            </button>
          </div>
        </div>

        {/* Row 2: Component Pills (Direct horizontal selection) */}
        <div className="flex items-center flex-wrap gap-3 sm:gap-4">
          <div className="w-24 sm:w-28 shrink-0 flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <LayoutGrid className="w-4 h-4 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
            <span>{t('filters.component')}</span>
          </div>
          <div role="radiogroup" aria-label={t('filters.component')} className="flex items-center flex-wrap gap-2">
            {COMPONENT_TYPES.map((type) => {
              const Icon = COMPONENT_ICONS[type];
              const isActive = activeComponent === type;
              return (
                <button
                  key={type}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onComponentChange(type)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold shadow-xs'
                      : 'border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-850 font-medium shadow-2xs'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                  <span>{t(COMPONENT_LABEL_KEYS[type])}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Type, State, and Reset Filters */}
        <div className="flex items-center flex-wrap gap-y-3 gap-x-6 pt-1">
          {variantOptions.length > 0 && (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                <Layers className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <span>{t('filters.type')}</span>
              </div>
              <CustomSelect
                value={activeVariant}
                onChange={(val) => setActiveVariant(val as ComponentVariant)}
                options={variantOptions}
                ariaLabel={t('filters.type')}
                className="min-w-[150px] sm:min-w-[170px]"
              />
            </div>
          )}

          {stateOptions.length > 0 && (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                <SlidersHorizontal className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <span>{t('filters.state')}</span>
              </div>
              <CustomSelect
                value={activeState}
                onChange={(val) => setActiveState(val as ComponentState)}
                options={stateOptions}
                ariaLabel={t('filters.state')}
                className="min-w-[150px] sm:min-w-[170px]"
              />
            </div>
          )}

          <div className="flex items-center border-l border-zinc-200 dark:border-zinc-800 pl-4 py-0.5">
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs font-medium text-[#5e6ad2] dark:text-[#828cf5] hover:opacity-80 transition-opacity cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('filters.reset')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE VIEW (Matching exact user mockup)                     */}
      {/* ============================================================ */}
      <div className="block md:hidden space-y-4">
        {/* Mobile Header: Title + Subtitle + Book Icon Button */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
              {t('filters.title')}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              {t('filters.subtitle')}
            </p>
          </div>
          <Link
            to="/systems"
            title={t('filters.openDocs')}
            aria-label={t('filters.openDocs')}
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-zinc-200/90 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors shrink-0 shadow-2xs"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile Segmented Control: Платформа */}
        <div role="tablist" aria-label={t('filters.platform')} className="grid grid-cols-3 p-1 bg-zinc-100/90 dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
          <button
            type="button"
            role="tab"
            aria-selected={platformFilter === 'all'}
            onClick={() => setPlatformFilter('all')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-1 min-h-[40px] text-xs rounded-lg transition-all cursor-pointer ${
              platformFilter === 'all'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{t('filters.platform.all')}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={platformFilter === 'web'}
            onClick={() => setPlatformFilter('web')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-1 min-h-[40px] text-xs rounded-lg transition-all cursor-pointer ${
              platformFilter === 'web'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium'
            }`}
          >
            <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{t('filters.platform.web')}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={platformFilter === 'mobile'}
            onClick={() => setPlatformFilter('mobile')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-1 min-h-[40px] text-xs rounded-lg transition-all cursor-pointer ${
              platformFilter === 'mobile'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{t('filters.platform.mobile')}</span>
          </button>
        </div>

        {/* Mobile Field 1: Компонент (Tap triggers Bottom Sheet) */}
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
            <LayoutGrid className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" aria-hidden="true" />
            <span>{t('filters.component')}</span>
          </div>
          <button
            ref={selectorBtnRef}
            id="mobile-component-selector"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isBottomSheetOpen}
            aria-label={`${t('filters.component')}: ${t(COMPONENT_LABEL_KEYS[activeComponent])}`}
            onClick={() => setIsBottomSheetOpen(true)}
            className="w-full min-h-[44px] flex items-center justify-between border border-zinc-200/90 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 sm:py-3 bg-white dark:bg-zinc-900 font-medium text-sm text-zinc-900 dark:text-zinc-100 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 truncate">
              <ActiveComponentIcon className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0" aria-hidden="true" />
              <span className="truncate">{t(COMPONENT_LABEL_KEYS[activeComponent])}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0 ml-2" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Field 2: Тип */}
        {variantOptions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
              <Layers className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" aria-hidden="true" />
              <span>{t('filters.type')}</span>
            </div>
            <CustomSelect
              size="md"
              value={activeVariant}
              onChange={(val) => setActiveVariant(val as ComponentVariant)}
              options={variantOptions}
              ariaLabel={t('filters.type')}
              className="w-full"
            />
          </div>
        )}

        {/* Mobile Field 3: Состояние */}
        {stateOptions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
              <SlidersHorizontal className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" aria-hidden="true" />
              <span>{t('filters.state')}</span>
            </div>
            <CustomSelect
              size="md"
              value={activeState}
              onChange={(val) => setActiveState(val as ComponentState)}
              options={stateOptions}
              ariaLabel={t('filters.state')}
              className="w-full"
            />
          </div>
        )}

        {/* Mobile Bottom CTA: «Показать ›» */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={scrollToGrid}
            className="w-full py-3.5 px-4 min-h-[44px] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.99] transition-all rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>{t('filters.show')}</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="flex items-center justify-center pt-0.5 text-xs">
            <button
              type="button"
              onClick={resetFilters}
              className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-2 px-3 min-h-[44px]"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('filters.reset')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE COMPONENT SELECTOR BOTTOM SHEET                       */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isBottomSheetOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
              onClick={() => {
                setIsBottomSheetOpen(false);
                setBottomSheetSearch('');
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Sheet Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="sheet-modal-title"
              className="relative z-10 w-full bg-white dark:bg-[#101114] border-t border-zinc-200 dark:border-zinc-800 rounded-t-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Top Drag Handle */}
              <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mt-3 mb-1 shrink-0" aria-hidden="true" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
                <h3 id="sheet-modal-title" className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
                  {t('filters.selectComponent')}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsBottomSheetOpen(false);
                    setBottomSheetSearch('');
                  }}
                  className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
                  aria-label={language === 'ru' ? 'Закрыть панель выбора' : 'Close component selector'}
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Search Field */}
              <div className="px-5 pb-3 shrink-0">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                  <input
                    type="text"
                    aria-label={t('filters.searchComponents')}
                    value={bottomSheetSearch}
                    onChange={(e) => setBottomSheetSearch(e.target.value)}
                    placeholder={t('filters.searchComponents')}
                    className="w-full pl-10 pr-9 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-[#5e6ad2] transition-colors"
                  />
                  {bottomSheetSearch && (
                    <button
                      type="button"
                      aria-label={language === 'ru' ? 'Очистить поиск компонентов' : 'Clear component search'}
                      onClick={() => setBottomSheetSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              {/* Component Items List */}
              <div role="listbox" aria-label={t('filters.selectComponent')} className="overflow-y-auto px-5 pb-8 pt-1 space-y-2 flex-1 overscroll-contain">
                {filteredComponentTypes.length === 0 ? (
                  <div className="text-center py-8 text-xs text-zinc-400">
                    {t('filters.noComponentsFound')}
                  </div>
                ) : (
                  filteredComponentTypes.map((type) => {
                    const Icon = COMPONENT_ICONS[type];
                    const isSelected = activeComponent === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        data-sheet-item={type}
                        onClick={() => {
                          onComponentChange(type);
                          setIsBottomSheetOpen(false);
                          setBottomSheetSearch('');
                        }}
                        className={`w-full flex items-center justify-between p-3.5 min-h-[48px] rounded-xl transition-all cursor-pointer text-left active:scale-[0.99] ${
                          isSelected
                            ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-2xs'
                            : 'border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-zinc-800 dark:text-zinc-200 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          {Icon && (
                            <Icon
                              aria-hidden="true"
                              className={`w-4 h-4 shrink-0 ${
                                isSelected
                                  ? 'text-white dark:text-zinc-950'
                                  : 'text-zinc-500 dark:text-zinc-400'
                              }`}
                            />
                          )}
                          <span className="text-sm truncate">
                            {t(COMPONENT_LABEL_KEYS[type])}
                          </span>
                        </div>

                        {isSelected ? (
                          <Check className="w-4 h-4 shrink-0 text-white dark:text-zinc-950 ml-2" aria-hidden="true" />
                        ) : (
                          <ChevronRight className="w-4 h-4 shrink-0 text-zinc-400 dark:text-zinc-500 ml-2" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

