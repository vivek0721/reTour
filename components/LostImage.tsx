import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function LostImage({size}) {
  return (
    <View style={{height: size, aspectRatio: 1}}>
      <LottieView 
        style={{flex: 1}}
        source={require('../assets/images/search.json')}
        autoPlay
        loop
        renderMode="HARDWARE"
        cacheComposition={true}
        // Ensure proper dimensions
        resizeMode="cover"
      />
    </View>
  )
}