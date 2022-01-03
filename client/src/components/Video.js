import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

const Video = ({ videos, setVideos, video, index }) => {
  const [vote, setVote] = useState(0);
  const handleVoteIncrement = () => {
    setVote((vote) => vote + 1);
  }
  const handleVoteDecrement = () => {
    const decrementedVote = vote === 0 ? 0 : vote - 1;
    setVote(decrementedVote);
  }
  const urlId = video.url.slice(32);
  const formatTitle = (title) => {
    const length = title.length;
    const firstTwenty = title.slice(0, 25);
    const formattedTitle = length > 25 ? `${firstTwenty}...` : title;
    return formattedTitle;
  }
  const handleDelete = () => {
    const videosExceptDeletedVideo = videos.slice(0, index).concat(videos.slice(index + 1));
    setVideos(videosExceptDeletedVideo);

        fetch(`https://omer-cyf-video-recommendation.herokuapp.com/${video.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => console.log(response));
  }
    return (
      <div className="p-4">
        <h4>{formatTitle(video.title)}</h4>
        <div>
          <h5>Rating: {video.rating}</h5>
        </div>
        <div className='videoVote'>
          <FaThumbsUp onClick={handleVoteIncrement} className='iconVote'/>
          <h4>{vote} {vote > 1 ? `Votes` : `Vote`}</h4>
          <FaThumbsDown onClick={handleVoteDecrement} className='iconVote'/>
        </div>
        <div>
          <iframe
            height="250px"
            className="vid"
            src={`https://www.youtube.com/embed/${urlId}`}
            allowFullScreen
            title={video.title}
          ></iframe>
        </div>
        <div>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
}

export default Video
