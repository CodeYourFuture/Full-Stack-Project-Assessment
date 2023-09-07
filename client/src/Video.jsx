// import React, { useState } from 'react';

// function Video({ video, onRemove }) {
//   const [votes, setVotes] = useState(video.rating);

//   const handleVote = () => {
//     setVotes(prevVotes => prevVotes + 1);
//   };

//   return (
//     <div className="video">
//       <h2>{video.title}</h2>
//       <iframe width="560" height="315" src={video.url} frameBorder="0" allowFullScreen></iframe>
//       <p>Votes: {votes}</p>
//       <button onClick={handleVote}>Vote</button>
//       <button onClick={() => onRemove(video.id)}>Remove</button>
//     </div>
//   );
// }

import React, { useState } from 'react';

function Video({ video, onRemove }) {

  const [rating, setRating] = useState(video.rating); 

  const handleUpVote = () => {
    setRating(rating + 1); 
  };

  const handleDownVote = () => {
    setRating(rating - 1); 
  };

  return (
    <div className="Video-container">
      <h2>{video.title}</h2>
      
      <div className="video-embed">
        {/* <iframe
          width="100%"
          height="315"
          // src={`https://www.youtube.com/embed/${new URL(video.url).searchParams.get('v')}`}
          
          title={video.title}
          allowFullScreen
        /> */}
        <iframe
  width="560"
  height="315"
  src={`https://www.youtube.com/embed/${new URL(video.url).searchParams.get('v')}`}
  title={video.title}
  allowFullScreen
/>

      </div>
      
      <p>Rating: {rating}</p> 
      
      <button className="btn" onClick={() => onRemove(video.id)}>
        Remove Video
      </button>
      
     
      <button className="btn" onClick={handleUpVote}>
        Up Vote
      </button>
      
  
      <button className="btn" onClick={handleDownVote}>
        Down Vote
      </button>
    </div>
  );
}

export default Video;
