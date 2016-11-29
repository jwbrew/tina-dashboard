import React from 'react';
import styles from '../Shared.css'

const Installation = ({ userProfile }) => {
  return (
    <div className={styles.root}>
      <h1>Installation</h1>
      <div className={styles.rows}>
        <div className={styles.panel}>
          <h2>Direct Link</h2>
          <p>
            Send visitors to <a
              href={ `https://asktina.io/chat#${userProfile.user_metadata.slug}` }
              target="_new">
              { `https://asktina.io/chat#${userProfile.user_metadata.slug}` }
            </a> for a coding-free chat window.
          </p>
        </div>
        <div className={styles.panel}>
          <h2>HTML Code</h2>
          <p>Embded this code snippet directly before the closing <code>{"</body>"}</code> tag.</p>
          <code>{`<script
                    type=\"text/javascript\"
                    src=\"https://widget.asktina.io/latest.js\"
                    data-id=\"${userProfile.user_metadata.slug}\"></script>`}
          </code>
        </div>
        <div className={styles.panel}>
          <h2>Wordpress Plugin</h2>
          <p>Download the Wordpress plugin from the link below, or search for "AskTina" directly in the plugins screen in wp-admin.</p>
          <a
            href="https://wordpress.org/plugins/asktina-widget/installation/"
            target="_new">
            https://wordpress.org/plugins/asktina-widget/installation/
          </a>
        </div>
        <div className={styles.panel}>
          <h2>Squarespace</h2>
          <p>
            Follow <a
              href="https://support.squarespace.com/hc/en-us/articles/205815908-Using-Code-Injection"
              target="_new">
              these instructions
            </a> for code injection to add the following snippet to your Squarespace website:
          </p>
          <code>{`<script
              type=\"text/javascript\"
              src=\"https://widget.asktina.io/latest.js\"
              data-id=\"${userProfile.user_metadata.slug}\"></script>`}
          </code>
        </div>
      </div>
    </div>
  )
}

export default Installation;
