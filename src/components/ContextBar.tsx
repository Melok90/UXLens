import { ReactNode } from 'react';
import { LayoutGrid, Table2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import {
  COMPONENT_LABEL_KEYS,
  STATE_LABEL_KEYS,
  VARIANT_LABEL_KEYS,
  statesFor,
  variantsFor,
} from '../utils/stateMatrix';
import { SYSTEM_TITLES } from '../utils/systemIcons';

/**
 * Всегда видимая строка «где я сейчас»: раньше единственным способом понять
 * текущий срез было заново читать состояние трёх раздельных фильтров.
 * Плюс переключатель Витрина/Таблица — вместо шести карточек стена текста,
 * таблица даёт построчное сравнение свойств.
 */
export default function ContextBar() {
  const { t } = useLanguage();
  const activeComponent = useStore(state => state.activeComponent);
  const activeVariant = useStore(state => state.activeVariant);
  const activeState = useStore(state => state.activeState);
  const viewMode = useStore(state => state.viewMode);
  const setViewMode = useStore(state => state.setViewMode);

  const crumbs = [t(COMPONENT_LABEL_KEYS[activeComponent])];
  if (variantsFor(activeComponent).length > 0) {
    crumbs.push(t(VARIANT_LABEL_KEYS[activeVariant]));
  }
  if (statesFor(activeComponent).length > 0) {
    crumbs.push(t(STATE_LABEL_KEYS[activeState]));
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
      <div className="flex items-center gap-2 text-sm min-w-0">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2 min-w-0">
            {i > 0 && <span className="text-[#cfc4c5]">/</span>}
            <span className={i === crumbs.length - 1 ? 'font-semibold text-black truncate' : 'text-[#5d5f5f] truncate'}>
              {crumb}
            </span>
          </span>
        ))}
        <span className="text-[#a1a1a1] hidden sm:inline">
          &middot; {SYSTEM_TITLES.length} {t('context.systemsCount')}
        </span>
      </div>

      <div className="flex bg-surface-container-low p-0.5 rounded-lg border border-[#cfc4c5] shrink-0">
        <ViewButton
          active={viewMode === 'showcase'}
          onClick={() => setViewMode('showcase')}
          icon={<LayoutGrid className="w-3.5 h-3.5" />}
          label={t('context.view.showcase')}
        />
        <ViewButton
          active={viewMode === 'table'}
          onClick={() => setViewMode('table')}
          icon={<Table2 className="w-3.5 h-3.5" />}
          label={t('context.view.table')}
        />
      </div>
    </div>
  );
}

function ViewButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
        active ? 'bg-white shadow-sm text-black' : 'text-[#5d5f5f] hover:text-black'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
