


import React, { useState } from 'react';
import { Text, View,ImageBackground, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';




export default function LandingPage() {
  const router = useRouter();
  const [scaleValue] = useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.05,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground 
      source={require('../assets/images/lost-items-collage.jpg')} 
      style={styles.container}
    >
      <View style={styles.overlay}>
        {/* <Text style={styles.logo}>reTour</Text> '#8A2BE2' */}
        <Text style={styles.logo}>
        <Text style={{ color: '#FFD700' }}>re</Text>
        <Text style={{ color: 'white' }}>Tour</Text>     
      </Text>   
        <Animated.View 
          style={[
            styles.card,
            {
              transform: [{ scale: scaleValue }]
            }
          ]}
        >
          <TouchableOpacity
            style={styles.cardContent}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={1}
          >
            <Text style={styles.title}>Explore,</Text>
            <Text style={styles.titleHighlight}>Find,</Text>
            <Text style={styles.title}>Recover</Text>
            <Text style={styles.subtitle}>
              Lost something valuable? Found an item that doesn't belong to you?
            </Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => router.push('/(tabs)/(home)')}
            >
              <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
            <View  style={styles.subtitleView}>
            <Text style={styles.subtitle2}> From 🏘️ of Brogrammers🍻</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(138, 43, 226, 0.9)',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    width: '100%',
    height: '50%',
    overflow: 'hidden',
  },
  cardContent: {
    padding: wp(8),
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: wp(10),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: hp(1),
  },
  titleHighlight: {
    fontSize: wp(10),
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: wp(4),
    color: '#E0E0E0',
    marginBottom: hp(4),
  },
  button: {
    backgroundColor: '#6A0dad',
    paddingVertical: hp(2),
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: wp(4.5),
    color: '#FFD700',
    fontWeight: 'bold',
  },
  logo: {
    fontSize: wp(20),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: hp(11),
  },
  subtitle2: {
    fontSize: wp(3),
    color: '#E0E0E0',
    marginTop: hp(1),
    
  },
  subtitleView: {
   justifyContent: 'center',
   alignItems: 'center'
  }
});