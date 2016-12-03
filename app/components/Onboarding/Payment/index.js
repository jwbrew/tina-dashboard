import { connect } from 'react-redux';
import Component from './component';
import { getUserProfile } from '../../../reducers';
import { completeOnboarding, nextPage } from '../../../actions/onboarding';
import { subscribeClient } from '../../../actions/account';
import { push } from 'react-router-redux'

const mapStateToProps = (state) => {
  return {
    userProfile: getUserProfile(state)
  }
}

export default connect(mapStateToProps, {
  completeOnboarding,
  nextPage,
  subscribeClient,
  push
})(Component);
