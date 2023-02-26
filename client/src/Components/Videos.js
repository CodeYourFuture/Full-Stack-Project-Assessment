import React, {useState} from "react";
import LikeButton from "./LikeButton";
import VideosArray from "./VideosArray";
import VideosForm from "./VideosForm";

function showVideos(allvideo) {
    return <LikeButton
    title = {allvideo.title}
     link = {allvideo.url}   
     rating = {allvideo.rating}
    />
}
function Videos() {
    const [allVideoArray, setAllVideoArray] = useState(VideosArray);
  
    function handleAddVideo(title, link, rating) {
        const newVideo = {
            title,
            link,
            rating,
            id: window.self.crypto.randomUUID()
        }

        setAllVideoArray([...allVideoArray, newVideo])

        console.log(newVideo)
   
    }

return(
<div className="video-container">
<VideosForm onAddVideo = {handleAddVideo} />
{VideosArray.map(showVideos)}
</div>
)
}

export default Videos;