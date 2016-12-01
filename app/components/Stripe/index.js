import React from 'react';

let scriptLoading = false;
let scriptLoaded = false;
let scriptDidError = false;

class Stripe extends React.Component {
  constructor(props) {
    super(props)
    this.state = { stripe: null }
  }

  componentDidMount = () => {
    if (!scriptLoaded) {
      this.loadScript()
      return
    }
    if (scriptLoading) {
      this.script.onload = this.init;
      return
    }
    this.init()
  }

  loadScript = () => {
    scriptLoading = true;
    this.script = document.createElement('script');
    this.script.src = 'https://checkout.stripe.com/checkout.js';
    this.script.async = 1;
    document.body.appendChild(this.script);
    this.script.onload = this.init
  }

  init = () => {
    const { token, image, amount } = this.props
    this.setState({
      stripe: StripeCheckout.configure({
        key: process.env.STRIPE_KEY,
        image: image || 'https://asktina.io/assets/img/logo.png',
        locale: 'auto',
        token
      })
    })
  }

  render() {
    if (!this.state.stripe) return null;
    const { name, description, zipCode, panelLabel } = this.props

    return <div>{React.cloneElement(this.props.children, { onClick: () => {
      this.state.stripe.open({
        name: name || 'AskTina',
        description: description || null,
        zipCode: !!zipCode,
        panelLabel: panelLabel
      })
    } })}</div>
  }
}

export default Stripe
