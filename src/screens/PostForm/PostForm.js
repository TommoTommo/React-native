import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import Camera from '../../components/Camera';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
           showCamera: true,
           url: '',
        }
    }

    crearPost(owner, textoPost){
        db.collection('posts').add({
            owner: owner,
            textoPost: textoPost, 
            photo: this.state.url,
            createdAt: Date.now(),
            likes: []
        })
        .then( console.log("Posteaste correctamente"))
        .catch(error => console.log(`El error fue: ${error}`))
    }

    onImageUpload(url){
        this.setState({url:url, showCamera: false});
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Crear publicacion</Text>

                {this.state.showCamera ? <Camera onImageUpload={(url) => this.onImageUpload(url)} /> : 

                <>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir...'
                    keyboardType='default'
                    value={this.state.textoPost}
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now())}>
                    <Text style={styles.textButton}>Publicar</Text>    
                </TouchableOpacity>
                </>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
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

})


export default PostForm;