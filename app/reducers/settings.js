function settings(state = {
    isEditing: false
  }, action) {
  switch (action.type) {
    case 'SETTINGS_EDITING_START':
      return {
        ...state,
        isEditing: true
      }
    case 'SETTINGS_EDITING_CANCEL':
      return {
        ...state,
        isEditing: false
      }
    case 'USER_METADATA_SAVE_SUCCESS':
      return {
        ...state,
        isEditing: false
      }
    default:
      return state
    }
}

export default settings
