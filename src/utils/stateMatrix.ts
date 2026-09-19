import { ComponentState, ComponentType, ComponentVariant } from '../App';

/**
 * Единственное место, где описано, какие типы и состояния существуют у каждого
 * компонента. Filters строит из этого выпадающие списки, рендереры превью
 * сверяются с ним же — раньше эти три мнения расходились, и часть комбинаций
 * либо не предлагалась, либо предлагалась, но ничего не меняла.
 */

interface ComponentSpec {
  /** Состояния в порядке отображения в фильтре. */
  states: ComponentState[];
  /** Типы. Пустой массив — у компонента нет выбора типа. */
  variants: ComponentVariant[];
  /** Состояние, на которое переключаемся при выборе компонента. */
  defaultState: ComponentState;
  /** Тип по умолчанию. */
  defaultVariant: ComponentVariant;
}

export const COMPONENT_MATRIX: Record<ComponentType, ComponentSpec> = {
  button: {
    states: ['default', 'hover', 'focus', 'disabled', 'loading', 'error'],
    variants: ['primary', 'secondary', 'tertiary', 'destructive', 'icon'],
    defaultState: 'default',
    defaultVariant: 'primary',
  },
  input: {
    states: ['default', 'hover', 'focus', 'disabled', 'error'],
    variants: [],
    defaultState: 'default',
    defaultVariant: 'default',
  },
  switch: {
    states: ['default', 'hover', 'focus', 'disabled'],
    variants: [],
    defaultState: 'default',
    defaultVariant: 'default',
  },
  select: {
    // hover у селекта не описан ни в одной карточке — не предлагаем.
    states: ['default', 'focus', 'open', 'disabled', 'error'],
    variants: [],
    defaultState: 'default',
    defaultVariant: 'default',
  },
  datepicker: {
    states: ['default', 'hover', 'focus', 'open', 'disabled'],
    variants: [],
    defaultState: 'default',
    defaultVariant: 'default',
  },
  modal: {
    // Модалка всегда открыта; варьируется только тип диалога.
    states: [],
    variants: ['alert', 'transactional', 'acknowledgment'],
    defaultState: 'open',
    defaultVariant: 'alert',
  },
  radio: {
    states: ['default', 'hover', 'focus', 'disabled', 'error'],
    variants: [],
    defaultState: 'default',
    defaultVariant: 'default',
  },
  tag: {
    states: ['default', 'hover', 'focus', 'disabled'],
    variants: [],
    defaultState: 'default',
    defaultVariant: 'default',
  },
};

export const COMPONENT_TYPES = Object.keys(COMPONENT_MATRIX) as ComponentType[];

export function statesFor(component: ComponentType): ComponentState[] {
  return COMPONENT_MATRIX[component].states;
}

export function variantsFor(component: ComponentType): ComponentVariant[] {
  return COMPONENT_MATRIX[component].variants;
}

export function isStateAllowed(component: ComponentType, state: ComponentState): boolean {
  const spec = COMPONENT_MATRIX[component];
  return spec.states.includes(state) || spec.defaultState === state;
}

export function isVariantAllowed(component: ComponentType, variant: ComponentVariant): boolean {
  const spec = COMPONENT_MATRIX[component];
  return spec.variants.length === 0 ? variant === 'default' : spec.variants.includes(variant);
}

/** Приводит тип и состояние к допустимым для выбранного компонента. */
export function coerceSelection(
  component: ComponentType,
  variant: ComponentVariant,
  state: ComponentState
): { variant: ComponentVariant; state: ComponentState } {
  const spec = COMPONENT_MATRIX[component];
  return {
    variant: isVariantAllowed(component, variant) ? variant : spec.defaultVariant,
    state: isStateAllowed(component, state) ? state : spec.defaultState,
  };
}

/** Ключи переводов для подписей — соответствуют LanguageContext. */
export const STATE_LABEL_KEYS: Record<ComponentState, string> = {
  default: 'filters.state.default',
  hover: 'filters.state.hover',
  focus: 'filters.state.focus',
  disabled: 'filters.state.disabled',
  error: 'filters.state.error',
  open: 'filters.state.open',
  loading: 'filters.state.loading',
  alert: 'filters.modal.alert',
  transactional: 'filters.modal.transactional',
  acknowledgment: 'filters.modal.acknowledgment',
};

export const VARIANT_LABEL_KEYS: Record<ComponentVariant, string> = {
  default: 'filters.state.default',
  primary: 'filters.button.primary',
  secondary: 'filters.button.secondary',
  tertiary: 'filters.button.tertiary',
  destructive: 'filters.button.destructive',
  icon: 'filters.button.icon',
  alert: 'filters.modal.alert',
  transactional: 'filters.modal.transactional',
  acknowledgment: 'filters.modal.acknowledgment',
};

export const COMPONENT_LABEL_KEYS: Record<ComponentType, string> = {
  button: 'filters.button',
  input: 'filters.input',
  switch: 'filters.switch',
  select: 'filters.select',
  datepicker: 'filters.datepicker',
  modal: 'filters.modal',
  radio: 'filters.radio',
  tag: 'filters.tag',
};
