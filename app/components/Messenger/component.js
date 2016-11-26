import React, { Component } from 'react';
import Messages from './Messages';
import Input from './Input';
import styles from './styles.css';
import Live from './Live';
import LiveIcon from './assets/live.svg';
import CloseIcon from './assets/close.svg';

const Messenger = (props) => {
  return (
    <div className={styles.root}>
      { props.liveSupported && props.conversation.id && <LiveIcon
        onClick={(e) => {
          e.preventDefault()
          props.toggleLive()
        }}
        className={styles.openLive} /> }
        { props.liveOpen && <CloseIcon
          onClick={(e) => {
            e.preventDefault()
            props.toggleLive()
          }}
          className={styles.closeLive} /> }
      <Messages {...props} />
      <Input {...props} />
      { props.liveOpen && <Live {...props} /> }
    </div>
  )
}

export default Messenger;
