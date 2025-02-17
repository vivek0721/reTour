import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import PopupCard from '@/components/popup';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    
    if (!emailAddress || !password) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      alert(`Error: ${err.errors?.[0]?.message || 'Failed to sign up'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    
    setIsLoading(true);
    
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/(tabs)/(home)');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        alert("Verification failed. Please try again.");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      alert(`Error: ${err.errors?.[0]?.message || 'Verification failed'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
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
                  <Text style={styles.sectionTitle}>Verify Your Email</Text>
                  <Text style={styles.subtitle}>Please enter the verification code sent to your email</Text>
                </View>
              </View>
              
              <View style={styles.card}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Verification Code<Text style={styles.asterisk}>*</Text></Text>
                  <TextInput
                    style={styles.input}
                    value={code}
                    onChangeText={setCode}
                    placeholder="Enter 6-digit code"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="number-pad"
                  />
                </View>
              </View>
              
              <View style={styles.saveButtonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={onVerifyPress}>
                  <Text style={styles.saveButtonText}>Verify</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <PopupCard
            title="Verifying Email"
            isVisible={isLoading}
            onClose={() => {}}
          >
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#8A2BE2" />
              <Text style={styles.loadingText}>Please wait while we verify your email...</Text>
            </View>
          </PopupCard>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
                <Text style={styles.sectionTitle}>Sign Up</Text>
                <Text style={styles.subtitle}>Please fill in the details below</Text>
              </View>
            </View>
            
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address<Text style={styles.asterisk}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  placeholder="Enter your email"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password<Text style={styles.asterisk}>*</Text></Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity 
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={24} 
                      color="#4B0082" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={onSignUpPress}>
                <Text style={styles.saveButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <PopupCard
          title="Creating Account"
          isVisible={isLoading}
          onClose={() => {}}
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8A2BE2" />
            <Text style={styles.loadingText}>Please wait while we create your account...</Text>
          </View>
        </PopupCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5DEB3', // Beige background
    margin: 0,
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5DEB3', // Beige background
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
    color: '#8A2BE2', // Purple
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8A2BE2', // Purple
    textAlign: 'center',
    opacity: 0.9,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#8A2BE2', // Purple
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
    borderColor: '#8A2BE2', // Purple
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#8A2BE2', // Purple
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonContainer: {
    width: '100%',
    paddingVertical: 15,
  },
  saveButton: {
    backgroundColor: '#8A2BE2', // Purple
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
    color: '#FFFFFF', // White
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#666666',
    fontSize: 16,
  },
  loginLink: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});