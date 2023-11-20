import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostForm from "../screens/PostForm/PostForm";
import User from "../screens/User/User";
import Home from "../screens/Home/Home";
import Buscador from "../screens/Buscador/Buscador";

const Tab = createBottomTabNavigator();

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          style: {
            flexDirection: 'row',
            justifyContent: 'space-around', // Distribute tabs evenly
            alignItems: 'center',
            backgroundColor: '#fff', // Background color of the tab bar
            height: 60, // Adjust tab bar height if needed
            borderTopWidth: 1, // Optional: Add a border at the top
            borderTopColor: 'lightgray', // Optional: Border color
          },
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="PostForm" component={PostForm} /> 
        <Tab.Screen name="User" component={User} />
        <Tab.Screen name="Buscador" component={Buscador} />
      </Tab.Navigator>
    );
  }
}

export default Menu;
