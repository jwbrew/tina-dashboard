import React, { PropTypes } from 'react';
import { Route, Router, Redirect } from 'react-router'

import Main from '../Main';
import Stats from '../Stats';
import Conversations from '../Conversations';
import Conversation from '../Conversation';
import Account from '../Account';
import Installation from '../Installation';
import Settings from '../Settings';
import Status from '../Status';

import Live from '../Live';

import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const routes = {
    path: '/',
    component: Main,
    childRoutes: [
        { path: 'stats', component: Stats },
        {
            path: 'history',
            component: Conversations,
            childRoutes: [{
              path: '/history/:conversationId',
              component: Conversation
            }]
        },
        { path: 'account', component: Account },
        { path: 'installation', component: Installation },
        { path: 'settings', component: Settings }
    ]
};

const Dashboard = () => {
  // const history = syncHistoryWithStore(browserHistory, store)
  return (
    <Router history={browserHistory} routes={routes} />
  )
}

export default Dashboard;
