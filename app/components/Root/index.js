import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Auth from '../Auth';
import configureStore from '../../store';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

const Root = () => (
  <Provider store={store}>
    <Auth />
  </Provider>
)

export default Root;
