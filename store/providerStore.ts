import { Providers } from '@/constants/Providers';
import { Provider } from '@/types/types';
import { create } from 'zustand';

interface ProviderState {
  providers: Provider[];
  updateProviders: (newProviders: Provider[]) => void;
}

export const useProviderStore = create<ProviderState>()((set) => ({
  providers: Providers,
  updateProviders: (newProviders: Provider[]) => {
    set({ providers: newProviders });
  },
}));
