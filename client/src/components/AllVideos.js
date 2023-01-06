import React, { useEffect } from 'react';
import Video from './Video';
import { useGlobalContext } from '../context/VideoContext';

function AllVideos() {
  const { videos, loading, fetchVideos, handleDelete } = useGlobalContext();
  useEffect(() => {
    fetchVideos();
  }, [])
  return (
    <>
      {
        !loading ? (
          <section className='all'>
            {
              videos.map((video, key) => (
                <Video video={video} key={video.id} handleDelete={handleDelete} />
              ))
            }
          </section >
        ) : (
          <div>LOADING...</div>
        )
      }
    </>
  );
}

export default AllVideos;