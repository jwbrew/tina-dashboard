import React, { Component } from 'react';
import { track } from '../../../shared/Analytics';

let scriptLoading = false;
let scriptLoaded = false;
let scriptDidError = false;

class Subscribe extends Component {
  constructor(props) {
    super(props)
  }

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
          track(this.props.app, 'subscribed')
          this.props.onToken(token)
        }
      })
    }
  }

  render() {
    return React.cloneElement(this.props.children, {
      onClick: () => {
        track(this.props.app, 'stripe-opened')
        this.handler.open({
          name: this.props.client.user_metadata.name,
          description: 'Expert Advice',
          zipCode: true,
          panelLabel: 'Submit'
        })
      }
    })
  }
}

export default Subscribe
