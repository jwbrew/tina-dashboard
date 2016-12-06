import Auth0Lock from 'react-native-lock';
import Config from '../utils/Config';
const lock = new Auth0Lock({
  clientId: Config.AUTH0_CLIENT_ID,
  domain: Config.AUTH0_DOMAIN
});

function showLock() {
  return {
    type: 'SHOW_LOCK'
  }
}

function lockSuccess(profile, token) {
  return {
    type: 'LOCK_SUCCESS',
    profile,
    token
  }
}

function lockError(err) {
  return {
    type: 'LOCK_ERROR',
    err
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

// Opens the Lock widget and
// dispatches actions along the way
export function login() {
  return dispatch => {
    lock.show({}, (err, profile, token) => {
      if (token) {
        dispatch(lockSuccess(profile, token.idToken))
      }
    })
  }
}
