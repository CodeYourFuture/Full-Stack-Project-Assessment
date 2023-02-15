import React, { useState } from "react"; //use to array

export default function AddVideo({addVideo}){
    const [showInputs,setShowInputs] = useState(false);
  
    const handleSubmit = async (event)=>{
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const videoTitle = data.get('video-title')
      const videoUrl = data.get('video-url')
      const videoId = 100000 + Math.random() * 900000
       if (videoTitle && videoUrl) {

        const res = await fetch("http://localhost:5000");
        const data = await res.json();

        addVideo({id: videoId, title: videoTitle, url: videoUrl,rating:0});

       }
  }
  

    return (
    <div>
        <button className="show-form-button margin-top-left" onClick={()=>{setShowInputs(true)}} >Add video</button>
      
        <div className="add-container">
        {showInputs? 
        
          <form onSubmit={handleSubmit}>
            <label for="titleVideo">Add title Video </label>
            <input
              id="title"
              type="text"
              name="video-title"
              required
            />

            <label for="urlYoutube">Add url Youtube</label>
            <input
              id="url"
              type="text"
              name="video-url"
              required
            />
            <button className = "add-video-button" type="submit">Add Video</button>
            <button  className = "cancel-button margin-left" onClick = {()=>{setShowInputs(false)}} >Cancel</button>
          </form>:null}
        </div>
    </div>    

    );

}