import React from 'react';
import { View } from 'react-native';
import Messages from './Messages';
import Input from './Input';

const Messenger = (props) => (
  <View style={{flex: 1}}>
    <Messages style={{flexGrow: 1}} {...props} />
    <Input {...props} />
  </View>
)

export default Messenger;
