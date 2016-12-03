import { combineReducers } from 'redux'

const profile = (state=null, action) => {
  switch (action.type) {
    case 'LOCK_SUCCESS':
    case 'SETTINGS_SAVE_SUCCESS':
    case 'CLIENT_SUBSCRIPTION_SUCCESS':
    case 'ONBOARDING_SETTINGS_SAVE_SUCCESS':
      return {
        ...state,
        ...action.profile
      }
      break;
    case 'LOGOUT':
      return {}
      break;
    default:
      return state;
  }
}

function auth(state = {
    isFetching: false,
    isAuthenticated: false,
    type: 'client',
    profile: {},
    token: null
  }, action) {
  switch (action.type) {
    case 'CLIENT_SUBSCRIPTION_REQUEST':
      return {
        ...state,
        isFetching: true
      }
    case 'SETTINGS_SAVE_SUCCESS':
    case 'CLIENT_SUBSCRIPTION_SUCCESS':
    case 'ONBOARDING_SETTINGS_SAVE_SUCCESS':
      return {
        ...state,
        isFetching: false,
        profile: profile(state.profile, action)
      }
    case 'CLIENT_SUBSCRIPTION_FAILURE':
      return {
        ...state,
        isFetching: false
      }
    case 'LOCK_SUCCESS':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        profile: profile(state.profile, action),
        token: action.token
      }
    case 'LOGOUT':
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        idToken: null
      }
    default:
      return state
    }
}

export default auth

export const getUserProfile = (state) => state.profile
export const isAuthenticated = (state) => state.isAuthenticated
export const authToken = (state) => state.token
