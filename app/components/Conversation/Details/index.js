import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from './component';
import { getActiveConversation } from '../../../reducers';
import { chargeConversation } from '../../../actions/conversations';

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    conversation: getActiveConversation(state, ownProps.router.params.conversationId)
  }
}

export default withRouter(connect(mapStateToProps, { chargeConversation })(Component));
