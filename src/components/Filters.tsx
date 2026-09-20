import { ComponentType, ComponentState, ComponentVariant } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import CustomSelect from './CustomSelect';
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
  const setActiveComponent = useStore(state => state.setActiveComponent);
  const setActiveState = useStore(state => state.setActiveState);
  const setActiveVariant = useStore(state => state.setActiveVariant);

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
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-[#4c4546] mr-2">{t('filters.component')}</span>
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
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-[#4c4546] mr-2">
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
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-[#4c4546] mr-2">
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
        className={`px-4 py-1.5 rounded-full border transition-colors cursor-pointer text-sm font-medium ${
          active 
            ? 'border-[#ba1a1a] bg-[#ba1a1a] text-white' 
            : 'border-transparent text-[#ba1a1a] hover:bg-red-50'
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
        className="px-4 py-1.5 rounded-full border border-black bg-black text-white font-medium text-sm transition-all cursor-pointer"
      >
        {label}
      </button>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full border transition-colors cursor-pointer font-medium text-sm ${
        variant === 'ghost' 
          ? 'border-transparent text-[#5d5f5f] hover:text-black hover:bg-surface-container-low' 
          : 'border-[#cfc4c5] bg-white text-black hover:bg-surface-container-low'
      }`}
    >
      {label}
    </button>
  );
}
