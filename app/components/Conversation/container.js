import React from 'react';
import Component from './component';
import pusher from '../../utils/Pusher';

class Conversation extends React.Component {
  componentDidMount() {
    this.pusher = pusher
    this.pusher.normalizedBind('new-message', 'message', this.props.messageSuccess)
    this.pusher.normalizedBind('updated-conversation', 'conversation', this.props.conversationSuccess)
    this.subscribe()
  }

  componentWillReceiveProps(props) {
    this.subscribe()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  channelName() {
    return 'conversations-' + this.props.conversation.id
  }

  subscribe() {
    if (!this.pusher.channels.channels[this.channelName()])
      this.pusher.subscribe(this.channelName());
  }

  unsubscribe() {
    this.pusher.unsubscribe(this.channelName())
  }

  render() {
    return (<Component {...this.props} />)
  }
}

export default Conversation
