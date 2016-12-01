import React from 'react';
import styles from '../shared.css';

export default ({ nextPage }) => {
  return (
    <div className={styles.root}>
      <h1 className={styles.h1}>Tips & Tricks</h1>
      <p className={styles.lead}>
        Here are some useful links and advice to help you hit the ground running.
        <br />
        Stick them in your bookmarks for future reference.
      </p>
      <a href="https://blog.asktina.io/how-to-make-money-with-asktina" target="_new">
        How To Stop Losing Blog Traffic To Adsense & Start Making Money With AskTina
      </a>
      <a href="https://www.facebook.com/groups/1679620478995018/" target="_new">
        AskTina Expert Mastermind Facebook Group
      </a>
      <button onClick={nextPage} className={styles.button}>Next</button>
    </div>
  )
}
