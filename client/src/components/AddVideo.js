import React, { useState } from "react";

const AddVideo = ({ sortedVideoData, setVideoData }) => {
  const [addingVideo, setAddingVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleVideoAdder = (e) => {
    e.preventDefault();
    const videoId = Math.floor(Math.random() * 1000000);
    const rating = Math.floor(Math.random() * 10000);

    const newVideoData = {
      id: videoId,
      title: title,
      url: url,
      rating: rating,
      timeSent: new Date(),
    };

    // setVideoData(sortedVideoData.concat(newVideoData));
    newVideoData.title && newVideoData.url
      ? setVideoData(sortedVideoData.concat(newVideoData))
      : !newVideoData.title
      ? alert("Please fill the title section")
      : !newVideoData.url
      ? alert("Please fill the url section")
      : alert("error");
  };
  return (
    <div>
      <h4 onClick={() => setAddingVideo(!addingVideo)}>Add Video</h4>
      {addingVideo && (
        <form>
          <div>
            <label>
              Title
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                name="title"
                type="text"
                required
              />
            </label>
          </div>
          <div>
            <label>
              URL
              <input
                onChange={(e) => setUrl(e.target.value)}
                className="input"
                name="url"
                type="text"
                required
              />
            </label>
          </div>
          <div>
            <button
              onClick={() => setAddingVideo(!addingVideo)}
              className="btn btn-warning input"
              type="cancel"
            >
              Cancel
            </button>

            <button
              onClick={handleVideoAdder}
              className="btn btn-danger input"
              type="submit"
            >
              ADD
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddVideo;
