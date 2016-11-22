import { connect } from 'react-redux';
import Component from './component';
import { sendMessage } from '../../../actions/messages';
import {
  getActiveConversation,
  getClientId,
  getUserType
} from '../../../reducers';

const mapStateToProps = (state, ownProps) => ({
  clientId: getClientId(state),
  conversation: getActiveConversation(state, ownProps.conversationId),
  userType: getUserType(state)
})


export default connect(mapStateToProps, { sendMessage, getActiveConversation })(Component);
