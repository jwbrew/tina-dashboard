import Api from '../utils/Api';

export function updateForm(field, value) {
  return {
    type: 'USER_METADATA_FORM_UPDATE',
    payload: {
      field,
      value
    }
  }
}

function saveUser(
  { token },
  profile,
  new_metadata
) {
  const api = new Api(token)

  return (dispatch) => {
    dispatch({
      type: 'USER_METADATA_SAVE_REQUEST'
    });
    api.updateUser(profile, new_metadata).then((profile) => {
      dispatch({
        type: 'USER_METADATA_SAVE_SUCCESS',
        profile
      })
    }).catch((error) => {
      dispatch({
        type: 'USER_METADATA_SAVE_FAILURE',
        error
      })
    })
  }
};

export function saveMetadata(
  { token },
  profile,
  form
) {
  const api = new Api(token)
  var new_metadata = {}

  for (var k in form) {
    new_metadata[k] = form[k].value
  }

  return (dispatch) => {
    if (form.picture.value) {
      dispatch({
        type: 'USER_METADATA_PICTURE_UPLOAD_START'
      });

      api.savePicture(form.picture.value, profile).then((image) => {
        dispatch({
          type: 'USER_METADATA_PICTURE_UPLOAD_COMPLETE'
        });

        return saveUser({ token }, profile, {
          ...new_metadata,
          picture: image.secure_url
        })(dispatch)
      })
    } else {
      return saveUser({ token }, profile, new_metadata)(dispatch)
    }
  }
}
