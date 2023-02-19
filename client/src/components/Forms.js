import React, { useState } from "react";
import "./compStyle.css";

export const Forms = ({ callback }) => {
  const [addVideo, setAddVideo] = useState(true);

  const showNewSection = () => setAddVideo(true);
  const hideNewSection = (e) => {
    e.preventDefault();
    setAddVideo(false);
  };

  const validateInput = (e) => {
    e.preventDefault();
    
    let newUrl = document.getElementById("enterurl").value;
    // let newTitle = document.getElementById("title").value

    let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (newUrl.match(p)) {
      // let addNewVideo = {
      //   id : Math.random()*10000,
      //   url : newUrl,
      //   title :newTitle,
      // }
      // callback(addNewVideo)
    } else {
      alert("Not a valid youtube url");
      return false;
    }
  };

  const handleForm = (e) => {
    e.preventDefault()
    
   alert("form submitted")
    // let newUrl = document.getElementById("enterurl").value;
    // let newTitle = document.getElementById("title").value
  
      
    //   let newMessage={
    //     'id':Math.random()*10000,
    //     'url':newUrl,
    //     'title':newTitle,
    
    //   }
    //    fetch("https://grizzly-shining-caravan.glitch.me/videos", {
    //     method : "POST",
    //     body : newMessage
    //    }).then(res => res.json()).then(data => console.log("asdasdasdasdas"))
       
    
  };
  return (
      <div className="m-5">
        <p className="text-primary cursoring" onClick={showNewSection}>
          Add Video
        </p>
        <div className={addVideo ? "d-block" : "d-none"}>
        <form onSubmit={handleForm}>
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
              />
            </div>
          </div>
          <div className="col-auto">
            <button onClick={hideNewSection} type="button" className="btn btn-primary">
              Clear
            </button>
            <input
              onClick={validateInput}
              value="Add"
              type="submit"
              className="btn btn-primary ml-3"
            />
          </div>
          </form>
        </div>
        
      </div>
  );
};
