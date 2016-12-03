import React from 'react';
import styles from '../shared.css';
import Dropzone from 'react-dropzone';
import Loader from '../../Loader';

export default ({
  isFormValid,
  submitForm,
  onPictureChange,
  onSlugChange,
  onWelcomeChange,
  form,
  isSaving
}) => {
  return (
    <div className={styles.root}>
      { isSaving && <Loader /> }
      <h1 className={styles.h1}>Account Settings</h1>
      <p className={styles.lead}>Let's get things customised for you</p>
      <div className={styles.row}>
        <div className={styles.col}>
          <label className={styles.label}>
            Personal ID
          </label>
          <small>This is your unique identifier. <br/>Lowercase letters, numbers and dashes only please.</small>
        </div>
        <div className={styles.col}>
          <input
            className={styles.input}
            {...form.slug}
            type="text"
            onChange={onSlugChange}
            placeholder={"joe-bloggs"}
            style={{
              borderColor: (form.slug && form.slug.valid) ? 'green' : 'red'
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <label className={styles.label}>
            Welcome Message
          </label>
          <small>This will be shown to a visitor on your website after they open the widget.</small>
        </div>
        <div className={styles.col}>
          <textarea
            {...form.welcome}
            onChange={onWelcomeChange}
            className={styles.textarea}
            style={{
              borderColor: (form.welcome && form.welcome.valid) ? 'green' : 'red'
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <label className={styles.label}>
            Photo
          </label>
          <small>Shown on the widget on your site</small>
        </div>
        <div className={styles.col}>
          <Dropzone
            onDrop={onPictureChange}
            multiple={false}
            className={styles.picture}
          >
            { !form.picture && <span>Select Image</span> }
            { form.picture && <img src={form.picture.value.preview} /> }
          </Dropzone>
        </div>
      </div>
      <button
        onClick={submitForm}
        className={styles.button}
        disabled={!isFormValid}
      >Save</button>
    </div>
  )
}
