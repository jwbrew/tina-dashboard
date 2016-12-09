import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './component';
import { logout } from '../../actions/auth';
import { getActiveConversationCount, getUserProfile, isAdmin } from '../../reducers';

class MenuContainer extends Component {
  render() {
    return (<Menu {...this.props} />)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    activeConversationCount: getActiveConversationCount(state),
    isAdmin: isAdmin(state),
    profile: getUserProfile(state)
  }
}

export default connect(mapStateToProps, { logout })(MenuContainer);
