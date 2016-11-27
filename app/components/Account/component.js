import React, { PropTypes } from 'react';
import styles from './styles.css';
import Currency from 'react-currency';
import Tier from './Tier';
import Loader from '../Loader';


const Component = ({ stripeLoaded, isFetching }) => {
  return (
    <div className={styles.root}>
      { isFetching && <Loader /> }
      <h1>Subscription</h1>
      <div className={styles.tiers}>
        <Tier
          id="000"
          title="Early Adopter"
          features={[
            'Real-Time Dashboard',
            'Live Video Chat with Billing',
            'Mobile App',
            'Unlimited Conversations',
            'Widget Customisation',
            'Configurable Availability'
          ]}
          commission={15}
          price={0}
          active
          stripeLoaded={stripeLoaded}
        />
        <Tier
          id="100-usd"
          title="Expert"
          features={[
            'Real-Time Dashboard',
            'Live Video Chat with Billing',
            'Mobile App',
            '1 Active Conversation'
          ]}
          commission={15}
          price={15}
          stripeLoaded={stripeLoaded}
        />
        <Tier
          id="200-usd"
          title="Master"
          features={[
            'Real-Time Dashboard',
            'Live Video Chat with Billing',
            'Mobile App',
            'Unlimited Conversations',
            'Widget Customisation',
            'Configurable Availability',
            'Widget Unbranding'
          ]}
          commission={10}
          price={35}
          stripeLoaded={stripeLoaded}
        />
        <Tier
          id="300-usd"
          title="Guru"
          features={[
            'Real-Time Dashboard',
            'Live Video Chat with Billing',
            'Mobile App',
            'Unlimited Conversations',
            'Widget Customisation',
            'Configurable Availability',
            'Widget Unbranding'
          ]}
          commission={5}
          price={110}
          stripeLoaded={stripeLoaded}
        />
      </div>
    </div>
  )
}

export default Component;
