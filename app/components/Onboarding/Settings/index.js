import React from 'react';
import { connect } from 'react-redux';
import Component from './component';
import {
  getToken,
  getUserProfile
} from '../../../reducers';
import { nextPage } from '../../../actions/onboarding';
import Api from '../../../utils/Api';
import { saveSettings, updateForm } from '../../../actions/onboarding';


class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let props = this.props
    let slug = props.userProfile.user_metadata.name.toLowerCase().replace(/\s/g, '-')
    props.updateForm('slug', slug)
    this.checkSlug(slug)
    props.updateForm('welcome', "Hey!\nNeed a hand?\nLet's chat")
    this.props.updateForm('welcome', true);

  }

  checkSlug = (slug) => {
    let api = new Api()

    api.getClient(slug).then((data) => {

      if (data.result) {
        this.props.updateForm('slug', false);
      } else {
        this.props.updateForm('slug', true);
      }
    })
  }

  onSlugChange = (e) => {
    if (!e.target.value.match(/^[a-z0-9\-]+$/)) return;
    this.props.updateForm('slug', e.target.value);
    this.checkSlug(e.target.value)
  }

  onWelcomeChange = (e) => {
    this.props.updateForm('welcome', e.target.value);
    if (e.target.value.length) {
      this.props.updateForm('welcome', true);
    } else {
      this.props.updateForm('welcome', false);
    }
  }

  isFormValid = () => {
    return this.props.form.welcome.valid && this.props.form.slug.valid
  }

  submitForm = () => {
    this.props.saveSettings(this.props, this.props.userProfile, {
      slug: this.props.form.slug.value,
      welcome: this.props.form.welcome.value
    })
  }

  render() {
    return (
      <Component
        {...this.props}
        submitForm={this.submitForm}
        isFormValid={this.isFormValid()}
        onSlugChange={this.onSlugChange}
        onWelcomeChange={this.onWelcomeChange}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: getToken(state),
    userProfile: getUserProfile(state),
    form: state.onboarding.form
  }
}

export default connect(mapStateToProps, { nextPage, saveSettings, updateForm })(Settings);
