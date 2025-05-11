import { useProviderStore } from '@/store/providerStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Alert, Modal, Pressable, Text, View } from 'react-native';

export default function CalendarModal(props: any) {
  const { dateSelected, setDate, setProvidersAvailable } = props;
  const { providers } = useProviderStore();

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
          style={{
            backgroundColor: 'white',
            marginTop: 0,
          }}
          animationType='fade'
          transparent={true}
          statusBarTranslucent={true}
        >
          <View
            style={{
              // backgroundColor: 'rgba(0, 0, 0, 0.6)',
              marginTop: 120,
              marginLeft: 30,
              marginRight: 40,
            }}
          >
            <DateTimePicker
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.1)',
              }}
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
        <Pressable onPress={() => setShow(true)}>
          <Text>
            {dateSelected
              ? dateSelected.toLocaleDateString('en-US', options)
              : 'select'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
