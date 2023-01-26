import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default class Chat extends Component {
  componentDidMount(){
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    const backgroundColor = this.props.route.params.color;
    return (
      <View style={[styles.chatContainer, { backgroundColor }]}>
        <TouchableOpacity
          style={styles.button} 
          title="Return to Start"
          onPress={() => this.props.navigation.navigate("Start")}
        >
          <Text style={{ color: '#FFF', fontSize: 24 }}>Return to Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  button: {
    height: 50,
    width: "50%",
    backgroundColor: "#757083",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },

});