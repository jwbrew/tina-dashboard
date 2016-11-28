import { combineReducers } from 'redux'

const userProfile = (state=null, action) => {
  switch (action.type) {
    case 'LOCK_SUCCESS':
    case 'SETTINGS_SAVE_SUCCESS':
    case 'CLIENT_SUBSCRIPTION_SUCCESS':
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
    userType: 'client',
    userProfile: {},
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
      return {
        ...state,
        isFetching: false,
        userProfile: userProfile(state.userProfile, action)
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
        userProfile: userProfile(state.userProfile, action),
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

export const getUserProfile = (state) => state.userProfile
export const isAuthenticated = (state) => state.isAuthenticated
export const authToken = (state) => state.token
