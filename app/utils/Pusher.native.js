import Pusher from 'pusher-js/react-native';
import * as schema from './schema';
import { normalize } from 'normalizr';
import Config from './Config';

var pusher = new Pusher(Config.PUSHER_KEY, {
  cluster: 'eu',
  encrypted: true,
  authEndpoint: 'https://xqdw0lhxt8.execute-api.eu-west-1.amazonaws.com/dev' + "/pusher"
});

pusher.normalizedBind = (channel, scheme, callback) => {
  pusher.bind(channel, (response) => {
    return callback(normalize(response, schema[scheme]))
  })
}

export default pusher
