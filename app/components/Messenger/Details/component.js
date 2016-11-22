import React from 'react';
import styles from './styles.css';
import Timer from '../../Timer';
import Subscribe from '../Subscribe';

const Details = ({ conversation, onEnd, onSubscribe, client, app }) => (
  <div className={styles.root}>
    <small>powered by <a href={"https://asktina.io/?utm_source=widget&utm_medium=" + client.user_metadata.slug } target="_new">AskTina</a></small>
    <span className={styles.timer}>
      { conversation.started_at &&
        <Timer {...conversation} /> }
      { conversation.id &&
        !conversation.stripe &&
        onSubscribe &&
        <Subscribe
          client={client}
          app={app}
          onToken={ (token) => {
            onSubscribe(conversation, token.id)
          } }><a className={styles.button}>Add payment method</a></Subscribe> }
    </span>
  </div>
)

export default Details;
