import { connect } from 'react-redux';
import Component from './component';
import { getUserProfile } from '../../reducers';

const mapStateToProps = (state) => {
  return {
    userProfile: getUserProfile(state),
    page: state.onboarding.page
  }
}

export default connect(mapStateToProps, {})(Component);
