import { create } from 'zustand';
import { ComponentType, ComponentState, ComponentVariant } from '../App';

interface AppState {
  activeComponent: ComponentType;
  activeState: ComponentState;
  activeVariant: ComponentVariant;
  searchQuery: string;
  setActiveComponent: (component: ComponentType) => void;
  setActiveState: (state: ComponentState) => void;
  setActiveVariant: (variant: ComponentVariant) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>((set) => ({
  activeComponent: 'button',
  activeState: 'default',
  activeVariant: 'primary',
  searchQuery: '',
  setActiveComponent: (component) => set({ activeComponent: component }),
  setActiveState: (state) => set({ activeState: state }),
  setActiveVariant: (variant) => set({ activeVariant: variant }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
