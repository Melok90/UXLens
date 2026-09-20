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
  setActiveComponent: (component: ComponentType) => void;
  setActiveState: (state: ComponentState) => void;
  setActiveVariant: (variant: ComponentVariant) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setPlatformFilter: (platform: PlatformFilter) => void;
  setIsAiAdvisorOpen: (open: boolean) => void;
  setInspectSystem: (system: string | null) => void;
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
  setActiveComponent: (component) => set({ activeComponent: component }),
  setActiveState: (state) => set({ activeState: state }),
  setActiveVariant: (variant) => set({ activeVariant: variant }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setPlatformFilter: (platform) => set({ platformFilter: platform }),
  setIsAiAdvisorOpen: (open) => set({ isAiAdvisorOpen: open }),
  setInspectSystem: (system) => set({ inspectSystem: system }),
}));
