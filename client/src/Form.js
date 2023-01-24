import React, {useState} from "react";
import "./App.css";

const Form = ({setVideos}) =>{
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [rating, setRating] = useState(0);

    const submitForm = (e) => {
      e.preventDefault();
      let newVideo = {
        id: Date.now(),
        title: title,
        url: url,
        rating: rating
      }
      if(newVideo.title==="") {
        alert("Set Valid title")
      }
      if(newVideo.url===""){
        alert("Set valid url")
      } 
           
     else setVideos(current => current.concat(newVideo))      
    }
    return (
      <div>
        <form className="Form">
          <span>Add video</span>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            URL
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
          <label>
            Rating
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <button>Cancel</button>
          <button onClick={submitForm}>Add</button>
        </form>
      </div>
    );
}

export default Form;