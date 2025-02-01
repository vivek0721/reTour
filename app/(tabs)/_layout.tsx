import React from 'react';
import {  Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';



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
          tabBarIcon: () => <Feather name="home" size={24} color="#8A2BE2"/>,
          
        }}
      />
      <Tabs.Screen
        name="(explore)"
        options={{
          title: 'Explore',
          tabBarIcon: () => <Feather name="compass" size={24} color="#8A2BE2" />,
        }}
      />
    </Tabs>
  
  );
}
