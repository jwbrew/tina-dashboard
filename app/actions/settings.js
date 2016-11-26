import Api from '../utils/Api';

export function startEditing() {
  return {
    type: 'SETTINGS_EDITING_START'
  }
}

export function cancelEditing() {
  return {
    type: 'SETTINGS_EDITING_CANCEL'
  }
}

export function updateForm(field, value) {
  return {
    type: 'SETTINGS_UPDATE_FORM',
    payload: {
      field,
      value
    }
  }
}

export function saveEditing(
  { token },
  profile,
  user_metadata
) {
  const api = new Api(token)

  return (dispatch) => {
    dispatch({
      type: 'SETTINGS_SAVE_REQUEST'
    });
    api.updateUser(profile, user_metadata).then((profile) => {
      dispatch({
        type: 'SETTINGS_SAVE_SUCCESS',
        profile
      })
    }).catch((error) => {
      dispatch({
        type: 'SETTINGS_SAVE_FAILURE',
        error
      })
    })
  }
};
