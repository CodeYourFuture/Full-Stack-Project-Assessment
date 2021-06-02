import React from 'react';
import SingleVideo from './SingleVideo';

const DisplayVideo = ({videos, deleteVideo}) => {


    return (
      <div className="main-container">
         {videos.map((item, index) => (
          <SingleVideo key={index} item={item} deleteVideo={deleteVideo} />
        ))}
      </div>
    );
}

export default DisplayVideo;
