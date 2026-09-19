import { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../store/useStore';
import { flattenTokens, getDesignTokens } from '../utils/tokens';
import { SYSTEM_LIST } from '../utils/systemIcons';

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
  const [onlyDiffering, setOnlyDiffering] = useState(false);

  const query = searchQuery.trim().toLowerCase();
  const visibleSystems = useMemo(() => {
    const matched = SYSTEM_LIST.filter(s => s.title.toLowerCase().includes(query));
    return query.length > 0 && matched.length > 0 ? matched : SYSTEM_LIST;
  }, [query]);

  const columns = useMemo(
    () =>
      visibleSystems.map(system => ({
        ...system,
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
        <label className="flex items-center gap-2 text-sm text-[#5d5f5f] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyDiffering}
            onChange={e => setOnlyDiffering(e.target.checked)}
            className="accent-black w-4 h-4"
          />
          {t('table.onlyDiffering')}
        </label>
      </div>

      <div className="overflow-x-auto border border-[#cfc4c5] rounded-xl bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#f9f9f9] border-b border-[#cfc4c5]">
              <th className="text-left font-semibold text-black px-4 py-3 sticky left-0 bg-[#f9f9f9] min-w-[160px]">
                {t('table.property')}
              </th>
              {columns.map(col => (
                <th key={col.key} className="text-left font-semibold text-black px-4 py-3 min-w-[140px]">
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
              <tr key={row.key} className={`border-b border-[#eeeeee] last:border-0 ${row.differs ? '' : 'opacity-50'}`}>
                <td className="px-4 py-2.5 font-medium text-[#4c4546] sticky left-0 bg-white">
                  {labelFor(row.key)}
                </td>
                {row.values.map((value, i) => {
                  const keyLower = row.key.toLowerCase();
                  const showSwatch = COLOR_KEY_HINTS.some(hint => keyLower.includes(hint)) && isColorValue(value);
                  return (
                    <td key={i} className={`px-4 py-2.5 font-mono text-xs ${row.differs ? 'text-black font-medium' : 'text-[#5d5f5f]'}`}>
                      <span className="flex items-center gap-2">
                        {showSwatch && (
                          <span
                            className="w-3 h-3 rounded-full border border-black/10 shrink-0"
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
        <p className="text-center text-sm text-[#5d5f5f] py-4">{t('table.identical')}</p>
      )}
    </div>
  );
}
