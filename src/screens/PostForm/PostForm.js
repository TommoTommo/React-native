import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { Camera } from 'expo-camera';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
           showCamera: true,
           url: '',
           
        }
    }

    crearPost(owner, textoPost, photo, createdAt, likes){
        db.collection('posts').add({
            owner: owner,
            textoPost: textoPost, 
            photo: this.state.url,
            createdAt: Date.now(),
            likes: []
            
        })
        .then( res => console.log(res))
        .catch( e => console.log(e))
    }

    onImageUpload(url){
        this.setState({url:url, showCamera: false});
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Crear publicacion</Text>
             
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
                </>
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
    button:{
        backgroundColor:'orange',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
    },
    textButton:{
        color: '#fff'
    }

})


export default PostForm;