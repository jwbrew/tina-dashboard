import Pusher from 'pusher-js';
import * as schema from './schema';
import { normalize } from 'normalizr';
import Config from './Config';

var pusher = new Pusher(Config.PUSHER_KEY, {
  cluster: 'eu',
  encrypted: true,
  authEndpoint: Config.API_ENDPOINT + "/pusher"
});

export function normalizedBind(channel, scheme, callback) {
  pusher.bind(channel, (response) => {
    return callback(normalize(response, schema[scheme]))
  })
}

export function subscribeClient({ user_id }) {
  let clientId = user_id.split('|')[1];
  let wsChannel = 'clients-' + clientId;

  console.log('subscribeClient', wsChannel);

  pusher.subscribe(wsChannel);
  console.log(pusher);
}

export default pusher
