import React, { useState } from "react";

function NewVideo(props) {
 

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  // const [newVideo, SetNewVideo] = useState({ title: "", url: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && url) {
  
      let updatedValue = {
        title: title,
        url: url,
        id: Date.now(),
        rating: 0,
      };
     
      props.onAddNewVideo(updatedValue)
      setTitle("")
      setUrl("")
    }
  };

  return (
    <div className="new-video">
      <p>Add new video to your list</p>
      <form className="form">
        <label>
          Title:{" "}
          <input
            type="text"
            placeholder="enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>{" "}
        <br></br>
        <label>
          URL:{" "}
          <input
            type="url"
            placeholder="enter url address"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <br></br>
        <button type="submit" onClick={handleSubmit}>
          Submit Video{" "}
        </button>
      </form>
    </div>
  );
}
export default NewVideo;
