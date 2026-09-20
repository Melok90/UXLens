import { ComponentType } from '../App';
import { COMPONENT_TYPES, coerceSelection } from './stateMatrix';
import { ViewMode, PlatformFilter } from '../store/useStore';

export interface UrlFilters {
  component: ComponentType;
  variant: string;
  state: string;
  view: ViewMode;
  platform: PlatformFilter;
  q: string;
}

const PARAM_KEYS = {
  component: 'c',
  variant: 'v',
  state: 's',
  view: 'view',
  platform: 'p',
  q: 'q',
} as const;

export function readFiltersFromParams(params: URLSearchParams): Partial<UrlFilters> {
  const result: Partial<UrlFilters> = {};

  const rawComponent = params.get(PARAM_KEYS.component);
  const component = (COMPONENT_TYPES as string[]).includes(rawComponent ?? '')
    ? (rawComponent as ComponentType)
    : undefined;
  if (component) result.component = component;

  if (component) {
    const rawVariant = params.get(PARAM_KEYS.variant);
    const rawState = params.get(PARAM_KEYS.state);
    const coerced = coerceSelection(component, (rawVariant as any) ?? 'default', (rawState as any) ?? 'default');
    result.variant = coerced.variant;
    result.state = coerced.state;
  }

  const rawView = params.get(PARAM_KEYS.view);
  if (rawView === 'showcase' || rawView === 'table') result.view = rawView;

  const rawPlatform = params.get(PARAM_KEYS.platform);
  if (rawPlatform === 'all' || rawPlatform === 'web' || rawPlatform === 'mobile') {
    result.platform = rawPlatform;
  }

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
  if (filters.platform && filters.platform !== 'all') params.set(PARAM_KEYS.platform, filters.platform);
  if (filters.q) params.set(PARAM_KEYS.q, filters.q);
  return params;
}
