import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator  } from "react-native";
import { auth } from "../../firebase/config";
import firebase from 'firebase';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            error: "",
            user: false,
            rememberMe: false,
            cargando:true
        }
    }

    componentDidMount() {
        // Listen for changes in the user's authentication state
        firebase.auth().onAuthStateChanged(user => {
          if (user===null) {
            this.setState({  cargando: false });
            
          }
            else if (user){
                this.setState({ user })
                this.setState({  cargando: false });
                this.props.navigation.navigate('Menu');}
           
          
        });
      }
    
 


      onSubmit(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
          .then(response => {
            this.setState({ loggedIn: true });
            console.log(this.state.password);
            console.log("passwordlogin");
            console.log(this.state.email);
            console.log("emaillogin");
            this.props.navigation.navigate("Menu");
          })
          .catch(error => {
            console.log(error);
            if (email === "" || pass === "") {
              this.setState({ error: error.message + "Por favor complete los campos" });
            } else if (error.code === "auth/invalid-email" ) {
              this.setState({ error: error.message + " Mail invalida" });
            } else {
                const errorMessageObject = JSON.parse(error.message);
                const invalidCredentialsMessage = errorMessageObject.error.message;
 
              this.setState({ error: invalidCredentialsMessage + "  Mail o Contraseña equivocadas" });
            }
          });
      }
      
    //   {"error":{"code":400,"message":"INVALID_LOGIN_CREDENTIALS","errors":[{"message":"INVALID_LOGIN_CREDENTIALS","domain":"global","reason":"invalid"}]}};





    signOut() {
        auth.signOut()
    }

    render() {
        return (
            <View style={styles.container}>
                

            {this.state.cargando ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                <Text style={styles.header}>Login</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.loginButton} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                {this.state.loggedIn ? <Text style={styles.loggedInText}>WELCOME</Text> : <Text style={styles.errorText}>{this.state.error}</Text>}
                <TouchableOpacity style={styles.logoutButton} onPress={() => this.signOut()}>
                    <Text style={styles.logoutText}>END SESSION</Text>
                </TouchableOpacity>
        
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.registerText}>No tenes cuenta? Registrate</Text>
                </TouchableOpacity>
                </>
            )}











              

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
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
    loginText: {
        color: "white",
        textAlign: "center",
    },
    loggedInText: {
        fontSize: 20,
        color: "green",
    },
    errorText: {
        fontSize: 20,
        color: "red",
    },
    logoutButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    logoutText: {
        color: "white",
        textAlign: "center",
    },
    rememberText: {
        marginTop: 20,
        textDecorationLine: "underline",
        color: "blue",
    },
    registerText: {
        marginTop: 20,
        color: "blue",
    },
    homeText: {
        marginTop: 20,
        color: "blue",
    },
};

export default Login;
