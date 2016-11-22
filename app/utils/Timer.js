import React, { Component } from 'react';

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = { duration: 0 }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(props) {
    clearInterval(this.timer)
    if (props.ended_at && props.started_at ) {
      this.setState({ duration: props.ended_at - props.started_at })
    } else if (props.started_at) {
      this.timer = setInterval(this.tick, 1000)
    } else {
      this.setState({ duration: 0 })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick () {
    this.setState({ duration: new Date().getTime() - this.props.started_at })
  }

  formatDuration(mSec) {
    const seconds = Math.round(mSec / 1000)
    let minutes = Math.floor(seconds / 60)
    let sec = seconds % 60
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    sec = sec < 10 ? `0${sec}` : `${sec}`
    return `${minutes}:${sec}`
  }

  render() {
    return (
      <span className={this.props.className}>{ this.formatDuration(this.state.duration) }</span>
    )
  }
}

export default Timer;
