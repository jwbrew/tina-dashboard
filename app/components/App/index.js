import React from 'react';
import { connect } from 'react-redux';
import App from './component';
import {
  loadConversations,
  conversationSuccess
} from '../../actions/conversations';
import { messageSuccess } from '../../actions/messages';
import { getUserProfile } from '../../reducers';
import { subscribeClient, normalizedBind } from '../../utils/Pusher';


class Component extends React.Component {
  componentDidMount() {
    let id = this.props.client.user_id || this.props.client.userId
    this.props.loadConversations(this.props.token)
    subscribeClient(this.props.client)
    normalizedBind('new-conversation', 'conversation', this.props.conversationSuccess)
    normalizedBind('updated-conversation', 'conversation', this.props.conversationSuccess)
    normalizedBind('new-message', 'message', this.props.messageSuccess)
  }

  render() {
    return (<App {...this.props} />)
  }
}

const mapStateToProps = (state, props) => {
  return {
    client: getUserProfile(state)
  }
}

export default connect(mapStateToProps, {
  loadConversations,
  conversationSuccess,
  messageSuccess
})(Component);
