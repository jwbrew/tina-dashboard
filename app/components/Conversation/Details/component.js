import React, { Component } from 'react';
import styles from './styles.css';
import Currency from 'react-currency';
import PlayIcon from './assets/play.svg';
import StopIcon from './assets/stop.svg';

const Details = ({ conversation, chargeConversation }) => {
  let input

  return (
    <div className={styles.details}>
      <section className={styles.section}>
        <label className={styles.label}>Billing</label>
        { conversation.stripe &&
          <div className={styles.billing}>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (input.value &&
                  confirm('Confirm charge of ' + input.value + ' USD' )) {
                  chargeConversation(
                    conversation,
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
        { !conversation.stripe &&
          <small>
            <p>No payment method</p>
            <p>There is a button at the bottom of the visitor's chat window to add one.</p>
          </small>
        }
        { conversation.charges &&
          conversation.charges.map((c) => {
            return (<div className={styles.charges} key={c.id}>
              <small className={styles.date}>{ new Date(c.created * 1000).toLocaleString() }</small>
              <Currency value={c.amount} />
            </div>)
          })
        }
      </section>
      <section className={styles.section}>
        <label className={styles.label}>Page Started On</label>
        <small>{ conversation.created_on || 'Not Set' }</small>
      </section>
    </div>
  )
}

export default Details;
