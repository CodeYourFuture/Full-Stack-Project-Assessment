// import React, { useState } from "react";
// import "./AddVideo.css";

// const AddVideo = ({ onAddVideo }) => {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title && url) {
//       onAddVideo({ title, url });
//       setTitle("");
//       setUrl("");
//     }
//   };

//   return (
//     <div className="add-video">
//       <h2 className="add-video-header">Add Video</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="URL"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           required
//         />
//         <button type="submit">Add Video</button>
//       </form>
//     </div>
//   );
// };

// export default AddVideo;

import React, { useState } from "react";
import "./AddVideo.css";

const AddVideo = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && url) {
      // Create a new video object
      const newVideo = {
        title,
        url,
        rating: 0, // You can set the initial rating as needed
      };

      // Send a POST request to the server to save the new video
      fetch("https://full-stack-server-3nzy.onrender.com/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      })
        .then((response) => response.json())
        .then((data) => {
          // Call the parent component's callback to add the new video
          onAddVideo({ ...newVideo, id: data.id }); // Include the generated ID
          setTitle("");
          setUrl("");
        })
        .catch((error) => console.error("Error adding video:", error));
    }
  };

  return (
    <div className="add-video">
      <h2 className="add-video-header">Add Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default AddVideo;

