import React from 'react'
import AddVideo from './AddVideo'
import Search from './Search'

const AddAndSearchVideo = ({ videos, setVideos }) => {
    return (
      <div className="d-flex p-3 justify-content-around">
        <AddVideo videos={videos} setVideos={setVideos} />
        <Search />
      </div>
    );
}

export default AddAndSearchVideo
