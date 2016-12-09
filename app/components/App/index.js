import React from 'react';
import { connect } from 'react-redux';
import App from './component';
import { getUserProfile } from '../../reducers';
import { subscribeClient } from '../../utils/Pusher';


class Component extends React.Component {
  componentDidMount() {
    subscribeClient(this.props.client)
  }

  render() {
    return (<App {...this.props} />)
  }
}

const mapStateToProps = (state, props) => {
  return {
    client: getUserProfile(state)
  }
}

export default connect(mapStateToProps, {})(Component);
