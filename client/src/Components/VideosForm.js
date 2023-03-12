import React, { useState, useEffect} from "react";
import LikeButton from "./LikeButton";
import axios from "axios";

function VideosForm() {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [rating, setRating] = useState("");
    const [videoList, setVideoList] = useState([]);
    // const [stateRating, setStateRating] = useState("");

    useEffect(() => {
      axios.get("http://localhost:3001/api/get").then((response) => {
setVideoList(response.data)
      })
    },[]);
  
    function handleSubmit() {
 axios.post("http://localhost:3001/api/insert", {
  newTitle:title, newUrl:url, newRating:rating
}).then(() => {
  alert("Video Successfully Added");
})
    };

    return (
      <div>
      
        <input
          type="text"
          placeholder="Enter Video Title"
          id="text"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="url"
          placeholder="Enter Video Link"
          id="text"
        onChange={(e) => setUrl(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Video Link"
          id="text"
        onChange={(e) => setRating(e.target.value)}
        />

        <button onClick={handleSubmit}>Add Video</button>

        {videoList.map(video => {
          return(
           <div>
           title = {video.title}
            url = {video.url}
            rating = {video.rating}
            key = {video.id}
            
            </div>
            
          )
        })}
</div>
    );
  }


//   return (
//     <div className="container">
//       <div className="heading">
//         <h1>Add Video</h1>
//       </div>
//       <div className="form">
//         <input onChange={handleChange} type="text" value={inputText} />
//         <button onClick={addItem}>
//           <span>Add</span>
//         </button>
//       </div>
//       <div>
  
//       {items.map(todoItem => (
// <iframe 
//   src={todoItem} 
// title="YouTube video player" 
// frameborder="0" 
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
// allowfullscreen
// width="560" height="315">
// </iframe>
// ))}      
//       </div>
//     </div>
//   );
// }

export default VideosForm;






