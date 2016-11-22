import React, { Component } from 'react';
import { Link } from 'react-router'
import styles from './styles.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Currency from 'react-currency';

const ConversationsList = ({ id, created_at, started_at, ended_at, price, charges, is_unread }) => {
  return (
    <li className={styles.root} key={id}>
      <Link to={`/conversations/${id}`} activeClassName={styles.active} className={styles.link}>
        <div className={`${styles.conversation} ${(is_unread ? styles.open : styles.ended)}`}>
          <span>{new Date(created_at).toLocaleString()}</span><br/>
          <div>
              <small className={styles.amount}>
                <Currency value={charges ? charges.reduce((a,b) => {
                    return a + b.amount
                  }, 0).toFixed(2) : 0}/>
              </small>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default ConversationsList;
