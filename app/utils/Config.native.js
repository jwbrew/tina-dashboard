import Config from 'react-native-config';
console.log(Config);

const config = {
  API_ENDPOINT: Config.API_ENDPOINT,
  GA_ID: Config.GA_ID,
  PUSHER_KEY: Config.PUSHER_KEY,
  STRIPE_KEY: Config.STRIPE_KEY,
  AUTH0_CLIENT_ID: Config.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: Config.AUTH0_DOMAIN
}

export default config
