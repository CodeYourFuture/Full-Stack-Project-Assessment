import React, { useState } from "react";

const AddVideo=({addVideo})=>{
    const [title,setTitle]=useState("");
    const[url,setUrl]=useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let rating=0;

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!title || !url) {
    setErrorMessage("Please enter a Title and URL");
    return;
  }
  try {
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, url ,rating}),
    });
    const data = await response.json();
    if (data.success) {
      addVideo({ title, url });
      setTitle("");
      setUrl("");
    } else {
      setErrorMessage(data.message);
    }
  } catch (error) {
    setErrorMessage(error.message);
  }
};
    return (
      <div className="video-adder">
        <form onSubmit={handleSubmit}>
          <label for="title">Add Title </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label for="url">Add Url</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit">Add Video</button>
        </form>
      </div>
    );

}







export default AddVideo; 