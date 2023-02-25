import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Videos } from "./Videos"


export const VideoCards = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchAllVideos = async () => {
            try {
                const res = await axios.get("http://localhost:3030/videos");
                setVideos(res.data);
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
            {videos.map((video) => (
                <Videos
                    url={video.url}
                    title={video.title}
                    rating={video.rating}
                    key={video.id}
                />
            ))}


        </div>
    );
}