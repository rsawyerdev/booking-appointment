import ConfirmationModal from '@/components/ConfirmationModal';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useProviderStore } from '../store/providerStore';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    time: '',
    providerID: NaN,
    timeIndex: NaN,
  });
  const { providers } = useProviderStore();

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
    });
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={providers}
        ListHeaderComponent={
          <View>
            <Text>Make an appointment</Text>
            <Text>Choose a date to see availability</Text>
            <Text>NEXT AVAILABLE</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.providerContainer}>
            <View style={styles.infoContainer}>
              <FontAwesome6 name='image-portrait' size={48} color='grey' />

              <Text style={styles.providerName}>{item.name}</Text>
            </View>
            <View style={styles.timeContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.availability.map((time, index) => (
                  <Pressable
                    key={index}
                    style={styles.time}
                    onPress={() =>
                      setAppointment(item.name, time, item.id, index)
                    }
                  >
                    <Text>{time}</Text>
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
