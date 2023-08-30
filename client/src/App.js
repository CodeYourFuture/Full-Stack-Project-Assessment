import React, { useState } from 'react';
import './App.css';
import VideoDisplay from './VideoDisplay';
import AddNewVideo from './AddNewVideo';
import VideosData from './VideosData';


function App() {
const [videos, setVideos] = useState(VideosData.sort((a, b)=> b.rating - a.rating));
// const [ascending, setAscending] = useState(false);
// videosData.sort((a,b) => b.rating - a.rating)




// const fetchVideos = useCallback(async () => {
// try {
// const response = await axios.get(`http://127.0.0.1:8000/videos?order=${ascending ? 'asc' : 'desc'}`);
// // console.log('videos', response)
// setVideos(response.data);
// } catch (error) {
// console.error('Error fetching videos:', error);
// }


// }, [ascending]);


// useEffect(() => {
// fetchVideos();
// }, [fetchVideos]);




// const addVideoButton = (NewVideo) => {
// setVideos([...videos, NewVideo]);
// }


const handleUpVote = (videoId) => {
const updatedVideos = [...videos].map((video) => {
if(video.id === videoId) {
return {...video, rating: video.rating + 1 };
} else {
return video;
}
});


setVideos(updatedVideos)




};


const handleDownVote = (videoId) => {
const updatedVideos = [...videos].map((video) => {
if (video.id === videoId) {
return {...video, rating: video.rating -1 };
} else {
return video;
}
});


setVideos(updatedVideos);
};


const handleRemoveVideo = (videoId) => {
const updatedVideos = videos.filter((video) => video.id !== videoId);
setVideos(updatedVideos);
};


const handleAddVideo = (newVideo) => {
if (newVideo.title.trim() === '' || !isValidYouTubeUrl(newVideo.url)) {
return;
}


const now = new Date();
newVideo.uploadedDate = now.toISOString();
setVideos([...videos, newVideo]);
};


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
};
// const handleChangeOrder = () => {
// setAscending(prevAscending => !prevAscending)
// };


return (
<div className="App">
<AddNewVideo addVideoButton={handleAddVideo} />
<div>
<h2>Add a New Video</h2>
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
);
};


export default App;
