import { ComponentType } from '../App';
import { COMPONENT_TYPES, coerceSelection } from './stateMatrix';
import { ViewMode } from '../store/useStore';

/**
 * Читает/пишет текущий срез (компонент, тип, состояние, режим показа, поиск)
 * в query-параметры. До этого фильтры жили только в оперативной памяти
 * вкладки — кнопка «Поделиться» копировала URL без единого параметра,
 * получатель видел дефолтный Button/Primary/Default, а не то, что показывал
 * отправитель.
 */

export interface UrlFilters {
  component: ComponentType;
  variant: string;
  state: string;
  view: ViewMode;
  q: string;
}

const PARAM_KEYS = {
  component: 'c',
  variant: 'v',
  state: 's',
  view: 'view',
  q: 'q',
} as const;

export function readFiltersFromParams(params: URLSearchParams): Partial<UrlFilters> {
  const result: Partial<UrlFilters> = {};

  const rawComponent = params.get(PARAM_KEYS.component);
  const component = (COMPONENT_TYPES as string[]).includes(rawComponent ?? '')
    ? (rawComponent as ComponentType)
    : undefined;
  if (component) result.component = component;

  // Коэрсим variant/state всегда, как только известен компонент — не только
  // когда они явно есть в URL. Ссылка вида ?c=modal (без v/s) иначе оставляла
  // variant равным дефолту предыдущего компонента ('primary'), и хлебные
  // крошки показывали несуществующий для модалки тип.
  if (component) {
    const rawVariant = params.get(PARAM_KEYS.variant);
    const rawState = params.get(PARAM_KEYS.state);
    const coerced = coerceSelection(component, (rawVariant as any) ?? 'default', (rawState as any) ?? 'default');
    result.variant = coerced.variant;
    result.state = coerced.state;
  }

  const rawView = params.get(PARAM_KEYS.view);
  if (rawView === 'showcase' || rawView === 'table') result.view = rawView;

  const q = params.get(PARAM_KEYS.q);
  if (q) result.q = q;

  return result;
}

export function writeFiltersToParams(filters: UrlFilters): URLSearchParams {
  const params = new URLSearchParams();
  params.set(PARAM_KEYS.component, filters.component);
  params.set(PARAM_KEYS.variant, filters.variant);
  params.set(PARAM_KEYS.state, filters.state);
  if (filters.view !== 'showcase') params.set(PARAM_KEYS.view, filters.view);
  if (filters.q) params.set(PARAM_KEYS.q, filters.q);
  return params;
}
