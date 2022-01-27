import React, { useState } from 'react';
import Video from '../src/Video';

const AddVideo = (props) => {
  const [updatedVideoData, setUpdatedVideoData] = useState(props.videoData);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [hideOnCancel, setCancel] = useState([]);
  const [showOnAdd,setShow] = useState([]);


  const addVideo = () => {
    setUpdatedVideoData(updatedVideoData.concat({title, url}));
    setTitle("");
    setUrl("");
  }


  function handleTitleInput(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleUrlInput(e) {
    e.preventDefault();
    setUrl(e.target.value);
  }

  const cancelInputFields = () => {
    setCancel(hideOnCancel.concat("hideOnCancel"))
  }

  return (
    <div>
      <h4 class = {showOnAdd}>Add video</h4>
      <div class = {hideOnCancel}>
        <label htmlFor="addTitle">
          {' '}
          Title
          <input
            type="text"
            onChange={handleTitleInput}
            value={title}
            required
          />
        </label>
        <br />
        <label htmlFor="addUrl">
          {' '}
          URL
          <input type="url" onChange={handleUrlInput} value={url} required />
        </label>
        <br />
        <button onClick={addVideo}>Add</button>
        <button onClick={cancelInputFields}>Cancel</button>
      </div>
      <Video videoData={updatedVideoData} />
    </div>
  );
};

export default AddVideo;
