import React, { useState, useEffect } from 'react'
import VideoCard from './VideoCard'
import AddVideo from './AddVideo'
import Search from '../details/Search'

import data from '../../data/exampleresponse.json'

const VideoList = (searchText) => {
  const [allData, setAllData] = useState(data)
  const [videos, setVideos] = useState(allData)
  const searchHandler = (searchText) => {
    let filteredVid = allData.filter((video) =>
      video.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    setVideos(filteredVid)
  }
  const deleteHandler = (id) => {
    let filteredVid = allData.filter((video) => video.id !== id)
    setAllData(filteredVid)
  }
  const updateRating = (id, rate) => {
    const foundVideo = allData.find((video) => video.id === id)
    foundVideo.rating = rate
    console.log(rate)
  }
  const handleSet = (newVideo) => {
    setAllData((previous) => previous.concat(newVideo))
  }
  useEffect(() => {
    setVideos(allData)
  }, [allData])

  return (
    <>
      <nav>
      <AddVideo allData={allData} handleSet={handleSet} />
      <Search searchHandler={searchHandler} />
      </nav>
      <div className="root">
        {videos
          .sort((a, b) => b.rating - a.rating)
          .map((video, index) => (
              <VideoCard
                key={video.id}
                videoData={video}
                updateRating={updateRating}
                deleteHandler={deleteHandler}
              />
          ))}
      </div>
    </>
  )
}

export default VideoList
