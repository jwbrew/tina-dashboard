import React, { Component } from 'react';
import styles from './styles.css';

import AnswerIcon from './assets/answer.svg';
import CallIcon from './assets/call.svg';
import EndIcon from './assets/hangup.svg';
import CloseIcon from './assets/close.svg';

import Timer from './Timer';
import Stream from './Stream';


const Live = ({
  doAnswer,
  endCall,
  hasAnswered,
  hasOffer,
  isInitiator,
  isStarted,
  isOpen,
  localStream,
  remoteStream,
  startCall
}) => {
  if (!isOpen) return null;
  return (
    <div
      className={styles.root}
    >
      { remoteStream &&
        <Stream
          className={styles.remoteVideo}
          stream={remoteStream}
        />
      }
      { hasAnswered && <Timer /> }
      { hasOffer && !hasAnswered &&
        <AnswerIcon
          className={styles.answer}
          onClick={doAnswer}
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
