import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RegisterFoundItem = () => {
  const [itemDescription, setItemDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfDiscovery, setDateOfDiscovery] = useState('');

  return (
    <View style={styles.container}>
      
      
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Item details</Text>
        
        <Text style={styles.label}>Item description *</Text>
        <TextInput
          style={styles.input}
          value={itemDescription}
          onChangeText={setItemDescription}
          placeholder="e.g. T-shirt (white)"
          placeholderTextColor="#A9A9A9"
        />
        
        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="e.g. Room 311"
          placeholderTextColor="#A9A9A9"
        />
        
        <Text style={styles.label}>Date of discovery *</Text>
        <TextInput
          style={styles.input}
          value={dateOfDiscovery}
          onChangeText={setDateOfDiscovery}
          placeholder="e.g. May 28th, 2023"
          placeholderTextColor="#A9A9A9"
        />
        
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="camera-outline" size={24} color="#4B0082" />
          <Text style={styles.uploadButtonText}>Upload image</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5DEB3', // Beige background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4B0082', // Purple header
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5DEB3', // Beige text
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#4B0082',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4B0082',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5DEB3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4B0082',
  },
  uploadButtonText: {
    marginLeft: 8,
    color: '#4B0082',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FFD700', // Yellow save button
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#4B0082',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterFoundItem;