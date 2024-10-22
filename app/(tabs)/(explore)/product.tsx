import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useLocalSearchParams } from 'expo-router';


const ProductPage = () => {
  const item = useLocalSearchParams();

  const renderActionButton = () => {
    switch (item.status) {
      case 'Lost':
        return (
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Found this item</Text>
          </TouchableOpacity>
        );
      case 'Found':
        return (
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>I am the owner</Text>
          </TouchableOpacity>
        );
      case 'Claimed':
        return (
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Item Claimed by</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} >
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <Image source={{ uri: item!.image }} style={styles.images} />

      <View style={styles.contentContainer}>
        <Text style={styles.productName}>{item.name}</Text>

        <View style={styles.infoRow}>
          <Icon name="map-pin" size={18} color="#666" />
          <Text style={styles.infoText}>Location: Central Park, New York</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="calendar" size={18} color="#666" />
          <Text style={styles.infoText}>Date: {item.date}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="info" size={18} color="#666" />
          <Text style={styles.infoText}>Status: {item.status}</Text>
        </View>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          This {item.name} was {item.status} in Central Park. It's a black leather jacket with a soft texture and a silver zipper. The size is medium, and it has a small tear on the left sleeve.
        </Text>

        {renderActionButton()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 8,
  },
  images: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductPage;