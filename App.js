import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Summary from './screens/summary';
import Attendance from './screens/attendance';
import CustomDrawer from './components/customdrawer';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import NewForm from './components/newform';
import LoginPage from './screens/LoginScreen';
import SignUp from './screens/SignUp';
import WelcomeScreen from './screens/welcome';
import MapScreen from './screens/map';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Main" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainStack() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} useLegacyImplementation initialRouteName="Map">
 
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Summary" component={Summary} />
      <Drawer.Screen name="NewForm" component={NewForm} />
    </Drawer.Navigator>
  );
}

function AddButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to the new form screen
    navigation.navigate('NewForm');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 10,
    top: 60,
    backgroundColor: 'black',
    width: 40,
    height: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});