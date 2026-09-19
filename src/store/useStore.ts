import { create } from 'zustand';
import { ComponentType, ComponentState, ComponentVariant } from '../App';

export type ViewMode = 'showcase' | 'table';

interface AppState {
  activeComponent: ComponentType;
  activeState: ComponentState;
  activeVariant: ComponentVariant;
  searchQuery: string;
  viewMode: ViewMode;
  setActiveComponent: (component: ComponentType) => void;
  setActiveState: (state: ComponentState) => void;
  setActiveVariant: (variant: ComponentVariant) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
}

export const useStore = create<AppState>((set) => ({
  activeComponent: 'button',
  activeState: 'default',
  activeVariant: 'primary',
  searchQuery: '',
  viewMode: 'showcase',
  setActiveComponent: (component) => set({ activeComponent: component }),
  setActiveState: (state) => set({ activeState: state }),
  setActiveVariant: (variant) => set({ activeVariant: variant }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
}));
