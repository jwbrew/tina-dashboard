import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import conversations, * as fromConversations from './conversations';
import messages, * as fromMessages from './messages';
import onboarding from './onboarding';
import settings from './settings';
import ui from './ui';
import user, * as fromUser from './user';


const hydration = (state={isHydrated: false}, action) => {
  if (action.type === 'persist/REHYDRATE') {
    return {
      isHydrated: true
    }
  }
  return state
}

const appReducers = combineReducers({
  routing,
  conversations,
  hydration,
  messages,
  onboarding,
  settings,
  ui,
  user
})

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
  return fromUser.getUserProfile(state.user);
}

export const isAuthenticated = (state) => {
  return fromUser.isAuthenticated(state.user);
}

export const authToken = (state) => {
  return fromUser.authToken(state.user);
}

export const getMessagesForConversation = (state, conversationId) => {
  return fromMessages.getMessagesForConversation(state.messages, conversationId)
}

export const getGroupedMessagesForConversation = (state, conversationId) => {
  return fromMessages.getGroupedMessagesForConversation(state.messages, conversationId)
}

export const getUserType = (state) => {
  return state.user.type
}

export const getClientId = (state) => {
  return state.user.user_id
}

export const isAdmin = (state) => {
  return state.user.profile.user_metadata && state.user.profile.user_metadata.admin;
}

export const getToken = (state) => {
  return state.user.token
}
