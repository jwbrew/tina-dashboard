import Api from '../utils/Api';
const api = new Api()

export function liveCallStarted() {
  return {
    type: 'LIVE_CALL_STARTED',
    payload: {
      time: new Date().getTime()
    },
    meta: {
      analytics: {
        type: 'live-call-started'
      }
    }
  }
}

export function liveCallAnswered() {
  return {
    type: 'LIVE_CALL_ANSWERED',
    payload: {
      time: new Date().getTime()
    },
    meta: {
      analytics: {
        type: 'live-call-answered'
      }
    }
  }
}

export function liveCallEnded() {
  return {
    type: 'LIVE_CALL_ENDED',
    payload: {
      time: new Date().getTime()
    },
    meta: {
      analytics: {
        type: 'live-call-ended'
      }
    }
  }
}

export function sendMessage(name, message, client, session_id) {
  return (dispatch) => {
    dispatch({
      type: 'LIVE_MESSAGE_SEND_REQUEST',
      payload: {
        name,
        message
      }
    })

    api.sendMessage(name, message, client, session_id).then((payload) => {
      dispatch({
        type: 'LIVE_MESSAGE_SEND_SUCCESS',
        payload: {
          name,
          message
        }
      })
    }).catch(() => {
      dispatch({
        type: 'LIVE_MESSAGE_SEND_FAILURE',
        payload: {
          name,
          message
        }
      })
    })
  }
}

export function receiveMessage(name, message) {
  return {
    type: 'LIVE_MESSAGE_RECEIVED',
    payload: {
      name,
      message
    }
  }
}
