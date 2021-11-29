import React from 'react';
import VideoCard from './VideoCard';


export default function AllVideoCards ({videos, setVideos}) {
    const allVideos = videos.map(video => 
    <VideoCard video={video} videos={videos} setVideos={setVideos} key={video.id}/>
    )
    return(
        <div>
            {allVideos}
        </div>
    )
}