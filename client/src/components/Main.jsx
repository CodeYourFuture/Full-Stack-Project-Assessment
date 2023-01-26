import React, { useState } from 'react';
import DeleteBtn from './DeleteBtn';
import dataVideos from "../exampleresponse.json";
import Videos from "./Videos";


function Main() {
    const [videos, setVideos] = useState(dataVideos);
    //console.log(videos);


  return (
    <div>
      {videos.map(video =>(
        <div>
          <Videos videos={videos} data={video}/>
          <DeleteBtn videos={setVideos} id={video.id} data={videos}/>
        </div>
      ))}
    </div>
  )
}

export default Main;