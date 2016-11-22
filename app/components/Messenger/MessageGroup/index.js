import { connect } from 'react-redux';
import Component from './component';
import { getUserType } from '../../../reducers';

const mapStateToProps = (state) => {
  return {
    userType: getUserType(state)
  }
}

export default connect(mapStateToProps, {})(Component);
