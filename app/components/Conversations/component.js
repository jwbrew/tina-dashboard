import React, { Component } from 'react';
import styles from './styles.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ConversationsListItem from './ListItem';

const Conversations = ({ conversations, children }) => {
  return (
    <div className={styles.root}>
      <ul className={styles.ul}>
        <ReactCSSTransitionGroup
          transitionName={styles}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>

          { conversations.map((c) =>
            <ConversationsListItem key={c.id} {...c} /> )}
        </ReactCSSTransitionGroup>
      </ul>
    </div>
  )
}

export default Conversations;
