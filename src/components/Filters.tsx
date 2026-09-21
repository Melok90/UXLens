import React from 'react';
import { Link } from 'react-router-dom';
import { ComponentType, ComponentState, ComponentVariant } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import CustomSelect from './CustomSelect';
import {
  Globe,
  Smartphone,
  Layers,
  LayoutGrid,
  MousePointer2,
  TextCursorInput,
  ToggleLeft,
  ListFilter,
  Calendar,
  AppWindow,
  CircleDot,
  Tag,
  SlidersHorizontal,
  RotateCcw,
  ExternalLink,
  Sparkles,
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
  input: TextCursorInput,
  switch: ToggleLeft,
  select: ListFilter,
  datepicker: Calendar,
  modal: AppWindow,
  radio: CircleDot,
  tag: Tag,
};

export default function Filters() {
  const { t } = useLanguage();

  const activeComponent = useStore((state) => state.activeComponent);
  const activeState = useStore((state) => state.activeState);
  const activeVariant = useStore((state) => state.activeVariant);
  const platformFilter = useStore((state) => state.platformFilter);
  const setActiveComponent = useStore((state) => state.setActiveComponent);
  const setActiveState = useStore((state) => state.setActiveState);
  const setActiveVariant = useStore((state) => state.setActiveVariant);
  const setPlatformFilter = useStore((state) => state.setPlatformFilter);
  const isProUser = useStore((state) => state.isProUser);
  const setIsProModalOpen = useStore((state) => state.setIsProModalOpen);

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

  const variantOptions = variantsFor(activeComponent).map((variant) => ({
    value: variant,
    label: t(VARIANT_LABEL_KEYS[variant]),
  }));

  const stateOptions = statesFor(activeComponent).map((state) => ({
    value: state,
    label: t(STATE_LABEL_KEYS[state]),
  }));

  return (
    <section className="bg-white dark:bg-[#101114] border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-5 sm:p-6 shadow-xs linear-card space-y-4 sm:space-y-5">
      {/* Card Header */}
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
          <button
            type="button"
            onClick={() => setIsProModalOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
              isProUser
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 hover:border-amber-500/50 hover:bg-amber-500/15'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{isProUser ? t('nav.proActive') : t('nav.unlockPro')}</span>
          </button>
          <Link
            to="/systems"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>{t('filters.openDocs')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Row 1: Platform (without search field as requested) */}
      <div className="flex items-center flex-wrap gap-3 sm:gap-4">
        <div className="w-24 sm:w-28 shrink-0 flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <Smartphone className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          <span>{t('filters.platform')}</span>
        </div>
        <div className="inline-flex p-1 bg-zinc-100/90 dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
          <button
            type="button"
            onClick={() => setPlatformFilter('all')}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
              platformFilter === 'all'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t('filters.platform.all')}</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatformFilter('web')}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
              platformFilter === 'web'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t('filters.platform.web')}</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatformFilter('mobile')}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
              platformFilter === 'mobile'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t('filters.platform.mobile')}</span>
          </button>
        </div>
      </div>

      {/* Row 2: Component Pills with icons */}
      <div className="flex items-center flex-wrap gap-3 sm:gap-4">
        <div className="w-24 sm:w-28 shrink-0 flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <LayoutGrid className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          <span>{t('filters.component')}</span>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {COMPONENT_TYPES.map((type) => {
            const Icon = COMPONENT_ICONS[type];
            const isActive = activeComponent === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onComponentChange(type)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold shadow-xs'
                    : 'border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-850 font-medium shadow-2xs'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
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
    </section>
  );
}
