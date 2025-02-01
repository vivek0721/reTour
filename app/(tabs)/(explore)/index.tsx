import React , { useState, useEffect }from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView , SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRouter} from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useProduct } from '@/app/context/useProductContext';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};


const statusColors = {
  found: 'rgba(76, 175, 80, 0.7)',
  lost: 'rgba(244, 67, 54, 0.7)',
  claimed: 'rgba(33, 150, 243, 0.7)',
};

export default function DiscoverProducts() {
  const router= useRouter();
  const {setFunc, products, getData, item }= useProduct();

  useFocusEffect(
    React.useCallback(() => {
      // Fetch data when screen comes into focus
      getData();
    }, [item])
  );
  
  

  const ProductCard = ({ item }) => (

    
    <View style={styles.card} >
      <TouchableOpacity onPress={() => {
             setFunc(item);
             router.push('/product');
             }}>
      <Image source={{ uri: item?.images }} style={styles.image} />
      <View style={[styles.statusBubble, { backgroundColor: statusColors[item.flag] }]}>
        <Text style={styles.statusText}>{item.flag.toUpperCase()}</Text>
      </View>
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productDate}>{formatDate(item.foundDate)}</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      {/* <View style={styles.searchFilterContainer}>
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
      </View> */}
      
      <View style={styles.searchBar} >
        <Text style={styles.searchInput}>Recently Lost/Found Items</Text>
      </View>
  

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        scrollEnabled={false}
      />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5DEB3', // Changed to beige
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: "#8A2BE2",
    justifyContent: 'center',
    alignItems: 'center'
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
  headView:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText:{
    fontSize: 20,
    fontWeight: 'bold'
  }
});