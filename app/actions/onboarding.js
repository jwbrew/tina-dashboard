import Api from '../utils/Api';

export function nextPage() {
  return {
    type: 'ONBOARDING_NEXT_PAGE'
  }
}

export function updateForm(field, value) {
  return {
    type: 'ONBOARDING_UPDATE_FORM',
    field,
    value
  }
}

export function saveSettings(
  { token },
  profile,
  user_metadata
) {
  const api = new Api(token)

  return (dispatch) => {
    dispatch({
      type: 'ONBOARDING_SETTINGS_SAVE_REQUEST'
    });
    api.updateUser(profile, user_metadata).then((profile) => {
      dispatch({
        type: 'ONBOARDING_SETTINGS_SAVE_SUCCESS',
        profile
      })
    }).catch((error) => {
      dispatch({
        type: 'ONBOARDING_SETTINGS_SAVE_FAILURE',
        error
      })
    })
  }
};

export function completeOnboarding() {
  return {
    type: 'ONBOARDING_COMPLETE'
  }
}
