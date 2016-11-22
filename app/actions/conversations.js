import Api from '../utils/Api';

export function loadConversations(token) {
  const api = new Api(token)
  return (dispatch) => {
    dispatch({
      type: 'CONVERSATIONS_LOAD_REQUEST'
    });
    api.getConversations().then((response) => {
      dispatch(conversationsSuccess(response))
    }).catch((error) => {
      dispatch({
        type: 'CONVERSATIONS_LOAD_FAILURE',
        error
      })
    })
  }
};

export function conversationsSuccess(payload) {
  return {
    type: 'CONVERSATIONS_LOAD_SUCCESS',
    payload
  };
};

export function conversationSuccess(payload) {
  return {
    type: 'CONVERSATION_LOAD_SUCCESS',
    payload
  }
}

// function timer(method, { id, public_key }) {
//   const conversation = new Api().one('conversations', id)
//   const upcaseMethod = method.toUpperCase()
//   return (dispatch) => {
//     dispatch({
//       type: `CONVERSATION_TIMER_${upcaseMethod}_REQUEST`,
//       id
//     });
//     conversation
//       .custom(method)
//       .post({ public_key })
//       .then((payload) => {
//       dispatch({
//         type: `CONVERSATION_TIMER_${upcaseMethod}_SUCCESS`,
//         payload
//       })
//     }).catch((error) => {
//       dispatch({
//         type: `CONVERSATION_TIMER_${upcaseMethod}_FAILURE`,
//         id,
//         error
//       })
//     })
//   }
// };

// export function startTimer(conversation) {
//   return timer('start', conversation)
// }
//
// export function stopTimer(conversation) {
//   return timer('end', conversation)
// }

export function chargeConversation({ id, public_key }, amount) {
  const api = new Api()
  return (dispatch) => {
    dispatch({
      type: 'CONVERSATION_CHARGE_REQUEST',
      id
    });
    api.chargeConversation({ id, public_key }, amount)
      .then((payload) => {
      dispatch({
        type: `CONVERSATION_CHARGE_SUCCESS`,
        payload
      })
    }).catch((error) => {
      dispatch({
        type: 'CONVERSATION_CHARGE_FAILURE',
        id,
        error
      })
    })
  }
}
