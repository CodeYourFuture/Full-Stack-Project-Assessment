

import Counter from './Counter'
import ReactPlayer from 'react-player'



const VideoCard = ({ allMyVideos, setAllMyVideos }) => {

    return (
        allMyVideos.map(video => (
            <div key={video.key} className="card">
                <h4>{video.title}</h4>
                <div className="video-holder">
                    <ReactPlayer className="react-player"
                        url={video.url}
                        width="100%"
                        height="100%"
                        controls={false} />
                </div>
                <div className="text-holder">
                    <div className="rate">
                        <img className="image-heart" src="https://www.svgrepo.com/show/439915/heart-fill.svg"></img>
                        <span>{video.rating}</span>
                    </div>
                    <Counter />
                </div>
            </div >
        ))
    )
}

export default VideoCard