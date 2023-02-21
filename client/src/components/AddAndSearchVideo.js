import React from 'react'
import AddVideo from './AddVideo'
import Search from './Search'

const AddAndSearchVideo = ({ videos, setVideos, search }) => {
    return (
      <div className="d-flex p-3 justify-content-around">
        <AddVideo videos={videos} setVideos={setVideos} />
        <Search search={search} />
      </div>
    );
}

export default AddAndSearchVideo
