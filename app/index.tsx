import { Availability } from '@/types/types';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useProviderStore } from '../store/providerStore';
import Home from './home';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dateSelected, setDate] = useState<Date>(new Date());
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    time: '',
    date: '',
    providerID: NaN,
    timeIndex: NaN,
  });
  const { providers } = useProviderStore();

  const [providersAvailable, setProvidersAvailable] =
    useState<Availability[]>();

  useEffect(() => {
    if (!providersAvailable)
      setProvidersAvailable(
        providers.find(
          (provider) =>
            provider.date == dateSelected.toLocaleDateString('en-US')
        )?.availability
      );
  }, [providersAvailable, providers]);

  const setAppointment = (
    provider: string,
    time: string,
    providerID: number,
    timeIndex: number
  ) => {
    setAppointmentData({
      name: provider,
      time: time,
      providerID: providerID,
      timeIndex: timeIndex,
      date: dateSelected.toLocaleDateString('en-US'),
    });
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  providerContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    padding: 12,
    margin: 12,
    borderRadius: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  providerName: {
    alignSelf: 'center',
    paddingLeft: 8,
  },
  timeContainer: { flexDirection: 'row' },
  time: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    borderRadius: 6,
    padding: 6,
    marginHorizontal: 2,
  },
});
