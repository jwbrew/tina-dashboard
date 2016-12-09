import React, { Component } from 'react';
import styles from './styles.css';
import { Link } from 'react-router'

import HistoryIcon from './assets/clock.svg';
import DashIcon from './assets/home.svg';
import CardIcon from './assets/payments.svg';
import GearIcon from './assets/settings.svg';
import InfoIcon from './assets/info.svg';
import PowerIcon from './assets/power.svg';
import AccountIcon from './assets/payments.svg';

const Menu = ({
  isAuthenticated,
  login,
  logout,
  activeConversationCount,
  isAdmin,
  profile
}) => {

  if (isAuthenticated) return (
    <div className={styles.root}>
      <div className={styles.top}>
        <img className={styles.picture} src={profile.user_metadata.picture}/>
        <ul>
          <li><Link to="/stats" activeClassName={styles.active}><DashIcon /></Link></li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <ul>
          { !isAdmin && <li><Link to="/installation" activeClassName={styles.active}><InfoIcon/></Link></li> }
          { !isAdmin && <li><Link to="/account" activeClassName={styles.active}><AccountIcon/></Link></li> }
          { !isAdmin && <li><Link to="/settings" activeClassName={styles.active}><GearIcon/></Link></li> }
          <li><a href='#'
            onClick={e => {
              e.preventDefault()
              logout()
            }}
            ><PowerIcon/></a></li>
        </ul>
      </div>
    </div>)
  if (!isAuthenticated) return (
    <div className={styles.root}>
      <a href='#'
      onClick={e => {
        e.preventDefault()
        login()
      }}
      ><PowerIcon /></a>
    </div>
  )
}

export default Menu;
