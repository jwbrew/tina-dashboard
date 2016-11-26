function settings(state = {
    isEditing: false
  }, action) {
  switch (action.type) {
    case 'SETTINGS_EDITING_START':
      return {
        ...state,
        isEditing: true
      }
    default:
      return state
    }
}

export default settings
