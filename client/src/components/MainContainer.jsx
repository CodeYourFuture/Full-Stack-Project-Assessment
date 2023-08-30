import React, { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer";
import VideoForm from "./VideoForm";

function MainContainer() {
    const [videoData, setVideoData] = useState();

    useEffect(() => {
        fetch("http://localhost:5000/")
        .then(response => response.json())
        .then(data => setVideoData(data))
    }, [])
    
    console.log("Video Data from MainContainer---> ", videoData);
    return (
        <div>
            <VideoForm videoData={videoData} setVideoData={setVideoData}/>
            <CardsContainer videoData={videoData} setVideoData={setVideoData}/>
        </div>
    )
}

export default MainContainer;