// // import React, { useState } from "react";

// // const AddVideoForm = ({ handleAddVideo }) => {
// //   const [title, setTitle] = useState("");
// //   const [url, setUrl] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     handleAddVideo(title, url);
// //     setTitle("");
// //     setUrl("");
// //   };

// //   return (
// //     <div className="add-video-form">
// //       <h2>Add New Video</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div className="form-group">
// //           <label>Title:</label>
// //           <input
// //             type="text"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>URL:</label>
// //           <input
// //             type="text"
// //             value={url}
// //             onChange={(e) => setUrl(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <button type="submit">Add Video</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddVideoForm;
// import React, { useState } from "react";

// const AddVideoForm = ({ handleAddVideo }) => {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleAddVideo(title, url);
//     setTitle("");
//     setUrl("");
//   };

//   return (
//     <div>
//       <h2>Add Video</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Title:</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <label>URL:</label>
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

// export default AddVideoForm;
// src/components/AddVideoForm.js
import React, { useState } from "react";

const AddVideoForm = ({ handleAddVideo }) => {
  const [title, setTitle] = useState("");
  const [fullurl, setFullUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = fullurl.split("=")
    
    handleAddVideo(title, url[1]);
    setTitle("");
    setFullUrl("");
  };

  return (
    <div>
      <h2>Add Video</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>URL:</label>
        <input
          type="text"
          value={fullurl}
          onChange={(e) => setFullUrl(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddVideoForm;
