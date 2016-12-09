import { connect } from 'react-redux';
import Component from './component';
import { getConversationsSorted } from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  return {
    conversations: getConversationsSorted(state),
    isFetching: state.conversations.isFetching
  }
}

export default connect(mapStateToProps, {})(Component);
