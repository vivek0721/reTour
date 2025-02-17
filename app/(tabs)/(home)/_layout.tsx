import React from 'react';

import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { ProductContextProvider } from '@/app/context/useProductContext';

export default function TabLayout() {
  

  return (
    <ProductContextProvider>

    
    <Stack>
      <Stack.Screen
        name="index"
      options={{
        headerTitle: () => (
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        <Text style={{ color: '#FFD700' }}>re</Text>
        <Text style={{ color: '#8A2BE2' }}>Tour</Text>
      </Text>
    ),
    headerShown: true
  }}
/>
      <Stack.Screen
        name="search"
        options={{ title: "Register a Lost Item" , headerShown: true }}
      />
      <Stack.Screen
        name="found"
        options={{ title: "Register a Found Item" , headerShown: true }}
      />

    </Stack>
    </ProductContextProvider>
  );
}
