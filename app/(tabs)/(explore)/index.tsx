import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRouter} from 'expo-router';



const products = [
  { id: '1', name: 'Soft Element Jack', date: '2024-10-15', status: 'Lost', image: 'https://example.com/soft-element-jack.jpg' },
  { id: '2', name: 'Leset Galant', date: '2024-10-18', status: 'Found', image: 'https://example.com/leset-galant.jpg' },
  { id: '3', name: 'Chestar Chair', date: '2024-10-20', status: 'Lost', image: 'https://example.com/chestar-chair.jpg' },
  { id: '4', name: 'Avrora Chair', date: '2024-10-21', status: 'Claimed', image: 'https://example.com/avrora-chair.jpg' },
  { id: '5', name: 'Soft Element Jack', date: '2024-10-15', status: 'Lost', image: 'https://example.com/soft-element-jack.jpg' },
  { id: '6', name: 'Leset Galant', date: '2024-10-18', status: 'Found', image: 'https://example.com/leset-galant.jpg' },
  { id: '7', name: 'Chestar Chair', date: '2024-10-20', status: 'Lost', image: 'https://example.com/chestar-chair.jpg' },
  { id: '8', name: 'Avrora Chair', date: '2024-10-21', status: 'Claimed', image: 'https://example.com/avrora-chair.jpg' },

];

const statusColors = {
  Found: 'rgba(76, 175, 80, 0.7)',
  Lost: 'rgba(244, 67, 54, 0.7)',
  Claimed: 'rgba(33, 150, 243, 0.7)',
};



export default function DiscoverProducts() {
  const router= useRouter();
  const ProductCard = ({ item }) => (
    <View style={styles.card} >
      <TouchableOpacity onPress={() => router.push({pathname:'product', params:item})}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={[styles.statusBubble, { backgroundColor: statusColors[item.status] }]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDate}>{item.date}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#888" />
          <TextInput 
            placeholder="Search products" 
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  productList: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    margin: 10,
    width: 180,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusBubble: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDate: {
    fontSize: 14,
    color: '#666',
  },
});