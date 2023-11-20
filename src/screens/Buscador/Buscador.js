import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db } from "../../firebase/config";

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUsuario: "",
      dataUsuario: [],
      busqueda: ''
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot(docs => {
      let users = []
      docs.forEach(doc => {
        users.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
        dataUsuario: users,
      }, () => console.log(this.state.dataUsuario));
    });
  }

  render() {
    let usuariosFiltrados = this.state.dataUsuario.filter((unUser) =>
      unUser.data.owner.toLowerCase().includes(this.state.busqueda.toLowerCase())
    );
    console.log(usuariosFiltrados);

    return (
      <View>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Busca usuarios!'
          onChangeText={text => this.setState({ busqueda: text })}
          value={this.state.busqueda}
        />
        {this.state.busqueda.length !== 0 ? (
          usuariosFiltrados.length !== 0 ? (
            <FlatList
              data={usuariosFiltrados}
              keyExtractor={(unUser) => unUser.id}
              style={styles.container}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Friend', { email: item.data.owner })}
                  style={styles.containerProfile}
                >
                  <View>
                    <Text>{item.data.Username}</Text>
                    <Text style={styles.email}>{item.data.email}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>No se encontraron usuarios.</Text>
          )
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10
  },
  input: {
    borderWidth: 2,
    height: 40,
    width: '90%',
    borderRadius: 20,
    borderColor: 'black',
    padding: 10,
    margin: 10
  },
  containerProfile: {
  
  },
  email: {
   
  }
});

export default Buscador;
