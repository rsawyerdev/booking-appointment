import { Button } from '@/components/Button';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Confirmation() {
  const { bookingTime, provider, bookingDate } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.confirmationText}>
          Your appointment has been scheduled!
        </Text>
        <Text style={styles.confirmationText}>
          See you on {bookingDate} at {bookingTime} for your appointment with{' '}
          {provider}.
        </Text>
      </View>
      <Button
        title='Return Home'
        onButtonPress={() => router.replace('/')}
        textColor='#e2dfda'
        backgroundColor='#3b6255'
        styleProps={{
          width: '50%',
          alignSelf: 'center',
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 24, justifyContent: 'space-evenly' },
  confirmationText: {
    fontFamily: 'medium',
    fontSize: 28,
    color: '#8ba49a',
    textAlign: 'center',
    paddingBottom: 12,
  },
});
