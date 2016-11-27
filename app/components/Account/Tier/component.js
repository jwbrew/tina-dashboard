import React, { PropTypes } from 'react';
import styles from './styles.css';
import Currency from 'react-currency';


const Component = ({
  id,
  title,
  features,
  commission,
  price,
  stripe,
  client,
  subscribeClient
}) => {
  const currentPlan = ((client, id) => {
    if (!client.user_metadata.stripe_plan && id === '000') return true
    if (client.user_metadata.stripe_plan && client.user_metadata.stripe_plan.id === id) return true
    return false
  })(client, id)
  return (
    <div className={styles.root}>
      <h2 className={styles.head}>{ title }</h2>
      <div className={styles.features}>
        <ul>
          { features.map((f, i) => <li className={styles.feature} key={i}>{f}</li>)}
        </ul>
      </div>
      <div>
        <span className={styles.commission}>{commission}%</span>
        <small>commission</small>
      </div>
      <div>
        <span className={styles.price}>${price}</span>
        <small>per month</small>
      </div>
      <div>
        { currentPlan &&
          <p className={styles.active}>
            Current Plan
          </p> }

        { !currentPlan &&
          <button
            className={styles.button}
            onClick={() => {
              if (client.user_metadata.stripe_customer_id) {
                subscribeClient(client, id)
              } else {
                stripe.open({
                  name: 'AskTina',
                  description: title,
                  zipCode: true,
                  panelLabel: 'Subscribe'
                })
              }
            }}
          >
            { client.user_metadata.stripe_plan.amount > price * 100 && 'Downgrade'}
            { client.user_metadata.stripe_plan.amount < price * 100 && 'Upgrade'}
          </button>
        }
      </div>
    </div>
  )
}

export default Component;
