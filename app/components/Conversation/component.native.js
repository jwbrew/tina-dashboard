import React from 'react';
import { View } from 'react-native';
import Text from '../Text';
import Panel from '../Panel';
import Messenger from '../Messenger';
import KeyboardSpacer from 'react-native-keyboard-spacer';


export default Conversation = ({ id }) => {
  return (
    <View style={{
      flexGrow: 1,
      backgroundColor: 'white'
    }}>
      <Messenger conversationId={id} />
      <KeyboardSpacer />
    </View>
  )
}
