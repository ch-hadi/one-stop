import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Animated, TouchableWithoutFeedback, Platform } from 'react-native';
import HomeScreen from '@/screens/Home/Home';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import CartScreen from '@/screens/Cart/CartScreen';
import Setting from '@/screens/Settings/Settings';
import BookingByCalendar from '@/screens/BookingAppointment/BookingAppointment';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: 'home' | 'home-outline' | 'search' | 'search-outline' | 'calendar-sharp' | 'calendar-outline' | 'settings' | 'settings-outline' = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar-sharp' : 'calendar-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }
          else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={20} color={color} style={{ marginBottom: -7 }} />;
        },
        tabBarActiveTintColor: '#7e57c2',
        tabBarInactiveTintColor: '#dfdfe1',
        tabBarStyle: {
          // alignItems:'center',
          // justifyContent:'center',
          backgroundColor: '#ffff',
          marginHorizontal: Platform.select({
            ios: 10,
            // android:10
          }),
          paddingBottom: Platform.select({
            ios: 5,  // iOS-specific padding
            android: 5,  // Android-specific padding
          }),
          marginBottom: Platform.select({
            ios: 20,
            android: 5
          }),
          borderTopWidth: 0,
          height: 60,
          borderRadius: 10,
        },
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 }, // Shadow height
        shadowRadius: 4,
        // Shadow for Android
        elevation: 5, // Creates shadow on Android
        tabBarButton: (props) => <AnimatedTabButton {...props} name={route.name} />,
        tabBarShowLabel: false

      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Appointments" component={BookingByCalendar} options={{
        headerShown: false, tabBarStyle: {
          display: 'none'
        }
      }} />
      <Tab.Screen name="Settings" component={Setting} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

// Custom animated button for the active/hover effect
const AnimatedTabButton = (props: any) => {
  const focused = props.accessibilityState?.selected;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.spring(scaleAnim, {
        toValue: 1.1, // Slight increase in size when active
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
      
      <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1, alignItems:'center', marginBottom:5,padding:0 }}>
        {/* {console.log(props)} */}
        {props.children}
       <Text style={{color: props.accessibilityState?.selected ? '#7e57c2' : '#000d09',fontSize:12}}>{props.name}</Text>
        
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default BottomTabNavigator;
