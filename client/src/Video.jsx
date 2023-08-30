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

// export default Video;

import React from 'react';

function Video({ video, onRemove }) {
  return (
    <div className="Video-container">
      <h2>{video.title}</h2>
      <div className="video-embed">
      <iframe
  width="100%"
  height="315"
  // src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}`}
  title={video.title}
  allowFullScreen
/>

      </div>
      <p>Rating: {video.rating}</p>
      <button className="btn" onClick={() => onRemove(video.id)}>
        Remove Video
      </button>
    </div>
  );
}

export default Video;
