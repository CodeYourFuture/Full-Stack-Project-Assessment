import React, { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
// import EmbedVideo from "./EmbedVideo"
import axios from "axios";

function VideosForm(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState("");
  const [videoList, setVideoList] = useState([]);
  // const [link, setLink] = useState("");
  // const [stateRating, setStateRating] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((response) => {
      setVideoList(response.data.rows);
    });
  }, []);

  function handleSubmit(e) {
    console.log(title)
    axios.post("http://localhost:3001/api/insert", {
      title: title,
      url: url,
      rating: rating,
      
    });

    setVideoList([
      ...videoList,
      { newTitle: title, newUrl: url, newRating: rating },
    ]);
    e.preventDefault();
  }

  function handleDelete(vid) {
    axios.delete(`http://localhost:3001/api/delete/${vid}`);
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


      {videoList.map((video) => (

        <div className="flex-container">
         <p>{video.title}</p> 

         <iframe
        src={video.url.replace("watch?v=", "embed/")}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="560"
        height="315"
      ></iframe>

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
