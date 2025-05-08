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
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    time: '',
  });
  const { providers } = useProviderStore();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={providers}
        ListHeaderComponent={
          <View>
            <Text>Make an appointment</Text>
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
                    onPress={() => {
                      setAppointmentData({ name: item.name, time: time });
                    }}
                  >
                    <Text>{time}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
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
