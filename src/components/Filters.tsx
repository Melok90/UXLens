import { ComponentType, ComponentState, ComponentVariant } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import CustomSelect from './CustomSelect';

export default function Filters() {
  const { t } = useLanguage();
  
  const activeComponent = useStore(state => state.activeComponent);
  const activeState = useStore(state => state.activeState);
  const activeVariant = useStore(state => state.activeVariant);
  const setActiveComponent = useStore(state => state.setActiveComponent);
  const setActiveState = useStore(state => state.setActiveState);
  const setActiveVariant = useStore(state => state.setActiveVariant);

  const onComponentChange = (type: ComponentType) => {
    setActiveComponent(type);
    if (type === 'modal') {
      setActiveVariant('alert');
      setActiveState('open');
    } else if (type === 'button') {
      setActiveVariant('primary');
      setActiveState('default');
    } else {
      setActiveVariant('default');
      setActiveState('default');
    }
  };

  const onStateChange = setActiveState;
  const onVariantChange = setActiveVariant;

  let variantOptions: {value: string; label: string}[] = [];
  if (activeComponent === 'button') {
    variantOptions = [
      { value: 'primary', label: t('filters.button.primary') },
      { value: 'secondary', label: t('filters.button.secondary') },
      { value: 'tertiary', label: t('filters.button.tertiary') },
      { value: 'destructive', label: t('filters.button.destructive') },
      { value: 'icon', label: t('filters.button.icon') }
    ];
  } else if (activeComponent === 'modal') {
     variantOptions = [
      { value: 'alert', label: t('filters.modal.alert') },
      { value: 'transactional', label: t('filters.modal.transactional') },
      { value: 'acknowledgment', label: t('filters.modal.acknowledgment') }
    ];
  }

  const stateOptions = [{ value: 'default', label: t('filters.state.default') }];
  if (activeComponent !== 'select') stateOptions.push({ value: 'hover', label: t('filters.state.hover') });
  stateOptions.push({ value: 'focus', label: t('filters.state.focus') });
  if (activeComponent === 'select') stateOptions.push({ value: 'open', label: t('filters.state.open') });
  stateOptions.push({ value: 'disabled', label: t('filters.state.disabled') });
  if (activeComponent === 'button') stateOptions.push({ value: 'loading', label: t('filters.state.loading') });
  if (activeComponent !== 'switch' && activeComponent !== 'select' && activeComponent !== 'datepicker' && activeComponent !== 'tag') {
    stateOptions.push({ value: 'error', label: t('filters.state.error') });
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-[#4c4546] mr-2">{t('filters.component')}</span>
        <FilterButton 
          label={t('filters.button')} 
          active={activeComponent === 'button'} 
          onClick={() => onComponentChange('button')}
        />
        <FilterButton 
          label={t('filters.input')} 
          active={activeComponent === 'input'} 
          onClick={() => onComponentChange('input')}
        />
        <FilterButton 
          label={t('filters.switch')} 
          active={activeComponent === 'switch'} 
          onClick={() => onComponentChange('switch')}
        />
        <FilterButton 
          label={t('filters.select')} 
          active={activeComponent === 'select'} 
          onClick={() => onComponentChange('select')}
        />
        <FilterButton 
          label={t('filters.datepicker')} 
          active={activeComponent === 'datepicker'} 
          onClick={() => onComponentChange('datepicker')}
        />
        <FilterButton 
          label={t('filters.modal')} 
          active={activeComponent === 'modal'} 
          onClick={() => onComponentChange('modal')}
        />
        <FilterButton 
          label={t('filters.radio')} 
          active={activeComponent === 'radio'} 
          onClick={() => onComponentChange('radio')}
        />
        <FilterButton 
          label={t('filters.tag')} 
          active={activeComponent === 'tag'} 
          onClick={() => onComponentChange('tag')}
        />
      </div>

      {(activeComponent === 'button' || activeComponent === 'modal') && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-[#4c4546] mr-2">
            {t('filters.type')}
          </span>
          <CustomSelect 
             value={activeVariant}
             onChange={(val) => onVariantChange(val as any)}
             options={variantOptions}
             className="min-w-[150px]"
           />
        </div>
      )}

      {activeComponent !== 'modal' && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-[#4c4546] mr-2">
            {t('filters.state')}
          </span>
          <CustomSelect 
             value={activeState}
             onChange={(val) => onStateChange(val as any)}
             options={stateOptions}
             className="min-w-[150px]"
           />
        </div>
      )}
    </section>
  );
}

interface FilterButtonProps {
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
        className="px-4 py-1.5 rounded-full border border-black bg-black text-white font-medium text-sm transition-all"
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
