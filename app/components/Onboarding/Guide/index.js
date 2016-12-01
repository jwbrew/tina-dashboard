import { connect } from 'react-redux';
import Component from './component';
import { getUserProfile } from '../../../reducers';
import { nextPage } from '../../../actions/onboarding';

const mapStateToProps = (state) => {
  return { userProfile: getUserProfile(state) }
}

export default connect(mapStateToProps, { nextPage })(Component);
