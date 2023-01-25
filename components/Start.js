import React from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

const backgroundColors ={
  black: { backgroundColor: "#090C08" },
  purple: { backgroundColor: "#474056" },
  blue: { backgroundColor: "#8A95A5" },
  green: { backgroundColor: "#B9C6AE" }
}
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", color: "" };
  }

  render() {
    const { black, purple, blue, green } = backgroundColors;
    return (
      <View style={{flex:1}}>
        <ImageBackground
          source={require("../assets/background-image.png")}
          style={styles.image}
        >
          <Text style={styles.title}>Chat</Text>
          <View style={styles.box}>
            <TextInput
              style={[styles.input, styles.text]}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.text}
              placeholder='Type your name ...'
            />
            <View>
              <Text style={styles.text}>Choose your background color</Text>
              <View style={[styles.colors, styles.colorWrapper]}>
                <TouchableOpacity 
                  style={[
                    styles.color,
                    black,
                    this.state.color === black.backgroundColor
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: black.backgroundColor })
                  }
                />
                <TouchableOpacity 
                  style={[
                    styles.color,
                    purple,
                    this.state.color === purple.backgroundColor
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: purple.backgroundColor })
                  }
                />
                <TouchableOpacity 
                  style={[
                    styles.color,
                    blue,
                    this.state.color === blue.backgroundColor
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: blue.backgroundColor })
                  }
                />
                <TouchableOpacity 
                  style={[
                    styles.color,
                    green,
                    this.state.color === green.backgroundColor
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: green.backgroundColor })
                  }
                />
              </View>
            </View>
            <Button
              title="Go to Chat"
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })}
              style={styles.button}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#bfbbc9",
    opacity: 50
  },

  image: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    resizeMode: "cover"
  },

  title:{
    fontSize: 45,
    fontWeight: "600",
    color: "#dbdae0",
    textAlign: "left"
  },

  text: {
    color: "#bfbbc9",
    fontSize: 18,
    fontWeight: "300",
    textAlign: "center"
  },

  colors: {
    flexDirection: "row"
  },

  box: {
    backgroundColor: "rgba(52, 52, 52, 0.6)",
    width: "88%",
    alignItems: "center",
    height: "44%",
    justifyContent: "space-evenly"
  },

  color: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 40
  },

  colorSelected: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#5f5f5f"
  },

  input: {
    height: 50,
    width: "88%",
    borderColor: "gray",
    color: "#bfbbc9",
    borderWidth: 2,
    borderRadius: 20
  },

  button: {
    height: 50,
    width: "50%",
    backgroundColor: "#757083",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },

  buttonText: {
    padding: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },

  colorWrapper: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});