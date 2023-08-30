import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoDisplay from './VideoDisplay';
import AddNewVideo from './AddNewVideo';
import VideoDetails from './VideoDetails';
import VideosData from './VideosData';
import axios from 'axios';


function App() {
const [videos, setVideos] = useState(VideosData);
const [order, setOrder] = useState('asc');
// const [ascending, setAscending] = useState(false);
// videosData.sort((a,b) => b.rating - a.rating)






const fetchVideos= useCallback(async () => {
try {
const response = await fetch(`http://127.0.0.1:8000/videos?order=${order}`);
if (response.ok) {
const data = await response.json();
setVideos(data);
} else {
console.log('Error fetching videos:', response.statusText);
}
} catch (error) {
console.log('Error fetching videos:', error);
}
}, [order]);




useEffect(() => {
fetchVideos();
}, [fetchVideos]);


const fetchVideosById= async (videoId) => {
try {
const response = await axios.get(`http://localhost:8000/videos/${videoId}`);
return response.data;
} catch (error) {
console.error('Error fetching videos:', error);
return null;
}


};








// const addVideoButton = (NewVideo) => {
// setVideos([...videos, NewVideo]);
// }


const handleUpVote = (videoId) => {
const updatedVideos = videos.map((video) => {
if(video.id === videoId) {
return {...video, rating: video.rating + 1 };
} else {
return video;
}
});


setVideos(updatedVideos)
};


const handleDownVote = (videoId) => {
const updatedVideos = videos.map((video) => {
if (video.id === videoId) {
return {...video, rating: video.rating -1 };
} else {
return video;
}
});


setVideos(updatedVideos);
};


const handleRemoveVideo = async (videoId) => {
try {
const response = await fetch(`http://localhost:8000/videos/${videoId}`,{
method: 'Delete',
});
if (response.ok) {
const updatedVideos = videos.filter((video) => video.id !== videoId);
setVideos(updatedVideos);
} else {
console.log('Error deleting video:', response.statusText);
}


} catch (error) {
console.error('Error deleting video:', error)
}
};


const handleAddVideo = async (newVideo) => {
if (newVideo.title.trim() === '' || !isValidYouTubeUrl(newVideo.url)) {
return;
}


try {
const response = await axios.post('http://localhost:8000/', {
title: newVideo.title,
url: newVideo.url,
});


const addedVideoId = response.data.id;
const addedVideo = await fetchVideosById(addedVideoId);


if (addedVideo) {
const now = new Date();
addedVideo.uploadedDate = now.toISOString();
setVideos([...videos, addedVideo]);
}
} catch (error) {
console.error('Error adding video:', error);
}
}


const isValidYouTubeUrl = (url) => {
try {
const youtubeUrl = new URL(url);
return (
youtubeUrl.hostname === 'www.youtube.com' ||
youtubeUrl.hostname === 'youtube.com'
);
} catch (error) {
return false;
}
}
const handleChangeOrder = () => {
setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
};


return(
<Router>
<div className="App">
<AddNewVideo addVideoButton={handleAddVideo} />
<div>
<button onClick={handleChangeOrder}>
Toggle Order: {order === 'asc' ? 'Ascending' : 'Descending'}
</button>
</div>



<div className='video-list'>
{videos.map((video) => (
<div key={video.id} className='video-card'>
<VideoDisplay
video={video}
handleUpVote={handleUpVote}
handleDownVote={handleDownVote}
handleRemoveVideo={handleRemoveVideo}
/>
</div>
))}
</div>
</div>
<Routes>
{/* <Route path="/" element={<VideoDisplay videos={videos} />} /> */}
<Route path="/videos/:id" component={VideoDetails} />
</Routes>
</Router>
)
}


export default App;
