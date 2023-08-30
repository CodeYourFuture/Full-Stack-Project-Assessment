import React from "react";
import { Link } from 'react-router-dom';




const VideoDisplay = ({ video, handleUpVote, handleDownVote, handleRemoveVideo }) => {
return (
<div className='video-card'>
<h2>{video.title}</h2>
<iframe
width="560"
height="315"
src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}`}


title={video.title}
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen></iframe>
<p>Rating: {video.rating}</p>
<p>Uploaded: {new Date(video.uploadedDate).toLocaleString()}</p>
<Link to={`/videos/${video.id}`}>View Details</Link>
<button onClick={() => handleUpVote(video.id)}>Up Vote</button>
<button onClick={() => handleDownVote(video.id)}>Down Vote</button>
<button onClick={() => handleRemoveVideo(video.id)}>Remove</button>
</div>
);
}


export default VideoDisplay;
