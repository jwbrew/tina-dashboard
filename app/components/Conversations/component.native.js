import React from 'react';
import { ListView, RefreshControl, View } from 'react-native';
import ListItem from './ListItem';

const Conversations = ({ conversations, navigator, isFetching, refreshConversations, loadConversations }) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const dataSource = ds.cloneWithRows(conversations)

  return (
    <ListView
    refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={loadConversations}
        />
      }
      dataSource={dataSource}
      renderRow={(rowData) => {
        return (
          <View style={{
              borderBottomColor: '#f2f2f2',
              borderBottomWidth: 1
            }}>
            <ListItem {...rowData} navigator={navigator} />
          </View>
        )
      }}
    />
  )
}

export default Conversations;
