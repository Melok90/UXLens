import { ComponentType, ComponentState, ComponentVariant } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';

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
          <select 
            className="border border-[#cfc4c5] rounded-lg px-3 py-1.5 text-sm outline-none bg-white font-medium cursor-pointer min-w-[140px]"
            value={activeVariant}
            onChange={(e) => onVariantChange(e.target.value as ComponentVariant)}
          >
            {activeComponent === 'button' && (
              <>
                <option value="primary">{t('filters.button.primary')}</option>
                <option value="secondary">{t('filters.button.secondary')}</option>
                <option value="tertiary">{t('filters.button.tertiary')}</option>
                <option value="destructive">{t('filters.button.destructive')}</option>
                <option value="icon">{t('filters.button.icon')}</option>
              </>
            )}
            {activeComponent === 'modal' && (
              <>
                <option value="alert">{t('filters.modal.alert')}</option>
                <option value="transactional">{t('filters.modal.transactional')}</option>
                <option value="acknowledgment">{t('filters.modal.acknowledgment')}</option>
              </>
            )}
          </select>
        </div>
      )}

      {activeComponent !== 'modal' && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-[#4c4546] mr-2">
            {t('filters.state')}
          </span>
          <select
            className="border border-[#cfc4c5] rounded-lg px-3 py-1.5 text-sm outline-none bg-white font-medium cursor-pointer min-w-[140px]"
            value={activeState}
            onChange={(e) => onStateChange(e.target.value as ComponentState)}
          >
            <option value="default">{t('filters.state.default')}</option>
            {activeComponent !== 'select' && (
              <option value="hover">{t('filters.state.hover')}</option>
            )}
            <option value="focus">{t('filters.state.focus')}</option>
            {activeComponent === 'select' && (
              <option value="open">{t('filters.state.open')}</option>
            )}
            <option value="disabled">{t('filters.state.disabled')}</option>
            {activeComponent === 'button' && (
              <option value="loading">{t('filters.state.loading')}</option>
            )}
            {activeComponent !== 'switch' && activeComponent !== 'select' && activeComponent !== 'datepicker' && activeComponent !== 'tag' && (
              <option value="error">{t('filters.state.error')}</option>
            )}
          </select>
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
