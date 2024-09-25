import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Platform } from 'react-native';
import Button from '@/components/Button/Button';

const Setting = () => {
  return (
    <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>
      <Button title="Edit Profile" onPress={() => {}} style={styles.button} />
      <Button title="My Orders" onPress={() => {}} style={styles.button} />
      <Button title="Settings" onPress={() => {}} style={styles.button} />
      <Button title="Logout" onPress={() => {}} style={[styles.button, styles.logoutButton]} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe:{
    flex: 1,
    backgroundColor: 'rgb(242, 242, 242)',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: 'red',
  },
});

export default Setting;