// version5
import React from "react";
import axios from "axios";
import "./App.css";

const VideoComponent = ({ video, onUpVote, onDownVote, onRemove }) => {
  const handleDelete = async () => {
    try {
      // await axios.delete(`/videos/${video.id}`);
      await axios.delete(
        `https://back-end-full-stack-project-assessment.onrender.com/videos/${video.id}`
      );
      onRemove(video.id);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="video-component">
      <h3>{video.title}</h3>
      <iframe
        title={video.title}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <p>Rating: {video.rating}</p>
      <button onClick={() => onUpVote(video.id)}>Up Vote</button>
      <button onClick={() => onDownVote(video.id)}>Down Vote</button>
      <button onClick={handleDelete}>Remove</button> {/* Use handleDelete */}
    </div>
  );
};

export default VideoComponent;

// version4
// import React from "react";

// const VideoComponent = ({ video, onUpVote, onDownVote, onRemove }) => {
//   const handleDelete = () => {
//     onRemove(video.id);
//   };

//   return (
//     <div className="video-component">
//       <h3>{video.title}</h3>
//       {/* <iframe
//         title={video.title}
//         width="560"
//         height="315"
//         src={video.url}
//         frameBorder="0"
//         allowFullScreen
//       /> */}

//       <iframe
//         title={video.title}
//         width="560"
//         height="315"
//         src={video.url}
//         frameborder="0"
//         allowFullScreen
//         // allow="autoplay; encrypted-media"
//       />
//       <p>Rating: {video.rating}</p>
//       <button onClick={() => onUpVote(video.id)}>Up Vote</button>
//       <button onClick={() => onDownVote(video.id)}>Down Vote</button>
//       <button onClick={handleDelete}>Remove</button>
//     </div>
//   );
// };

// export default VideoComponent;

// version3
// import React from "react";
// import axios from "axios"; // Import axios

// const VideoComponent = ({ video, onUpVote, onDownVote, onRemove }) => {
//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/videos/${video.id}`); // Make a DELETE request to remove a video
//       onRemove(video.id);
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   return (
//     <div className="video-component">
//       {/* ... */}
//       <button onClick={() => onUpVote(video.id)}>Up Vote</button>
//       <button onClick={() => onDownVote(video.id)}>Down Vote</button>
//       <button onClick={handleDelete}>Remove</button> {/* Use handleDelete */}
//     </div>
//   );
// };

// export default VideoComponent;

// version2
// import React from "react";

// function VideoComponent({ video, onUpVote, onDownVote, onRemove }) {
//   return (
//     <div className="video-component">
//       <h2>{video.title}</h2>
//       <iframe
//         title={video.title}
//         width="560"
//         height="315"
//         src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//       <p>Votes: {video.rating}</p>
//       <p>Uploaded: {new Date(video.timestamp).toLocaleString()}</p>
//       <button onClick={() => onUpVote(video.id)}>Up Vote</button>
//       <button onClick={() => onDownVote(video.id)}>Down Vote</button>
//       <button onClick={() => onRemove(video.id)}>Remove</button>
//     </div>
//   );
// }

// export default VideoComponent;

// version1
// import React from "react";

// function VideoComponent({ video, onUpVote, onDownVote, onRemove }) {
//   return (
//     <div className="video-component">
//       <h2>{video.title}</h2>
//       <iframe
//         title={video.title}
//         width="560"
//         height="315"
//         src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//       <p>Votes: {video.rating}</p>
//       <button onClick={() => onUpVote(video.id)}>Up Vote</button>
//       <button onClick={() => onDownVote(video.id)}>Down Vote</button>
//       <button onClick={() => onRemove(video.id)}>Remove</button>
//     </div>
//   );
// }

// export default VideoComponent;
