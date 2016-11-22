import React, { PropTypes } from 'react';
import styles from './styles.css';
import Currency from 'react-currency';


const Stats = ({ month, all }) => {
  return (
    <div className={styles.root}>
      <h1>This Month</h1>
      <div className={styles.row}>
        <div className={styles.panel}>
          <span className={styles.hero}>{month.count}</span>
          Conversations
        </div>
        <div className={styles.panel}>

          <span className={styles.hero}>{new Date(month.duration).toTimeString().substr(0, 8)}</span>
          Duration
        </div>
        <div className={styles.panel}>
          <span className={styles.hero}><Currency value={month.price}/></span>
          Earned
        </div>
      </div>
      <h1>All Time</h1>
      <div className={styles.row}>
        <div className={styles.panel}>
          <span className={styles.hero}>{all.count}</span>
          Conversations
        </div>
        <div className={styles.panel}>
          <span className={styles.hero}>{new Date(all.duration).toTimeString().substr(0, 8)}</span>
          Duration
        </div>
        <div className={styles.panel}>
          <span className={styles.hero}><Currency value={all.price}/></span>
          Earned
        </div>
      </div>
    </div>
  )
}

Stats.propTypes = {
  month: PropTypes.shape({
    count: PropTypes.number,
    duration: PropTypes.number,
    price: PropTypes.number
  }),
  year: PropTypes.shape({
    count: PropTypes.number,
    duration: PropTypes.number,
    price: PropTypes.number
  })
}

export default Stats;
