import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterLostItem() {
  const [ownerDetailsExpanded, setOwnerDetailsExpanded] = useState(false);
  const [otherDetailsExpanded, setOtherDetailsExpanded] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Item details</Text>
        <TextInput style={styles.input} placeholder="MacBook charger" placeholderTextColor="#A9A9A9" />
        <TextInput style={styles.input} placeholder="Room 13" placeholderTextColor="#A9A9A9" />
        <View style={styles.dateInputContainer}>
          <TextInput style={styles.dateInput} placeholder="05/31/22" placeholderTextColor="#A9A9A9" />
          <Ionicons name="calendar-outline" size={24} color="#4B0082" style={styles.calendarIcon} />
        </View>
        
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.cameraButton]}>
            <Ionicons name="camera-outline" size={24} color="#4B0082" />
            <Text style={styles.buttonText}>Open camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton}>
            <Ionicons name="cloud-upload-outline" size={24} color="#4B0082" />
          </TouchableOpacity>
        </View>

        <Text style={styles.note}>All details below can be filled out later</Text>

        <TouchableOpacity 
          style={styles.expandableSection}
          onPress={() => setOwnerDetailsExpanded(!ownerDetailsExpanded)}
        >
          <Text style={styles.sectionTitle}>Owner details</Text>
          <Ionicons 
            name={ownerDetailsExpanded ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="#4B0082" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.expandableSection}
          onPress={() => setOtherDetailsExpanded(!otherDetailsExpanded)}
        >
          <Text style={styles.sectionTitle}>Other details</Text>
          <Ionicons 
            name={otherDetailsExpanded ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="#4B0082" 
          />
        </TouchableOpacity>

        {otherDetailsExpanded && (
          <View>
            <TextInput style={styles.input} placeholder="Storage" placeholderTextColor="#A9A9A9" />
            <TextInput style={styles.input} placeholder="Internal notes" placeholderTextColor="#A9A9A9" />
          </View>
        )}

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6D3', // Beige background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFD700', // Yellow header
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082', // Purple text
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4B0082', // Purple text
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderColor: '#4B0082', // Purple border
    borderWidth: 1,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#4B0082', // Purple border
    borderWidth: 1,
  },
  dateInput: {
    flex: 1,
    padding: 12,
  },
  calendarIcon: {
    marginRight: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700', // Yellow background
    borderRadius: 8,
    padding: 12,
  },
  cameraButton: {
    flex: 1,
    marginRight: 10,
  },
  uploadButton: {
    backgroundColor: '#FFD700', // Yellow background
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 8,
    color: '#4B0082', // Purple text
  },
  note: {
    color: '#4B0082', // Purple text
    textAlign: 'center',
    marginVertical: 10,
  },
  expandableSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#4B0082', // Purple border
    paddingVertical: 16,
  },
  saveButton: {
    backgroundColor: '#4B0082', // Purple background
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});