import { Availability, Provider } from '@/types/types';
import { create } from 'zustand';

const providers = require('../constants/providers.json');

interface ProviderState {
  providers: Provider[];
  updateProviders: (
    providerID: number,
    timeIndex: number,
    date: string
  ) => void;
}

export const useProviderStore = create<ProviderState>()((set) => ({
  providers: providers,
  updateProviders: (providerID: number, timeIndex: number, date: string) => {
    providers
      .find((providers: Provider) => providers.date == date)
      .availability.find(
        (provider: Availability) => provider.providerID == providerID
      )
      .times.splice(timeIndex, 1);
  },
}));
