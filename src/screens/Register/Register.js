import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/config";


class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            registered: false,
            error: "",
        }
    }

    onSubmit(email, pass) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then(response => {
                this.setState({ registered: true });
                console.log("password");
                console.log(this.state.password);
                console.log("email");
                console.log(this.state.email);
            })
            .catch(error => {
               
                    this.setState({  error: error.message });
                  
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Register</Text>
                <Text>Email:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <Text>Password:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
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
