import React, { useState } from 'react';

const AddVideo = ({videoData, setVideoData}) => {
    const [showAddVideo, setShowAddVideo] = useState(false);
    const [titleValue, setTitleValue] = useState();
    const [urlValue, setUrlValue] = useState();
    
    function handleAddVideo(e) {
        e.preventDefault();

        const newVideoData = {
          title: titleValue,
          url: urlValue
        };

        console.log(newVideoData);

        const matchYoutubeUrl = (url) => {
          const path =
            /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
          if (url.match(path)) {
            return url.match(path)[1];
          }
          return false;
        };

      
      if (newVideoData.title && matchYoutubeUrl(newVideoData.url)) {
        fetch("http://localhost:5000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVideoData),
        })
          .then((response) => response.json())
          .then((body) => {
            console.log("Success:", body);
            setTitleValue("");
            setUrlValue("");
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else if (!newVideoData.title) {
        alert("Please add a title");
      } else if (!matchYoutubeUrl(newVideoData.url)) {
        alert("Please add a valid url");
      }        
    }

 
    return (
      <div className="Add-video m-4 col-6 col-md-2">
        <h5 onClick={() => setShowAddVideo(!showAddVideo)}>Add Video</h5>
        {showAddVideo && (
          <form className="mx-4" onSubmit={handleAddVideo}>
            <div className="d-flex my-2">
              <label htmlFor="title" className="form-label mx-2">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setTitleValue(e.target.value)}
                id="title"
              />
            </div>
            <div className="d-flex my-2">
              <label htmlFor="url" className="form-label mx-2">
                URL
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUrlValue(e.target.value)}
                id="url"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                onClick={() => setShowAddVideo(!showAddVideo)}
                className="btn btn-warning mx-1"
              >
                CANCEL
              </button>
              <button                
                type="submit"
                aria-label="Submit"
                className="btn btn-danger mx-1"
              >
                ADD
              </button>
            </div>
          </form>
        )}
      </div>
    );
}

export default AddVideo;