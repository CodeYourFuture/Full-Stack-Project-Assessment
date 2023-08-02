

import ReactPlayer from 'react-player'
import { useRef } from 'react';

const VideoCard = ({ allMyVideos, setAllMyVideos }) => {

    const playerRef = useRef(null);
    return (
        allMyVideos.map(video => (
            <div key={video.key} className="card">
                <h4>{video.title}</h4>
                <div className="video-holder">
                    <ReactPlayer width={480} height={272} ref={playerRef} url={video.url} controls={true} fluid={false} />
                </div>
                <div className="text-holder">
                    <div className="rate">
                        <img className="image-heart" src="https://www.svgrepo.com/show/439915/heart-fill.svg"></img>
                        <span>{video.rating}</span>
                    </div>
                    <button className="up">
                        <img className="tumb-up" src="https://icon-library.com/images/white-thumbs-up-icon/white-thumbs-up-icon-26.jpg">
                        </img>{video.rating}</button>
                    <button className="down">
                        0
                        <img className="tumb-down" src="https://icon-library.com/images/white-thumbs-up-icon/white-thumbs-up-icon-26.jpg"></img>

                    </button>
                </div>
            </div >
        ))
    )
}

export default VideoCard