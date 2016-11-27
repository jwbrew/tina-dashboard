import Api from '../utils/Api';
const api = new Api()

export function subscribeClient(client, plan, token) {
  return (dispatch) => {
    dispatch({
      type: 'CLIENT_SUBSCRIPTION_REQUEST'
    });
    api.subscribeClient(client, plan, token).then((profile) => {
      dispatch({
        type: 'CLIENT_SUBSCRIPTION_SUCCESS',
        profile
      })
    }).catch((error) => {
      dispatch({
        type: 'CLIENT_SUBSCRIPTION_FAILURE'
      })
    })
  }
};
