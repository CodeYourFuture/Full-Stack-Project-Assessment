import React, { useState } from "react";

function AddVideoForm() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setName("");
    setLink("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
    Title:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
   
      <label>
        URL:
        <input type="text" value={link} onChange={handleLinkChange} />
      </label>
    
      <button type="submit">Add</button>     
    </form>
  );
}

export default AddVideoForm;
