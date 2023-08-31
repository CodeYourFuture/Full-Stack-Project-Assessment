import React, { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer";
import VideoForm from "./VideoForm";

function MainContainer() {
    const [videoData, setVideoData] = useState();
    const [fetchData, setFetchData] = useState(true);

    useEffect(() => {
    if(fetchData) {
        fetch("http://localhost:5000/")
            .then(response => response.json())
            .then(data => setVideoData(data))
    }
        console.log(videoData);
        setFetchData(false)
    }, [fetchData])
    
    console.log("Video Data from MainContainer---> ", videoData);
    return (
        <div>
            <VideoForm setFetchData={setFetchData} videoData={videoData} setVideoData={setVideoData}/>
            <CardsContainer setFetchData={setFetchData} videoData={videoData} setVideoData={setVideoData}/>
        </div>
    )
}

export default MainContainer;