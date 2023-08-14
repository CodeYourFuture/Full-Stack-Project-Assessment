// import React from "react";

// const Video = ({ video, handleVote, handleRemove }) => {
//   const { id, title, url, votes } = video;

//   const handleVoteClick = (increment) => {
//     handleVote(id, increment);
//   };

//   const handleRemoveClick = () => {
//     handleRemove(id);
//   };

//   return (
//     <div className="video">
//       <h3>{title}</h3>
//       <div className="video-player">
//         <iframe
//           title={title}
//           src={url}
//           frameborder="0"
//           allowFullScreen
//         ></iframe>
//       </div>
//       <div className="vote-buttons">
//         <button onClick={() => handleVoteClick(1)}>Up</button>
//         <span>{votes}</span>
//         <button onClick={() => handleVoteClick(-1)}>Down</button>
//         <button onClick={handleRemoveClick}>Remove</button>
//       </div>
//     </div>
//   );
// };

// export default Video;

// src/components/Video.js
import React from "react";

const Video = ({ video, handleVote, handleRemove }) => {
  const { id, title, url, votes } = video;

  const handleVoteClick = (increment) => {
    handleVote(id, increment);
  };

  const handleRemoveClick = () => {
    handleRemove(id);
  };

  return (
    <div className="video">
      <h3>{title}</h3>
      <div className="video-player">
        <iframe
          title={title}
          src={"https://www.youtube.com/embed/"+url }
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="vote-buttons">
        <button onClick={() => handleVoteClick(1)}>Up</button>
        <span>{votes}</span>
        <button onClick={() => handleVoteClick(-1)}>Down</button>
        <button onClick={handleRemoveClick}>Remove</button>
      </div>
    </div>
  );
};

export default Video;
