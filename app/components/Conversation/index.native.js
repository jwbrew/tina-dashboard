import Container from './container';
import { connect } from 'react-redux';
import { getActiveConversation } from '../../reducers';
import { conversationSuccess } from '../../actions/conversations';
import { messageSuccess } from '../../actions/messages';

const mapStateToProps = (state, ownProps) => {
  return {
    conversation: getActiveConversation(state, ownProps.id)
  }
}

export default connect(mapStateToProps, {
  conversationSuccess,
  messageSuccess
})(Container);
