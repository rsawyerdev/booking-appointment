import { Provider } from '@/types/types';
import { create } from 'zustand';

const providers = require('../constants/providers.json');

interface ProviderState {
  providers: Provider[];
  updateProviders: (newProviders: Provider[]) => void;
}

export const useProviderStore = create<ProviderState>()((set) => ({
  providers: providers,
  updateProviders: (newProviders: Provider[]) => {
    set({ providers: newProviders });
  },
}));
