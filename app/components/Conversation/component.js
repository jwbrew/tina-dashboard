import React, { Component } from 'react';
import styles from './styles.css';
import Messenger from '../Messenger';
import Loader from '../Loader';
import Details from './Details';

const LiveWelcome = ({ stripe, rate }) => {
  return (
    <div>
      <p className={styles.text}>
        Video call can be started once visitor has added a payment method.
      </p>
      <p className={styles.text}>
        The timer will run from when the call is answered, and you can charge
        the visitor from the Billing section on the right.
      </p>
    </div>
  )
}

const Conversation = (props) => {
  return (
    <div className={styles.root}>
      { props.conversation.isFetching && <Loader /> }
      { props.conversation &&
        <Messenger
          conversationId={props.conversation.id}
          liveWelcome={(conversation) => {
            return <LiveWelcome stripe={conversation.stripe} />
          }}
        />
      }
      { props.conversation && <Details /> }
    </div>
  )
}

export default Conversation;
