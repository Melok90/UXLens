import { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import { flattenTokens, getDesignTokens } from '../utils/tokens';
import { SYSTEM_LIST, SYSTEM_LOGOS } from '../utils/systemIcons';

const COLOR_KEY_HINTS = ['background', 'foreground', 'border', 'surface', 'error'];

function isColorValue(value: string): boolean {
  return /^#([0-9a-f]{3,8})$/i.test(value.trim()) || /^rgba?\(/i.test(value.trim());
}

function labelFor(path: string): string {
  const last = path.split('.').pop() ?? path;
  return last
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, c => c.toUpperCase());
}

/**
 * Построчное сравнение токенов вместо шести карточек, которые нужно сличать
 * глазами. Строится из getDesignTokens — того же источника, что рисует
 * превью в ComparisonGrid, — поэтому таблица не может разойтись с картинкой.
 */
export default function CompareTable() {
  const { t } = useLanguage();
  const activeComponent = useStore(state => state.activeComponent);
  const activeVariant = useStore(state => state.activeVariant);
  const activeState = useStore(state => state.activeState);
  const searchQuery = useStore(state => state.searchQuery);
  const platformFilter = useStore(state => state.platformFilter);
  const [onlyDiffering, setOnlyDiffering] = useState(false);

  const query = searchQuery.trim().toLowerCase();
  const visibleSystems = useMemo(() => {
    let list = SYSTEM_LIST;
    if (platformFilter === 'web') {
      list = list.filter(s => s.platform === 'web' || s.platform === 'both');
    } else if (platformFilter === 'mobile') {
      list = list.filter(s => s.platform === 'mobile' || s.platform === 'both');
    }
    const matched = list.filter(s => s.title.toLowerCase().includes(query));
    return query.length > 0 && matched.length > 0 ? matched : list;
  }, [query, platformFilter]);

  const columns = useMemo(
    () =>
      visibleSystems.map(system => ({
        ...system,
        icon: SYSTEM_LOGOS[system.key],
        flat: flattenTokens(getDesignTokens(system.title, activeComponent, activeVariant, activeState)),
      })),
    [visibleSystems, activeComponent, activeVariant, activeState]
  );

  const rows = useMemo(() => {
    const keys = new Set<string>();
    columns.forEach(col => Object.keys(col.flat).forEach(k => keys.add(k)));
    return Array.from(keys).map(key => {
      const values = columns.map(col => col.flat[key] ?? '—');
      const differs = new Set(values).size > 1;
      return { key, values, differs };
    });
  }, [columns]);

  const visibleRows = onlyDiffering ? rows.filter(r => r.differs) : rows;

  return (
    // min-w-0: без этого флекс-элемент отказывается сжиматься уже своей
    // шириной вслед за overflow-x-auto таблицы внутри, и продавливает
    // ширину страницы наружу на мобильных экранах.
    <div className="flex flex-col gap-3 min-w-0">
      <div className="flex justify-end">
        <label className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyDiffering}
            onChange={e => setOnlyDiffering(e.target.checked)}
            className="accent-[#5e6ad2] rounded w-3.5 h-3.5"
          />
          {t('table.onlyDiffering')}
        </label>
      </div>

      <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800/90 rounded-xl bg-white dark:bg-[#101114] linear-card">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-50/80 dark:bg-[#121316] border-b border-zinc-200 dark:border-zinc-800/80">
              <th className="text-left font-semibold text-zinc-900 dark:text-zinc-100 px-4 py-3 sticky left-0 bg-zinc-50/90 dark:bg-[#121316] min-w-[160px] text-xs tracking-tight">
                {t('table.property')}
              </th>
              {columns.map(col => (
                <th key={col.key} className="text-left font-semibold text-zinc-900 dark:text-zinc-100 px-4 py-3 min-w-[140px] text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 shrink-0">{col.icon}</div>
                    <span className="truncate">{col.title}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map(row => (
              <tr key={row.key} className={`border-b border-zinc-100 dark:border-zinc-800/60 last:border-0 hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors ${row.differs ? '' : 'opacity-40'}`}>
                <td className="px-4 py-2.5 font-medium text-zinc-800 dark:text-zinc-300 sticky left-0 bg-white dark:bg-[#101114]">
                  {labelFor(row.key)}
                </td>
                {row.values.map((value, i) => {
                  const keyLower = row.key.toLowerCase();
                  const showSwatch = COLOR_KEY_HINTS.some(hint => keyLower.includes(hint)) && isColorValue(value);
                  return (
                    <td key={i} className={`px-4 py-2.5 font-mono text-[11px] ${row.differs ? 'text-zinc-950 dark:text-white font-medium' : 'text-zinc-500 dark:text-zinc-400'}`}>
                      <span className="flex items-center gap-2">
                        {showSwatch && (
                          <span
                            className="w-3 h-3 rounded-full border border-black/15 dark:border-white/15 shrink-0 shadow-2xs"
                            style={{ backgroundColor: value }}
                          />
                        )}
                        <span className="truncate max-w-[160px]">{value}</span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {onlyDiffering && visibleRows.length === 0 && (
        <p className="text-center text-xs text-zinc-500 py-4 font-mono">{t('table.identical')}</p>
      )}
    </div>
  );
}
