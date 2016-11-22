import React from 'react';
import styles from './styles.css';
import Message from '../Message';

const MessageGroup = ({ messages, userType }) => {
  const ts = new Date(messages[messages.length - 1].ts)
  return (
    <div className={[styles.root, styles[messages[0].sender === userType ? 'sent' : 'received' ]].join(' ')}>
      <div className={styles.messages}>
        { messages.map((message) => <Message {...message} userType={userType} key={message.ts}/>) }
      </div>
      <small className={styles.timestamp}>{ts.toLocaleTimeString()}</small>
    </div>
  )
}

export default MessageGroup;
