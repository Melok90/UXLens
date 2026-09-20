import { create } from 'zustand';
import { ComponentType, ComponentState, ComponentVariant } from '../App';

export type ViewMode = 'showcase' | 'table';

interface AppState {
  activeComponent: ComponentType;
  activeState: ComponentState;
  activeVariant: ComponentVariant;
  searchQuery: string;
  viewMode: ViewMode;
  isAiAdvisorOpen: boolean;
  inspectSystem: string | null;
  setActiveComponent: (component: ComponentType) => void;
  setActiveState: (state: ComponentState) => void;
  setActiveVariant: (variant: ComponentVariant) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setIsAiAdvisorOpen: (open: boolean) => void;
  setInspectSystem: (system: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  activeComponent: 'button',
  activeState: 'default',
  activeVariant: 'primary',
  searchQuery: '',
  viewMode: 'showcase',
  isAiAdvisorOpen: false,
  inspectSystem: null,
  setActiveComponent: (component) => set({ activeComponent: component }),
  setActiveState: (state) => set({ activeState: state }),
  setActiveVariant: (variant) => set({ activeVariant: variant }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setIsAiAdvisorOpen: (open) => set({ isAiAdvisorOpen: open }),
  setInspectSystem: (system) => set({ inspectSystem: system }),
}));
