import React, { useState } from "react";




const SearchVideo = (prop) => {
    let videos = prop.videos;
  const [videoSearch, setvideo] = useState("");
  
  
  const [newvideo, setNewVideo] = useState([{}]);
    const handleChange = (e) => {
        setvideo(e.target.value.toLowerCase());

        setNewVideo(videos.filter(video => video.title.toLowerCase().includes(videoSearch) || 
        video.url.toLowerCase().includes(videoSearch)))
      }
    
   
    


  

  
  return (
    <>
     
          
      <form
       
              
        className="addvideo-form"
       
              
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="addvideo">
          <label htmlFor="title" name ="title">
            Search video
            <input
              className="input"
              type="text"
              name="title"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
   
      
        <div className="addvideo">
          <button onClick={() => prop.onClick(newvideo)}>Search Video</button>
         
        </div>
      </form>{" "}
    </>
  );
};

export default SearchVideo;
