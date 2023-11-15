import React from 'react';
import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import Home from './screens/Home/Home';
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
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
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name="Menu" component={Menu}/>


         


        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )


}