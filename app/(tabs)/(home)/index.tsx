import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabOneScreen() {
  const router = useRouter();
  const scaleAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = (route) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route);
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View style={styles.buttonContainer}>
          <AnimatedTouchable 
            style={styles.buttonLost}
            onPress={() => handlePress('/search')}
            activeOpacity={0.9}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 
                name="question-circle" 
                size={hp(12)} 
                color="#FFD700" 
              />
              <View style={styles.pulseCircle} />
            </View>
            <Text style={[styles.buttonText, styles.lostText]}>Lost Something?</Text>
            <Text style={styles.subText}>Report your lost item</Text>
          </AnimatedTouchable>
        </View>

        <View style={styles.buttonContainer}>
          <AnimatedTouchable 
            style={styles.buttonFound}
            onPress={() => handlePress('/found')}
            activeOpacity={0.9}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 
                name="search-location" 
                size={hp(12)} 
                color="#8A2BE2" 
              />
              <View style={[styles.pulseCircle, styles.pulseCircleFound]} />
            </View>
            <Text style={[styles.buttonText, styles.foundText]}>Found Something?</Text>
            <Text style={[styles.subText, styles.foundSubText]}>Help others find their items</Text>
          </AnimatedTouchable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  buttonContainer: {
    flex: 1,
    marginVertical: hp(1),
  },
  buttonLost: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(4),
    backgroundColor: '#8A2BE2',
    borderWidth: hp(0.4),
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp(0.5),
    },
    shadowOpacity: 0.25,
    shadowRadius: hp(1),
    elevation: 5,
    padding: hp(2),
    position: 'relative',
    overflow: 'hidden',
  },
  buttonFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(4),
    backgroundColor: '#F5F5DC',
    borderWidth: hp(0.4),
    borderColor: '#8A2BE2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp(0.5),
    },
    shadowOpacity: 0.25,
    shadowRadius: hp(1),
    elevation: 5,
    padding: hp(2),
    position: 'relative',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: hp(3.5),
    fontWeight: '800',
    marginTop: hp(2),
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subText: {
    fontSize: hp(1.8),
    color: '#FFD700',
    marginTop: hp(1),
    opacity: 0.8,
    fontWeight: '500',
  },
  foundSubText: {
    color: '#8A2BE2',
  },
  lostText: {
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  foundText: {
    color: '#8A2BE2',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: hp(15),
    height: hp(15),
    borderRadius: hp(7.5),
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    transform: [{ scale: 1.2 }],
  },
  pulseCircleFound: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
  },
});