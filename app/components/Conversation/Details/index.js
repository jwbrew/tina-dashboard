import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from './component';
import { getActiveConversation } from '../../../reducers';

const mapStateToProps = (state, ownProps) => {
  return {
    conversation: getActiveConversation(state, ownProps.router.params.conversationId)
  }
}

export default withRouter(connect(mapStateToProps, {})(Component));
