import { connect } from 'react-redux';
import Component from './component';
import { getUserProfile } from '../../reducers';
import { startEditing } from '../../actions/settings';

const mapStateToProps = (state) => {
  return {
    isEditing: state.settings.isEditing,
    userProfile: getUserProfile(state)
  }
}

export default connect(mapStateToProps, {startEditing})(Component);
