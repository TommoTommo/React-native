import react, { Component } from "react";
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView, Image} from 'react-native';
import Post from "../../components/Post"

class MyProfile extends Component{
  constructor(props){
      super(props)
      this.state={
          posteos: [],
          dataUsuario: {},
          id: '',
          usuarioLogueado: auth.currentUser.email,
      };
  }

  componentDidMount(){
    db.collection('posts').where('owner', '==', this.state.usuarioLogueado)
      .onSnapshot(listaPosts => {
              let posts = [];
              listaPosts.forEach(unPost => {
                  posts.push({
                      id: unPost.id,
                      datos: unPost.data()
                  })
              })

              this.setState({
                  posteos: posts
              })
              console.log("posteos", this.state.posteos);
          }
      )

      db.collection('users')
          .where('owner', '==', this.state.usuarioLogueado)
          .onSnapshot(docs => {
              docs.forEach(doc =>
                  this.setState({
                      id: doc.id,
                      dataUsuario: doc.data()
                  }))
          })
  }
  
 
  logout() {
  auth.signOut();
  this.props.navigation.navigate("Login");
  }

  render() {
    console.log('perfil')
      return (
        <View>
        <Text>Bienvenido {this.state.dataUsuario.Username}</Text>
        <Text>Biografia: {this.state.dataUsuario.description}</Text>
        <Text>Mail: {auth.currentUser.email}</Text>
<br></br>
<br></br>
<Text> Mis posteos:</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={unPost => unPost.id.toString()}
                    renderItem={({ item }) => <Post dataPost={item} />}
                />
  <br></br>
<br></br>
        <TouchableOpacity onPress={()=> this.logout()}>
        <text> Cerrar Sesion</text>
        </TouchableOpacity>
    </View>
      )
    
    }
  }

export default MyProfile;
