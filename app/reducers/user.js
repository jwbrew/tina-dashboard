import { combineReducers } from 'redux'
import { isBoolean } from 'lodash';

function auth(state = {
    isFetching: false,
    isAuthenticated: false,
    type: 'client',
    profile: {},
    form: {}
  }, action) {
  switch (action.type) {
    case 'SETTINGS_EDITING_START':
      return {
        ...state,
        form: {
          ...state.form,
          picture: {}
        }
      }
    case 'CLIENT_SUBSCRIPTION_REQUEST':
    case 'USER_METADATA_SAVE_REQUEST':
    case 'USER_METADATA_PICTURE_UPLOAD_START':
      return {
        ...state,
        isFetching: true
      }
    case 'CLIENT_SUBSCRIPTION_SUCCESS':
    case 'USER_METADATA_SAVE_SUCCESS':
    case 'USER_METADATA_PICTURE_UPLOAD_COMPLETE':
      return {
        ...state,
        isFetching: false,
        profile: {
          ...state.profile,
          ...action.profile
        }
      }
    case 'CLIENT_SUBSCRIPTION_FAILURE':
    case 'USER_METADATA_SAVE_FAILURE':
      return {
        ...state,
        isFetching: false
      }
    case 'USER_METADATA_FORM_UPDATE':
    const { field, value } = action.payload;
      return {
        ...state,
        form: {
          ...state.form,
          [field]: {
            ...state.form[field],
            [isBoolean(value) ? 'valid' : 'value']: value
          }
        }
      }
    case 'LOCK_SUCCESS':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        token: action.token,
        profile: {
          ...state.profile,
          ...action.profile
        }
      }
    case 'LOGOUT':
      return {
        isFetching: true,
        isAuthenticated: false
      }
    default:
      return state
    }
}

export default auth

export const getUserProfile = (state) => state.profile
export const getUserForm = (state) => state.form
export const isAuthenticated = (state) => state.isAuthenticated
export const authToken = (state) => state.token
