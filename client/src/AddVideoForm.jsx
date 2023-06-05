import React, { useState } from "react";

function AddVideoForm ({newVideoAdded}) {
    const [title, setTitle] = useState("");
    const [url, setUrl]= useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title || !url) return;
    const newVideo= {
        id: Math.floor(Math.random()*1000000),
        title: title,
        url: url,
        rating: 0,
    };
    newVideoAdded(newVideo);
    setTitle("");
    setUrl ("");
  }

  return (
    <form onSubmit={handleSubmit}>
        <label>
            Title:
            <input type='text' value={title} onChange={(event)=> setTitle(event.target.value)} />
        </label>
        <label>
            URL:
            <input  type='text' value={url} onChange={(event)=> setUrl(event.target.value)} />
        </label>

        <div className ='submit'>
            <button type='submit'>
                Add Video
            </button>
        </div>    

    </form>
  );
}


export default AddVideoForm;
