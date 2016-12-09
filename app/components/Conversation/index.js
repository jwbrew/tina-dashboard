import Component from './component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getActiveConversation } from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  return {
    conversation: getActiveConversation(state, ownProps.routeParams.conversationId)
  }
}

export default withRouter(connect(mapStateToProps, {})(Component));
