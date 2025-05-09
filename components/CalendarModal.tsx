import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

export default function CalendarModal(props: any) {
  const { dateSelected, setDate, setProvidersAvailable } = props;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateSelected;
    setShow(false);
    setDate(currentDate);
    setProvidersAvailable();
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
