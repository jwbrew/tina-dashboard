import React, { Component } from 'react';
import styles from './styles.css'

const GLOBAL = typeof window === 'undefined' ? global : window;

class Timer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startTime: new Date().getTime(),
      duration: 0
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    GLOBAL.clearInterval(this.timer)
  }

  tick () {
    this.setState({ duration: new Date().getTime() - this.state.startTime })
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
      <span className={styles.root}>{ this.formatDuration(this.state.duration) }</span>
    )
  }
}

export default Timer;
