import React, { Component } from 'react';
import styles from './styles.css';

class Message extends Component {
  // componentDidMount() {
  //   if (!this.props.read_at &&
  //     this.props.userType != this.props.sender) {
  //     api.readMessage(this.props)
  //   }
  // }

  render() {
    return <div className={styles.root}>{ this.props.body }</div>
  }
}

export default Message;
