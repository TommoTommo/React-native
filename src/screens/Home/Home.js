import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../../firebase/config";
import firebase from 'firebase';



console.log("holaaaa");

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
      < >
       
       
        
        
        <Text style={styles.container}>Hola Mundo</Text>

        {this.state.registered ? (
          <Text >Welcome, {auth.currentUser.email}!</Text>
        ) : (
          <Text>Hello, Guest, you're not signed in!</Text>
        )}

        <TouchableOpacity
       
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Anda al Login</Text>
        </TouchableOpacity>
      </>
    );
  }
}
const styles=StyleSheet.create( {container: {
  color: "black"
}})



export default Home;




