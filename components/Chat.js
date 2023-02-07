import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        avatar: "",
        name: "",
      },
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAgMYlkKgXL0CdzliCnB0n9Fw3Ycswfup0",
        authDomain: "chatapp-b337e.firebaseapp.com",
        projectId: "chatapp-b337e",
        storageBucket: "chatapp-b337e.appspot.com",
        messagingSenderId: "712440267747",
        appId: "1:712440267747:web:1f95efe4ba638daeba16d6",
        measurementId: "G-K8K3M0LRNJ"
      });
    }

    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount(){
    //Set the name property to be included in the navigation bar
    let name = this.props.route.params.name;

    // set the state with a static message
      this.setState({
        messages: [
          {
            _id: 2,
            loggedInText: `${name} has entered the chat`,
            createdAt: new Date(),
            system: true,
          },
        ],
      });

      this.props.navigation.setOptions({ title: name });

      this.referenceChatMessages = firebase
        .firestore()
        .collection('messages')
      this.unsubscribe = this.referenceChatMessages.onSnapshot(
        this.onCollectionUpdate
        );

      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        //update user state with current user data
        this.setState({
          uid: user?.uid,
          messages: [],
          // user: {
          //   _id: user.uid,
          //   name: name
          // },
        });

        this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    //stop listening for changes
    this.unsubscribe();
    //stop listening to authentication
    this.authUnsubscribe();
  }

  // appends messages so that new messages can be added without losing previous messages
  onSend(messages = []) {
    this.setState
      (previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
      }
    );
  }

  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user
    });
  };

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    //go through each document
    querySnapshot.forEach((doc) => {
      //get the queryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || '',
        },
      });
    });
    this.setState({
      messages
    });
  };

  // Bubble customization
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#b07c7c'
          },
          left: {
            backgroundColor: '#fff'
          }
        }}
      />
    )
  }

  render() {
    // Set the color property as background color for the chat screen
    const { color } = this.props.route.params;
    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            avatar: 'https://placeimg.com/140/140/any'
,          }}
        />
        {/* resolve screen display on older androids */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
      </View>
    );
  }
}
