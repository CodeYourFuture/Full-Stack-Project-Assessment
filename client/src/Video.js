import React from "react";
import Likes from "./Likes";

const Video = (props) => {
    // console.log(exampleresponse)
    // let videoData = exampleresponse;
    // const [initList, setInitList] = useState(props.videoData);

    function handleRemove(id) {
        // console.log(id); 
        const newList = props.videoList.filter((video) => video.id !== id);
        props.setVideoList(newList)
    }
    return (
        <div className="videos-inner-wrap" >
            {props.videoList.map((video, ind) => (
                <div key={ind} className="embed-responsive embed-responsive-16by9 video-elem">
                    <h3 className="w-50">{video.title}</h3>
                    <iframe className="embed-responsive-item" src={video.url} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <div>
                        <Likes likes={video.rating} />
                        <button type="button" className="delete" onClick={() => handleRemove(video.id)}>Delete it</button>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Video;

// <button type="button" className="btn btn-outline-success" onClick={() => handleVoteUp(video.id)}>Vote up</button>
// <button type="button" className="btn btn-outline-dark" onClick={handleVoteDown}>Vote down</button>