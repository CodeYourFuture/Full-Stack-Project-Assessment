import React from 'react';
import Video from './Video';

const Videos = ({ videos, setVideos }) => {
    const allVideos = videos.map((video, index) => <Video key={video.id} videos={videos} setVideos={setVideos} video={video} index={index}/>)
    return (
        <div className='d-flex flex-wrap'>
            {allVideos}
        </div>
    )
}

export default Videos
