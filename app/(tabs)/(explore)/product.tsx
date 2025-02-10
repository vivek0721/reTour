import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput,Alert, Linking} from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PopupCard from '@/components/popup';
import Axios from '@/app/services/axios';
import { useProduct } from '@/app/context/useProductContext';
import { LinearGradient } from 'expo-linear-gradient';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};


const ProductPage = () => {
      const {item, getData} = useProduct();
  
  const [isFinderModalVisible, setIsFinderModalVisible] = useState(false);
  const [isOwnerModalVisible, setIsOwnerModalVisible] = useState(false);
  const [finderName, setFinderName]= useState('');
  const [finderUID,setFinderUID]= useState('');
  const [finderWhatsapp,setFinderWhatsapp]= useState('');
  const [ownerName, setOwnerName]= useState('');
  const [ownerUID,setOwnerUID]= useState('');
  const [ownerWhatsapp,setOwnerWhatsapp]= useState('');
  const [isFinderDataVisible,setisFinderDataVisible]= useState(false);
  const [isOwnerDataVisible,setisOwnerDataVisible]= useState(false);
  


  const renderActionButton = () => {
    switch (item.flag) {
      case 'lost':
        return (
          <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setIsFinderModalVisible(true)}>
                <Ionicons name="person-outline" size={24} color="#4B0082" />
                <Text style={styles.actionButtonText}>I Found This Item</Text>
              </TouchableOpacity>
        );
      case 'found':
        return (
          <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setIsOwnerModalVisible(true)}>
                <Ionicons name="person-outline" size={24} color="#4B0082" />
                <Text style={styles.actionButtonText}>I am the Owner</Text>
              </TouchableOpacity>
        );
      case 'claimed':
        return (
          <View>
          <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setisFinderDataVisible(true)}>
                <Ionicons name="person-outline" size={24} color="#4B0082" />
                <Text style={styles.actionButtonText}>Show Finder's detail </Text>
              </TouchableOpacity>

          <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setisOwnerDataVisible(true)}>
                <Ionicons name="person-outline" size={24} color="#4B0082" />
                <Text style={styles.actionButtonText}> Show Owner's/ Claimer's detail</Text>
              </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };


    

  const handleOwnerSubmit = async () => {
    if (!ownerName || !ownerUID || !ownerWhatsapp) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    const updateOwnerData = {
        owmerName: ownerName,
        ownerUid: ownerUID,
        ownerNumber: parseInt(ownerWhatsapp),
        flag: 'claimed' 
      
    };
  
    try {
      const response = await Axios.patch(`/items/patchItem/${item._id}`, updateOwnerData);
      // console.log(response.data);
      // Alert.alert('Success', 'Registered successfully');
      setOwnerName('');
      setOwnerUID('');
      setOwnerWhatsapp('');
      setIsOwnerModalVisible(false);
      setisFinderDataVisible(true);
      getData();

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };



  // finder submit

  const handleFinderSubmit = async () => {
    if (!finderName || !finderUID || !finderWhatsapp) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    const updateFinderData = {
        finderName: finderName,
        finderUid: finderUID,
        finderNumber: parseInt(finderWhatsapp),
        flag: 'claimed' 
    };
  
    try {
      const response = await Axios.patch(`/items/patchItem/${item._id}`, updateFinderData);
      // console.log(response.data);
      // Alert.alert('Success', 'Registered successfully');
      setFinderName('');
      setFinderUID('');
      setFinderWhatsapp('');
      setIsFinderModalVisible(false);
      setisOwnerDataVisible(true);
      getData();
      
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };




  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item!.image }} style={styles.images} />
      <View style={styles.contentContainer}>
        <Text style={styles.productName}>{item.title}</Text>

        <View style={styles.infoRow}>
          <Icon name="map-pin" size={18} color="#666" />
          <Text style={styles.infoText}>Location:  {item.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="calendar" size={18} color="#666" />
          <Text style={styles.infoText}>Date: {formatDate(item.date)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="info" size={18} color="#666" />
          <Text style={styles.infoText}>Status: {item.flag.toUpperCase()}</Text>
        </View>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {item.desc}
        </Text>

        {renderActionButton()}
      </View>

      <PopupCard
          title="Owner's Details"
          isVisible={isOwnerModalVisible}
          onClose={() => setIsOwnerModalVisible(false)}
        >
          <View style={styles.modalForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Owner's Name<Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={ownerName}
                onChangeText={setOwnerName}
                placeholder="Enter your name"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>UID<Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={ownerUID}
                onChangeText={setOwnerUID}
                placeholder="Enter your UID"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>WhatsApp Number<Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={ownerWhatsapp}
                onChangeText={setOwnerWhatsapp}
                placeholder="Enter WhatsApp number"
                placeholderTextColor="#A9A9A9"
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleOwnerSubmit}
            >
              <Text style={styles.modalButtonText}>Show Finder's Details</Text>
            </TouchableOpacity>
          </View>
        </PopupCard>

        <PopupCard
          title="Finder's Details"
          isVisible={isFinderModalVisible}
          onClose={() => setIsFinderModalVisible(false)}
        >
          <View style={styles.modalForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Finder's Name<Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={finderName}
                onChangeText={setFinderName}
                placeholder="Enter your name"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>UID<Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={finderUID}
                onChangeText={setFinderUID}
                placeholder="Enter your UID"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>WhatsApp Number<Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={finderWhatsapp}
                onChangeText={setFinderWhatsapp}
                placeholder="Enter WhatsApp number"
                placeholderTextColor="#A9A9A9"
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleFinderSubmit}
            >
              <Text style={styles.modalButtonText}>Submit & Show Owner's Details</Text>
            </TouchableOpacity>
          </View>
        </PopupCard>


        <PopupCard
            title="Finder's Details"
            isVisible={isFinderDataVisible}
            onClose={() => setisFinderDataVisible(false)}
          >
            <View style={styles.container2}>
              <View style={styles.detailRow}>
                <Text style={styles.label2}>Finder's Name:</Text>
                <Text style={styles.value}>{item.finderName}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.label2}>Finder's UID:</Text>
                <Text style={styles.value}>{item.finderUid}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.label2}>Finder's Number:</Text>
                <Text style={styles.value}>{item.finderNumber}</Text>
              </View>

              <TouchableOpacity 
                style={styles.callButton}
                onPress={() => {
                  const phoneNumber = item.finderNumber;
                  Linking.openURL(`tel:${phoneNumber}`);
                }}
              >
                <Ionicons name="call" size={24} color="white" />
                <Text style={styles.callButtonText}>Call Finder</Text>
            </TouchableOpacity>
            </View>
        </PopupCard>

    
        <PopupCard
            title="Owner's Details"
            isVisible={isOwnerDataVisible}
            onClose={() => setisOwnerDataVisible(false)}
          >
            <View style={styles.container2}>
              <View style={styles.detailRow}>
                <Text style={styles.label2}>Owner's Name:</Text>
                <Text style={styles.value}>{item.ownerName}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.label2}>Owner's UID:</Text>
                <Text style={styles.value}>{item.ownerUid}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.label2}>Owner's Number:</Text>
                <Text style={styles.value}>{item.ownerNumber}</Text>
              </View>

              
              <TouchableOpacity 
                style={styles.callButton}
                onPress={() => {
                  const phoneNumber = item.ownerNumber;
                  Linking.openURL(`tel:${phoneNumber}`);
                }}
              >
                <Ionicons name="call" size={24} color="white" />
                <Text style={styles.callButtonText}>Call Owner</Text>
            </TouchableOpacity>
            </View>
        </PopupCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Beige background
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(245, 245, 220, 0.7)', // Semi-transparent beige
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
    backgroundColor: '#F5F5DC', // Beige background
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4B0082', // Deep purple for contrast
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    color: '#4B0082',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalForm: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  modalButton: {
    backgroundColor: '#4B0082',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  modalButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#4B0082',
    marginBottom: 5,
    fontWeight: '600',
  },
  asterisk: {
    color: '#FF0000',
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  container2: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  label2: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  callButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});

export default ProductPage;