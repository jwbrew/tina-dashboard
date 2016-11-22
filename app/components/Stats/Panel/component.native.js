import React from 'react';
import {
  View
} from 'react-native';
import Panel from '../Panel';
import Text from '../Text';

const hero = {
  fontSize: 60,
  fontFamily: 'Lato-Light'
}

export default StatPanel = ({ stat, title }) => {
  return (
    <Panel style={{
      margin: 10,
    }}>
      <Text style={hero}>{stat}</Text>
      <Text>{title}</Text>
    </Panel>
  )
}
