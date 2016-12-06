import Pusher from 'pusher-js/react-native';
import { NativeModules } from 'react-native';
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

export function subscribeClient({ userId }) {
  let clientId = userId.split('|')[1];
  let wsChannel = 'client-' + clientId;
  let interestChannel = clientId;

  pusher.subscribe(wsChannel);
  NativeModules.PusherNotifications.subscribe(interestChannel);
}

export default pusher
