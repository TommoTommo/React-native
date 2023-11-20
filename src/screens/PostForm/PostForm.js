import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import Camera from '../../components/Camera';

class PostForm extends Component {
  constructor() {
    super();
    this.state = {
      textoPost: '',
      showCamera: true,
      url: '',
    };
  }

  crearPost(owner, textoPost) {
    db.collection('posts')
      .add({
        owner: owner,
        textoPost: textoPost,
        photo: this.state.url,
        createdAt: Date.now(),
        likes: [],
      })
      .then(console.log('Posteaste correctamente'))
      .catch((error) => console.log(`El error fue: ${error}`));
  }

  onImageUpload(url) {
    this.setState({ url: url, showCamera: false });
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Crear publicación</Text>

        {this.state.showCamera ? (
          <Camera onImageUpload={(url) => this.onImageUpload(url)} />
        ) : (
          <>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ textoPost: text })}
              placeholder='Escribir...'
              keyboardType='default'
              value={this.state.textoPost}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now())}
            >
              <Text style={styles.textButton}>Publicar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#28a745',
    marginTop: 10,
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default PostForm;
