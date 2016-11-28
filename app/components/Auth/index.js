import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import App from '../App';
import { loadConversations, conversationSuccess } from '../../actions/conversations';
import { isAuthenticated, authToken } from '../../reducers';
import { isTokenExpired } from '../../utils/jwtHelper';
import { login, logout } from '../../actions/auth';


class Auth extends Component {
  static propTypes = {
    loadConversations: PropTypes.func
  };

  componentWillReceiveProps(props) {
    if (props.isHydrated) this.checkAuth(props)
  }

  checkAuth(props) {
    if (!props.isAuthenticated) {
      props.login()
    } else if (isTokenExpired(props.token)) {
      props.logout()
    }
  }

  render() {
    if (
      !this.props.isAuthenticated ||
      isTokenExpired(this.props.token)
    ) {
      return null
    }
    return(<App {...this.props} />)
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: isAuthenticated(state),
    token: authToken(state),
    isHydrated: state.hydration.isHydrated
  }
}

export default connect(mapStateToProps, { loadConversations, conversationSuccess, login, logout })(Auth);
