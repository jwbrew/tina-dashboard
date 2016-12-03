import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Conversation from './component';
import {
  getActiveConversation,
  getMessagesForConversation,
  getConversationPrice,
  getUserType
} from '../../reducers';
import { onMessages } from '../../actions/messages';
import {
  startTimer,
  stopTimer,
  chargeConversation,
  conversationSuccess as onConversationUpdate
} from '../../actions/conversations';

const mapStateToProps = (state, ownProps) => {
  return {
    conversation: getActiveConversation(state, ownProps.params.conversationId),
    messages: getMessagesForConversation(state, ownProps.params.conversationId),
    userType: getUserType(state)
  }
}

export default withRouter(connect(mapStateToProps, {
  onMessages,
  startTimer,
  stopTimer,
  chargeConversation,
  onConversationUpdate
})(Conversation));
