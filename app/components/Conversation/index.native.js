import React from 'react';
import { BackAndroid } from 'react-native';
import Component from './component';
import { connect } from 'react-redux';
import { getActiveConversation } from '../../reducers';
import { conversationSuccess } from '../../actions/conversations';
import { messageSuccess } from '../../actions/messages';

class Conversation extends React.Component {
  componentDidMount() {
    var navigator = this.props.navigator
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.pop();
          return true;
      }
      return false;
    });
  }

  render() {
    return (<Component {...this.props} />)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    conversation: getActiveConversation(state, ownProps.id)
  }
}

export default connect(mapStateToProps, {
  conversationSuccess,
  messageSuccess
})(Conversation);
