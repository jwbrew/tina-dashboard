import React from 'react';
import { Navigator, View } from 'react-native';
import Conversation from '../Conversation';
import Conversations from '../Conversations';

const App = ({ isAuthenticated }) => {
  return (
    <View style={{marginTop: 20, flexGrow: 1}}>
      <Navigator
        initialRoute={{ title: 'Conversations', index: 0 }}
        renderScene={(route, navigator) => {
          if (!route.id) return <Conversations navigator={navigator} />
          return <Conversation navigator={navigator} id={route.id} />
        }}
      />
    </View>
  )
}

export default App;
