import React from 'react';
import Video from './Video';

const Videos = ({ videos }) => {
    const allVideos = videos.map((video, index) => <Video key={video.id} videos={videos} video={video} index={index}/>)
    return (
        <div className='d-flex flex-wrap'>
            {allVideos}
        </div>
    )
}

export default Videos
