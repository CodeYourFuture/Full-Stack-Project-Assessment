import React from 'react'
import InsertVideo from './InsertVideo';

export default function PopulateVideos({defaultVideoData, setDefaultVideoData}) {
    const handleDelete = (event) => {
        setDefaultVideoData(defaultVideoData.splice(event.target.id, 1));
        console.log(defaultVideoData)
        
    }
  return (
    <div className="all-videos">
      {defaultVideoData.map((video, key) => (
        <div className="vid-del">
          <InsertVideo video={video} key={video.id}/>
          <button className="delete" id={key} onClick={handleDelete}>
            Delete
          </button>
        </div>
        
      ))}
    </div>
  );
}
