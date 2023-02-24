import React from "react";
// import { VideoVotes } from "./VideoVotes";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";


export const VideoCards = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchAllVideos = async () => {
            try {
                const res = await axios.get("http://localhost:3030/videos");
                setVideos(res.data);
                // console.log(res);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchAllVideos();
    }, []);
    const [votes, setVotes] = useState(0);
    const increaseVotes = () => {
        setVotes(votes + 1)
    }
    const decreaseVotes = () => {
        if (votes > 0) {
            setVotes(votes - 1)
        }
    };
    return (
        <div>
            <div>
                {videos.map((video) => (
                    <div className="video" key={video.id}>
                        <p>{video.title}</p>

                        <ReactPlayer
                            url={video.url}
                        />
                        <div className="thumbs-icons">
                            <p>{parseInt(video.rating) + votes}</p>
                            <i className="fa-regular fa-thumbs-up" onClick={increaseVotes}></i>
                            <i className="fa-regular fa-thumbs-down" onClick={decreaseVotes}></i>
                        </div>
                    </div>
                ))}
            </div>
            {/* <h2>Title</h2>
            <iframe
                width="325"
                height="200"
                src="https://www.youtube.com/embed/{VIDEO_ID_GOES_HERE}"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe> */}
            <button type="button" className="btn btn-primary">
                Delete
            </button>
        </div>
    );
}