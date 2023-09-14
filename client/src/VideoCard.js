

import Counter from './Counter'
import ReactPlayer from 'react-player'



const VideoCard = ({ allMyVideos, setAllMyVideos, rating, setRating }) => {

    const handleDelete = (id) => {
        fetch(`https://youtube-video-server.onrender.com/videos/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => setAllMyVideos(data))
            .catch(error => console.log(error))
    }

    // const handleDelete = async (id) => {
    //     try {
    //         const res = await fetch(`https://youtube-video-server.onrender.com/videos/${id}`, {
    //             method: "DELETE"
    //         });

    //         if (!res.ok) {
    //             throw new Error(`Failed to delete video (${res.status})`);
    //         }

    //         const data = await res.json();
    //         setAllMyVideos(data);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }


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
                        <Counter rating={rating} setRating={setRating} videoId={video.id} allMyVideos={allMyVideos} setAllMyVideos={setAllMyVideos} />
                    </div>
                </div>

            </div >
        ))
    )
}

export default VideoCard