import React, { PropTypes } from 'react';
import Auth from '../Auth';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native'
import configureStore from '../../store';

const store = configureStore(AsyncStorage);

export default Root = () => (
  <Provider store={store}>
    <Auth />
  </Provider>
)
