import React, { useEffect, useState } from 'react';
import Video from './Video';
import SortByRating from '../buttons/SortByRating';
import { useGlobalContext } from '../context/VideoContext';

function AllVideos() {
  const { videos, loading, fetchVideos, handleDelete } = useGlobalContext();
  useEffect(() => {
    fetchVideos();
  }, [])

  const sortVideos = (videos, { sortBy, direction }) => {
    return videos.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return direction === 'ascending' ? -1 : 1
      if (a[sortBy] > b[sortBy]) return direction === 'ascending' ? 1 : -1
      return 0
    })
  }
  const [sortedVideos, setSortedVideos] = useState(videos)
  const [direction, setDirection] = useState()
  const [sortBy, setSortBy] = useState()

  const handleSort = event => {
    const sortDir = direction === 'descending' ? 'ascending' : 'descending'
    setDirection(sortDir)

    setSortBy('rating')
    const sortConfig = { sortBy: 'rating', direction: sortDir }
    setSortedVideos(sortVideos(videos, sortConfig))
  }

  return (
    <>
      <SortByRating handleSort={handleSort} />
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