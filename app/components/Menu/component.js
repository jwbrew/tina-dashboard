import React, { Component } from 'react';
import styles from './styles.css';
import { Link } from 'react-router'

import ChatIcon from './assets/conversations.svg';
import DashIcon from './assets/home.svg';
import CardIcon from './assets/payments.svg';
import GearIcon from './assets/settings.svg';
import InfoIcon from './assets/info.svg';
import PowerIcon from './assets/power.svg';

const Menu = ({ isAuthenticated, login, logout, activeConversationCount, isAdmin }) => {

  if (isAuthenticated) return (
    <div className={styles.root}>
      <div className={styles.top}>
        <img src="https://asktina.io/assets/img/logo.png"/>
        <ul>
          <li><Link to="/stats" activeClassName={styles.active}><DashIcon /></Link></li>
          <li>
            <Link to="/conversations" activeClassName={styles.active}>
              <ChatIcon />
              { activeConversationCount > 0 &&
                <span className={styles.badge}>
                  { activeConversationCount }
                </span>}
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <ul>
          { !isAdmin && <li><Link to="/installation" activeClassName={styles.active}><InfoIcon/></Link></li> }
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
