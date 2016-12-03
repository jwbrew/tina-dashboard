import React from 'react';
import { connect } from 'react-redux';
import App from './component';
import {
  loadConversations,
  conversationSuccess
} from '../../actions/conversations';
import { getUserProfile } from '../../reducers';
import pusher from '../../utils/Pusher';


class Component extends React.Component {
  componentDidMount() {
    let id = this.props.client.user_id || this.props.client.userId
    this.props.loadConversations(this.props.token)
    this.pusher = pusher
    this.pusher.subscribe('clients-' + id.split('|')[1])
    this.pusher.normalizedBind('new-conversation', 'conversation', this.props.conversationSuccess)
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
  conversationSuccess
})(Component);
