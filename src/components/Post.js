import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image  } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from 'firebase';


class Post extends Component{
    constructor(props){
        super(props);

        this.state = {
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        }
    }

    componentDidMount(){
      if(this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
        this.setState({
            like: true
        })
      }
    }

    likear(){
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then( res => this.setState({
            like: true,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })
        )
        .catch(e => console.log(e))
    }

    deslikear(){
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then( res => this.setState({
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })
        )
        .catch(e => console.log(e))
    }

    render(){
        console.log(this.props)
        return(
            <View style= {styles.formContainer}>
                <Text>{ this.props.dataPost.datos.textoPost }</Text>
                <Text>Creado por: { this.props.dataPost.datos.owner }</Text>
                <Image style= {styles.camera} source= {{uri: this.props.dataPost.datos.photo}}/>
                <Text>Likes: {this.state.cantidadDeLikes}</Text>


                {
                    this.state.like ?
                        <TouchableOpacity style={styles.button} onPress={() => this.deslikear()}>
                            <Text style={styles.textButton}>Dislike</Text>    
                        </TouchableOpacity>

                        :
                        
                        <TouchableOpacity style={styles.button} onPress={() => this.likear()}>
                            <Text style={styles.textButton}>Like</Text>    
                        </TouchableOpacity>
                }

            </View>
        )
    }

}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        width: `100vw`,
    },
    camera: {
        height: `60vh`,
        width: `40vw`,
    },
    button: {
        height: `6vh`,
        width: `40vw`,
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

export default Post;