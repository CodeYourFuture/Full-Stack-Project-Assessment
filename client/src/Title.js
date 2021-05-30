import React from 'react';

const Title = ({ title }) => {
  return (
    <h2 key={title} className='video-title'>{title}</h2>
  );
};

export default Title;