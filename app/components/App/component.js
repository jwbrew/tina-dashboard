import React, { PropTypes } from 'react';
import { Route, Router } from 'react-router'
import styles from './styles.css';
import Menu from '../Menu';

import Stats from '../Stats';
import Conversations from '../Conversations';
import Conversation from '../Conversation';
import Account from '../Account';
import Installation from '../Installation';
import Settings from '../Settings';

import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const Container = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.menu}>
        <Menu />
      </div>
      <div className={styles.container}>
        { children }
      </div>
    </div>
  )
}

const Dashboard = () => {
  // const history = syncHistoryWithStore(browserHistory, store)
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Container}>
        <Route path="stats" component={Stats} />
        <Route path="conversations" component={Conversations}>
          <Route path="/conversations/:conversationId" component={Conversation}/>
        </Route>
        <Route path="account" component={Account} />
        <Route path="installation" component={Installation} />
        <Route path="settings" component={Settings} />
      </Route>
    </Router>
  )
}

export default Dashboard;
