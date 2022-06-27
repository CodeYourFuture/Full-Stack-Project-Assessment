import React, { useState } from "react";
import "./AddVideo.css"
// import SearchIcon from '@mui/icons-material/Search';

function AddVideo({setVideos}) {
    // const [videos, setVideos] = useState(videosData);
    const [addTitle, setAddTitle] = useState('');
    const [addUrl, setAddUrl] = useState('');

    function addVideoTitle(e) {
        e.preventDefault()
        setAddTitle(e.target.value);
      }
     
      function addVideoUrl(e) {
       e.preventDefault()
       setAddUrl(e.target.value);
      }

      function addVideo(e) {
        e.preventDefault();
        let videoObj = {title: addTitle, url: addUrl}
         
      
        let newData= [previous => previous, videoObj]
        setVideos(newData);
       }

    

  return (
    <div className="search">
    <form onSubmit={addVideo}>
      <div className="searchInput">
          <label for="exampleInput">Title</label>
          <input type="text" 
          placeholder="Enter title"
          value={addTitle}
          onChange={addVideoTitle}/>
          <div>
              
          </div>
      </div>

      <div className="form-group">
          <label for="exampleInputEmail1">Url</label>
          <input type="text" 
          placeholder="Enter url"
          value={addUrl}
          onChange={addVideoUrl}/>
      </div>
     
      <button type="submit" className="btn btn-primary">Submit </button>
      </form>
</div>


   
  )
}



export default AddVideo;
