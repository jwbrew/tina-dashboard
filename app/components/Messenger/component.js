import React, { Component } from 'react';
import Messages from './Messages';
import Input from './Input';
import styles from './styles.css';

const Messenger = (props) => {
  return (
    <div className={styles.root}>
      <Messages {...props} />
      <Input {...props} />
    </div>
  )
}

export default Messenger;
