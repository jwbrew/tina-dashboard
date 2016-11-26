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
