import React from 'react';

const EmbeddedVideo = ({ id }) => {
  return (
    <iframe
      className='embedded-video'
      width='458'
      height='315'
      src={'https://www.youtube.com/embed/' + id}
      title='YouTube video player'
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    ></iframe>
  );
};

export default EmbeddedVideo;