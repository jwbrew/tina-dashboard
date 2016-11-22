import React from 'react';
import { ScrollView } from 'react-native';
import MessageGroup from '../MessageGroup';

const Messages = ({ groupedMessages, children, userType }) => (
  <ScrollView
    style={{
      padding: 10
    }}>
    { children }
    { groupedMessages.map((g, i) => <MessageGroup messages={g} key={i} userType={userType} />) }
  </ScrollView>
)

export default Messages;
