

import Counter from './Counter'
import ReactPlayer from 'react-player'



const VideoCard = ({ allMyVideos, setAllMyVideos }) => {

    const handleDelete = (id) => {
        fetch(`http://ec2-13-42-39-111.eu-west-2.compute.amazonaws.com/videos/${id}`, {
            method: "DELETE"
        })
            .then((res) => {
                if (!res.ok) {
                    console.error(`Failed to delete video (Status: ${res.status})`);
                    throw new Error(`Failed to delete video (Status: ${res.status})`);
                }
                return res.json();
            })
            .then((data) => {
                setAllMyVideos(data);
            })
            .catch((error) => {
                console.error("Error deleting video:", error);
            });
    };


    return (
        allMyVideos.map(video => (
            <div key={video.id} className="card">
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
                        <Counter videoId={video.id} videoRating={video.rating} allMyVideos={allMyVideos} setAllMyVideos={setAllMyVideos} />
                    </div>
                </div>

            </div >
        ))
    )
}

export default VideoCard