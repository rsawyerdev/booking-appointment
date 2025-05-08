import { router, useLocalSearchParams } from 'expo-router';
import { Button, SafeAreaView, Text } from 'react-native';

export default function Confirmation() {
  const { bookingTime, provider } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text>
        Your appointment has been scheduled at {bookingTime} with {provider}
      </Text>
      <Button title='Done' onPress={() => router.replace('/')} />
    </SafeAreaView>
  );
}
