import React, { useState } from "react";
import './App.css';
// import axios from 'axios';


const AddNewVideo = ({ addVideoButton }) => {
const [title, setTitle] = useState('');
const [url, setUrl] = useState('');
// const [error, setError] = useState('');





const handleAddVideo = () => {
const newVideo = {
title: title,
url: url,
rating: 0,
};
addVideoButton(newVideo);
setTitle('');
setUrl('');
}


return (
<div className="add-video-form">
<h2>Add a New Video</h2>
<form>
<label>Title:</label>
<input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
<label>URL:</label>
<input ty
pe='text' value={url} onChange={(e) => setUrl(e.target.value)} />
<button type="button" onClick={handleAddVideo}>
Add Video
</button>
</form>
</div>
);
};
export default AddNewVideo;
