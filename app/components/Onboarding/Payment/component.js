import React from 'react';
import styles from '../shared.css';
import Stripe from '../../Stripe';

export default ({
  userProfile,
  subscribeClient,
  push
}) => {
  var planDetails

  switch (userProfile.user_metadata.initial_plan_id) {
    case '100-usd':
      planDetails = {
        name: 'Expert',
        price: 15,
        commission: 15
      }
      break;
    case '200-usd':
      planDetails = {
        name: 'Master',
        price: 35,
        commission: 10
      }
      break;
    case '300-usd':
      planDetails = {
        name: 'Guru',
        price: 110,
        commission: 5
      }
      break;
    default:
      break;
  }
  return (
    <div className={styles.root}>
      <h1 className={styles.h1}>Plan Confirmation</h1>
      <p className={styles.p}>Last Step!</p>
      <p className={styles.lead}>
        You have selected the <strong>{ planDetails.name }</strong> Plan
        <br />
        ${ planDetails.price } per month
        <br />
        { planDetails.commission }% commission
      </p>
      <Stripe
        panelLabel="Submit"
        token={(token) => {
          subscribeClient(
            userProfile,
            userProfile.user_metadata.initial_plan_id,
            token.id
          )
        }}
      >
        <button className={styles.button}>Start 7 day free trial</button>
      </Stripe>
      <small>cancel anytime</small>
    </div>
  )
}
