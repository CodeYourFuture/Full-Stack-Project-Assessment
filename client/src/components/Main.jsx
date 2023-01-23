import React, { useState } from 'react';
import DeleteBtn from './DeleteBtn';
import Videos from '../Videos';
import dataVideos from "/home/codeyourfuture/Documents/GitHub/Full-Stack-Project-Assessment/client/src/exampleresponse.json";



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