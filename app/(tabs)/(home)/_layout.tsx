import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';



export default function TabLayout() {
  

  return (
    <Stack
      >
      <Stack.Screen
        name="index"
        options={{ title: "Home" , headerShown: true }}
      />
      <Stack.Screen
        name="search"
        options={{ title: "Register a lost item" , headerShown: true }}
      />
      <Stack.Screen
        name="found"
        options={{ title: "Register a Found Item" , headerShown: true }}
       
      />

    </Stack>
  );
}
