import React from 'react';
import styles from './styles.css';
import Live from '../Live';
import Menu from '../Menu';

const Main = ({
  children,
  liveOpen
}) => {

  return (
    <div className={styles.root}>
      <div className={styles.menu}>
        <Menu />
      </div>
      <div className={styles.container}>
        { children }
        <Live />
      </div>
    </div>
  )
}

export default Main;
