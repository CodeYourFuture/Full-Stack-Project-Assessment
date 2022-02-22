import React, { useState} from 'react';

import AscDescBtn from './AscDescBtn';
import Video from '../src/Video';

const AddVideo = (props) => {
 const [updatedVideoData, setUpdatedVideoData] = useState(props.videoData);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [hideOnCancel, setCancel] = useState([]);
 // const [recordDate, setDate] = useState(new Date().toLocaleDateString('en-GB'));
 
  
  
  const addVideo = () => {
    //setUpdatedVideoData(updatedVideoData.concat({title, url}));
    // setDate();
  
   const postBody = {
     title: title,
     url: url
   };
   fetch('http://127.0.0.1:5002/post', {
     method: 'post',
     body: JSON.stringify(postBody),
     headers: { 'Content-Type': 'application/json' },
   })
     .then((res) => {
       if (res.ok) {
         return res.json();
       }
     })
     .then((data) => setUpdatedVideoData(data));
 
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
      <AscDescBtn videoData={updatedVideoData} />
      <Video videoData={updatedVideoData} />
    </div>
  );
};

export default AddVideo;
