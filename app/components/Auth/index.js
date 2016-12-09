import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Component from './component';
import {
  isAuthenticated,
  authToken,
  getUserProfile
} from '../../reducers';
import { isTokenExpired } from '../../utils/jwtHelper';
import { login, logout } from '../../actions/auth';


class Auth extends React.Component {
  componentDidMount() {
    if (this.props.isHydrated) this.checkAuth(this.props)
  }

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

    return (<Component {...this.props} />)
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: isAuthenticated(state),
    token: authToken(state),
    isHydrated: state.hydration.isHydrated,
    userProfile: getUserProfile(state),
    onboardingComplete: (
      state.user.profile && state.user.profile.user_metadata &&
      (
        state.user.profile.user_metadata.stripe_customer_id ||
        !state.user.profile.user_metadata.initial_plan_id
      )
    )

  }
}

export default connect(mapStateToProps, { login, logout })(Auth);
