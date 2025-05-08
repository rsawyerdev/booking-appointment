import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { useProviderStore } from '../store/providerStore';

export default function HomeScreen() {
  const { providers } = useProviderStore();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={providers}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
