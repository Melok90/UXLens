import { create } from 'zustand';
import { ComponentType, ComponentState, ComponentVariant } from '../App';

export type ViewMode = 'showcase' | 'table';
export type PlatformFilter = 'all' | 'web' | 'mobile';

interface AppState {
  activeComponent: ComponentType;
  activeState: ComponentState;
  activeVariant: ComponentVariant;
  searchQuery: string;
  viewMode: ViewMode;
  platformFilter: PlatformFilter;
  isAiAdvisorOpen: boolean;
  inspectSystem: string | null;
  customText: string;
  customBrandColor: string | null;
  isRtl: boolean;
  setActiveComponent: (component: ComponentType) => void;
  setActiveState: (state: ComponentState) => void;
  setActiveVariant: (variant: ComponentVariant) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setPlatformFilter: (platform: PlatformFilter) => void;
  setIsAiAdvisorOpen: (open: boolean) => void;
  setInspectSystem: (system: string | null) => void;
  setCustomText: (text: string) => void;
  setCustomBrandColor: (color: string | null) => void;
  setIsRtl: (rtl: boolean) => void;
  resetPlayground: () => void;
}

export const useStore = create<AppState>((set) => ({
  activeComponent: 'button',
  activeState: 'default',
  activeVariant: 'primary',
  searchQuery: '',
  viewMode: 'showcase',
  platformFilter: 'all',
  isAiAdvisorOpen: false,
  inspectSystem: null,
  customText: '',
  customBrandColor: null,
  isRtl: false,
  setActiveComponent: (component) => set({ activeComponent: component }),
  setActiveState: (state) => set({ activeState: state }),
  setActiveVariant: (variant) => set({ activeVariant: variant }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setPlatformFilter: (platform) => set({ platformFilter: platform }),
  setIsAiAdvisorOpen: (open) => set({ isAiAdvisorOpen: open }),
  setInspectSystem: (system) => set({ inspectSystem: system }),
  setCustomText: (text) => set({ customText: text }),
  setCustomBrandColor: (color) => set({ customBrandColor: color }),
  setIsRtl: (rtl) => set({ isRtl: rtl }),
  resetPlayground: () => set({ customText: '', customBrandColor: null, isRtl: false }),
}));
