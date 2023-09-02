import React, { useState } from "react";

const Form = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const newVideo = {
    title,
    url,
  }

  fetch("https://junita-full-stack-project-assessment.onrender.com/",{
     method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVideo),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    onAdd(data);
    setTitle("");
    setUrl("");
    
   })
    


  return (
    <form className="form" >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="url"
        placeholder="YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Add Video</button>
    </form>
  );
};

export default Form;
