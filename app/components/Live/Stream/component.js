import React from 'react';

const Stream = ({
  stream,
  className,
  muted
}) => {
  var src
  if (!stream) return null
  if (window.URL) {
    src = window.URL.createObjectURL(stream);
  } else {
    src = stream;
  }

  return (
    <video
      muted={muted}
      autoPlay
      className={className}
      src={src}
    ></video>
  )
}

export default Stream;
