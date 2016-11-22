import React from 'react';
import { View } from 'react-native';

export default Panel = ({ children, style }) => {
  return (<View style={{
    padding: 10,
    backgroundColor: '#fafafa',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderLeftColor: '#FB247D',
    borderLeftWidth: 4,
    ...style
  }}>{children}</View>)
}
