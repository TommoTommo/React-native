import React, { Component } from "react";
import { Camera } from "expo-camera"
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { storage } from "../firebase/config";

class Camara extends Component{
    constructor (props) {
        super(props);
        this.state = {permisos: false, photo: "", showCamera: true}
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then ( res => {
                if (res.granted === true ){
                    this.setState ({
                        permisos: true
                    })
                }
            })
        .catch(e => console.log(e))
    }

    sacarFoto(){
        this.metodosCamera.takePicturesAsync()
        .then ( photo => {
            this.setState({
                photo: photo.uri,
                showCamera: false
            })
        })
        .catch(e => console.log(e))
    }

    rechazarFoto(){
        this.setState({
            showCamera: true,
        })
    }

    aceptarFoto(){
        fetch(this.state.photo)
        .then(res => res.blob())
        .then(image => {
            const ref= storage.ref (`photo/${Date.now()}.jpg`);
            ref.put(image)
            .then(() => {
                ref.getDownloadURL()
                .then( url => {
                    this.props.onImageUpload(url)
                })
            })
        })
        .catch (e => console.log (e))
    }

    render(){
        console.log(this.state.photo)
        return(
            <>
                {this.state.permisos === true ?
                this.state.showCamera === false?
                <View style= {StyleSheet.formContainer}>
                <Camera style= {StyleSheet.camera} type= {Camera.constants.Type.front} ref= {metodosCamera => this.metodosCamera= metodosCamera}/>
                <TouchableOpacity
                    style= {StyleSheet.button}
                    onPress={() => this.sacarFoto()}
                    >
                    <Text style= {StyleSheet.textButton}> Sacar foto </Text>
                </TouchableOpacity>
                </View>
                :
                <View style= {StyleSheet.formContainer}>
                    <Image style= {StyleSheet.camera} source= {{uri: this.state.photo}} />
                    <TouchableOpacity 
                        style= {StyleSheet.button}
                        onPress={() => this.aceptarFoto()}
                        >
                        <Text style= {StyleSheet.textButton}> Aceptar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style= {StyleSheet.button}
                        onPress={() => this.rechazarFoto()}
                        >
                        <Text style= {StyleSheet.textButton}> Rechazar </Text>
                    </TouchableOpacity>
                </View>
                :
                <Text> No me diste los permisos de la camara</Text> 
                }    
            </>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        width: `100vw`,
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    input:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
    },
    textButton: {
        color: '#aff',
    },
});

export default Camara