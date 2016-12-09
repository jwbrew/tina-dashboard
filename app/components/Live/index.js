import React from 'react';
import { connect } from 'react-redux';
import Component from './component';
import {
  liveCallStarted,
  liveCallAnswered,
  liveCallEnded,
  receiveMessage,
  sendMessage
} from '../../actions/live';
import { getUserProfile } from '../../reducers';
import pusher from '../../utils/Pusher';
require('webrtc-adapter');

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

    pusher.bind_all(this.props.receiveMessage)
    pusher.bind('media', this.maybeStart)
    pusher.bind('offer', this.receiveOffer)
    pusher.bind('answer', this.receiveAnswer)
    pusher.bind('candidate', this.receiveCandidate)
    pusher.bind('hangup', this.receiveHangup)
  }

  // Component Lifecycle
  componentDidMount() {
    this.init(this.props)
  }

  componentWillUnmount() {
    this.channel.unsubscribe()
    this.stop()
  }

  init(props) {
    this.channel = pusher.channels.channels[0]
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


  createPeerConnection = () => {
    if (pc && pc.iceConnectionState === 'open') return
    try {
      pc = new RTCPeerConnection(pcConfig);
      pc.onicecandidate = this.handleIceCandidate;
      pc.onaddstream = this.handleRemoteStreamAdded;
      pc.onremovestream = this.handleRemoteStreamRemoved;
      pc.oniceconnectionstatechange = this.handleConnectionStateChange;
    } catch (e) {
      return;
    }
  }

  getLocalStream = () => {
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
    this.setState({
      localStream: stream
    }, () => {
      pc.addStream(stream)
    });
  }

  handleIceCandidate = (event) => {
    if (event.candidate) {
      this.sendMessage(
        'candidate',
        {
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        }
      );
    }
  }

  handleRemoteHangup = () => {
    this.stop();
  }

  handleRemoteStreamAdded = (event) => {
    this.setState({ remoteStream: event.stream })
  }

  maybeStart = () => {
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
      localStream: null,
      isOpen: false
    }, this.stop)
  }

  // Making the call

  doCall = () => {
    window.foo  = pc
    pc.createOffer(
      this.setLocalAndSendMessage,
      console.log
    );
  }

  startCall = () => {
    this.props.liveCallStarted()
    this.setState({
      isInitiator: true
    }, this.maybeStart())
  }
  // Receiving the call

  doAnswer = () => {
    this.props.liveCallAnswered()
    pc.createAnswer().then(
      this.onCreateSessionDescriptionSuccess,
      console.log
    );
  }

  onCreateSessionDescriptionSuccess = (sessionDescription) => {
    this.setLocalAndSendMessage(sessionDescription)
    this.setState({
      hasAnswered: true
    })
  }

  receiveAnswer = (message) => {
    if (!this.state.isStarted) return
    pc.setRemoteDescription(new RTCSessionDescription(message))
      .then(() => {
        this.setState({
          hasAnswered: true
        })
      });
  }

  receiveCandidate = (message) => {
    if (!this.state.isStarted) return
    let candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate
    });
    pc.addIceCandidate(candidate);
  }

  receiveOffer = (message) => {
    if (this.state.isStarted) return;
    this.setState({
      hasOffer: true,
      sessionId: message.session_id
    }, () => {
      if (
        !this.state.isInitiator &&
        !this.state.isStarted
      ) {
        this.open()
        this.setState({ isStarted: true })
      }
    })

    pc.setRemoteDescription(
      new RTCSessionDescription(message)
    );
  }

  // Current Call

  handleConnectionStateChange = (event) => {
    if (pc && pc.iceConnectionState == 'disconnected') {
        this.handleRemoteStreamRemoved()
    }
  }

  handleRemoteStreamRemoved = (event) => {
    this.close()
  }

  hangup = () => {
    this.props.liveCallEnded()
    this.close();
    this.sendMessage('hangup');
  }

  receiveHangup = (message) => {
    if (!this.state.isStarted) return
    this.handleRemoteHangup()
  }

  sendMessage = (name, data) => {
    this.props.sendMessage(name, data, this.props.client, this.state.sessionId)
  }

  stop = () => {
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
    return (
      <Component
        {...this.props}
        {...this.state}
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
    client: getUserProfile(state)
  }
}

export default connect(mapStateToProps, {
  liveCallStarted,
  liveCallAnswered,
  liveCallEnded,
  receiveMessage,
  sendMessage
})(Live);
