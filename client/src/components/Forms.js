import React, { useState } from "react";

import "./compStyle.css";

export const Forms = ({ updateData }) => {
  const [addVideo, setAddVideo] = useState(true);
  const [url,setUrl] = useState();
  const [title,setTitle] = useState();

  const showNewSection = () => setAddVideo(true);
  const hideNewSection = (e) => {
    e.preventDefault();
    setAddVideo(false);
  };
  const handleSubmit = (e) => {
    console.log({title,url})
    e.preventDefault()
    if(!title || !url){
      return false
    }
    let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (!url.match(p)) {
      return alert("Not a valid YouTube url");
    } 
    console.log({title,url})
    const baseurl = "https://grizzly-shining-caravan.glitch.me";
    fetch(`${baseurl}/videos`,{
      method :"POST",
      body : JSON.stringify({title,url}),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then((data) => {updateData(data)})
    .catch(console.error)
  }
  // const validateForm = (e) => {
  //   e.preventDefault();
  //   console.log("i am working")
  //   let newUrl = document.getElementById("enterurl").value;
    
  // };
  return (
    <div className="m-5">
      <p className="text-primary cursoring" onClick={showNewSection}>
        Add Video
      </p>
      <div className={addVideo ? "d-block" : "d-none"}>
        <form>
          <div className="row mb-3">
            <label htmlFor="title" className="col-sm-1 col-form-label">
              Title
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                name="title"
                id="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="enterurl" className="col-sm-1 col-form-label">
              URL
            </label>
            <div className="col-sm-3">
              <input
                type="url"
                className="form-control"
                name="url"
                id="enterurl"
                placeholder="Enter URL"
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="col-auto">
            <button
              onClick={hideNewSection}
              type="button"
              className="btn btn-primary"
            >
              Clear
            </button>
            <button onClick={handleSubmit} className="btn btn-primary ml-3">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
