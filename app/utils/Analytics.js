import ReactGA from 'react-ga';
import Config from './Config';

ReactGA.initialize(Config.GA_ID, {
  debug: false,
  titleCase: false,
  gaOptions: {
    name: 'askTina'
  }
});


export function track(action) {
  return ReactGA.event({
    category: 'dashboard',
    action,
    label: window.location.href,
  });
}

export default ReactGA
