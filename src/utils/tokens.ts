import { ComponentState, ComponentType, ComponentVariant } from '../App';

export function getDesignTokens(
  systemName: string,
  componentType: ComponentType,
  variant: ComponentVariant,
  state: ComponentState
) {
  // Base structural tokens
  const tokens: any = {
    system: systemName,
    component: componentType,
    variant: variant,
    state: state,
    colors: {},
    spacing: {},
    typography: {},
    borderRadius: {}
  };

  switch (systemName) {
    case "Material Design 3":
      tokens.colors.primary = "#006494";
      tokens.colors.onPrimary = "#FFFFFF";
      tokens.colors.surface = "#FEF7FF";
      tokens.typography.fontFamily = "Roboto, sans-serif";
      tokens.borderRadius.full = "9999px";
      tokens.borderRadius.medium = "12px";
      tokens.spacing.padding = "0.75rem 1.5rem";
      break;
    case "Fluent UI":
      tokens.colors.primary = "#0078D4";
      tokens.colors.onPrimary = "#FFFFFF";
      tokens.colors.surface = "#FFFFFF";
      tokens.typography.fontFamily = "Segoe UI, sans-serif";
      tokens.borderRadius.small = "2px";
      tokens.spacing.padding = "0.25rem 0.5rem";
      break;
    case "Atlassian":
      tokens.colors.primary = "#0052CC";
      tokens.colors.onPrimary = "#FFFFFF";
      tokens.colors.surface = "#FFFFFF";
      tokens.typography.fontFamily = "-apple-system, BlinkMacSystemFont, sans-serif";
      tokens.borderRadius.small = "3px";
      tokens.spacing.padding = "0.5rem 1.25rem";
      break;
    case "IBM Carbon":
      tokens.colors.primary = "#0f62fe";
      tokens.colors.onPrimary = "#FFFFFF";
      tokens.colors.surface = "#FFFFFF";
      tokens.typography.fontFamily = "'IBM Plex Sans', sans-serif";
      tokens.borderRadius.none = "0px";
      tokens.spacing.padding = "0.875rem 1rem";
      break;
    case "Shopify Polaris":
      tokens.colors.primary = "#008060";
      tokens.colors.onPrimary = "#FFFFFF";
      tokens.colors.surface = "#FFFFFF";
      tokens.typography.fontFamily = "-apple-system, BlinkMacSystemFont, sans-serif";
      tokens.borderRadius.large = "8px";
      tokens.spacing.padding = "0.5rem 1.5rem";
      break;
    case "Ant Design":
      tokens.colors.primary = "#1677ff";
      tokens.colors.onPrimary = "#FFFFFF";
      tokens.colors.surface = "#FFFFFF";
      tokens.typography.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      tokens.borderRadius.medium = "6px";
      tokens.spacing.padding = "0.25rem 1rem";
      break;
    default:
      tokens.colors.primary = "#000000";
      tokens.colors.onPrimary = "#FFFFFF";
  }

  // Common adjustments
  if (state === 'disabled') {
    tokens.colors.opacity = "0.5";
    tokens.cursor = "not-allowed";
  }

  return tokens;
}
