import React, { ReactNode } from 'react';
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
    <section className="flex flex-col bg-white border border-[#cfc4c5] rounded-2xl overflow-visible">
      {/* Компонент — чипы: сразу видно все 8 вариантов, один клик вместо
          «открыть список → найти → выбрать». Тип/Состояние остаются
          дропдаунами — там варианты меняются от компонента к компоненту, и
          читать длинный список каждый раз было бы избыточно. */}
      <div className="flex flex-col gap-2 px-4 py-3 border-b border-[#eeeeee]">
        <span className="text-sm text-[#5d5f5f]">{t('filters.component').replace(/:$/, '')}</span>
        <div className="flex flex-wrap gap-1.5">
          {COMPONENT_TYPES.map(type => (
            <ComponentChip
              key={type}
              label={t(COMPONENT_LABEL_KEYS[type])}
              active={activeComponent === type}
              onClick={() => onComponentChange(type)}
            />
          ))}
        </div>
      </div>

      {variantOptions.length > 0 && (
        <FilterRow label={t('filters.type')}>
          <CustomSelect
            value={activeVariant}
            onChange={(val) => setActiveVariant(val as ComponentVariant)}
            options={variantOptions}
          />
        </FilterRow>
      )}

      {stateOptions.length > 0 && (
        <FilterRow label={t('filters.state')} last>
          <CustomSelect
            value={activeState}
            onChange={(val) => setActiveState(val as ComponentState)}
            options={stateOptions}
          />
        </FilterRow>
      )}
    </section>
  );
}

const ComponentChip: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
        active
          ? 'border-black bg-black text-white'
          : 'border-[#cfc4c5] bg-white text-black hover:bg-surface-container-low'
      }`}
    >
      {label}
    </button>
  );
};

// items-start в колоночном (мобильном) режиме — иначе flex растягивает
// дропдаун на всю ширину строки по умолчанию (align-items: stretch).
// На sm+ строка становится горизонтальной, а дропдаун остаётся компактным
// по содержимому — не флекс-элемент с grow, просто justify-between
// разводит подпись и селект по краям.
function FilterRow({ label, children, last = false }: { label: string; children: ReactNode; last?: boolean }) {
  return (
    <div
      className={`flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 px-4 py-3 ${
        last ? '' : 'border-b border-[#eeeeee]'
      }`}
    >
      <span className="text-sm text-[#5d5f5f] shrink-0">{label.replace(/:$/, '')}</span>
      {children}
    </div>
  );
}
