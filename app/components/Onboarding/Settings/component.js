import React from 'react';
import styles from '../shared.css';

export default ({ isFormValid, submitForm, onSlugChange, onWelcomeChange, form }) => {
  return (
    <div className={styles.root}>
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
            value={form.slug.value}
            type="text"
            onChange={onSlugChange}
            placeholder={"joe-bloggs"}
            style={{
              borderColor: form.slug.valid ? 'green' : 'red'
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
            value={form.welcome.value}
            onChange={onWelcomeChange}
            className={styles.textarea}
            style={{
              borderColor: form.welcome.valid ? 'green' : 'red'
            }}
          />
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
