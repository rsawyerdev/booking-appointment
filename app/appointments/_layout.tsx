import { Stack } from 'expo-router';
import React from 'react';

export default function AppointmentsLayout() {
  return (
    <Stack screenOptions={() => ({ headerShown: false })}>
      <Stack.Screen
        name='index'
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack>
  );
}
