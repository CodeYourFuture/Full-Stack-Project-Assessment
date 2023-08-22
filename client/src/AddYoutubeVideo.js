// version3
import React, { useState } from "react";
// import axios from "axios";
import "./AddYoutube.css";

function AddYoutubeVideo({ onAddVideo }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const isYouTubeUrlValid = (url) => {
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
    return youtubeUrlPattern.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !url) {
      alert("Please fill in both fields.");
      return;
    }

    if (!isYouTubeUrlValid(url)) {
      alert("Please enter a valid YouTube URL.");
      return;
    }

    const newVideo = {
      id: Date.now(),
      title: title,
      url: url,
      rating: 0,
      timestamp: new Date().toISOString(),
    };

    onAddVideo(newVideo);

    // Clear the form
    setTitle("");
    setUrl("");
  };

  return (
    <div className="add-video-form">
      <h2>Add a Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
}

export default AddYoutubeVideo;

//version2
// import React, { useState } from "react";

// function AddYoutubeVideo({ onAddVideo }) {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");

//   const isYouTubeUrlValid = (url) => {
//     // Regular expression to match valid YouTube URLs
//     const youtubeUrlPattern =
//       /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
//     return youtubeUrlPattern.test(url);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!title || !url) {
//       alert("Please fill in both fields.");
//       return;
//     }

//     if (!isYouTubeUrlValid(url)) {
//       alert("Please enter a valid YouTube URL.");
//       return;
//     }

//     const newVideo = {
//       id: Date.now(),
//       title: title,
//       url: url,
//       rating: 0,
//     };

//     onAddVideo(newVideo);

//     // Clear the form
//     setTitle("");
//     setUrl("");
//   };

//   return (
//     <div className="add-video-form">
//       <h2>Add a Video</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>URL:</label>
//           <input
//             type="text"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//         </div>
//         <button type="submit">Add Video</button>
//       </form>
//     </div>
//   );
// }

// export default AddYoutubeVideo;

// version1
// import React, { useState } from "react";

// function AddYoutubeVideo({ onAddVideo }) {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!title || !url) {
//       alert("Please fill in both fields.");
//       return;
//     }

//     const newVideo = {
//       id: Date.now(), // Assign a unique id (using timestamp as an example)
//       title: title,
//       url: url,
//       rating: 0,
//     };

//     onAddVideo(newVideo);

//     // Clear the form
//     setTitle("");
//     setUrl("");
//   };

//   return (
//     <div className="add-video-form">
//       <h2>Add a Video</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>URL:</label>
//           <input
//             type="text"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//         </div>
//         <button type="submit">Add Video</button>
//       </form>
//     </div>
//   );
// }

// export default AddYoutubeVideo;
