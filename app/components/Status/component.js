import React, { Component } from 'react';
import styles from './styles.css';

const Menu = ({ user_metadata }) => {
  return (
    <div className={styles.root}>
      <img className={styles.picture} src={user_metadata.picture}/>
      <div>
        <span className={styles.name}>{ user_metadata.name }</span>
        <span className={styles.status}>Online</span>
      </div>
    </div>
  )
}

export default Menu;
