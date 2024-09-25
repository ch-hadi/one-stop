import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/screens/Login/Login';
import SignupScreen from '@/screens/SignupScreen/Signup';
import DetailScreen from '@/screens/DetailScreen/DetailScreen';
import BottomTabNavigator from './BottomTabNavigator';
import Setting from '@/screens/Settings/Settings';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Settings" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;