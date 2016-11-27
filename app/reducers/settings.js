function settings(state = {
    isEditing: false,
    isSaving: false,
    form: {}
  }, action) {
  switch (action.type) {
    case 'LOCK_SUCCESS':
      return {
        ...state,
        form: action.profile.user_metadata
      }
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
    case 'SETTINGS_UPDATE_FORM':
    return {
      ...state,
      form: {
        ...state.form,
        [action.payload.field]: action.payload.value
      }
    }
    case 'SETTINGS_SAVE_REQUEST':
      return {
        ...state,
        isSaving: true
      }
    case 'SETTINGS_SAVE_SUCCESS':
      return {
        ...state,
        isEditing: false,
        isSaving: false
      }
    case 'SETTINGS_SAVE_FAILURE':
      return {
        ...state,
        isSaving: false
      }
    default:
      return state
    }
}

export default settings
