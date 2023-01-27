import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends Component {
  // state initialization for messages
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount(){
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    // set the state with a static message
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  // appends messages so that new messages can be added without losing previous messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }



  render() {
    const { color } = this.props.route.params;
    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* resolve screen display on older androids */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
      </View>
    );
  }
}
