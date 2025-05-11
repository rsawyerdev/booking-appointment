import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>Welcome to the home page </Text>
      <Button
        title='Book an appointment'
        onPress={() => router.push('/appointments')}
      />
    </View>
  );
}
