import { connect } from 'react-redux';
import Component from './component';
import { getUserProfile } from '../../reducers';

export default connect(getUserProfile, { })(Component);
