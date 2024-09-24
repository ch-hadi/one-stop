import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import Button from '@/components/Button/Button';

const LoginScreen = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Handle successful login
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/react-logo.png')} style={styles.logo} />
      <Button
        title="Login with Google"
        onPress={() => promptAsync()}
        style={styles.googleButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
});

export default LoginScreen;