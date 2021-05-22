import React from 'react';

const Title = ({ title }) => {
  return (
    <div key={title} className='title-div'>
      <h2 className='video-title'>{title}</h2>
    </div>
  );
};

export default Title;