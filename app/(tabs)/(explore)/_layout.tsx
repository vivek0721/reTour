import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="index" 
      />
      <Stack.Screen
        name="product" 
      />
    </Stack>
  );
}
