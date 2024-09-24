import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from '@/screens/Home/Home';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import CartScreen from '@/screens/Cart/CartScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: 'home' | 'home-outline' | 'person' | 'person-outline' | 'cart' | 'cart-outline' = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffff',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: 'transparent',
          paddingHorizontal: 20, // Padding on both sides
          paddingBottom: 10,    // Padding inside the tab
          position: 'absolute',
          marginBottom: 15,     // Space from the bottom of the screen
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#00416A','#E4E5E6']} // Gradient colors
            start={[1, 1]}
            end={[1, 1]}
            style={{ flex: 1, marginHorizontal: 15, borderRadius: 10, paddingVertical:10 }}
          />
        ),
        tabBarButton: (props) => <AnimatedTabButton {...props} />,
        tabBarShowLabel:false
        
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Tab.Screen name="Cart" component={CartScreen} options={{headerShown:false, tabBarStyle:{
        display:'none'
      }}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
    </Tab.Navigator>
  );
};

// Custom animated button for the active/hover effect
const AnimatedTabButton = (props:any) => {
  const focused = props.accessibilityState?.selected;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.spring(scaleAnim, {
        toValue: 1.2, // Slight increase in size when active
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }],flex:1}}>
        {props.children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default BottomTabNavigator;
