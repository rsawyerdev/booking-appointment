import { Button } from '@/components/Button';
import { useProviderStore } from '@/store/providerStore';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { AccessibilityInfo, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const { setScreenReaderEnabled } = useProviderStore();

  useEffect(() => {
    const screenReaderChangedSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (isScreenReaderEnabled) => {
        setScreenReaderEnabled(isScreenReaderEnabled);
      }
    );

    AccessibilityInfo.isScreenReaderEnabled().then((isScreenReaderEnabled) => {
      setScreenReaderEnabled(isScreenReaderEnabled);
    });

    return () => {
      screenReaderChangedSubscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.headerText}>Welcome home!</Text>
        <FontAwesome6 name='laptop-medical' size={100} color='#8ba49a' />
        <Text style={styles.bodyText}>
          Book an appointment with your favorite provider
        </Text>
      </View>
      <View
        style={styles.buttonContainer}
        accessible
        accessibilityRole='button'
      >
        <Button
          title='Book an appointment'
          onButtonPress={() => router.push('/appointments')}
          textColor='#e2dfda'
          backgroundColor='#3b6255'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 32,
    backgroundColor: '#cbded3',
    flex: 1,
    marginVertical: 36,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: { fontFamily: 'bold', color: '#3b6255', fontSize: 24 },
  bodyText: {
    fontFamily: 'regular',
    color: '#3b6255',
    fontSize: 18,
    maxWidth: 220,
    textAlign: 'center',
  },
  buttonContainer: { paddingBottom: 12 },
});
