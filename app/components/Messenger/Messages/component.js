import React from 'react';
import styles from './styles.css';
import MessageGroup from '../MessageGroup';

const Messages = ({ children, groupedMessages }) => {
  return (
    <div className={styles.root}>
      <div className={styles.messageContainer}>
        { children }
        { groupedMessages.map((g, i) => <MessageGroup messages={g} key={i} />) }
      </div>
    </div>
  )
}

export default Messages;
