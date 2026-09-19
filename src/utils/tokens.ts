import { ComponentState, ComponentType, ComponentVariant } from '../App';

/**
 * Источник правды по дизайн-токенам.
 *
 * Значения намеренно совпадают с классами, которыми ComparisonGrid рисует
 * превью: JSON-вкладка должна описывать ровно то, что видно на экране.
 * Если правится цвет в renderButton — правится и здесь.
 */

interface Surface {
  background: string;
  foreground: string;
  border: string;
  shadow?: string;
}

interface StateFx {
  background?: string;
  foreground?: string;
  border?: string;
  shadow?: string;
  filter?: string;
  transform?: string;
  outline?: string;
  outlineOffset?: string;
}

interface VariantSpec {
  base: Surface;
  hover?: StateFx;
  active?: StateFx;
  focus?: StateFx;
}

interface SystemSpec {
  fontFamily: string;
  surface: string;
  error: string;
  focusRing: string;
  disabled: StateFx;
  variants: Partial<Record<ComponentVariant, VariantSpec>>;
}

const TRANSPARENT = 'transparent';
const NONE = 'none';

const SYSTEMS: Record<string, SystemSpec> = {
  'Material Design 3': {
    fontFamily: 'Roboto, sans-serif',
    surface: '#FEF7FF',
    error: '#B3261E',
    focusRing: '#1447E6',
    disabled: {
      background: 'rgba(0, 0, 0, 0.10)',
      foreground: 'rgba(0, 0, 0, 0.40)',
      shadow: NONE,
    },
    variants: {
      primary: {
        base: { background: '#1447E6', foreground: '#FFFFFF', border: NONE, shadow: '0 1px 3px rgba(0,0,0,0.20)' },
        hover: { filter: 'brightness(1.1)', shadow: '0 4px 8px rgba(0,0,0,0.20)' },
        active: { transform: 'scale(0.95)' },
        focus: { outline: '2px solid #1447E6', outlineOffset: '2px' },
      },
      secondary: {
        base: { background: TRANSPARENT, foreground: '#1447E6', border: '1px solid #9CA3AF' },
        hover: { background: 'rgba(20, 71, 230, 0.10)' },
        active: { background: 'rgba(20, 71, 230, 0.20)' },
      },
      tertiary: {
        base: { background: TRANSPARENT, foreground: '#1447E6', border: NONE },
        hover: { background: 'rgba(20, 71, 230, 0.10)' },
        active: { background: 'rgba(20, 71, 230, 0.20)' },
      },
      destructive: {
        base: { background: '#B3261E', foreground: '#FFFFFF', border: NONE, shadow: '0 1px 3px rgba(0,0,0,0.20)' },
        hover: { filter: 'brightness(1.1)', shadow: '0 4px 8px rgba(0,0,0,0.20)' },
        active: { transform: 'scale(0.95)' },
        focus: { outline: '2px solid #B3261E', outlineOffset: '2px' },
      },
      icon: {
        base: { background: '#1447E6', foreground: '#FFFFFF', border: NONE, shadow: NONE },
        hover: { filter: 'brightness(1.1)' },
        active: { transform: 'scale(0.95)' },
      },
    },
  },

  'Fluent UI': {
    fontFamily: 'Segoe UI, sans-serif',
    surface: '#FFFFFF',
    error: '#A4262C',
    focusRing: '#0078D4',
    disabled: {
      background: '#9CA3AF',
      foreground: '#FFFFFF',
      border: NONE,
      shadow: NONE,
    },
    variants: {
      primary: {
        base: { background: '#0078D4', foreground: '#FFFFFF', border: NONE },
        hover: { filter: 'brightness(1.25)' },
        active: { background: '#005A9E' },
        focus: { outline: '2px solid #0078D4', outlineOffset: '1px' },
      },
      secondary: {
        base: { background: TRANSPARENT, foreground: '#323130', border: '1px solid #8A8886' },
        hover: { background: '#F3F2F1' },
        active: { background: '#EDEBE9' },
        focus: { outline: '2px solid #000000', outlineOffset: '1px' },
      },
      tertiary: {
        base: { background: TRANSPARENT, foreground: '#0078D4', border: NONE },
        hover: { background: '#F3F2F1' },
        active: { background: '#EDEBE9' },
      },
      destructive: {
        base: { background: '#A4262C', foreground: '#FFFFFF', border: NONE },
        hover: { filter: 'brightness(1.25)' },
        active: { background: '#811E22' },
        focus: { outline: '2px solid #A4262C', outlineOffset: '1px' },
      },
      icon: {
        base: { background: TRANSPARENT, foreground: '#323130', border: NONE },
        hover: { background: '#F3F2F1' },
        active: { background: '#EDEBE9' },
      },
    },
  },

  Atlassian: {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    surface: '#FFFFFF',
    error: '#DE350B',
    focusRing: '#4C90FF',
    disabled: {
      background: '#EBECF0',
      foreground: '#A5ADBA',
      border: NONE,
      shadow: NONE,
    },
    variants: {
      primary: {
        base: { background: '#0052CC', foreground: '#FFFFFF', border: NONE, shadow: '0 1px 2px rgba(9,30,66,0.08)' },
        hover: { background: '#0065FF' },
        active: { background: '#0747A6' },
        focus: { outline: '2px solid #4C90FF' },
      },
      secondary: {
        base: { background: 'rgba(9, 30, 66, 0.06)', foreground: '#42526E', border: NONE },
        hover: { background: 'rgba(9, 30, 66, 0.08)' },
        active: { background: 'rgba(9, 30, 66, 0.14)' },
      },
      tertiary: {
        base: { background: TRANSPARENT, foreground: '#0052CC', border: NONE },
        hover: { background: 'rgba(0, 82, 204, 0.10)' },
        active: { background: 'rgba(0, 82, 204, 0.20)' },
      },
      destructive: {
        base: { background: '#DE350B', foreground: '#FFFFFF', border: NONE },
        hover: { background: '#FF5630' },
        active: { background: '#BF2600' },
      },
      icon: {
        base: { background: TRANSPARENT, foreground: '#42526E', border: NONE },
        hover: { background: 'rgba(9, 30, 66, 0.08)' },
        active: { background: 'rgba(9, 30, 66, 0.14)' },
      },
    },
  },

  'IBM Carbon': {
    fontFamily: "'IBM Plex Sans', sans-serif",
    surface: '#FFFFFF',
    error: '#DA1E28',
    focusRing: '#0F62FE',
    disabled: {
      background: '#C6C6C6',
      foreground: '#FFFFFF',
      shadow: NONE,
    },
    variants: {
      primary: {
        base: { background: '#0F62FE', foreground: '#FFFFFF', border: NONE },
        hover: { background: '#0353E9' },
        active: { background: '#002D9C' },
        focus: { outline: '2px solid #0F62FE', outlineOffset: '2px' },
      },
      secondary: {
        base: { background: '#393939', foreground: '#FFFFFF', border: NONE },
        hover: { background: '#4C4C4C' },
        active: { background: '#6F6F6F' },
      },
      tertiary: {
        base: { background: TRANSPARENT, foreground: '#0F62FE', border: NONE },
        hover: { background: '#E5E5E5' },
        active: { background: '#C6C6C6' },
      },
      destructive: {
        base: { background: '#DA1E28', foreground: '#FFFFFF', border: NONE },
        hover: { background: '#BA1B23' },
        active: { background: '#750E13' },
      },
      icon: {
        base: { background: '#FFFFFF', foreground: '#161616', border: NONE },
        hover: { background: '#E5E5E5' },
        active: { background: '#C6C6C6' },
      },
    },
  },

  'Shopify Polaris': {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    surface: '#FFFFFF',
    error: '#E32929',
    focusRing: '#008060',
    disabled: {
      background: '#F3F4F6',
      foreground: '#6B7280',
      border: '1px solid #E5E7EB',
      shadow: NONE,
    },
    variants: {
      primary: {
        base: { background: '#008060', foreground: '#FFFFFF', border: '1px solid transparent', shadow: '0 1px 2px rgba(0,0,0,0.08)' },
        hover: { background: '#006E52' },
        active: { background: '#005E46' },
        focus: { outline: '2px solid #008060', outlineOffset: '2px' },
      },
      secondary: {
        base: { background: '#FFFFFF', foreground: '#202223', border: '1px solid #C9CCCF', shadow: '0 1px 2px rgba(0,0,0,0.08)' },
        hover: { background: '#F6F6F7' },
        active: { background: '#F1F2F3' },
      },
      tertiary: {
        base: { background: TRANSPARENT, foreground: '#202223', border: '1px solid transparent', shadow: NONE },
        hover: { background: '#F6F6F7' },
        active: { background: '#F1F2F3' },
      },
      destructive: {
        base: { background: '#E32929', foreground: '#FFFFFF', border: '1px solid transparent', shadow: '0 1px 2px rgba(0,0,0,0.08)' },
        hover: { background: '#BF1F1F' },
        active: { background: '#8F1717' },
      },
      icon: {
        base: { background: TRANSPARENT, foreground: '#202223', border: '1px solid transparent', shadow: NONE },
        hover: { background: '#F6F6F7' },
        active: { background: '#F1F2F3' },
      },
    },
  },

  'Ant Design': {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    surface: '#FFFFFF',
    error: '#FF4D4F',
    focusRing: 'rgba(22, 119, 255, 0.30)',
    disabled: {
      background: '#E5E7EB',
      foreground: 'rgba(0, 0, 0, 0.25)',
      border: '1px solid #D1D5DB',
      shadow: NONE,
    },
    variants: {
      primary: {
        base: { background: '#1677FF', foreground: '#FFFFFF', border: '1px solid transparent', shadow: '0 1px 2px rgba(0,0,0,0.04)' },
        hover: { background: '#4096FF' },
        active: { background: '#0958D9' },
        focus: { outline: '4px solid rgba(22, 119, 255, 0.30)' },
      },
      secondary: {
        base: { background: '#FFFFFF', foreground: 'rgba(0, 0, 0, 0.88)', border: '1px solid #D9D9D9' },
        hover: { foreground: '#4096FF', border: '1px solid #4096FF' },
        active: { foreground: '#0958D9', border: '1px solid #0958D9' },
      },
      tertiary: {
        base: { background: TRANSPARENT, foreground: '#1677FF', border: NONE, shadow: NONE },
        hover: { background: 'rgba(0, 0, 0, 0.04)' },
        active: { background: 'rgba(0, 0, 0, 0.08)' },
      },
      destructive: {
        base: { background: '#FF4D4F', foreground: '#FFFFFF', border: '1px solid transparent' },
        hover: { background: '#FF7875' },
        active: { background: '#D9363E' },
        focus: { outline: '4px solid rgba(255, 77, 79, 0.30)' },
      },
      icon: {
        base: { background: '#FFFFFF', foreground: 'rgba(0, 0, 0, 0.88)', border: '1px solid #D9D9D9' },
        hover: { foreground: '#4096FF', border: '1px solid #4096FF' },
        active: { foreground: '#0958D9', border: '1px solid #0958D9' },
      },
    },
  },
};

interface Geometry {
  height: string;
  padding: string;
  borderRadius: string;
  fontSize: string;
}

/** Геометрия снята с классов превью в ComparisonGrid. */
const GEOMETRY: Record<string, Partial<Record<ComponentType, Geometry>>> = {
  'Material Design 3': {
    button: { height: '48px', padding: '0.75rem 1.5rem', borderRadius: '9999px', fontSize: '14px' },
    input: { height: '56px', padding: '0.75rem 1rem', borderRadius: '4px 4px 0 0', fontSize: '16px' },
    switch: { height: '32px', padding: '0.25rem', borderRadius: '9999px', fontSize: '0' },
    select: { height: '56px', padding: '0.75rem 1rem', borderRadius: '4px', fontSize: '16px' },
    datepicker: { height: '56px', padding: '0.75rem 1rem', borderRadius: '4px', fontSize: '16px' },
    modal: { height: 'auto', padding: '1.5rem', borderRadius: '28px', fontSize: '14px' },
    radio: { height: '20px', padding: '0', borderRadius: '9999px', fontSize: '14px' },
    tag: { height: '32px', padding: '0 0.75rem', borderRadius: '8px', fontSize: '14px' },
  },
  'Fluent UI': {
    button: { height: '32px', padding: '0.5rem 1rem', borderRadius: '2px', fontSize: '14px' },
    input: { height: '32px', padding: '0.375rem 0.75rem', borderRadius: '2px', fontSize: '14px' },
    switch: { height: '20px', padding: '2px', borderRadius: '9999px', fontSize: '0' },
    select: { height: '32px', padding: '0.375rem 0.75rem', borderRadius: '2px', fontSize: '14px' },
    datepicker: { height: '32px', padding: '0.375rem 0.75rem', borderRadius: '2px', fontSize: '14px' },
    modal: { height: 'auto', padding: '1.5rem', borderRadius: '2px', fontSize: '14px' },
    radio: { height: '20px', padding: '0', borderRadius: '9999px', fontSize: '14px' },
    tag: { height: '24px', padding: '0 0.625rem', borderRadius: '4px', fontSize: '12px' },
  },
  Atlassian: {
    button: { height: '32px', padding: '0.5rem 1.25rem', borderRadius: '3px', fontSize: '14px' },
    input: { height: '36px', padding: '0.5rem 0.75rem', borderRadius: '3px', fontSize: '14px' },
    switch: { height: '20px', padding: '2px', borderRadius: '9999px', fontSize: '0' },
    select: { height: '36px', padding: '0.5rem 0.75rem', borderRadius: '3px', fontSize: '14px' },
    datepicker: { height: '36px', padding: '0.5rem 0.75rem', borderRadius: '3px', fontSize: '14px' },
    modal: { height: 'auto', padding: '1.5rem', borderRadius: '3px', fontSize: '14px' },
    radio: { height: '16px', padding: '0', borderRadius: '9999px', fontSize: '14px' },
    tag: { height: '20px', padding: '0 0.375rem', borderRadius: '4px', fontSize: '11px' },
  },
  'IBM Carbon': {
    button: { height: '48px', padding: '0.75rem 1.5rem', borderRadius: '0px', fontSize: '14px' },
    input: { height: '48px', padding: '0.75rem 1rem', borderRadius: '0px', fontSize: '14px' },
    switch: { height: '24px', padding: '3px', borderRadius: '9999px', fontSize: '0' },
    select: { height: '48px', padding: '0.75rem 1rem', borderRadius: '0px', fontSize: '14px' },
    datepicker: { height: '48px', padding: '0.75rem 1rem', borderRadius: '0px', fontSize: '14px' },
    modal: { height: 'auto', padding: '1rem', borderRadius: '0px', fontSize: '14px' },
    radio: { height: '18px', padding: '0', borderRadius: '9999px', fontSize: '14px' },
    tag: { height: '24px', padding: '0 0.5rem', borderRadius: '9999px', fontSize: '12px' },
  },
  'Shopify Polaris': {
    button: { height: '36px', padding: '0.5rem 1.5rem', borderRadius: '8px', fontSize: '14px' },
    input: { height: '36px', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '14px' },
    switch: { height: '24px', padding: '0.25rem', borderRadius: '9999px', fontSize: '0' },
    select: { height: '36px', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '14px' },
    datepicker: { height: '36px', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '14px' },
    modal: { height: 'auto', padding: '1.25rem', borderRadius: '12px', fontSize: '14px' },
    radio: { height: '18px', padding: '0', borderRadius: '9999px', fontSize: '14px' },
    tag: { height: '22px', padding: '0 0.5rem', borderRadius: '6px', fontSize: '12px' },
  },
  'Ant Design': {
    button: { height: '32px', padding: '0.5rem 1.5rem', borderRadius: '6px', fontSize: '14px' },
    input: { height: '36px', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '14px' },
    switch: { height: '22px', padding: '2px', borderRadius: '9999px', fontSize: '0' },
    select: { height: '36px', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '14px' },
    datepicker: { height: '36px', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '14px' },
    modal: { height: 'auto', padding: '1rem 1.5rem', borderRadius: '8px', fontSize: '14px' },
    radio: { height: '16px', padding: '0', borderRadius: '9999px', fontSize: '14px' },
    tag: { height: '22px', padding: '0 0.5rem', borderRadius: '2px', fontSize: '12px' },
  },
};

const FALLBACK_GEOMETRY: Geometry = {
  height: 'auto',
  padding: '0',
  borderRadius: '0px',
  fontSize: '14px',
};

/**
 * У неинтерактивных компонентов вариант не выбирается — они всегда рисуются
 * акцентным цветом системы, поэтому вариант схлопывается в primary.
 */
const VARIANTLESS: ComponentType[] = ['input', 'switch', 'select', 'datepicker', 'radio', 'tag'];

function resolveVariant(spec: SystemSpec, componentType: ComponentType, variant: ComponentVariant): VariantSpec {
  const effective: ComponentVariant = VARIANTLESS.includes(componentType)
    ? 'primary'
    : variant === 'default'
      ? 'primary'
      : variant;

  return (
    spec.variants[effective] ??
    spec.variants.primary ?? {
      base: { background: TRANSPARENT, foreground: '#000000', border: NONE },
    }
  );
}

export function getDesignTokens(
  systemName: string,
  componentType: ComponentType,
  variant: ComponentVariant,
  state: ComponentState
) {
  const spec = SYSTEMS[systemName];

  if (!spec) {
    return { system: systemName, component: componentType, variant, state };
  }

  const variantSpec = resolveVariant(spec, componentType, variant);
  const geometry = GEOMETRY[systemName]?.[componentType] ?? FALLBACK_GEOMETRY;

  const colors: Record<string, string> = {
    background: variantSpec.base.background,
    foreground: variantSpec.base.foreground,
    border: variantSpec.base.border,
    surface: spec.surface,
  };

  const effects: Record<string, string | number> = {
    shadow: variantSpec.base.shadow ?? NONE,
    opacity: 1,
    cursor: 'pointer',
  };

  const apply = (fx?: StateFx) => {
    if (!fx) return;
    if (fx.background) colors.background = fx.background;
    if (fx.foreground) colors.foreground = fx.foreground;
    if (fx.border) colors.border = fx.border;
    if (fx.shadow) effects.shadow = fx.shadow;
    if (fx.filter) effects.filter = fx.filter;
    if (fx.transform) effects.transform = fx.transform;
    if (fx.outline) {
      effects.outline = fx.outline;
      if (fx.outlineOffset) effects.outlineOffset = fx.outlineOffset;
    }
  };

  switch (state) {
    case 'hover':
      apply(variantSpec.hover);
      break;

    case 'focus':
      apply(variantSpec.focus ?? { outline: `2px solid ${spec.focusRing}`, outlineOffset: '2px' });
      break;

    case 'disabled':
      apply(spec.disabled);
      effects.opacity = 0.5;
      effects.cursor = 'not-allowed';
      break;

    case 'error':
      colors.border = `2px solid ${spec.error}`;
      colors.error = spec.error;
      effects.outline = `2px solid ${spec.error}`;
      effects.outlineOffset = '2px';
      break;

    case 'loading':
      effects.opacity = 0.8;
      effects.cursor = 'wait';
      break;

    case 'open':
      effects.shadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
      effects.zIndex = 50;
      break;

    // alert / transactional / acknowledgment описываются вариантом модалки,
    // отдельного визуального состояния у контейнера нет.
    default:
      break;
  }

  return {
    system: systemName,
    component: componentType,
    variant: VARIANTLESS.includes(componentType) ? 'default' : variant,
    state,
    colors,
    spacing: {
      height: geometry.height,
      padding: geometry.padding,
    },
    borderRadius: geometry.borderRadius,
    typography: {
      fontFamily: spec.fontFamily,
      fontSize: geometry.fontSize,
      fontWeight: 500,
    },
    effects,
  };
}

/** Плоское представление токенов — для режима сравнения различий. */
export function flattenTokens(tokens: ReturnType<typeof getDesignTokens>): Record<string, string> {
  const flat: Record<string, string> = {};

  const walk = (value: unknown, path: string) => {
    if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) {
        walk(child, path ? `${path}.${key}` : key);
      }
      return;
    }
    flat[path] = String(value);
  };

  const { system: _system, component: _component, variant: _variant, state: _state, ...rest } = tokens as Record<string, unknown>;
  walk(rest, '');

  return flat;
}
