import React, { Component } from 'react';
import Root from './app/components/Root';
import { AppRegistry } from 'react-native'

class Native extends Component {
  render() {
    return <Root />
  }
}

AppRegistry.registerComponent('dashboard', () => Native);
