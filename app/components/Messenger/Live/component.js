import React, { Component } from 'react';
import styles from './styles.css';

import AnswerIcon from './assets/answer.svg';
import CallIcon from './assets/call.svg';
import EndIcon from './assets/hangup.svg';

import Timer from './Timer';
import Stream from './Stream';


const Live = ({
  conversation,
  doAnswer,
  endCall,
  hasAnswered,
  hasOffer,
  isStarted,
  liveWelcome,
  localStream,
  remoteStream,
  startCall
}) => {
  return (
    <div className={styles.root}>
      { remoteStream &&
        <Stream
          className={styles.remoteVideo}
          stream={remoteStream}
        />
      }
      { hasAnswered && <Timer /> }
      { isStarted && !remoteStream &&
        <p className={styles.text}>Calling...</p>
      }
      { !isStarted &&
          liveWelcome(conversation) }
      { hasOffer && !hasAnswered &&
        <AnswerIcon
          className={styles.answer}
          onClick={doAnswer}
        />
      }
      { !isStarted && conversation.stripe &&
        <CallIcon
          className={styles.start}
          onClick={startCall}
        />
      }
      { isStarted &&
        <EndIcon
          className={styles.end}
          onClick={endCall}
        />
      }
      <Stream
        muted
        className={styles.localVideo}
        stream={localStream}
      />
    </div>
  )
}

export default Live;
