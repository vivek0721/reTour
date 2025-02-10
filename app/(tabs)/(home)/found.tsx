import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  Image, 
  ScrollView, 
  SafeAreaView, 
  Dimensions,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import PopupCard from '@/components/popup';
const { width, height } = Dimensions.get('window');
const inputWidth = width * 0.9;
import { useRouter } from 'expo-router';

import Axios from '@/app/services/axios';




const RegisterFoundItem = () => {
  // Existing states
  const [itemDescription, setItemDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfDiscovery, setDateOfDiscovery] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const router= useRouter();
  
  // States for finder's details
  const [finderName, setFinderName] = useState('');
  const [finderUID, setFinderUID] = useState('');
  const [finderWhatsapp, setFinderWhatsapp] = useState('');

  // Modal visibility states
  const [isFinderModalVisible, setIsFinderModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setDateOfDiscovery(formattedDate);
    }
  };

   
    const pickImageFromGallery = async () => {
      try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert('Permission Required', 'Permission to access gallery is required!');
          return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: false
        });
    
        if (!result.canceled && result.assets && result.assets[0]) {
          setImage(result.assets[0].uri);
        }
      } catch (error) {
        console.error('Gallery picker error:', error);
        Alert.alert('Error', 'Failed to pick image from gallery');
      }
    };
    
    const takePhoto = async () => {
      try {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert('Permission Required', 'Permission to access camera is required!');
          return;
        }
        
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: false
        });
    
        if (!result.canceled && result.assets && result.assets[0]) {
          setImage(result.assets[0].uri);
        }
      } catch (error) {
        console.error('Camera error:', error);
        Alert.alert('Error', 'Failed to capture photo');
      }
    };

  
  const resetForm = () => {
    setItemDescription('');
    setLocation('');
    setDateOfDiscovery('');
    setFinderName('');
    setFinderUID('');
    setFinderWhatsapp('');
    setDate(new Date());
    setImage(null);
  };
  
  const handleSubmit = async () => {
    try {
      if (!itemDescription || !location || !date || !finderName || !finderUID || !finderWhatsapp || !image) {
        Alert.alert("Error", "Please fill in all required fields and select an image.");
        return;
      }
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", itemDescription);
      formData.append("desc", itemDescription);
      formData.append("date", date.toISOString());
      formData.append("location", location);
      formData.append("finderName", finderName);
      formData.append("finderNumber", finderWhatsapp);
      formData.append("finderUid", finderUID);
      formData.append("ownerName", "");
      formData.append("ownerNumber", "");
      formData.append("ownerUid", "");
      formData.append("flag", "found");
  
      // Attach image file
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: `lost_item_${Date.now()}.jpg`,
      });


      const response = await Axios.post("/items/newFound", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //console.log("Response received:", response.data); // ✅ Log response data
      Alert.alert("Success", "Lost item registered successfully");
      resetForm();
      
    } catch (error) {
      console.error("Submit error:", error);
  
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Axios Error:", error.message);
      }
      Alert.alert("Error", `Failed to submit item: ${error.message}`);
    } finally {
      setIsLoading(false);
      router.push("../(explore)");
    }
  };


  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.headerContainer}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Item Details</Text>
              <Text style={styles.subtitle}>Please fill in the details below</Text>
            </View>
            </View>
            
            {/* Item Details Section */}
            <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Item Name<Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={itemDescription}
                onChangeText={setItemDescription}
                placeholder="e.g. RealMe Buds"
                placeholderTextColor="#A9A9A9"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location<Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="e.g. Room 311"
                placeholderTextColor="#A9A9A9"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of discovery<Text style={styles.asterisk}>*</Text></Text>
              <TouchableOpacity 
                style={[styles.input, styles.dateInput]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={dateOfDiscovery ? styles.dateText : styles.placeholderText}>
                  {dateOfDiscovery || 'Select date'}
                </Text>
                <Ionicons name="calendar-outline" size={24} color="#4B0082" />
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChange}
                maximumDate={new Date()}
              />
            )}
            </View>

            {/* Action Buttons for Modals */}
            <View style={styles.card}>
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setIsFinderModalVisible(true)}>
                <Ionicons name="person-outline" size={24} color="#4B0082" />
                <Text style={styles.actionButtonText}>Finder's Details</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setIsImageModalVisible(true)}
              >
                <Ionicons name="camera-outline" size={24} color="#4B0082" />
                <Text style={styles.actionButtonText}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
          
          {/* Save Button */}
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        

        {/* Finder's Details Modal */}
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
              onPress={() => setIsFinderModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </PopupCard>

        {/* Image Upload Modal */}
        <PopupCard
            title="Upload Images"
            isVisible={isImageModalVisible}
            onClose={() => setIsImageModalVisible(false)}
          >
            <View style={styles.modalForm}>
              <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                <Ionicons name="camera-outline" size={24} color="#4B0082" />
                <Text style={styles.uploadButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.uploadButton} onPress={pickImageFromGallery}>
                <Ionicons name="images-outline" size={24} color="#4B0082" />
                <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>

              {image && (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: image }} style={styles.imagePreview} />
                </View>
              )}

              <TouchableOpacity 
                style={styles.modalButton}
                onPress={()=>setIsImageModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </PopupCard>
          
          <PopupCard
          title="Uploading Details"
          isVisible={isLoading}
          onClose={() => {}}
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8A2BE2" />
            <Text style={styles.loadingText}>Please wait while we upload your details...</Text>
          </View>
        </PopupCard>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5DEB3', // Changed to beige
    margin: 0,
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5DEB3', // Changed to beige
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  headerContainer: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)', // Light purple background
    padding: 20,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8A2BE2', // Changed to purple
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8A2BE2', // Changed to purple
    textAlign: 'center',
    opacity: 0.9,
  },
  modalForm: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
  },
  modalButton: {
    backgroundColor: '#8A2BE2', // Purple
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  modalButtonText: {
    color: '#FFFFFF',
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
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A2BE2', // Changed to purple
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    marginLeft: 8,
    color: '#FFFFFF', // Changed to white
    fontSize: 14,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#8A2BE2', // Changed to purple
    marginBottom: 5,
    fontWeight: '600',
  },
  asterisk: {
    color: '#FF0000',
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#8A2BE2', // Changed to purple
    fontSize: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A2BE2', // Changed to purple
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  uploadButtonText: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#FFFFFF', // Changed to white
    fontSize: 16,
  },
  imagePreviewContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  saveButtonContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  saveButton: {
    backgroundColor: '#8A2BE2', // Changed to purple
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  saveButtonText: {
    color: '#FFFFFF', // Changed to white
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    color: '#000000',
    fontSize: 16,
  },
  placeholderText: {
    color: '#A9A9A9',
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#8A2BE2',
    textAlign: 'center',
  }
});

export default RegisterFoundItem;