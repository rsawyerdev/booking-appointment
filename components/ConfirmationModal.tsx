import { useProviderStore } from '@/store/providerStore';
import { router } from 'expo-router';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';

export default function ConfirmationModal(props: any) {
  const { modalVisible, setModalVisible, appointmentData } = props;
  const { updateProviders, screenReaderEnabled } = useProviderStore();
  const { time, name, providerID, timeIndex, date } = appointmentData;

  const confirm = () => {
    updateProviders(providerID, timeIndex, date);
    router.navigate({
      pathname: '/confirmation',
      params: {
        bookingTime: time,
        provider: name,
        bookingDate: date,
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
      {screenReaderEnabled ? (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>
              Do you want to book an appointment at {time} on {date} with {name}
              ?
            </Text>
            <View style={styles.buttonContainer}>
              <View accessible accessibilityRole='button'>
                <Button
                  title='Cancel'
                  onButtonPress={() => setModalVisible(false)}
                  textColor='#e2dfda'
                  backgroundColor='#3b6255'
                  styleProps={{ margin: 8 }}
                />
              </View>
              <View accessible accessibilityRole='button'>
                <Button
                  title='Confirm'
                  onButtonPress={confirm}
                  textColor='#e2dfda'
                  backgroundColor='#3b6255'
                  styleProps={{ margin: 8 }}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Pressable
          style={styles.container}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.text}>
              Do you want to book an appointment at {time} on {date} with {name}
              ?
            </Text>
            <View style={styles.buttonContainer}>
              <View accessible accessibilityRole='button'>
                <Button
                  title='Cancel'
                  onButtonPress={() => setModalVisible(false)}
                  textColor='#e2dfda'
                  backgroundColor='#3b6255'
                  styleProps={{ margin: 8 }}
                  accessible
                  accessibilityRole='button'
                />
              </View>
              <View accessible accessibilityRole='button'>
                <Button
                  title='Confirm'
                  onButtonPress={confirm}
                  textColor='#e2dfda'
                  backgroundColor='#3b6255'
                  styleProps={{ margin: 8 }}
                  accessible
                  accessibilityRole='button'
                />
              </View>
            </View>
          </View>
        </Pressable>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    margin: 20,
    backgroundColor: '#e2dfda',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontFamily: 'regular',
    textAlign: 'center',
    fontSize: 16,
    color: '#3b6255',
    paddingBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
