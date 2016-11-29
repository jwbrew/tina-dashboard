import React, { Component } from 'react';
import Messages from './Messages';
import Input from './Input';
import styles from './styles.css';
import Live from './Live';

const Messenger = (props) => {
  return (
    <div className={styles.root}>
      { props.liveSupported && props.conversation.id && <Live {...props} />}
      <Messages {...props} />
      <Input {...props} />
    </div>
  )
}

export default Messenger;
