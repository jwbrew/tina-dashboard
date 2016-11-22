import Pusher from 'pusher-js';
import * as schema from './schema';
import { normalize } from 'normalizr';
import Config from './Config';

var pusher = new Pusher(Config.PUSHER_KEY, {
  cluster: 'eu',
  encrypted: true,
  authEndpoint: process.env.API_ENDPOINT + "/pusher"
});

pusher.normalizedBind = (channel, scheme, callback) => {
  pusher.bind(channel, (response) => {
    return callback(normalize(response, schema[scheme]))
  })
}

export default pusher
