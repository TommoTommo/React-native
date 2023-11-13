import { Component } from "react";

import { Text, View, TouchableOpacity } from "react-native";

class Contador extends Component{

constructor(){
    super();
    this.state = {number:0}
}




click(){
    console.log("me clickeaste ");
    console.log(this.state.number);
    this.setState({number:this.state.number+1})
}

render() {

 return (
 <View>
    <Text> Bienvenido</Text>
    <TouchableOpacity onPress={()=> this.click()}>
    <Text>
    Tocaste {this.state.number} veces
    </Text>
    </TouchableOpacity>

 </View>

 );
}
}

export default Contador