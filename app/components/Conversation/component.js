import React, { Component } from 'react';
import Currency from 'react-currency';
import styles from './styles.css';
import Messenger from '../Messenger';
import PlayIcon from './assets/play.svg';
import StopIcon from './assets/stop.svg';
import Loader from '../Loader';

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
  let input

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
      { props.conversation &&
        <div className={styles.details}>
          <section className={styles.section}>
            <label className={styles.label}>Billing</label>
            { props.conversation.stripe &&
              <div className={styles.billing}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if (input.value &&
                      confirm('Confirm charge of ' + input.value + ' USD' )) {
                      props.chargeConversation(
                        props.conversation,
                        input.value * 100
                      )
                      input.value = ''
                    }
                  } }>
                  <div className={styles.inputGroup}>
                    <span>$</span>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      max="1000"
                      ref={(node) => input = node }
                      className={styles.input} />
                    <input type="submit" className={styles.button} value='Charge'/>
                  </div>
                </form>
              </div>
               }
            { !props.conversation.stripe &&
              <small>
                <p>No payment method</p>
                <p>There is a button at the bottom of the visitor's chat window to add one.</p>
              </small>
            }
            { props.conversation.charges &&
              props.conversation.charges.map((c) => {
                return (<div className={styles.charges} key={c.id}>
                  <small className={styles.date}>{ new Date(c.created * 1000).toLocaleString() }</small>
                  <Currency value={c.amount} />
                </div>)
              })
            }
          </section>
        </div> }
    </div>
  )
}

export default Conversation;
