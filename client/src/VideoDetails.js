import React, { useState, useEffect } from 'react';
import axios from 'axios';




function VideoDetails(props) {
const [video, setVideo] = useState(null);


useEffect(() => {
const fetchVideoById = async () => {
const videoId = props.match.params.id;




try {
const response = await axios.get(`http://localhost:8000/videos/${videoId}`);
setVideo(response.data);
} catch (error) {
console.error('Error fetching video:', error);
}
};


fetchVideoById();
}, [props.match.params.id]);


return (
<div>
{video ? (
<div>
<h1>{video.title}</h1>
<p>URL: <a href={video.url}>{video.url}</a></p>
<p>Rating: {video.rating}</p>
</div>
) : (
<p>Loading...</p>
)}
</div>
);
}


export default VideoDetails;
