import React from 'react';
import { connect } from 'react-redux';
import Component from './component';
import {
  getToken,
  getUserProfile
} from '../../../reducers';
import Api from '../../../utils/Api';
import {
  saveMetadata,
  updateForm
} from '../../../actions/user';


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

  onPictureChange = (e) => {
    this.props.updateForm('picture', e[0])
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
    return (
      this.props.form.welcome &&
      this.props.form.welcome.valid &&
      this.props.form.slug &&
      this.props.form.slug.valid &&
      this.props.form.picture
    )
  }

  submitForm = () => {
    this.props.saveMetadata(
      this.props,
      this.props.userProfile,
      this.props.form
    )
  }

  render() {
    return (
      <Component
        {...this.props}
        submitForm={this.submitForm}
        isFormValid={this.isFormValid()}
        onPictureChange={this.onPictureChange}
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
    form: state.user.form,
    isSaving: state.user.isFetching
  }
}

export default connect(mapStateToProps, { saveMetadata, updateForm })(Settings);
