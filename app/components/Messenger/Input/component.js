import React from 'react';
import styles from './styles.css';

const Input = ({ sendMessage, conversation, userType, clientId }) => {
  return (
    <input
      className={styles.root}
      onKeyUp={ (e) => {
        e.preventDefault()
        if (e.key === 'Enter') {
          sendMessage({
            body: e.target.value,
            sender: userType
          }, conversation, clientId)
          e.target.value = ''
        }
      } }
      type="text"
      placeholder="Ask me anything..."
      autoFocus
    />
  )
}

export default Input;
