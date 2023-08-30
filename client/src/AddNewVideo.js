
import React, { useState } from "react";
import './App.css';
import axios from 'axios';


const AddNewVideo = ({ addVideoButton }) => {
const [title, setTitle] = useState('');
const [url, setUrl] = useState('');
// const [error, setError] = useState('');


// const correctYoutubeUrl = (url) => {
// try {
// const youtubeUrl = new URL(url);
// return (
// youtubeUrl.hostname === 'www.youtube.com' ||
// youtubeUrl.hostname === 'youtube.com'
// );
// } catch (error) {
// return false;
// }
// };




// const submitButton = async (e) => {
// e.preventDefault();


// if (title.trim() === '') {
// setError('Title cannot be empty.');
// return;
// }


// if (!correctYoutubeUrl(url)) {
// setError('Invalid youTube URL.');
// return;
// }


// setError('');
const handleAddVideo = async () => {
try {
const response = await axios.post('http://localhost:8000/videos', {
title: title,
url: url,
});


const newVideo = {
id: response.data.id,
title: title,
url: url,
rating: 0,
uploadedDate: new Date().toISOString()
}


// if (response.status === 201) {
// if successful, fetch updated videos and clear input fields
// fetchVideos();
// setTitle('');
// setUrl('');
// }
// } catch (error) {
// console.error('Error adding video:', error);
// }
// };
addVideoButton(newVideo);


setTitle('');
setUrl('');
} catch (error) {
console.error('Error adding video:', error);
}
};


return (
<div className="add-video-form">
<h2>Add a New Video</h2>
<form>
<label>Title:</label>
<input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
<label>URL:</label>
<input type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
<button type="button" onClick={handleAddVideo}>
Add Video
</button>
</form>
</div>
);
};
export default AddNewVideo;