import { ComponentType, ComponentState, ComponentVariant } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import CustomSelect from './CustomSelect';
import { Globe, Smartphone, Layers } from 'lucide-react';
import {
  COMPONENT_LABEL_KEYS,
  COMPONENT_MATRIX,
  COMPONENT_TYPES,
  STATE_LABEL_KEYS,
  VARIANT_LABEL_KEYS,
  statesFor,
  variantsFor,
} from '../utils/stateMatrix';

export default function Filters() {
  const { t } = useLanguage();
  
  const activeComponent = useStore(state => state.activeComponent);
  const activeState = useStore(state => state.activeState);
  const activeVariant = useStore(state => state.activeVariant);
  const platformFilter = useStore(state => state.platformFilter);
  const setActiveComponent = useStore(state => state.setActiveComponent);
  const setActiveState = useStore(state => state.setActiveState);
  const setActiveVariant = useStore(state => state.setActiveVariant);
  const setPlatformFilter = useStore(state => state.setPlatformFilter);

  const onComponentChange = (type: ComponentType) => {
    const spec = COMPONENT_MATRIX[type];
    setActiveComponent(type);
    setActiveVariant(spec.defaultVariant);
    setActiveState(spec.defaultState);
  };

  const variantOptions = variantsFor(activeComponent).map(variant => ({
    value: variant,
    label: t(VARIANT_LABEL_KEYS[variant]),
  }));

  const stateOptions = statesFor(activeComponent).map(state => ({
    value: state,
    label: t(STATE_LABEL_KEYS[state]),
  }));

  return (
    <section className="flex flex-col gap-5">
      {/* Platform Switcher */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-1">
          {t('filters.platform')}
        </span>
        <div className="inline-flex p-0.5 bg-zinc-100/90 dark:bg-zinc-900/90 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <button
            type="button"
            onClick={() => setPlatformFilter('all')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
              platformFilter === 'all'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-2xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {t('filters.platform.all')}
          </button>
          <button
            type="button"
            onClick={() => setPlatformFilter('web')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
              platformFilter === 'web'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-2xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            {t('filters.platform.web')}
          </button>
          <button
            type="button"
            onClick={() => setPlatformFilter('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
              platformFilter === 'mobile'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-2xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            {t('filters.platform.mobile')}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-1">
          {t('filters.component')}
        </span>
        {COMPONENT_TYPES.map(type => (
          <FilterButton 
            key={type}
            label={t(COMPONENT_LABEL_KEYS[type])} 
            active={activeComponent === type} 
            onClick={() => onComponentChange(type)}
          />
        ))}
      </div>

      {variantOptions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-1">
            {t('filters.type')}
          </span>
          <CustomSelect 
             value={activeVariant}
             onChange={(val) => setActiveVariant(val as ComponentVariant)}
             options={variantOptions}
             className="min-w-[150px]"
           />
        </div>
      )}

      {stateOptions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-1">
            {t('filters.state')}
          </span>
          <CustomSelect 
             value={activeState}
             onChange={(val) => setActiveState(val as ComponentState)}
             options={stateOptions}
             className="min-w-[150px]"
           />
        </div>
      )}
    </section>
  );
}

interface FilterButtonProps {
  key?: string | number;
  label: string;
  active?: boolean;
  variant?: 'default' | 'ghost' | 'error';
  onClick?: () => void;
}

function FilterButton({ label, active = false, variant = 'default', onClick }: FilterButtonProps) {
  if (variant === 'error') {
    return (
      <button 
        onClick={onClick}
        className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer text-xs font-medium ${
          active 
            ? 'border-rose-600 bg-rose-600 text-white' 
            : 'border-transparent text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
        }`}
      >
        {label}
      </button>
    );
  }

  if (active) {
    return (
      <button 
        onClick={onClick}
        className="px-3 py-1.5 rounded-lg border border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold text-xs transition-all cursor-pointer shadow-2xs"
      >
        {label}
      </button>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium text-xs ${
        variant === 'ghost' 
          ? 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800' 
          : 'border-zinc-200 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-850'
      }`}
    >
      {label}
    </button>
  );
}
