import React, { useState, useEffect } from 'react'
import VideoCard from './VideoCard'
import AddVideo from './AddVideo'
import Search from '../details/Search'
import axios from 'axios'
const path = 'http://localhost:5001/'

const VideoList = (searchText) => {
  const [allData, setAllData] = useState([])
  const [videos, setVideos] = useState(allData)
  const searchHandler = (searchText) => {
    let filteredVid = allData.filter((video) =>
      video.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    setVideos(filteredVid)
  }
  const deleteHandler = (id) => {
    axios.delete(path + id).then((res) => {
      loadData()
    })
  }

  const loadData = () => {
    axios.get(path).then((res) => {
      console.log(res.data)
      setAllData(res.data)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    // console.log(allData)
    setVideos(allData)
  }, [allData])

  return (
    <>
      <nav>
        <AddVideo allData={allData} loadData={loadData} />
        <Search searchHandler={searchHandler} />
      </nav>
      <div className="root">
        {videos
          .sort((a, b) => b.rating - a.rating)
          .map((video, index) => (
            <VideoCard
              key={video.id}
              videoData={video}
              deleteHandler={deleteHandler}
            />
          ))}
      </div>
    </>
  )
}

export default VideoList
