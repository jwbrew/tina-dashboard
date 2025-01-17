import React from 'react';
import { View, Platform } from 'react-native';
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
      { (Platform.OS === 'ios') && <KeyboardSpacer /> }
    </View>
  )
}
