import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Button } from "react-native";
import { auth, db } from "../../firebase/config";
import * as ImagePicker from 'expo-image-picker';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      registered: false,
      error: "",
      Bio: "",
      image: null,
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.assets[0].uri });
    }
  };

  onSubmit = (email, pass) => {
    auth.createUserWithEmailAndPassword(email, pass)
      .then(response => {
        this.setState({ registered: true });
        console.log("password:", this.state.password);
        console.log("email:", this.state.email);

        db.collection('users').add({
          owner: email,
          description: this.state.Bio,
          createdAt: Date.now(),
          image: this.state.image, // Save the picked image URI to Firestore
        })
        .then()
        .catch(e => console.log(e));
      })
      .catch(error => {
        console.log(error);
        if (email === "" || pass === "") {
          this.setState({ error: "Porfavor complete campos obligatorios" });
        } else if (error.code === "auth/invalid-email") {
          this.setState({ error: error.message + " Mail or contraseña invaldias" });
        } else {
          this.setState({ error: error.message + " Mail o Contraseña equivocadas" });
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Register</Text>
        <Text>Email*:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <Text>Password*:</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <Text>Bio:</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Bio"
          onChangeText={(text) => this.setState({ Bio: text })}
          value={this.state.Bio}
        />
              <Text>Foto:</Text>
<Button title="ELEGIR FOTO" onPress={this.pickImage} />
        {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}

        <TouchableOpacity style={styles.loginButton} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.loginLinkText}>Already have an account? Login</Text>
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
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  loginButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  loginText: {
    color: "white",
    textAlign: "center",
  },
  registeredText: {
    fontSize: 20,
    color: "green",
  },
  loginLinkText: {
    marginTop: 20,
    textDecorationLine: "underline",
    color: "blue",
  },
  homeText: {
    marginTop: 20,
    color: "blue",
  },
  errorText: {
    fontSize: 20,
    color: "red",
  }
};

export default Register;
