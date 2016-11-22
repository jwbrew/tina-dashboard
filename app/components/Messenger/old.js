import React, { Component, PropTypes } from 'react';
import Messenger from './components/Messenger';
import Api from 'tina-api';
// import pusher from '../../shared/Pusher';
import { normalize, Schema, arrayOf } from 'normalizr';
const message = new Schema('messages', { idAttribute: 'uuid' });
import { track } from 'tina-analytics';

class App extends Component {
  constructor(props) {
    super(props)
    this.api = new Api()
    this.loadMessages = this.loadMessages.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.postMessage = this.postMessage.bind(this)

    // this.pusher = pusher
    // this.pusher.bind('new-message', (data) => {
    //   this.props.onMessages(normalize(data, message), data.conversation_id)
    // })
    //
    // this.pusher.bind('updated-conversation', this.props.onConversationUpdate)
    //
    // this.subscribe()
  }

  loadMessages() {
    this.api.getMessages(this.props.conversation).then((response) => {
      this.props.onMessages(response)
    })
  }

  channelName() {
    return `private-conversations-${this.props.conversation.id}`
  }

  componentWillMount() {
    if (this.props.conversation.id) this.loadMessages(this.props.conversation)
  }

  componentDidUpdate(props) {
    this.subscribe()
    if (props.conversation.id != this.props.conversation.id) {
      this.loadMessages(props.conversation)
    }
  }

  endConversation() {
    this.api.endConversation(this.props.conversation)
      .then((response) => {
        this.props.onEndConversation(response)
    });
  }

  sendMessage(body, conversation) {
    if (conversation.id) {
      this.postMessage(body, conversation)
    } else {
      this.api.createConversation(this.props.client.user_id).then((response) => {
        let conversation = response.body().data()
        this.postMessage(body, conversation)
        this.props.onConversationUpdate(conversation)
      })
    }
  }

  postMessage(body, conversation) {
    this.api.sendMessage({
      body,
      sender: this.props.userType
    }, conversation).then((response) => {
      track(this.props.app, 'message-sent')
      this.props.onMessages(response)
    })
  }

  subscribe() {
    if (!this.pusher.channels.channels[this.channelName()]) {
      this.pusher.subscribe(this.channelName());
    }
  }


  render() {
    return (
      <Messenger {...this.props}
        sendMessage={this.sendMessage} />
    )
  }
}

export default App
