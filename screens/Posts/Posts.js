import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

class Post extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>hola</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bigText: {
    fontSize: 40, // You can adjust the font size here to make it REALLY big
    fontWeight: "bold", // Add other styles if needed
  },
});

export default Post;
