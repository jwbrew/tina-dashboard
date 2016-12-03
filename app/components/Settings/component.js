import React, { Component } from 'react';
import styles from './styles.css';
import FormattedText from 'formatted-text';
import Dropzone from 'react-dropzone';
import EditIcon from './assets/edit.svg';
import SaveIcon from './assets/save.svg';
import CancelIcon from './assets/cancel.svg';
import { ChromePicker } from 'react-color';
import Loader from '../Loader';


const Settings = ({
  userProfile,
  isEditing,
  startEditing,
  saveMetadata,
  cancelEditing,
  isSaving,
  user,
  form,
  updateForm
}) => {
  const meta = userProfile.user_metadata
  const onChange = (field) => (event) => {
    return updateForm(field, event.hex || (event.target && event.target.value) || event[0])
  }

  return (
      <div className={styles.root}>
        { isSaving && <Loader /> }
        <h1>Settings
          <div className={styles.controls}>
            { !isEditing && <EditIcon onClick={startEditing} /> }
            { isEditing && <SaveIcon onClick={() => saveMetadata(user, userProfile, form)} /> }
            { isEditing && <CancelIcon onClick={cancelEditing} /> }
          </div>
        </h1>
        <div className={styles.content}>
          <div className={styles.list}>
            <div>Name</div>
            <div>{userProfile.user_metadata.name}</div>
            <div>Email</div>
            <div>{userProfile.email}</div>
            <div>ID</div>
            <div>{meta.slug}</div>
            <div>Image</div>
            <div>
              { !isEditing &&
                <img
                  className={styles.picture}
                  src={meta.picture}/> }
              { isEditing &&
                <Dropzone
                  onDrop={onChange('picture')}
                  multiple={false}
                  className={styles.picture}
                >
                  { !form.picture && <span>Select Image</span> }
                  { form.picture && <img src={form.picture.value && form.picture.value.preview} /> }
                </Dropzone>}
            </div>
            <div>Welcome Message</div>
            <div>
              { !isEditing && <FormattedText className={styles.formatted}>{meta.welcome}</FormattedText> }
              { isEditing && <textarea
                className={styles.textarea}
                onChange={onChange('welcome')}
                {...form.welcome}></textarea> }
            </div>
            <div>
              Auto Open
              <p><small>Widget will auto-open once for each visitor after a 10s delay</small></p>
            </div>
            <div>
              { !isEditing &&
                <span>{meta.auto_open === 'true' ? 'Enabled' : 'Disabled'}</span> }
              { isEditing &&
                <select
                  {...form.auto_open}
                  onChange={onChange('auto_open')}
                  >
                  <option value='true'>Enabled</option>
                  <option value='false'>Disabled</option>
                </select> }
            </div>
            <div>Primary Colour</div>
            <div>
              { !isEditing && <span
                className={styles.primary}
                style={{
                  backgroundColor: meta.primary_colour || '#a7798e',
                }}>
                { meta.primary_colour || '#a7798e' }
              </span>}
              { isEditing && <ChromePicker
                color={form.primary_colour && form.primary_colour.value}
                onChangeComplete={onChange('primary_colour')}
                /> }
            </div>
          </div>
        </div>
      </div>
    );
}

export default Settings;
