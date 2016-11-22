import { combineReducers } from 'redux';
import { union } from 'lodash';
import { getMessagesForConversation } from './messages';

const byId = (state={}, action) => {
  switch (action.type) {
    case 'CONVERSATION_LOAD_SUCCESS':
    case 'CONVERSATIONS_LOAD_SUCCESS':
    case 'CONVERSATION_TIMER_START_SUCCESS':
    case 'CONVERSATION_TIMER_END_SUCCESS':
    case 'CONVERSATION_UPDATE':
    case 'CONVERSATION_CHARGE_SUCCESS':
    case 'CONVERSATION_READ_SUCCESS':
      return {
        ...state,
        ...action.payload.entities.conversations
      }
    case 'CONVERSATION_TIMER_START_REQUEST':
    case 'CONVERSATION_TIMER_END_REQUEST':
    case 'CONVERSATION_CHARGE_REQUEST':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isFetching: true
        }
      }
    case 'CONVERSATION_TIMER_START_SUCCESS':
    case 'CONVERSATION_TIMER_END_SUCCESS':
    case 'CONVERSATION_CHARGE_SUCCESS':
    case 'CONVERSATION_TIMER_START_FAILURE':
    case 'CONVERSATION_TIMER_END_FAILURE':
    case 'CONVERSATION_CHARGE_FAILURE':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isFetching: false
        }
      }
    default:
      return state;
  }
}

const ids = (state = [], action) => {
  switch (action.type) {
    case 'CONVERSATION_LOAD_SUCCESS':
      return union([action.payload.result], state);
    case 'CONVERSATIONS_LOAD_SUCCESS':
      return union(action.payload.result, state);
    default:
      return state;
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'CONVERSATIONS_LOAD_REQUEST':
      return true
    case 'CONVERSATIONS_LOAD_SUCCESS':
    case 'CONVERSATIONS_LOAD_FAILURE':
      return false
      break;
    default:
      return state
  }
}

export default combineReducers({ byId, ids, isFetching })

export const getActiveConversationCount = (state) => {
  return getConversationsList(state).filter((a) => a.is_unread).length
}

export const getConversationsList = (state) => {
  return state.ids.map((id) => withUnread(withPrice(state.byId[id])))
}

export const getConversationsSorted = (state) => {
  return getConversationsList(state).sort((a,b) => {
    return b.created_at - a.created_at
  })
}

export const getActiveConversation = (state, id) => {
   return state, withUnread(withPrice(state.byId[id]))
}

const withPrice = (c) => {
  if (c.charges) c.price = c.charges.reduce((a, b) => a + b.amount, 0)
  return c
}

const withUnread = (conversation) => {
  return {
    ...conversation,
    is_unread: conversation.last_message_sent_by && conversation.last_message_sent_by.customer > conversation.last_message_sent_by.client
  }
}
