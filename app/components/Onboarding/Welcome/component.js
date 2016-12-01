import React from 'react';
import styles from '../shared.css';

export default ({ nextPage }) => {
  return (
    <div className={styles.root}>
      <img src="https://asktina.io/assets/img/logo.png"/>
      <h1 className={styles.h1}>Welcome to AskTina</h1>
      <p className={styles.lead}>The best way to monetise your advice</p>
      <p className={styles.p}>Let's get you set up and earning as soon as possible.<br />It'll only take a couple of minutes.</p>
      <button onClick={nextPage} className={styles.button}>Let's Go</button>
    </div>
  )
}
