import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'

import Post from '../../components/Post'

class Friend extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            mailFriend: props.route.params.email,
            postsFriend: [],
            infoUser:{}
        }
    }

//Saco info del posteo conectado a ese usario
    componentDidMount() {
        db
            .collection('posts')
            .where('owner', '==', this.state.mailFriend)
            .onSnapshot(docs => {
                let posts = []
                docs.forEach(doc => posts.push({
                    id: doc.id,
                    datos: doc.data()
                }))
                this.setState({
                    postsFriend: posts
                }, )
            })

//SACO INFO DEL USUARIO
        db.collection('users')
            .where('owner', '==', this.state.mailFriend)
            .onSnapshot(doc => {
                doc.forEach(doc =>
                    this.setState({
                        id: doc.id,
                        infoUser: doc.data()
                    
                    }))
            })
    }
    render() {
  
    
        return (
          <View style={styles.container}>
            <TouchableOpacity onPressOut={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.backButton}>Back to Home</Text>
            </TouchableOpacity>
    
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeText}>Perfil:{this.state.infoUser.Username}</Text>
              <Text style={styles.emailText}>{this.props.route.params.email}</Text>
              <Text style={styles.bioText}>{this.state.infoUser.description}</Text>
              <Text style={styles.creationTimeText}>
                Cantidad de Publicaciones: {this.state.postsFriend.length}
              </Text>
              <Image style={styles.profileImage} source={{ uri: this.state.infoUser.image }} />
            </View>
    
            <View style={styles.postContainer}>
              <FlatList
                data={this.state.postsFriend}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Post dataPost={item} navigation={this.props.navigation} />}
              />
            </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      backButton: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 20,
      },
      profileInfo: {
        marginBottom: 20,
      },
      welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      bioText: {
        fontSize: 16,
        marginBottom: 10,
      },
      emailText: {
        fontSize: 16,
        marginBottom: 10,
      },
      creationTimeText: {
        fontSize: 16,
        marginBottom: 20,
      },
      profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: 'center',
        marginBottom: 20,
      },
      postContainer: {
        height: 450,
        alignItems: 'center'
      },
    });
  
  export default Friend;