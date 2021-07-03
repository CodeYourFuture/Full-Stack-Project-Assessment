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
                    throw new Error(`Encountered Something Unexpected ${response.status}}`)
                }
            })
            .then(
                data => {
                    setVideos(data);
                },
                error => {
                    console.log(error)
                });
    }, [videos])

    return (
        <>
            <div className="videos-list">
                <AddVideo video={setVideos} />
                <div className="container">
                    <div className="row gx-5">
                        {videos.map((video, index) => (
                            <DisplayVideos key={index} video={video} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Videos;