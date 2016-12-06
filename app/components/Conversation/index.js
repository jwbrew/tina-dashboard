import Component from './component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getActiveConversation } from '../../reducers';
import {
  conversationSuccess
} from '../../actions/conversations';
import { messageSuccess } from '../../actions/messages';

const mapStateToProps = (state, ownProps) => {
  return {
    conversation: getActiveConversation(state, ownProps.routeParams.conversationId)
  }
}

export default withRouter(connect(mapStateToProps, {
  conversationSuccess,
  messageSuccess
})(Component));
