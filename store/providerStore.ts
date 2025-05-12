import { Availability, Provider } from '@/types/types';
import { create } from 'zustand';

const providersList = require('../constants/providers.json');

interface ProviderState {
  providers: Provider[];
  updateProviders: (
    providerID: number,
    timeIndex: number,
    date: string
  ) => void;
  screenReaderEnabled: boolean;
  setScreenReaderEnabled: (value: boolean) => void;
}

export const useProviderStore = create<ProviderState>()((set) => ({
  providers: providersList,
  updateProviders: (providerID: number, timeIndex: number, date: string) => {
    providersList
      .find((providers: Provider) => providers.date == date)
      .availability.find(
        (provider: Availability) => provider.providerID == providerID
      )
      .times.splice(timeIndex, 1);
  },
  screenReaderEnabled: false,
  setScreenReaderEnabled: (value: boolean) =>
    set({ screenReaderEnabled: value }),
}));
