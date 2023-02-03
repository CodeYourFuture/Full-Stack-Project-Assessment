import React, { useState } from "react";

const AddVideo = ({newVideo}) =>{
    const [title, setTitle] = useState("");
    const[url, setUrl] = useState("");
    
const handleChange = (e) => {
  if (e.target.name === "title") {
    setTitle(e.target.value);
  }
  if (e.target.name === "url") {
    setUrl(e.target.value);
  }

};
const handleSubmit = (e) => {
  e.preventDefault();
  const video = {
    title,
    url
  };
  fetch("http://localhost:5000/videos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(video),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
  alert("Video added successfully");
  window.location.reload() 

};
    // const addVid = () => {
    //     newVideo({title, url})
    // }
    return (
      <div>
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        ></input>
        <br />
        <label for="url">Url:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={handleChange}
        ></input>
        <br/>
        <input type="button" value="Add" onClick={handleSubmit}></input>
      </div>
    );
}
export default AddVideo;
