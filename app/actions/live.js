export function liveCallStarted() {
  return {
    type: 'LIVE_CALL_STARTED',
    payload: {
      time: new Date().getTime()
    },
    meta: {
      analytics: {
        type: 'live-started'
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
        type: 'live-started'
      }
    }
  }
}

export function liveEnd() {
  return {
    type: 'LIVE_ENDED',
    payload: {
      time: new Date().getTime()
    },
    meta: {
      analytics: {
        type: 'live-ended'
      }
    }
  }
}
