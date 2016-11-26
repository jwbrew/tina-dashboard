import React from 'react';
import { connect } from 'react-redux';
import Component from './component';
import {
  getActiveConversation
} from '../../../reducers';
import {
  liveCallStarted,
  liveCallAnswered,
  liveCallEnded
} from '../../../actions/live';
import pusher from '../../../utils/Pusher';
require('webrtc-adapter');

const debug = () => {}

var pc

const pcConfig = {
  iceServers: [{
    urls: 'stun:numb.viagenie.ca:3478',
    credential: 'Br4dd3r5',
    username: 'james@asktina.io'
  }, {
    urls: 'turn:numb.viagenie.ca:3478',
    credential: 'Br4dd3r5',
    username: 'james@asktina.io'
  }]
};

class Live extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      localStream: null,
      remoteStream: null,
      isChannelReady: false,
      isInitiator: false,
      isStarted: false,
      hasOffer: false
    }

    this.pusher = pusher

    this.pusher.bind('client-media', this.maybeStart)
    this.pusher.bind('client-offer', (message) => {
      debug('RECEIVE MESSAGE: offer', message);
      if (
        !this.state.isInitiator &&
        !this.state.isStarted
      ) {
        this.maybeStart();
      }
      debug('pc.setRemoteDescription', new RTCSessionDescription(message));
      pc.setRemoteDescription(
        new RTCSessionDescription(message)
      );
      this.setState({
        hasOffer: true
      })
    })
    this.pusher.bind('client-answer', (message) => {
      debug('RECEIVE MESSAGE: answer', message);
      if (!this.state.isStarted) return
      this.setState({
        hasAnswered: true
      }, () => {
        pc.setRemoteDescription(
          new RTCSessionDescription(message)
        );
      })
    })
    this.pusher.bind('client-candidate', (message) => {
      debug('RECEIVE MESSAGE: candidate', message);
      if (!this.state.isStarted) return
      let candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      pc.addIceCandidate(candidate);
    })
    this.pusher.bind('client-end', (message) => {
      debug('RECEIVE MESSAGE end', message, this.state.isStarted);
      if (!this.state.isStarted) return
      this.handleRemoteHangup()
    })

  }

  componentDidMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(props) {
    debug('componentWillReceiveProps', props);
    if (this.state.isStarted) this.hangup()
    this.init(props)
  }

  componentWillUnmount() {
    debug('componentWillUnmount');
    this.state.localStream.getTracks().forEach((t) => t.stop())
    this.stop()
  }

  init(props) {
    debug('init', props);
    this.pusher.subscribe(this.channelId(props));
    this.channel = this.pusher.channels.channels[this.channelId(props)]

    debug('subscribed', this.channel);
    this.setState({
      isChannelReady: true,
      remoteStream: null,
      isInitiator: false,
      isStarted: false,
      hasAnswered: false
    }, () => {
      this.getLocalStream()
      this.createPeerConnection()
    })
  }

  channelId = (props) => {
    return 'private-live-' + props.conversation.id
  }

  createPeerConnection = () => {
    debug('createPeerConnection');
    try {
      pc = new RTCPeerConnection(pcConfig);
      pc.onicecandidate = this.handleIceCandidate;
      pc.onaddstream = this.handleRemoteStreamAdded;
      pc.onremovestream = this.handleRemoteStreamRemoved;
      pc.oniceconnectionstatechange = this.handleConnectionStateChange;
    } catch (e) {
      debug('Cannot create RTCPeerConnection object.', e);
      return;
    }
  }

  doAnswer = () => {
    debug('doAnswer');
    this.props.liveCallAnswered()
    this.setState({
      hasAnswered: true
    })
    pc.createAnswer().then(
      this.setLocalAndSendMessage,
      this.onCreateSessionDescriptionError
    );
  }

  doCall = () => {
    pc.createOffer(
      this.setLocalAndSendMessage,
      this.handleCreateOfferError
    );
  }

  getLocalStream = () => {
    navigator.getUserMedia({
      audio: true,
      video: true
    }, this.gotLocalStream,
    function(e) {
      alert('getUserMedia() error: ' + e.name);
    });
  }

  gotLocalStream = (stream) => {
    this.setState({
      localStream: stream
    })
  }

  handleConnectionStateChange = (event) => {
    if (pc && pc.iceConnectionState == 'disconnected') {
        this.handleRemoteStreamRemoved()
    }
  }

  handleCreateOfferError(event) {
    debug('createOffer() error: ', event);
  }

  handleIceCandidate = (event) => {
    debug('handleIceCandidate', event);
    if (event.candidate) {
      this.sendMessage(
        'candidate',
        {
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        }
      );
    } else {
      debug('End of candidates.');
    }
  }

  handleRemoteHangup = () => {
    debug('handleRemoteHangup');
    this.stop();
  }

  handleRemoteStreamAdded = (event) => {
    debug('handleRemoteStreamAdded', event, this.setState);
    this.setState({ remoteStream: event.stream }, () => {
      debug('remoteStreamAdded');
    })
  }

  handleRemoteStreamRemoved = (event) => {
    debug(
      'Remote stream removed. Event: ', event
    );
    // this.setState({
    //   remoteStream: null
    // })
    this.stop()
  }

  hangup = () => {
    debug('hangup');
    this.props.liveCallEnded()
    this.stop();
    this.sendMessage('end');
  }

  maybeStart = () => {
    debug(
      'maybeStart',
      !this.state.isStarted,
      this.state.localStream !== 'undefined',
      this.state.isChannelReady
    );
    if (
      !this.state.isStarted &&
      this.state.localStream !== 'undefined' &&
      this.state.isChannelReady
    ) {
      this.createPeerConnection();
      pc.addStream(this.state.localStream);
      this.setState({ isStarted: true }, () => {
        if (this.state.isInitiator) {
          this.doCall();
        }
      })
    }
  }

  onCreateSessionDescriptionError(error) {
    debug('onCreateSessionDescriptionError', error);
  }

  sendMessage = (name, data) => {
    debug('SEND MESSAGE', 'client-' + name, data);
    this.channel.trigger('client-' + name, data)
  }

  setLocalAndSendMessage = (sessionDescription) => {
    debug('setLocalAndSendMessage', sessionDescription);
    // Set Opus as the preferred codec in SDP if Opus is present.
    //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
    pc.setLocalDescription(
      sessionDescription
    );
    this.sendMessage(sessionDescription.type, sessionDescription);
  }

  startCall = () => {
    debug('startCall');
    this.props.liveCallStarted()
    this.setState({
      isInitiator: true
    }, this.maybeStart())
  }

  stop = () => {
    pc = null
    debug(this.state);
    this.setState({
      remoteStream: null,
      isStarted: false,
      hasOffer: false,
      hasAnswered: false,
      isInitiator: false
    })
  }

  render() {
    debug('RENDERING', this.state);

    return (
      <Component
        {...this.props}
        {...this.state}
        startCall={this.startCall}
        doAnswer={this.doAnswer}
        endCall={this.hangup}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    conversation: getActiveConversation(
      state, ownProps.conversationId
    )
  }
}

export default connect(mapStateToProps, {
  liveCallStarted,
  liveCallAnswered,
  liveCallEnded
})(Live);
