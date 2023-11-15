import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { auth } from "../../src/firebase/config";
import firebase from 'firebase';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      registered: false,
    };
  }

  componentDidMount() {
    // Listen for changes in the user's authentication state
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ registered: true });
      } else {
        this.setState({ registered: false });
      }
    });
  }

  render() {
    return (
      <View >
       
       
        
        
        <Text >Hola Mundo</Text>

        {this.state.registered ? (
          <Text >Welcome, {auth.currentUser.email}!</Text>
        ) : (
          <Text>Hello, Guest, you're not signed in!</Text>
        )}

        <TouchableOpacity
       
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Anda al Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default Home;
