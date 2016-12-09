import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';
import superagent from 'superagent';
import Config from './Config';
var api = restful(Config.API_ENDPOINT, fetchBackend(fetch));
import { normalize } from 'normalizr';
import {
  client
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

  api.sendMessage = (name, message, client, session_id) => {
    return api.all('live')
      .post({
        id: client.user_id,
        name,
        session_id,
        message
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
