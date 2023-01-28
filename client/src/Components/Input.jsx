import React from 'react'
import { useState } from 'react';
 


function Input(props) {
     const [clicked, setClicked] = useState(false);

      function handleInputDisplay(e) {
        e.target ? setClicked(true) : setClicked(false);
        console.log(e.target.color1)
      }

       function handleCancel() {
         setClicked(false);
       }

    
  return (
    <div>
      <div className="search">
        <button color1 = "true" onClick={handleInputDisplay}>Add Video</button>
        <div>
          <label htmlFor="search">Search</label>
          <input type="search" id="search" />
        </div>
      </div>

      <div className={clicked ? "input-section" : "hidden"}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={props.handleChange}
          value={props.reqBody.title}
        />

        <label htmlFor="url">URL</label>
        <input
          type="text"
          name="url"
          id="url"
          onChange={props.handleChange}
          value={props.reqBody.url}
        />

        <button onClick={handleCancel}>Cancel</button>
        <button onClick={props.handleSubmit}>Add</button>
      </div>
    </div>
  );
}

export default Input
