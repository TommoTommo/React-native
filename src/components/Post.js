import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      like: false,
      cantidadDeLikes: this.props.dataPost.datos.likes.length
    };
  }

  componentDidMount() {
    if (this.props.dataPost.datos.likes.includes(auth.currentUser.email)) {
      this.setState({
        like: true
      });
    }
  }

  likear() {
    db.collection('posts')
      .doc(this.props.dataPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then((res) =>
        this.setState({
          like: true,
          cantidadDeLikes: this.props.dataPost.datos.likes.length
        })
      )
      .catch((e) => console.log(e));
  }

  deslikear() {
    db.collection('posts')
      .doc(this.props.dataPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then((res) =>
        this.setState({
          like: false,
          cantidadDeLikes: this.props.dataPost.datos.likes.length
        })
      )
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.dataPost.datos.textoPost}</Text>
        <Text>Creado por: {this.props.dataPost.datos.owner}</Text>
        <Image style={styles.image} source={{ uri: this.props.dataPost.datos.photo }} />
        <Text>Likes: {this.state.cantidadDeLikes}</Text>

        {this.state.like ? (
          <TouchableOpacity style={styles.dislikeButton} onPress={() => this.deslikear()}>
            <Text style={styles.buttonText}>Dislike</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.likeButton} onPress={() => this.likear()}>
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 450,
    alignItems: 'center'
},
title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    height: '60%',
    width: '60%', 
    marginTop: 10,
    borderRadius: 5,
  },
  likeButton: {
    height: 40,
    width: '40%',
    backgroundColor: '#4CAF50',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  dislikeButton: {
    height: 40,
    width: '40%',
    backgroundColor: '#ff4500',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Post;
