import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { auth } from "../src/firebase/config";
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
      <View style={styles.container}>
        <Image source={require("../assets/tatantataan.jpg")} style={styles.image} />
        <Image
          source={{
            uri:
              "https://lapaginamillonaria.com/__export/1633441863048/sites/lpm/img/2021/10/05/xlvarez_-_rojo_crop1633441784392.jpg_1693159006.jpg",
          }}
          style={styles.image}
        />
        
        <Text style={styles.header}>Hola Mundo</Text>

        {this.state.registered ? (
          <Text style={styles.welcomeText}>Welcome, {auth.currentUser.email}!</Text>
        ) : (
          <Text style={styles.guestText}>Hello, Guest, you're not signed in!</Text>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.loginText}>Anda al Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: "green",
  },
  guestText: {
    fontSize: 20,
    color: "red",
  },
  loginButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  loginText: {
    color: "white",
    textAlign: "center",
  },
};

export default Home;
