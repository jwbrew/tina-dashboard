import React, { Component } from 'react';
import styles from './styles.css';
import FormattedText from 'formatted-text';
import EditIcon from './assets/edit.svg';
import SaveIcon from './assets/save.svg';
import CancelIcon from './assets/cancel.svg';
import { ChromePicker } from 'react-color';
import Loader from '../Loader';


const Settings = ({
  userProfile,
  isEditing,
  startEditing,
  saveEditing,
  cancelEditing,
  isSaving,
  auth,
  form,
  updateForm
}) => {
  const meta = userProfile.user_metadata
  const onChange = (field) => (event) => {
    return updateForm(field, event.hex || event.target.value)
  }

  return (
      <div className={styles.root}>
        { isSaving && <Loader /> }
        <h1>Settings
          <div className={styles.controls}>
            { !isEditing && <EditIcon onClick={startEditing} /> }
            { isEditing && <SaveIcon onClick={() => saveEditing(auth, userProfile, form)} /> }
            { isEditing && <CancelIcon onClick={cancelEditing} /> }
          </div>
        </h1>
        <div className={styles.content}>
          <div className={styles.panel}>
            <h2>Profile</h2>
            <img className={styles.picture} src={meta.picture || userProfile.picture}/>
            <dl>
              <dt>ID</dt>
              <dd>{meta.slug}</dd>
              <dt>Name</dt>
              <dd>{userProfile.name}</dd>
              <dt>Email</dt>
              <dd>{userProfile.email}</dd>
            </dl>
          </div>
          <div className={styles.panel}>
            <h2>Widget</h2>
            <dl className={styles.dl}>
              <dt className={styles.dt}>Welcome Message</dt>
              <dd>
                { !isEditing && <FormattedText className={styles.formatted}>{meta.welcome}</FormattedText> }
                { isEditing && <textarea
                  className={styles.textarea}
                  onChange={onChange('welcome')}
                  value={form.welcome}></textarea> }
              </dd>
              <dt className={styles.dt}>Auto Open</dt>
              <dd>
                { !isEditing &&
                  <span>{meta.auto_open === 'true' ? 'Enabled' : 'Disabled'}</span> }
                { isEditing &&
                  <select
                    value={form.auto_open}
                    onChange={onChange('auto_open')}
                    >
                    <option value='true'>Enabled</option>
                    <option value='false'>Disabled</option>
                  </select>
                }
              </dd>
              <dt className={styles.dt}>Primary Colour</dt>
              <dd>
                { !isEditing && <span
                  className={styles.primary}
                  style={{
                    backgroundColor: meta.primary_colour || '#a7798e',
                  }}>
                  { meta.primary_colour || '#a7798e' }
                </span>}
                { isEditing && <ChromePicker
                  color={form.primary_colour}
                  onChangeComplete={onChange('primary_colour')}
                  /> }
              </dd>
            </dl>
          </div>
        </div>
      </div>
    );
}

export default Settings;
