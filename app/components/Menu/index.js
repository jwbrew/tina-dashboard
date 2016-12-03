import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './component';
import { logout } from '../../actions/auth';
import { getActiveConversationCount, isAdmin } from '../../reducers';

class MenuContainer extends Component {
  render() {
    return (<Menu {...this.props} />)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    activeConversationCount: getActiveConversationCount(state),
    isAdmin: isAdmin(state)
  }
}

export default connect(mapStateToProps, { logout })(MenuContainer);
