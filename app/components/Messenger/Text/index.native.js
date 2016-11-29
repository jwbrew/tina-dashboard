import React from 'react';
import { Text } from 'react-native';

export default CustomText = ({ children, style }) => {
  return (<Text style={{
    ...style,
    fontFamily: 'Lato-Light'
  }}>{children}</Text>)
}
