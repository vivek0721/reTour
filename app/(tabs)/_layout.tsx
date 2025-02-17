import React from 'react';
import {  Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router/stack'
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  return (
        <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8A2BE2",
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: () => <Ionicons name="home" size={24} color="#8A2BE2"/>,
          
        }}
      />
      <Tabs.Screen
        name="(explore)"
        options={{
          title: 'Explore',
          tabBarIcon: () => <Ionicons name="compass" size={24} color="#8A2BE2" />,
        }}
      />
    </Tabs>
  );
}
