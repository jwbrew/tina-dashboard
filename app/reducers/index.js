import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import auth, * as fromAuth from './auth';
import conversations, * as fromConversations from './conversations';
import messages, * as fromMessages from './messages';

const appReducers = combineReducers({ routing, auth, conversations, messages })

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return appReducers(state, action);
}

export const getActiveConversation = (state, id) => {
  return fromConversations.getActiveConversation(state.conversations, id);
}

export const getActiveConversationCount = (state) => {
  return fromConversations.getActiveConversationCount(state.conversations);
}

export const getConversationsList = (state) => {
  return fromConversations.getConversationsList(state.conversations);
}

export const getConversationsSorted = (state) => {
  return fromConversations.getConversationsSorted(state.conversations);
}

export const getUserProfile = (state) => {
  return fromAuth.getUserProfile(state.auth);
}

export const isAuthenticated = (state) => {
  return fromAuth.isAuthenticated(state.auth);
}

export const authToken = (state) => {
  return fromAuth.authToken(state.auth);
}

export const getMessagesForConversation = (state, conversationId) => {
  return fromMessages.getMessagesForConversation(state.messages, conversationId)
}

export const getGroupedMessagesForConversation = (state, conversationId) => {
  return fromMessages.getGroupedMessagesForConversation(state.messages, conversationId)
}

export const getUserType = (state) => {
  return state.auth.userType
}

export const getClientId = (state) => {
  return auth.user_id
}
