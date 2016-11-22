import React, { Component } from 'react';
import styles from './styles.css';
import FormattedText from 'formatted-text';

const Settings = ({ userProfile }) => {
  const meta = userProfile.user_metadata

  return (
      <div className={styles.root}>
        <h1>Settings</h1>
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
              <dd><FormattedText>{meta.welcome}</FormattedText></dd>
              <dt>Payment Details</dt>
              <dd><FormattedText>{meta.payment}</FormattedText></dd>
              <dt>Chat Intro</dt>
              <dd><FormattedText>{meta.chat}</FormattedText></dd>
              <dt>Thank You Message</dt>
              <dd><FormattedText>{meta.thanks}</FormattedText></dd>
            </dl>
          </div>
        </div>
      </div>
    );
}

export default Settings;
