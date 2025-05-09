import { useProviderStore } from '@/store/providerStore';
import { router } from 'expo-router';
import { Button, Modal, Pressable, Text, View } from 'react-native';

export default function ConfirmationModal(props: any) {
  const { modalVisible, setModalVisible, appointmentData } = props;
  const { updateProviders } = useProviderStore();
  const { time, name, providerID, timeIndex, date } = appointmentData;

  const confirm = () => {
    updateProviders(providerID, timeIndex, date);
    router.navigate({
      pathname: '/confirmation',
      params: {
        bookingTime: time,
        provider: name,
      },
    });
    setModalVisible(false);
  };
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={{
          backgroundColor: 'rgba(0,0,0,.5)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setModalVisible(false)}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text>
            Do you want to book an appointment at {time} with {name}
          </Text>
          <Button title='Cancel' onPress={() => setModalVisible(false)} />
          <Button title='Confirm' onPress={confirm} />
        </View>
      </Pressable>
    </Modal>
  );
}
