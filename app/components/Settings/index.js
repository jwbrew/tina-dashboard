import { connect } from 'react-redux';
import Component from './component';
import { getUserProfile } from '../../reducers';
import {
  startEditing,
  cancelEditing,
  saveEditing,
  updateForm
} from '../../actions/settings';

const mapStateToProps = (state) => {
  return {
    isEditing: state.settings.isEditing,
    auth: state.auth,
    isSaving: state.settings.isSaving,
    userProfile: getUserProfile(state),
    form: state.settings.form
  }
}

export default connect(mapStateToProps, {
  startEditing,
  cancelEditing,
  saveEditing,
  updateForm
})(Component);
