import React, { useState } from "react"; //use to array

export default function AddVideo({addVideo}){
  
    const [titleVideo,setTitleVideo]=useState("");
    const[urlYoutube,seturlYoutube]=useState("");
    const [showInputs,setShowInputs] = useState(false);
  
    const handleSubmit = event=>{
      event.preventDefault();
       if (titleVideo && urlYoutube) {
        addVideo({titleVideo,urlYoutube,rating:0});
        setTitleVideo("");
        seturlYoutube("");
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
              value={titleVideo}
              onChange={(e) => setTitleVideo(e.target.value)}
              required
            />

            <label for="urlYoutube">Add url Youtube</label>
            <input
              id="url"
              type="text"
              value={urlYoutube}
              onChange={(e) => seturlYoutube(e.target.value)} //target return the element where the event occured
              required
            />
            <button className = "add-video-button" onClick = {handleSubmit} type="submit">Add Video</button>
            <button  className = "cancel-button margin-left" onClick = {()=>{setShowInputs(false)}} >Cancel</button>
          </form>:null}
        </div>
    </div>    

    );

}

