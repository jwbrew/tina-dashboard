import Api from '../utils/Api';
const api = new Api()

export function loadMessages(conversation) {
  return (dispatch) => {
    dispatch({
      type: 'MESSAGES_LOAD_REQUEST'
    });
    api.getMessages(conversation).then((payload) => {
      dispatch(messagesSuccess(payload))
    }).catch((error) => {
      dispatch({
        type: 'MESSAGES_LOAD_FAILURE',
        error
      })
    })
  }
};

export function messageSuccess(payload) {
  return {
    type: 'MESSAGE_LOAD_SUCCESS',
    payload
  };
};

export function messagesSuccess(payload) {
  return {
    type: 'MESSAGES_LOAD_SUCCESS',
    payload
  };
};

export function sendMessage(message, conversation, clientId) {
  return (dispatch) => {
    if (conversation.id) {
      dispatch(createMessage(message, conversation))
    } else {
      api.createConversation(clientId).then((payload) => {
        dispatch({
          type: 'CREATE_CONVERSATION_SUCCESS',
          payload
        })
        const conversation = payload.entities.conversations[payload.result]
        dispatch(createMessage(message, conversation))
      })
    }
  }
}

function createMessage(message, conversation) {
  return (dispatch) => {
    dispatch({
      type: 'MESSAGE_SEND_REQUEST'
    });
    api.sendMessage(message, conversation).then((payload) => {
      dispatch({
        type: 'MESSAGE_SEND_SUCCESS',
        payload
      })
    }).catch((error) => {
      dispatch({
        type: 'MESSAGE_SEND_FAILURE',
        error
      })
    })
  }
};

export function readConversation(conversation, by) {
  return (dispatch) => {
    dispatch({
      type: 'CONVERSATION_READ_REQUEST'
    });
    api.readConversation({
      ...conversation,
      by
    }).then((payload) => {
      dispatch({
        type: `CONVERSATION_READ_SUCCESS`,
        payload
      })
    }).catch((error) => {
      dispatch({
        type: 'CONVERSATION_READ_FAILURE',
        error
      })
    })
  }
}
