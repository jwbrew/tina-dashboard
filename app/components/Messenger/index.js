import React from 'react';
import { connect } from 'react-redux';
import Component from './component';
import {
  getActiveConversation,
} from '../../reducers';
import { track } from '../../utils/Analytics';

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


class Messenger extends React.Component {
  constructor(props) {
    super(props)
    this.state = { liveOpen: false }
  }

  toggleLive = () => {
    this.setState((prev) => {
      track(prev.liveOpen ? 'live-closed' : 'live-opened')
      return {
        liveOpen: !prev.liveOpen
      }
    })
  }

  render() {
    return (
      <Component
        {...this.props}
        {...this.state}
        toggleLive={this.toggleLive}
        liveSupported={!!navigator.getUserMedia}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    conversation: getActiveConversation(state, ownProps.conversationId)
  }
}

export default connect(mapStateToProps, {})(Messenger);
