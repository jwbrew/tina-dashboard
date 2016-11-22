import React from 'react';
import { View } from 'react-native';
import Message from '../Message';
import Text from '../../Text';

const sentStyle = {
  backgroundColor: '#f0e6ea',
  marginLeft: 50
}

const receivedStyle = {
  backgroundColor: '#ececec',
  marginRight: 50
}

const MessageGroup = ({ messages, userType }) => {
  const ts = new Date(messages[messages.length - 1].ts)
  return (
    <View style={{
      flex: 1,
      marginBottom: 10,
      alignItems: (messages[0].sender === userType ? 'flex-end' : 'flex-start'),
    }}>
      <View style={{
          ...(messages[0].sender === userType ? sentStyle : receivedStyle),
          borderRadius: 5,
          padding: 9
        }}>
        { messages.map((message) => <Message {...message} key={message.ts}/>) }
      </View>
      <Text
        style={{ fontSize: 8}}
      >{ts.toLocaleTimeString()}</Text>
    </View>
  )
}

export default MessageGroup;
