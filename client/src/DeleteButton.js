import React, { useState } from "react";
// import videosData from "./exampleresponse.json"

function DeleteButton({data}) {
    const [videos, setVideos] = useState(data)

    function removeVideo(id) {
       let newVideoList = videos.filter((video) => video.id !==id);
       setVideos(newVideoList);
    }
    return (
        <div>
            <button
              className="btn btn-default"
        
              onClick={removeVideo}>DELETE</button>

       </div>
    )
}


export default DeleteButton;