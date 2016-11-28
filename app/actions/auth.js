import Auth0Lock from 'auth0-lock';
import Config from '../utils/Config';

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
  const lock = new Auth0Lock(Config.AUTH0_CLIENT_ID, Config.AUTH0_DOMAIN, {
    auth: {
      redirect: false
    },
    theme: {
      logo: 'https://asktina.io/assets/img/logo.png',
      primaryColor: '#a7798e'
    },
    languageDictionary: {
      title: "Authentication"
    }
  });
  return dispatch => {
    lock.show()

    lock.on('authenticated', (response) => {
      let token = response.idToken;
      lock.getProfile(token, (err, profile) => {
        lock.hide()
        dispatch(lockSuccess(profile, token))
      })
    })

    lock.on('authorization_error', (err) => {
      dispatch(lockError(err))
    })
  }
}
