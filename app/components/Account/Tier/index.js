import React from 'react';
import { connect } from 'react-redux'
import Component from './component'
import { getUserProfile } from '../../../reducers';
import { subscribeClient } from '../../../actions/account';

class Tier extends React.Component {
  constructor(props) {
    super(props)
    this.state = { stripe: null }
  }

  componentWillReceiveProps(props) {
    if (props.stripeLoaded) {
      this.setState({
        stripe: StripeCheckout.configure({
          key: process.env.STRIPE_KEY,
          image: 'https://asktina.io/assets/img/logo.png',
          locale: 'auto',
          token: (token) => {
            this.props.subscribeClient(
              this.props.client,
              this.props.id,
              token.id
            )
          }
        })
      })
    }
  }

  render() {
    return <Component {...this.props} {...this.state} />
  }
}

const mapStateToProps = (state) => {
  return {
    client: getUserProfile(state)
  }
}

export default connect(mapStateToProps, { subscribeClient })(Tier)
