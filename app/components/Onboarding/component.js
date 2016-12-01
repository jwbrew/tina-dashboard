import React from 'react';
import styles from './styles.css';
import Transition from 'react-addons-css-transition-group';
import Welcome from './Welcome';
import Settings from './Settings';
import Payment from './Payment';
import Guide from './Guide';

export default ({ page }) => {
  return (
    <div className={styles.root}>
      <Transition
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionName={styles}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        { page === 0 && <Welcome />}
        { page === 1 && <Settings />}
        { page === 2 && <Guide />}
        { page === 3 && <Payment />}
      </Transition>
      { page > 0 && <span className={styles.counter}>step {page}/3</span>}
    </div>
  )
}
