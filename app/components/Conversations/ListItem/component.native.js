import React, { Component } from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native';
import Text from '../../Text';
import Panel from '../../Panel';

const ConversationsListItem = ({ id, created_at, started_at, ended_at, price, charges, is_unread, navigator }) => {
  const amount = charges ? charges.reduce((a,b) => {
      return a + b.amount
    }, 0) : 0

  return (
    <View style={{
        backgroundColor: 'white',
        padding: 0,
        borderLeftColor: (is_unread ? '#FB247D' : 'grey'),
        borderLeftWidth: 4
      }}>
      <TouchableOpacity
        style={{
          padding: 25,
          paddingLeft: 35

        }}
        onPress={() => {
        navigator.push({ id });
      }}>
        <View>
          <Text style={{fontSize: 20}}>{new Date(created_at).toLocaleString()}</Text>
          <Text>{'$' + amount.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ConversationsListItem;
