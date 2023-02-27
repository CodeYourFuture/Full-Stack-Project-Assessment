import React, { useState } from "react";

export default function AddVideos({ videodata, setVideoData }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(title);
    // console.log(url);
    const newVideoObject = {
      title: title,
      url: url,
    };
    setVideoData((prev) => prev.concat(newVideoObject));

    fetch("http://localhost:5000/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideoObject),
    })
      //  .then((response) => console.log(response))

      // console.log(setVideoData)
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
  
  return (
    <div>
      <section>
          <form onSubmit={handleSubmit}>
            <div className=" from group form">
              <label htmlFor="Title">Title</label>
              <input
                required
                type="text"
                value={title}
                name="title"
                className="form-control"
                id="VideoTitle"
                placeholder="Enter Title here"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className=" from group form">
              <label htmlFor="url">URL</label>
              <input
                required
                type="text"
                value={url}
                name="url"
                className="form-control"
                id="url"
                placeholder="Enter Youtube URL"
                onChange={(event) => setUrl(event.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        

        
      </section>
    </div>
  );
}
