import React, { useState } from 'react';
import './AddVideo.css';

function AddVideo({ videos, setVideos }) {
    const [clickAdd, setClickAdd] = useState(false);
    const[titleInput, setTitleInput] = useState("");
    const[urlInput, setUrlInput] = useState("");
    
    const handleAddVideoButton = () => {
        setClickAdd(!clickAdd);
    };

    const handleTitleInputChange = (e) => {
        setTitleInput(e.target.value);
    };

    const handleUrlInputChange = (e) => {
        let url = e.target.value;
        if(url.includes('https://www.youtube.com/')){
          url = url.replace('watch?v=', 'embed/');
            setUrlInput(url);
        }else{
            alert('Invalid URL format. Please provide a YouTube URL!');
            setUrlInput('');
        }
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();

           let newVideo = {
            id: Date.now(),
            title: titleInput,
            url: urlInput,
            rating: 0,
        };

        fetch("http://localhost:5000/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newVideo),
        })
        .then((response) => response.json())
        .then((data) => {
            setVideos((videos) => [...videos, newVideo]);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

        setTitleInput('');
        setUrlInput('');
    };

  return (
    <div className="addVideoContainer">
       <button className="addVideo" 
       onClick={handleAddVideoButton}>
        Add video
        </button>

      {clickAdd && (
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
      )}
      </div>
  );
} 

export default AddVideo;