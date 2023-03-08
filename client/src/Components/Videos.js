import React, {useState} from "react";
import LikeButton from "./LikeButton";
import VideosArray from "./VideosArray";
import VideosForm from "./VideosForm";

function Videos() {
    const [allVideoArray, setAllVideoArray] = useState(VideosArray);
  
    function handleAddVideo(title, link) {
        const newVideo = {
            title,
            link,
            rating: Math.floor(Math.random() *10000),
            id: window.self.crypto.randomUUID()
        }

        allVideoArray.push(newVideo)
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
     key = {video.id}
    />
))}
</div>
)
}

export default Videos;