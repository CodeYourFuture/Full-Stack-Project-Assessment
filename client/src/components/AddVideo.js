import React from "react";
import Title from "./Title";
import { Link } from "react-router-dom";

function AddVideo({videos, setVideos}) {


  return (
    <div className="d-flex flex-column d-flex justify-content-around  ">
      <Title />
      <Link to="/" className="position-relative">
          <button className="btn  m-2 text-info position-absolute  top-0 end-0  translate-middle-x">Home Page</button>
      </Link>
      <div className="p-5">
    
      <h5>Add Video</h5>
      <form style={{width:"60%"}}>
        <div className="mb-3">
          <label for="title" className="form-label"> Title </label>
          <input type="text" className="form-control" id="title" />
        </div>
        <div className="mb-3">
          <label for="url" className="form-label"> URL</label>
          <input type="url" className="form-control" id="url" />
        </div>

        <button type="submit" className="btn btn-warning text-white mx-2">Cancel</button>
        <button type="submit" className="btn btn-danger text-white">ADD</button>
      </form>   
      
      </div>
    
    </div>
  );
}

export default AddVideo;
