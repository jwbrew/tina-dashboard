import Container from './container';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getActiveConversation } from '../../reducers';
import {
  chargeConversation,
  conversationSuccess
} from '../../actions/conversations';
import { messageSuccess } from '../../actions/messages';

const mapStateToProps = (state, ownProps) => {
  return {
    conversation: getActiveConversation(state, ownProps.routeParams.conversationId)
  }
}

export default withRouter(connect(mapStateToProps, {
  chargeConversation,
  conversationSuccess,
  messageSuccess
})(Container));
