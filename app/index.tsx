import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './home';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
