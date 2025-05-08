import { router } from 'expo-router';
import { Button, Modal, Pressable, Text, View } from 'react-native';

export default function ConfirmationModal(props: any) {
  const { modalVisible, setModalVisible, appointmentData } = props;

  const confirm = () => {
    router.navigate({
      pathname: '/confirmation',
      params: {
        bookingTime: appointmentData.time,
        provider: appointmentData.name,
      },
    });
    setModalVisible(false);
  };
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      // backdropColor={'rgba(0,0,0,.9)'}
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
            Do you want to book an appointment at {appointmentData.time} with
            {appointmentData.name}
          </Text>
          <Button title='Cancel' onPress={() => setModalVisible(false)} />
          <Button title='Confirm' onPress={confirm} />
        </View>
      </Pressable>
    </Modal>
  );
}
