import React, {useState} from "react";
import LikeButton from "./LikeButton";
import VideosArray from "./VideosArray";
import VideosForm from "./VideosForm";

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
        console.log(allVideoArray)

        console.log(newVideo)
   
    }

    function handleDelete(id){
        setAllVideoArray(allVideoArray.filter(video => video.id !==id))
        console.log("I have delete " + id)
    }

return(
<div className="video-container">
<VideosForm onAddVideo = {handleAddVideo} />
{VideosArray.map(video => (
    <LikeButton
    onDelete = {handleDelete}
    title = {video.title}
     link = {video.url}   
     rating = {video.rating}
    />
))}
</div>
)
}

export default Videos;