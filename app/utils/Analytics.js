import ReactGA from 'react-ga';
import Config from './Config';

ReactGA.initialize(Config.GA_ID, {
  debug: false,
  titleCase: false,
  gaOptions: {
    name: 'askTina'
  }
});


export function track(category, action) {
  return ReactGA.event({
    category,
    action,
    label: window.location.href,
  });
}

export default ReactGA
