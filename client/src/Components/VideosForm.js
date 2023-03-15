import React, { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import EmbedVideo from "./EmbedVideo"
import axios from "axios";

function VideosForm(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [link, setLink] = useState("");
  // const [stateRating, setStateRating] = useState("");

//Get method
  useEffect(() => {
    axios.get("http://localhost:3001/get/videos").then((response) => {
      setVideoList(response.data.rows);
    });
  }, []);

  //Creating new object to be added to the array
  function handleSubmit(e) {
    console.log(title)
    console.log(url)
    if (title && url) {
      axios.post("http://localhost:3001/post/videos", {
        title: title,
        url: url,
        rating: rating,
        
      });
    } else {
      alert("Please Enter Video Title and Video Link")
    }

    e.preventDefault();
//To add new value to an array
    setVideoList([
      ...videoList,
      { newTitle: title, newUrl: url, newRating: rating },
    ]);
  }

  //Delete function
  function handleDelete(vid) {
    axios.delete(`http://localhost:3001/delete/videos/${vid}`);
  }

  return (
    <div className="videos">
    <div className="form">
    <p>Add more videos:</p>
      <input className="video-input"
        type="text"
        placeholder="Enter Video Title"
        id="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input className="video-input"
        type="url"
        placeholder="Enter Video Link"
        id="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input className="video-input"
        type="number"
        placeholder="Enter Rating"
        id="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button className="video-input" onClick={handleSubmit}>Add Video</button>
</div>


      {videoList.map((video, i) => (

        <div className="flex-container" key={i}>
         <p>{video.title}</p> 
         <EmbedVideo video={video} />

         <h3> Rating: {video.rating}</h3> 

          <LikeButton key={video.id} id={video.id} /> 

          <button
            onClick={() => {
              handleDelete(video.id);
            }}
          >
            Delete
          </button> 
        </div>
      ))}
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
