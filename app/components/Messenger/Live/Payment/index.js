import React from 'react';
import { connect } from 'react-redux';
import Component from './component';
import { track } from '../../../../utils/Analytics';
import { subscribe } from '../../../../actions/conversations';
import { getActiveConversation } from '../../../../reducers';

let scriptLoading = false;
let scriptLoaded = false;
let scriptDidError = false;

class Payment extends React.Component {

  componentDidMount() {
    if (scriptLoaded || scriptLoading) return
    scriptLoading = true;
    const script = document.createElement('script');
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.async = 1;
    document.body.appendChild(script);

    script.onload = () => {
      this.handler = StripeCheckout.configure({
        key: process.env.STRIPE_KEY,
        image: this.props.client.user_metadata.picture || this.props.client.picture,
        locale: 'auto',
        token: (token) => {
          this.props.subscribe(this.props.conversation, token.id)
        }
      })
    }
  }

  onClick() {
    track('stripe-opened')
    this.handler.open({
      name: this.props.client.user_metadata.name,
      description: 'Expert Advice',
      zipCode: true,
      panelLabel: 'Submit'
    })
  }

  render() {
    return (
      <Component {...this.props} onClick={this.onClick.bind(this)} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  client: state.client,
  conversation: getActiveConversation(state)
})

export default connect(mapStateToProps, { subscribe })(Payment);
