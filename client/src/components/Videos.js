import React, { useState } from "react";
import DisplayVideos from "./DisplayVideos";
import AddVideo from "./AddVideo";


function Videos() {
    const [videos, setVideos] = useState(require("../data/exampleresponse.json"));

    function remove(video){
      setVideos( videos.filter(item => item !== video))
    }

    return (
        <>
            <div className="videos-list">
                <AddVideo />
                {videos.map((video, index) =>(
                <DisplayVideos key={index} video={video} remove={remove}/>
                ))}
            </div>
        </>
    );
}

export default Videos;