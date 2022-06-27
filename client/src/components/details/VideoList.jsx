import React, { useState, useEffect } from 'react'
import VideoCard from './VideoCard'
import AddVideo from './AddVideo'
import Search from '../details/Search'
import Sort from '../details/Sort'
import axios from 'axios'

const path = 'https://youtube-videos-list.herokuapp.com/'

const VideoList = (searchText) => {
  const [allData, setAllData] = useState([])
  const [videos, setVideos] = useState(allData)
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)
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

  const compare = ( a, b, param, asc ) => {
  if ( a[param] < b[param] ) return asc?-1:1;
  if ( a[param] > b[param] ) return asc?1:-1;
  return 0;
}


  const sortHandler = (value, asc) => {
    setReload(true)
    const sortedVideos = videos.sort((a,b) => compare(a,b,value,asc))
    setVideos(sortedVideos)
    
  } 

  const loadData = () => {
    axios.get(path).then((res) => {
      setAllData(res.data)
      setLoading(false);
    }).catch(err => {
      console.log(err)
      setLoading(true);
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setVideos(allData)
  }, [allData])
  
  useEffect(() => {
    setReload(false)
  }, [reload])
  
  
  return (
    <>
      <nav>
        <AddVideo allData={allData} loadData={loadData} />
        <Search searchHandler={searchHandler} />
        <Sort sortHandler={sortHandler} />
      </nav>
      <div className="root">
        {loading&&<h2>Loading data...</h2>}
        {videos.map((video) => (
          <VideoCard key={video.id}
          videoId={video.id}
          videoData={video}
          deleteHandler={deleteHandler}
            />
                    ))}
      </div>
    </>
  )
}

export default VideoList