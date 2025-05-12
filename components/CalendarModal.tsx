import { useProviderStore } from '@/store/providerStore';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CalendarModal(props: any) {
  const { dateSelected, setDate, setProvidersAvailable } = props;
  const { providers, screenReaderEnabled } = useProviderStore();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateSelected;
    if (
      providers.find(
        ({ date }) => date == currentDate.toLocaleDateString('en-US')
      )
    ) {
      setShow(false);
      setDate(currentDate);
      setProvidersAvailable();
    } else {
      Alert.alert(
        'No providers are avilable on this day.  Please select a new day'
      );
    }
  };

  return (
    <View>
      {show ? (
        <Modal
          style={styles.modalContainer}
          animationType='fade'
          transparent={true}
          statusBarTranslucent={true}
        >
          <View style={styles.calendarContainer}>
            <DateTimePicker
              style={[
                styles.datePicker,
                { backgroundColor: screenReaderEnabled ? 'black' : 'white' },
              ]}
              testID='dateTimePicker'
              value={dateSelected}
              mode={'date'}
              display='inline'
              onChange={onChange}
              maximumDate={new Date(2025, 4, 18)}
              minimumDate={new Date(2025, 4, 9)}
            />
          </View>
        </Modal>
      ) : (
        <Pressable
          onPress={() => setShow(true)}
          style={styles.container}
          accessible
          accessibilityLabel={`The date selected is ${dateSelected.toLocaleDateString(
            'en-US',
            options
          )}. Select here to change the date`}
          accessibilityRole='button'
        >
          <Text style={styles.closedModalText}>
            {dateSelected
              ? dateSelected.toLocaleDateString('en-US', options)
              : 'select'}
          </Text>
          <FontAwesome6 name='calendar-alt' size={48} color='#8ba49a' />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  modalContainer: {
    backgroundColor: 'white',
    marginTop: 0,
  },
  closedModalText: {
    fontFamily: 'bold',
    color: '#8ba49a',
  },
  calendarContainer: {
    marginTop: 120,
    marginLeft: 30,
    marginRight: 40,
  },
  datePicker: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
