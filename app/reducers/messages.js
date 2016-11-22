import { combineReducers } from 'redux';
import { union } from 'lodash';

const byId = (state={}, action) => {
  switch (action.type) {
    case 'MESSAGES_LOAD_SUCCESS':
    case 'MESSAGE_LOAD_SUCCESS':
    case 'MESSAGE_SEND_SUCCESS':
      return {
        ...state,
        ...action.payload.entities.messages
      }
    default:
      return state;
  }
}

const ids = (state = [], action) => {
  switch (action.type) {
    case 'MESSAGE_SEND_SUCCESS':
    case 'MESSAGE_LOAD_SUCCESS':
      return union(state, [action.payload.result]);
    case 'MESSAGES_LOAD_SUCCESS':
      return union(state, action.payload.result);
    default:
      return state;
  }
}

export default combineReducers({ byId, ids });

export const getMessagesForConversation = (state, conversationId) => {
  return state.ids
    .map((id) => state.byId[id])
    .filter((message) => message.conversation_id === conversationId)
}


export const getGroupedMessagesForConversation = (state, conversationId) => {
  var groupedMessages = []

  let messages = getMessagesForConversation(state, conversationId)

  for (var i in getMessagesForConversation(state, conversationId)) {
    var p = messages[i-1]
    var c = messages[i]

    if (p && p.sender === c.sender ) {
      groupedMessages[groupedMessages.length - 1].push(c)
    } else {
      groupedMessages.push([c])
    }
  };

  return groupedMessages
}
