import React from 'react';
import styles from './styles.css';

const Component = ({ onClick, conversation, children }) => {
  if (conversation.stripe) {
    return (
      <div className={styles.root}>
        <PaymentIcon />
      </div>
    )
  }

  return (
    <a className={styles.link} onClick={onClick}>
      { children }
    </a>
  )
}

export default Component
