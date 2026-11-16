import { create } from 'zustand';
import { TreeGraphFilter } from '@/types/family';

interface TreeStoreState {
  treeId: string | null;
  filter: TreeGraphFilter;
  rootPersonName: string | null;
  activeView: 'graph' | 'directory' | 'book';

  setTreeId: (treeId: string | null) => void;
  setBranch: (branchId?: string) => void;
  setGenerationRange: (min?: number, max?: number) => void;
  setRootPerson: (rootPersonId?: string, rootPersonName?: string) => void;
  resetFilter: () => void;
  setActiveView: (view: 'graph' | 'directory' | 'book') => void;
}

export const useTreeStore = create<TreeStoreState>((set) => ({
  treeId: null,
  filter: {},
  rootPersonName: null,
  activeView: 'graph',

  setTreeId: (treeId) => set({ treeId }),

  setBranch: (branchId) =>
    set((state) => ({
      filter: {
        ...state.filter,
        branchId: branchId || undefined,
      },
    })),

  setGenerationRange: (minGeneration, maxGeneration) =>
    set((state) => ({
      filter: {
        ...state.filter,
        minGeneration,
        maxGeneration,
      },
    })),

  setRootPerson: (rootPersonId, rootPersonName) =>
    set((state) => ({
      filter: {
        ...state.filter,
        rootPersonId: rootPersonId || undefined,
      },
      rootPersonName: rootPersonName || null,
    })),

  resetFilter: () =>
    set({
      filter: {},
      rootPersonName: null,
    }),

  setActiveView: (activeView) => set({ activeView }),
}));
