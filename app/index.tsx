import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './home';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    bold: Inter_900Black,
    medium: Inter_600SemiBold,
    regular: Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
