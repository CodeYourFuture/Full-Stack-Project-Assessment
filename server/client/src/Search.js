import "./App.css";
import React, { useState } from 'react';
import uploadedVideoData from "./data/uploadedVideoData.json";
let videoData = uploadedVideoData;
function Uploadvideo() {
  /*function isValidURL(url) {
    const pattern = /^(https?:\/\/)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/i;
    return pattern.test(url);
  }

  
////////////////////
/*const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (title.trim() === '') {
          return  (alert('Title cannot be empty.'));
      
    }
    
    if (!isValidURL(url)) {
      return (alert('Please enter a valid URL.'));
      
    }
    
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    
    const submission = {
      id: (videoData[(videoData.length-1)].id)+1,
      rating:0,
      title: title,
      url: url.split('watch?')[0]+'embed/'+url.split('?')[1],
      submittedAt: formattedDate
    };
     // Construct the URL for the server route
  const serverUrl = "/videos"; // Replace with your server route

  // Send the form data to the server
  fetch(serverUrl, {
    method: "POST",
    body: JSON.stringify(submission),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    console.error("Error:", error);
  });

   
    
   
  };*/
  
/////////////

const [showForm, setShowForm] = useState(false);
  
  const handleButtonClick = () => {
    if (!showForm) {
      setShowForm(true);
    }

  };
  const handleCancelButtonClick = () => {
    if (showForm) {
      setShowForm(false);
    }

  };
  

  return (
    
      <div>
        <button class="uploadVideo_btn" onClick={handleButtonClick}>
      
        Upload Video
      </button>
      
      {/* //onSubmit={handleSubmit} id="form" */}
      {showForm && (
        <div class="container"> <form action="/videos" method="POST" >
        <div>
          <label htmlFor="title">Title:</label>
          <input id="title"type="text" /*value={title}*/ class="input" name="title" onChange={(e)=>setTitle(e.target.value)}required></input>
        </div>
        <div>
          <label htmlFor="url">url:&nbsp;&nbsp;&nbsp;</label>
          <input id="url" /*value={url}*/class="input" type="url"  name="url" onChange={(e)=>setURL(e.target.value)}required></input>
        </div>
        <div class="formBtn">
          <button class="cancelBtn" onClick={handleCancelButtonClick}>Cancel</button>
          <button class="uploadBtn" type="submit">Upload</button>
        </div>
      </form></div>
       
      )}
      
        </div>
  
  );
}
function Searchvideo() {
  return (
    <div>
      <label for="searchid">Search:</label>
      <input id="searchid" type="text" class="searchVideo" name="search"></input>
    </div>
  );
}

export default function Search() {
  return (
    <div class="search">
      <Uploadvideo />
      <Searchvideo />
    </div>
  );
}
