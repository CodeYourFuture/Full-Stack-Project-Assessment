import React, { useState } from 'react';
import Video from '../src/Video';

const AddVideo = (props) => {
  const [updatedVideoData, setUpdatedVideoData] = useState(props.videoData);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [hideOnCancel, setCancel] = useState([]);
  const [recordDate, setDate] = useState(new Date().toLocaleDateString('en-GB'));
  
  const addVideo = () => {
    setUpdatedVideoData(updatedVideoData.concat({title, url}));
    setDate();
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

  const addVideoFields = () => {
    setCancel("");
  }

  return (
    <div>
      <ul>
        <li onClick={addVideoFields}>Add video</li>
      </ul>
      <div id="addFormStyle" className={hideOnCancel}>
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
        <button className="addBtn bg-success text-white" onClick={addVideo}>
          Add
        </button>
        <button
          className="cancelBtn bg-warning text-white"
          onClick={cancelInputFields}
        >
          Cancel
        </button>
      </div>
      <Video videoData={updatedVideoData} date = {recordDate}/>
    </div>
  );
};

export default AddVideo;
