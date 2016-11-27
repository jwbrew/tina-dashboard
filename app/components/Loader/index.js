import React, { Component } from 'react';
import styles from './styles.css';

const Loader = () => {
  return (
    <div className={styles.root}>
      <div className={styles.spinner}/>
    </div>
  );
}

export default Loader;
