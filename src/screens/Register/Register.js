import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Button } from "react-native";
import { auth, db, storage } from "../../firebase/config"; // Assuming 'storage' is imported from the Firebase config
import * as ImagePicker from 'expo-image-picker';
import Camera from '../../components/Camera';

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
      showCamera: false,
      
    };
  }

  takeImage = () => {
    this.setState({ showCamera: true });
  }
  onImageUpload(url){
    this.setState({image:url, showCamera: false});
}

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const imageUri = result.uri;
      
      fetch(imageUri)
        .then(res => res.blob())
        .then(image => {
          const ref = storage.ref(`photo/${Date.now()}.jpg`);

          ref.put(image)
            .then(() => {
              ref.getDownloadURL()
                .then(url => {
                  console.log("Download URL:", url);
           
                  this.setState({ image: url }); // Update the state with the downloaded image URL
                })
                .catch(error => console.error("Error getting download URL:", error));
            })
            .catch(error => console.error("Error uploading image:", error));
        })
        .catch(error => console.error("Error fetching image:", error));
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
        .catch(e => console.error("Error adding user to collection:", e));
      })
      .catch(error => {
        console.log(error);
        if (email === "" || pass === "") {
          this.setState({ error: "Porfavor complete campos obligatorios (con *)" });
        } else if (error.code === 'auth/weak-password') {
          this.setState({ error: error.message + " Contraseña invaldias" });
        } else {
          this.setState({ error: error.message + " Mail invalida" });
        }
      });
  };

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
        <p></p>
        <Button title="Sacar FOTO" onPress={this.takeImage} />
        {this.state.showCamera ? <Camera onImageUpload={(url) => this.onImageUpload(url)} /> : null}
        
        {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 300, height: 300 }} />}
        <TouchableOpacity style={styles.loginButton} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        {this.state.registered ? <Text style={styles.registeredText}>Registered successfully!</Text> : <Text style={styles.errorText}>{this.state.error}</Text>}
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

