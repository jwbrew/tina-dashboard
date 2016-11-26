export function startEditing() {
  return {
    type: 'SETTINGS_EDITING_START'
  }
}

export function endEditing(user) {
  return (dispatch) => {
    dispatch({
      type: 'SETTINGS_SAVE_REQUEST'
    });
    api.getConversations().then((response) => {
      dispatch({
        type: 'SETTINGS_SAVE_SUCCESS',
        response
      })
    }).catch((error) => {
      dispatch({
        type: 'SETTINGS_SAVE_FAILURE',
        error
      })
    })
  }
};
