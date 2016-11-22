import React from 'react';
import { TextInput, View } from 'react-native';
import Text from '../../Text';

class Input extends React.Component {
  render() {
    return (
      <View style={{
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: '#d0d0d0'
        }}>
        <TextInput
          style={{
            height: 40,
            fontFamily: 'Lato-Light'
          }}
          autoFocus
          ref='input'
          onSubmitEditing={ (e) => {
            this.props.sendMessage({
              body: e.nativeEvent.text,
              sender: this.props.userType
            }, this.props.conversation)
            this.refs.input.clear()
            this.refs.input.focus()
          } }
           />
      </View>
    )
  }
}

export default Input;
