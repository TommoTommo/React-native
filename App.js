import React from 'react';
import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Register from './src/screens/Register/Register';
import Login from './src/screens//Login/Login';
import Menu from './src/components/Menu';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default function App() {
  return (
    
      
      <NavigationContainer style={styles.container}>
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
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>

        </Stack.Navigator>
      </NavigationContainer>
   
  )


}