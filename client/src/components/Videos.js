import React, { useEffect, useState } from "react";
import DisplayVideos from "./DisplayVideos";
import AddVideo from "./AddVideo";


function Videos() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Encountered Something Unexpected ${response.status}`)
                }
            })
            .then(
                data => {
                    setVideos(data);
                },
                error => {
                    console.log(error)
                });
    }, [])

    function remove(video) {
        setVideos(videos.filter(item => item !== video))
    }

    return (
        <>
            <div className="videos-list">
                <AddVideo />
                {videos.map((video, index) => (
                    <DisplayVideos key={index} video={video} remove={remove} />
                ))}
            </div>
        </>
    );
}

export default Videos;