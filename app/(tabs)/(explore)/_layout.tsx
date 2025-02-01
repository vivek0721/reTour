import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
          <Text style={{ color: '#8A2BE2' }}>Explore</Text>
        </Text>
      ),
      headerShown: true
    }}
      />
      <Stack.Screen
        name="product" 
        options={{ title: "" , headerShown: true }}
      />
    </Stack>
    </ProductContextProvider>
  );
}
