import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';

export default function TabOneScreen() {
  const router = useRouter();
  const navigation= useNavigation();


  const renderButton = (icon, text, color, refer) => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={() => router.push(refer)}  >
        <Ionicons name={icon} size={125} color="#FFD700" />
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderButton('help-buoy-outline', 'Lost Something?', '#8A2BE2', '/search')}
      {renderButton('search-outline', 'Found Something?', '#F5F5DC', '/found')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: '50%',
    padding: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50, // This makes the button oval-shaped
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
});