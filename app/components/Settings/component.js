import React, { Component } from 'react';
import styles from './styles.css';
import FormattedText from 'formatted-text';

const Settings = ({ userProfile, isEditing, startEditing }) => {
  const meta = userProfile.user_metadata

  return (
      <div className={styles.root}>
        <h1>Settings</h1><a onClick={startEditing}>edit</a>
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
            <dl>
              <dt>Welcome Message</dt>
              <dd>
                {!isEditing && <FormattedText>{meta.welcome}</FormattedText>}
                {isEditing && <textarea value={meta.welcome}></textarea>}
              </dd>
              <dt>Auto Open</dt>
              <dd>
                {!isEditing &&
                  <span>{meta.auto_open ? 'Enabled' : 'Disabled'}</span> }
                { isEditing &&
                  <select>
                    <option value='true'>Enabled</option>
                    <option value='false'>Disabled</option>
                  </select>
                }
              </dd>
            </dl>
          </div>
        </div>
      </div>
    );
}

export default Settings;
