import React, { useState } from "react"
const NewVideos=()=>{
  

    const addVideo=(event)=>{
        const newVideo = {
          title: event.target.title,
          url: event.target.url,
          id: 1,
          rating: 5,
        };
      //  TODO let id = 1
      return setAllVideos(allVideos.concat([newVideo]));
    }
    return (
      <div>
        <form>
          <label for="title" name="title" >
            Title:
          </label>
          <input type="text" name="title" />
          <label for="url" name="url">
            url:
          </label>
          <input type="text" name="url" />
          <button onClick={addVideo}> Add Video</button>
        </form>
      </div>
    );
}
export default NewVideos;