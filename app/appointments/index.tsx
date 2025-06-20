import CalendarModal from '@/components/CalendarModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import { Availability } from '@/types/types';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useProviderStore } from '../../store/providerStore';

export default function AppointmentsScreen() {
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
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
        accessible
        accessibilityRole='button'
        accessibilityLabel='Back button'
      >
        <FontAwesome6 name='laptop-medical' size={24} color='#8ba49a' />
      </Pressable>
      <FlashList
        data={providersAvailable}
        estimatedItemSize={5}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Schedule a visit</Text>
            <Text style={styles.headerBody}>
              Choose a date to see availability
            </Text>
            <Pressable>
              <CalendarModal
                dateSelected={dateSelected}
                setDate={setDate}
                setProvidersAvailable={setProvidersAvailable}
              />
            </Pressable>
          </View>
        }
        renderItem={({ item }: { item: Availability }) => (
          <View style={styles.providerContainer}>
            <View style={styles.infoContainer}>
              <FontAwesome6 name='image-portrait' size={48} color='grey' />

              <Text style={styles.providerName}>{item.name}</Text>
            </View>
            <View style={styles.timeContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.times.map((time: string, index: number) => (
                  <Pressable
                    key={index}
                    style={styles.time}
                    onPress={() =>
                      setAppointment(item.name, time, item.providerID, index)
                    }
                    accessible
                    accessibilityRole='button'
                  >
                    <Text style={styles.timeText}>{time}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
      />
      <ConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        appointmentData={appointmentData}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  backButton: { alignSelf: 'flex-start', paddingLeft: 12, paddingTop: 12 },
  headerText: {
    fontFamily: 'bold',
    fontSize: 24,
    paddingBottom: 8,
    color: '#8ba49a',
  },
  headerBody: {
    fontFamily: 'regular',
    fontSize: 16,
    paddingBottom: 12,
    color: '#8ba49a',
  },
  providerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: '#8ba49a',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  infoContainer: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  providerName: {
    alignSelf: 'center',
    paddingLeft: 8,
    fontFamily: 'bold',
    color: '#d2c49e',
    fontSize: 18,
  },
  timeContainer: { flexDirection: 'row' },
  time: {
    backgroundColor: 'rgba(210,196,158,.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 6,
    padding: 6,
    margin: 6,
  },
  timeText: { color: '#3b6255', fontFamily: 'bold' },
});
