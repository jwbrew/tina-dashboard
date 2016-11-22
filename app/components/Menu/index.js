import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './component';
import { logout } from '../../actions/auth';
import { getActiveConversationCount } from '../../reducers';

class MenuContainer extends Component {
  render() {
    return (<Menu {...this.props} />)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    activeConversationCount: getActiveConversationCount(state),
    isAdmin: (state.auth.userProfile.user_metadata && state.auth.userProfile.user_metadata.admin)
  }
}

export default connect(mapStateToProps, { logout })(MenuContainer);
