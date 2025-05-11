import { Button } from '@/components/Button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View
      style={{
        backgroundColor: 'rgba(203,222,211,.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: 'center',

          backgroundColor: '#cbded3',
          flex: 0.5,
          borderRadius: 4,
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
        <Text style={{ fontFamily: 'regular' }}>Welcome to the home page </Text>
        <MaterialIcons name='family-restroom' size={24} color='black' />
      </View>
      <Button
        title='Book an appointment'
        onButtonPress={() => router.push('/appointments')}
        textColor='#e2dfda'
        backgroundColor='#3b6255'
      />
    </View>
  );
}
