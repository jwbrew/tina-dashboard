import React from 'react';
import { connect } from 'react-redux'
import Component from './component'
import { subscribeClient } from '../../actions/account';
import { getUserProfile } from '../../reducers';

let scriptLoading = false;
let scriptLoaded = false;
let scriptDidError = false;

class Account extends React.Component {
  componentDidMount = () => {
    if (scriptLoaded || scriptLoading) return
    scriptLoading = true;
    const script = document.createElement('script');
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.async = 1;
    document.body.appendChild(script);

    script.onload = () => {
      this.setState({ stripeLoaded: true })
    }
  }

  render() {
    return (
      <Component {...this.props} {...this.state} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    client: getUserProfile(state),
    isFetching: state.auth.isFetching
  }
}

export default connect(mapStateToProps, { subscribeClient })(Account)
