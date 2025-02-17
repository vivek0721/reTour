import { Redirect } from 'expo-router'
import {Stack} from 'expo-router/stack'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(tabs)/(home)'} />
  }

  return (
    // <Stack>
    //   <Stack.Screen name="index" options={{ headerShown: true }} />
    //   <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    //   <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    <Stack/>
  );
}