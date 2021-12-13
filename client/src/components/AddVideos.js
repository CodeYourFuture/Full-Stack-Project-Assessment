import React, { useState } from "react";

const AddVideos = (props) => {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

        const handleSubmit = e => {
          e.preventDefault();
          let newVideo = {
            id: Math.floor(Math.random() * 1000),
            title: title,
            url: url,
            rating: 0,
          };
        
          props.setVideo(props.video.concat(newVideo));
          setTitle("");
          setUrl("");
        }
        
        return (
          <div className="add-video">
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">
                <p>Video Title</p>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                ></input>
              </label>
              <label htmlFor="url">
                <p>Video Url</p>
                <input
                  type="url"
                  name="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                ></input>
              </label>
              <div>
                <button type="submit" className="add-btn">
                  Add Video
                </button>
                <button onClick={() => "title" || "url"} className="cancel-btn">
                    Cancel
                </button>
              </div>
            </form>
          </div>
        );
}

export default AddVideos;