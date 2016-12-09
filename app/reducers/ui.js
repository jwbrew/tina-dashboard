const ui = (state = {
  mainOpen: false,
  liveOpen: false
}, action) => {
  switch (action.type) {
    case 'MAIN_OPENED':
      return {
        ...state,
        mainOpen: true,
        mainHasOpened: true
      }
    case 'MAIN_CLOSED':
      return {
        ...state,
        mainOpen: false
      }
    case 'LIVE_OPENED':
      return {
        ...state,
        liveOpen: true,
      }
    case 'LIVE_CLOSED':
      return {
        ...state,
        liveOpen: false
      }
    default:
      return state;
  }
}

export default ui
