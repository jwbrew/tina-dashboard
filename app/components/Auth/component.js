import React from 'react';
import Transition from 'react-addons-css-transition-group';
import App from '../App';
import Onboarding from '../Onboarding';
import fade from '../fade.css';

const Auth = (props) => {
  // const history = syncHistoryWithStore(browserHistory, store)
  return (
    <Transition
      transitionAppear={true}
      transitionAppearTimeout={2000}
      transitionName={fade}
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={1000}>
      { !props.onboardingComplete && <Onboarding {...props} /> }
      { props.onboardingComplete && <App {...props} /> }
    </Transition>
  )
}

export default Auth;
