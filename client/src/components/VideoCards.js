import React from "react";
import { VideoVotes } from "./VideoVotes";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


export const VideoCards = () => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {

        const fetchAllVideos = async () => {
            try {
                const res = await axios.get("http://localhost:3030/videos");
                setVideos(res);
                console.log(res);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchAllVideos();
    }, []);


    return (
        <div>
            <h1>Videos</h1>
            <div>
                {videos.data.map((video) => (

                    <h3>video.title</h3>

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
            <div>
                <VideoVotes />
                <button type="button" className="btn btn-primary">
                    Delete
                </button>
            </div>
        </div>
    );
}
