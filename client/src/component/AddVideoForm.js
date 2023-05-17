import React, { useState } from "react";

const AddVideoForm = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      id: Date.now().toString(),
      title,
      url,
      rating: 0,
    };
    onAddVideo(newVideo);
    setTitle("");
    setUrl("");
  };

//   return (
//     <form onSubmit={handleSubmit} className="add-video-form">
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="URL"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//       />
//       <button type="submit">Add Video</button>
//     </form>
//   );
 return (
   <form className="add-video-form" onSubmit={handleSubmit}>
     <h2>Add Video</h2>
     <div className="form-group">
       <label htmlFor="title">Title</label>
       <input
         type="text"
         id="title"
         value={title}
         onChange={(e) => setTitle(e.target.value)}
       />
     </div>
     <div className="form-group">
       <label htmlFor="url">URL</label>
       <input
         type="text"
         id="url"
         value={url}
         onChange={(e) => setUrl(e.target.value)}
       />
     </div>
     <button type="submit">Add</button>
   </form>
 );
};

export default AddVideoForm;
