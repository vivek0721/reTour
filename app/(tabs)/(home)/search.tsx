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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
const { width, height } = Dimensions.get('window');
const inputWidth = width * 0.9;
import PopupCard from '@/components/popup';
import { useRouter } from 'expo-router';
import { useProduct } from '@/app/context/useProductContext';
import Axios from '@/app/services/axios';



const RegisterLostItem = () => {
  // Existing states
  const [itemDescription, setItemDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfDiscovery, setDateOfDiscovery] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const router= useRouter();
  const {item, getData} = useProduct();


  // States for finder's details
  const [ownerName, setOwnerName] = useState('');
  const [ownerUID, setOwnerUID] = useState('');
  const [ownerWhatsapp, setOwnerWhatsapp] = useState('');
  
  // Modal visibility states
  const [isOwnerModalVisible, setIsOwnerModalVisible] = useState(false);
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
      setOwnerName('');
      setOwnerUID('');
      setOwnerWhatsapp('');
      setDate(new Date());
      setImage(null);
    };
    
    const handleSubmit = async () => {
      try {
        if (!itemDescription || !location || !date || !ownerName || !ownerUID || !ownerWhatsapp || !image) {
          Alert.alert("Error", "Please fill in all required fields and select an image.");
          return;
        }
    
        setIsLoading(true);
    
        const formData = new FormData();
        formData.append("title", itemDescription);
        formData.append("desc", itemDescription);
        formData.append("date", date.toISOString());
        formData.append("location", location);
        formData.append("finderName", "");
        formData.append("finderNumber", "");
        formData.append("finderUid", "");
        formData.append("ownerName", ownerName);
        formData.append("ownerNumber", ownerWhatsapp);
        formData.append("ownerUid", ownerUID);
        formData.append("flag", "lost");
    
        // Attach image file
        formData.append("image", {
          uri: image,
          type: "image/jpeg",
          name: `lost_item_${Date.now()}.jpg`,
        });

    
        const response = await Axios.post("/items/newLost", formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

      console.log("Response received:", response.data); // ✅ Log response data
      Alert.alert("Success", "Lost item registered successfully");
      resetForm();
      router.push("../(explore)");
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
              <Text style={styles.label}>Lost Date<Text style={styles.asterisk}>*</Text></Text>
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
                onPress={() => setIsOwnerModalVisible(true)}
              >
                <Ionicons name="person-outline" size={24} color="#4B0082" />
                <Text style={styles.actionButtonText}>Owner's Details</Text>
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
              onPress={() => setIsOwnerModalVisible(false)}>
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
                onPress={() => setIsImageModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </PopupCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8A2BE2',
    margin: 0,
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#8A2BE2',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  headerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
    color: '#8A2BE2',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8A2BE2',
    textAlign: 'center',
    opacity: 0.9,
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
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5DEB3',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#4B0082',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    marginLeft: 8,
    color: '#4B0082',
    fontSize: 14,
    fontWeight: '600',
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
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4B0082',
  },
  uploadButtonText: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#4B0082',
    fontSize: 16,
  },
  imagePreviewContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#F5DEB3',
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
    color: '#4B0082',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    backgroundColor: '#F5F5F5',
  },
  dateText: {
    color: '#000000',
    fontSize: 16,
  },
  placeholderText: {
    color: '#A9A9A9',
    fontSize: 16,
  }
});

export default RegisterLostItem;