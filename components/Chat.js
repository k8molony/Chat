import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default class Chat extends React.Component {
  componentDidMount(){
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    const backgroundColor = this.props.route.params.color;
    return (
      <View style={[styles.chatContainer, { backgroundColor }]}>
        <Button 
          title="Go to Start"
          onPress={() => this.props.navigation.navigate("Start")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});