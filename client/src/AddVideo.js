import React, { useState } from 'react';
import './AddVideo.css';

function AddVideo({ videos, setVideos }) {
    const [clickAdd, setClickAdd] = useState(false);
    const[titleInput, setTitleInput] = useState("");
    const[urlInput, setUrlInput] = useState("");
    
    const handleAddVideoButton = () => {
        clickAdd === false ? setClickAdd(true) : setClickAdd(false);
    };

    const handleTitleInputChange = (e) => {
        e.preventDefault();
        setTitleInput(e.target.value);
    };

    const handleUrlInputChange = (e) => {
        e.preventDefault();
        let url = e.target.value;
        if(url.includes('https://www.youtube.com/')){
            url = url.replace('watch?v=', 'embed/');
            return setUrlInput(url);
        }else{
            alert('Invalid URL format. Please provide a YouTube URL!');
            setUrlInput("");
        }
    };

    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // const videoId = Math.floor(Math.random() * 1000000);
        // const videoRating = Math.floor(Math.random() * 10000);
        let newVideo = {
        // newVideo = {
        //     id: videoId,
        //     rating: videoRating,
            title: titleInput,
            url: urlInput,
        }
        fetch("http://localhost:5000/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newVideo),
        })
        .then((response) => response.json())
        .then((data) => {
            setVideos((videos) => [...videos, data]);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

        setTitleInput('');
        setUrlInput('');
    };
    
  return (
    <div className="addVideoContainer">
       <button
       
       className="addVideo" 
       href="#" 
       alt="Add video button" 
       onClick={handleAddVideoButton}>
        Add video
        </button>
      {clickAdd === true ? (
        <form onSubmit={handleFormSubmit}>
            <label>
                Title<input type='text' 
                value={titleInput} 
                onChange={handleTitleInputChange} 
                name='title' 
                required />
            </label>
            <label>
            URL<input type="text"
              value={urlInput}
              onChange={handleUrlInputChange}
              name="url"
              required
            />
            <input id="submitBtn" type="submit" />
            </label>
        </form>
      ) : null }  
      </div>
  )
} 

export default AddVideo;