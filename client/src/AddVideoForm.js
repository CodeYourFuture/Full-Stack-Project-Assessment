import React, { useState } from "react";

// function AddVideoForm({ onAddVideo, fetchVideos }) {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetch("http://localhost:5000/videos/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: title,
//         url: url,
//       }),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         fetchVideos();
//         setTitle("");
//         setUrl("");
//       })
//       .catch((error) => {
//         console.log("error:", error);
//       });
//     if (!title || !url) return;
//     const newVideo = {
//       id: Math.floor(Math.random() * 1000000),
//       title: title,
//       url: url,
//       rating: 0,
//     };
//     onAddVideo(newVideo);
//     setTitle("");
//     setUrl("");
//   };
//   function handleInputChange(event) {
//     if (event.target.title === "title") {
//       setTitle(event.target.value);
//       console.log(event);
//     } else if (event.target.url === "url") {
//       setUrl(event.target.value);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Title:
//         <input type="text" onChange={handleInputChange} />
//       </label>
//       <br></br>
//       <label>
//         URL:
//         <input type="text" onChange={handleInputChange} />
//       </label>
//       <div className="submit">
//         <button type="submit">Add Video</button>
//       </div>
//     </form>
//   );
// }

// export default AddVideoForm;


function AddVideoForm({ onAddVideo, fetchVideos }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/videos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        url: url,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchVideos();
        setTitle("");
        setUrl("");
      })
      .catch((error) => {
        console.log("error:", error);
      });
    if (!title || !url) return;
    const newVideo = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      url: url,
      rating: 0,
    };
    onAddVideo(newVideo);
    setTitle("");
    setUrl("");
  };

  function handleInputChange(event) {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "url") {
      setUrl(event.target.value);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
      </label>{" "}
      <br></br>
      <label>
        URL:
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit" className="submit">Add Video</button>
    </form>
  );
}

export default AddVideoForm;
