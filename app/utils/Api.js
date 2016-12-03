import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';
import superagent from 'superagent';
import Config from './Config';
var api = restful(Config.API_ENDPOINT, fetchBackend(fetch));
import { normalize } from 'normalizr';
import {
  client,
  conversation,
  conversations,
  message,
  messages
} from './schema';

const normalizeResponse = (scheme) => (response) => {
  var data
  if (Array.isArray(response.body())) {
    data = response.body().map((m) => m.data())
  } else {
    data = response.body().data()
  }
  return normalize(data, scheme)
}

export default function(token) {
  if (token) {
    api.header('Authorization', 'Bearer ' + token);
  }

  api.endConversation = ({ public_key, id }) => {
    return api.one('conversations', id)
      .custom('end')
      .post({ public_key }, 'end')
      .then(normalizeResponse(conversation))
  }

  api.getMessages = ({ public_key, id }) => {
    return api.all('messages')
      .getAll({ public_key, conversation_id: id })
      .then(normalizeResponse(messages))
  }

  api.sendMessage = (params, { public_key, id }) => {
    return api.all('messages')
      .post({ ...params, public_key, conversation_id: id })
      .then(normalizeResponse(message))
  }

  api.getClient = (id) => {
    return api.one('clients', id)
      .get()
      .then(normalizeResponse(client))
  };

  api.createConversation = (clientId) => {
    return api.all('conversations')
      .post({ clientId })
      .then(normalizeResponse(conversation))
  }

  api.getConversations = () => {
    return api.all('conversations')
      .getAll()
      .then(normalizeResponse(conversations))
  }

  api.getConversation = ({ id, public_key }) => {
    return api.one('conversations', id)
      .get({ public_key })
      .then(normalizeResponse(conversation))
  }

  api.readConversation = ({ id, public_key, by }) => {
    return api.one('conversations', id)
      .custom('read')
      .post({ id, public_key, by })
      .then(normalizeResponse(conversation))
  }

  api.chargeConversation = ({ id, public_key }, amount) => {
    return api.one('conversations', id)
      .custom('charge')
      .post({ public_key, amount })
      .then(normalizeResponse(conversation))
  }

  api.savePicture = (file, { user_id }) => {
    var req = superagent.post('https://api.cloudinary.com/v1_1/asktina/image/upload');

    req.attach('file', file);
    req.field('public_id', user_id + '/' + new Date().getTime());
    req.field('upload_preset', 'scmp0gj3')

    return new Promise(function(resolve, reject) {
      req.end((err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response.body)
        }
      });
    })
  }

  api.updateUser = ({ user_id }, user_metadata) => {
    var user = api
      .custom(`https://${Config.AUTH0_DOMAIN}/api/v2`, false)
      .one('users', user_id)
    return user.patch({ user_metadata }).then((response) => {
      return response.body().data()
    })
  }

  api.subscribeClient = ({ user_id, user_metadata }, plan, token) => {
    return api.all('clients')
      .custom('subscribe')
      .post({
        stripe_customer_id: user_metadata.stripe_customer_id,
        token,
        client_id: user_id,
        plan
      })
      .then((r) => r.body().data())
  }

  return api
};
// export default restful('https://xqdw0lhxt8.execute-api.eu-west-1.amazonaws.com/dev', fetchBackend(fetch));
