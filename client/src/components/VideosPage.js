import React from 'react'

import Search from './Search'
import Title from './Title'
import Videos from './Videos'

function VideosPage({videos, setVideos}) {
    return (
        <div className="text-center">
            <Title/>
           <div className="container">
           <Search videos={videos} setVideos={setVideos} />
           
            <Videos videos={videos} setVideos={setVideos}/>    
           </div> 
        </div>
    )
}

export default VideosPage
