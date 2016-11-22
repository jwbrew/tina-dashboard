import React from 'react';
import { connect } from 'react-redux';
import Component from './component';
import {
  loadMessages
} from '../../../actions/messages';
import {
  getActiveConversation,
  getGroupedMessagesForConversation,
  getUserType
} from '../../../reducers';

class Messages extends React.Component {
  componentDidMount() {
    if (this.props.conversation.id) {
      this.props.loadMessages(this.props.conversation)
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.conversation.id != props.conversation.id) {
      this.props.loadMessages(props.conversation)
    }
  }

  render() {
    return <Component {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => ({
  conversation: getActiveConversation(state, ownProps.conversationId),
  groupedMessages: getGroupedMessagesForConversation(state, ownProps.conversationId),
  userType: getUserType(state)
})

export default connect(mapStateToProps, {
  loadMessages
})(Messages);
