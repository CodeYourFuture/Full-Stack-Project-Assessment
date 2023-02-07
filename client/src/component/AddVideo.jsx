import React, { useState,useEffect } from "react"; //use to array
import exampleresponse from "../exampleresponse.json";
import ListVideo from "./ListVideo";

const AddVideo=({addVideo})=>{
  
    const [titleVideo,setTitleVideo]=useState("");
    const[urlYoutube,seturlYoutube]=useState("");
    const [showInputs,setShowInputs] = useState(false);

    const handleSubmit = event=>{
        event.preventDefault();
         if (titleVideo && urlYoutube) {
          addVideo({titleVideo,urlYoutube});
          setTitleVideo("");
          seturlYoutube("");
         }
        }

        //chamar array e adicionar titulo e url nesse array

    return (
    <div className='addVideo'>
      <div >
        <a href='#0' className="addVideoButton" onClick={()=>{setShowInputs(true)}} style={{fontStyle:'normal',textDecoration:'none',fontSize:'1.2rem'}}>Add video</a>
      
        {showInputs? 
        <form onSubmit={handleSubmit}>
          <label for="titleVideo">Add title Video </label>
          <input
            id="titleVideo"
            type="text"
            value={titleVideo}
            onChange={(e) => setTitleVideo(e.target.value)}
            required
          />

          <label for="urlYoutube">Add url Youtube</label>
          <input
            id="urlYoutube"
            type="text"
            value={urlYoutube}
            onChange={(e) => seturlYoutube(e.target.value)} //target return the element where the event occured
            required
          />
          <button  className = "addVideoCancel" onClick = {()=>{setShowInputs(false)}} >Cancel</button>
          <button className = "addVideoCancel" onClick = {handleSubmit}>Add Video</button>
        </form>:null}
      </div>
    </div>    

    );

}


export default AddVideo; 