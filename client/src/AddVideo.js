import React from "react";
import { useState } from "react";

  



 
function AddVideo(props){
    const[title, setTitle] =useState("");
    const [url, setUrl] = useState("");


   

    return (
      <div className="add-video">
        <p>Add Video</p>
        <form action="" method="submit">
          <label for="title" name="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
          <label for="url" name="url">
            URL
          </label>
          <input
            id="url"
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          ></input>
          <button id="add-video" type="button" onClick={()=> props.addNewVideo(title, url)}>
            {" "}
            Add Video
          </button>
        </form>
      </div>
    );
    }

export default AddVideo;