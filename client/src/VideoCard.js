

import Counter from './Counter'
import ReactPlayer from 'react-player'



const VideoCard = ({ allMyVideos, setAllMyVideos }) => {

    const handleDelete = (id) => {
        fetch(`https://youtube-video-server.onrender.com/videos/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => setAllMyVideos(data))
            .catch(error => console.log(error))
    }

    return (
        allMyVideos.map(video => (
            <div key={video.key} className="card">
                <h4>{video.title}</h4>
                <div className="video-holder">
                    <ReactPlayer className="react-player"
                        url={video.url}
                        width="100%"
                        height="100%"
                        controls={true} />
                </div>
                <div className='card-buttons'>
                    <button className='delete-button' onClick={() => { handleDelete(video.id) }}>Delete</button>
                    <div className="text-holder">
                        <div className="rate">
                            <img alt="heart" className="image-heart" src="https://www.svgrepo.com/show/439915/heart-fill.svg"></img>
                            <span>{video.rating}</span>
                        </div>
                        <Counter />
                    </div>
                </div>

            </div >
        ))
    )
}

export default VideoCard