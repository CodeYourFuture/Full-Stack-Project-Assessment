import React from "react";
// import { useState } from "react";

function AddVideo(props){
    const {formData,handleChange,handleSubmit}=props;
  
    
    return(
        <div className="add-video">
          <form onSubmit={handleSubmit}  >
            <h4>Add Your Suggestion Here</h4>
            <input 
            value={formData.title}
            name="title"
            onChange={handleChange}
            id="add-title" 
            type="text" 
            placeholder="video Title"/>

            <input 
            value={formData.url}
            name="url"
            onChange={handleChange}
            id="add-url" 
            type="url" 
            placeholder="video Url"/>

            <button className="btn" >Add Video</button>
            </form>
         </div>
    )
}

export default AddVideo;