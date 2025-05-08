import { Provider } from '@/types/types';
import { create } from 'zustand';

const providers = require('../constants/providers.json');

interface ProviderState {
  providers: Provider[];
  updateProviders: (providerID: number, timeIndex: number) => void;
}

export const useProviderStore = create<ProviderState>()((set) => ({
  providers: providers,
  updateProviders: (providerID: number, timeIndex: number) => {
    providers
      .find((provider: Provider) => provider.id == providerID)
      .availability.splice(timeIndex, 1);
  },
}));
