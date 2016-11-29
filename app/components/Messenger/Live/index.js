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
// const debug = console.log

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
      hasOffer: false,
      isOpen: false
    }

    this.pusher = pusher
    this.pusher.bind('client-media', this.maybeStart)
    this.pusher.bind('client-offer', this.receiveOffer)
    this.pusher.bind('client-answer', this.receiveAnswer)
    this.pusher.bind('client-candidate', this.receiveCandidate)
    this.pusher.bind('client-hangup', this.receiveHangup)
  }

  // Component Lifecycle
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
    this.channel.unsubscribe()
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
      localStream: null,
      isInitiator: false,
      isStarted: false,
      hasAnswered: false,
      hasOffer: false
    }, this.createPeerConnection)
  }

  // Generic

  channelId = (props) => {
    return 'private-live-' + props.conversation.id
  }

  createPeerConnection = () => {
    debug('createPeerConnection', pc);
    if (pc && pc.iceConnectionState === 'open') return
    try {
      pc = new RTCPeerConnection(pcConfig);
      pc.onicecandidate = this.handleIceCandidate;
      pc.onaddstream = this.handleRemoteStreamAdded;
      pc.onremovestream = this.handleRemoteStreamRemoved;
      pc.oniceconnectionstatechange = this.handleConnectionStateChange;
      debug('peerConnection created', pc)
    } catch (e) {
      debug('Cannot create RTCPeerConnection object.', e);
      return;
    }
  }

  getLocalStream = () => {
    debug('getLocalStream', this.state.localStream);
    navigator.getUserMedia({
      audio: true,
      video: true
    },
    this.gotLocalStream,
    (e) => {
      alert('Unable to start your video stream. Please get in touch: help@asktina.io');
    });
  }

  gotLocalStream = (stream) => {
    debug('gotLocalStream', stream);
    this.setState({
      localStream: stream
    }, () => {
      pc.addStream(stream)
    });
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
      this.setState({ isStarted: true }, () => {
        if (this.state.isInitiator) {
          this.doCall();
        }
      })
    }
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

  // UI

  open = () => {
    this.getLocalStream()
    // this.createPeerConnection()
    this.setState({ isOpen: true })
  }

  close = () => {
    this.state.localStream.getTracks().forEach((t) => t.stop())
    this.setState({
      isOpen: false,
      localStream: null
    }, this.stop)
  }

  // Making the call

  doCall = () => {
    debug('doCall', pc)
    window.foo  = pc
    pc.createOffer(
      this.setLocalAndSendMessage,
      this.handleCreateOfferError
    );
  }

  handleCreateOfferError(event) {
    debug('createOffer() error: ', event);
  }

  startCall = () => {
    debug('startCall');
    this.props.liveCallStarted()
    this.setState({
      isInitiator: true
    }, this.maybeStart())
  }
  // Receiving the call

  doAnswer = () => {
    debug('doAnswer', pc);
    this.props.liveCallAnswered()
    debug('createAnswer')
    pc.createAnswer().then(
      this.onCreateSessionDescriptionSuccess,
      this.onCreateSessionDescriptionError
    );
  }

  onCreateSessionDescriptionSuccess = (sessionDescription) => {
    this.setLocalAndSendMessage(sessionDescription)
    this.setState({
      hasAnswered: true
    })
  }

  onCreateSessionDescriptionError(error) {
    debug('onCreateSessionDescriptionError', error);
  }

  receiveAnswer = (message) => {
    debug('RECEIVE MESSAGE: answer', message);
    if (!this.state.isStarted) return
    debug('receiveAnswer pc.setRemoteDescription', new RTCSessionDescription(message));
    pc.setRemoteDescription(new RTCSessionDescription(message))
      .then(() => {
        debug('hasSetRemoteDescription', pc);
        this.setState({
          hasAnswered: true
        })
      }).catch((e) => {
        debug('errorSettingRemoteDescription', e);
      });
  }

  receiveCandidate = (message) => {
    debug('RECEIVE MESSAGE: candidate', message);
    if (!this.state.isStarted) return
    let candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate
    });
    pc.addIceCandidate(candidate);
  }

  receiveOffer = (message) => {
    debug('RECEIVE MESSAGE: offer', message, this.state);
    this.setState({
      hasOffer: true
    }, () => {
      if (
        !this.state.isInitiator &&
        !this.state.isStarted
      ) {
        this.open()
        this.setState({ isStarted: true })
      }
    })

    debug('receiveOffer pc.setRemoteDescription', new RTCSessionDescription(message));
    pc.setRemoteDescription(
      new RTCSessionDescription(message)
    );
  }

  // Current Call

  handleConnectionStateChange = (event) => {
    debug('handleConnectionStateChange', event, pc.iceConnectionState)
    if (pc && pc.iceConnectionState == 'disconnected') {
        this.handleRemoteStreamRemoved()
    }
  }

  handleRemoteStreamRemoved = (event) => {
    debug(
      'Remote stream removed. Event: ', event
    );
    // this.setState({
    //   remoteStream: null
    // })
    this.close()
  }

  hangup = () => {
    debug('hangup');
    this.props.liveCallEnded()
    this.stop();
    this.sendMessage('hangup');
  }

  receiveHangup = (message) => {
    debug('RECEIVE MESSAGE hangup', message, this.state.isStarted);
    if (!this.state.isStarted) return
    this.handleRemoteHangup()
  }

  sendMessage = (name, data) => {
    debug('SEND MESSAGE', 'client-' + name, data);
    this.channel.trigger('client-' + name, data)
  }

  stop = () => {
    debug('stop', pc, this.state)
    if (pc.iceConnectionState != 'closed') {
      pc.close()
      this.createPeerConnection()
      if (this.state.localStream) pc.addStream(this.state.localStream)
    }

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
        open={this.open}
        close={this.close}
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
