import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import { db, auth } from "../../firebase/config";
import firebase from 'firebase';
import Post from "../../components/Post"


class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      registered: false,
      posts:[]
    };
  }

  componentDidMount() {
    // Listen for changes in the user's authentication state
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ registered: true });
      } else {
        this.setState({ registered: false });
      }
    });

    db.collection('posts').onSnapshot(
      listaPosts => {
        let postsAMostrar = [];

        listaPosts.forEach(unPost => {
          postsAMostrar.push({
            id: unPost.id,
            datos: unPost.data()
          })
        })

        this.setState({
          posts: postsAMostrar
        })

      }
    )
  }

  render() {
    return (
      <View>

        {this.state.registered ? (
          <Text >Welcome, {auth.currentUser.email}!</Text>
        ) : (
          <Text>Hello, Guest, you're not signed in!</Text>
        )}

        <Text>Lista de publicaciones:</Text>

        { <FlatList
          data={this.state.posts}
          keyExtractor={unPost => unPost.id}
          renderItem={ ({item}) => <Post dataPost = {item} />}
        /> }

      </View>
    );
  }
}

export default Home;