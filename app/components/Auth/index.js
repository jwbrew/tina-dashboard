import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Transition from 'react-addons-css-transition-group';
import App from '../App';
import Onboarding from '../Onboarding';
import { loadConversations, conversationSuccess } from '../../actions/conversations';
import {
  isAuthenticated,
  authToken,
  getUserProfile
} from '../../reducers';
import { isTokenExpired } from '../../utils/jwtHelper';
import { login, logout } from '../../actions/auth';
import fade from '../Fade.css';


class Auth extends Component {
  static propTypes = {
    loadConversations: PropTypes.func
  };

  componentWillReceiveProps(props) {
    if (props.isHydrated) this.checkAuth(props)
  }

  checkAuth(props) {
    if (!props.isAuthenticated || isTokenExpired(props.token)) {
      props.login()
    }
  }

  render() {
    if (
      !this.props.isAuthenticated ||
      isTokenExpired(this.props.token)
    ) {
      return null
    }

    return (
      <Transition
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionName={fade}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        { !this.props.onboardingComplete && <Onboarding {...this.props} /> }
        { this.props.onboardingComplete && <App {...this.props} /> }
      </Transition>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: isAuthenticated(state),
    token: authToken(state),
    isHydrated: state.hydration.isHydrated,
    userProfile: getUserProfile(state),
    onboardingComplete: state.onboarding.complete
  }
}

export default connect(mapStateToProps, { loadConversations, conversationSuccess, login, logout })(Auth);
