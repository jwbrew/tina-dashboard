import { connect } from 'react-redux';
import Component from './component';
import { getUserProfile } from '../../reducers';
import {
  startEditing,
  cancelEditing,
} from '../../actions/settings';
import {
  saveMetadata,
  updateForm
} from '../../actions/user';

const mapStateToProps = (state) => {
  return {
    isEditing: state.settings.isEditing,
    user: state.user,
    isSaving: state.user.isFetching,
    userProfile: getUserProfile(state),
    form: state.user.form
  }
}

export default connect(mapStateToProps, {
  startEditing,
  cancelEditing,
  saveMetadata,
  updateForm
})(Component);
