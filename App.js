import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Contador from './src/components/Contador';
import Register from './screens/Register';
import Login from './screens/Login';
import Menu from './src/components/Menu';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator()


export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Contador />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />

         


        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}