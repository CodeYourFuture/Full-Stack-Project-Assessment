import React from 'react';
import Video from './Video';

function AllVideos({ videos, handleDelete }) {
  return (
    <section className='all'>
      {videos.map((video, key) => (
        <Video video={video} key={video.id} handleDelete={handleDelete} />
      ))}

    </section>
  );
}

export default AllVideos;