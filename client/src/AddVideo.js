import React, { useState } from "react";




function AddVideo({ videoData }) {
  const [showValid, Setvalid] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [allData, setAllData] = useState(videoData);

  const handleShowValid = () => {
    Setvalid(!showValid);
  };
  const handleAddVideo = (event) => {
    event.preventDefault();

    const newVideoData = {
      id: Math.floor(Math.random() * 1000),
      title,
      url,
    };

    setAllData([...allData, newVideoData]);
    handleShowValid();
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      {showValid ? (
        <form onSubmit={handleAddVideo}>
          <div>
            <label htmlFor="title">Tile:</label>
            <input
              type="text"
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="url">Url:</label>
            <input
              type="text"
              id="url"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              required
            ></input>
          </div>
          <div>
            <button type="button" onClick={handleShowValid}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </div>
        </form>
      ) : (
        <button type="button" onClick={handleShowValid}>
          Add Video
        </button>
      )}
    </div>
  );
}

export default AddVideo;