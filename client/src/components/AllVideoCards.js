import React from 'react';
import VideoCard from './VideoCard';


export default function AllVideoCards ({videos}) {
    const allVideos = videos.map( video => 
    <VideoCard video={video} key={video.id}/>
    )
    return(
        <div>
            {allVideos}
        </div>
    )
}