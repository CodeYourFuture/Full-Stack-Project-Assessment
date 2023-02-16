import React, {useState} from "react";
import "./compStyle.css"


export const Forms = ({callback}) => {

const [addVideo, setAddVideo] = useState(true)

const showNewSection = () => setAddVideo(true);
const hideNewSection = (e) => {
  e.preventDefault()
  setAddVideo(false)
}

const validateInput = (e) => {
  e.preventDefault()
  
let newUrl = document.getElementById("enterurl").value;
let newTitle = document.getElementById("title").value


  let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(newUrl.match(p)){
      
        let addNewVideo = {
          url : newUrl,
          title :newTitle,
        }
        callback(addNewVideo)
    }else {
      alert("Not a valid youtube url");
    return false;
    }
}

    return (
  <form>
  <div className="m-5">
  <p className="text-primary cursoring" onClick={showNewSection}>Add Video</p>
  <div className= {addVideo ? "d-block" : "d-none"}>
    <div className="row mb-3">
      <label htmlFor="title" className="col-sm-1 col-form-label">Title</label>
      <div className="col-sm-3">
        <input type="text" className="form-control" id="title" placeholder="Enter Title"/>
      </div>
    </div>
    <div className="row mb-3">
      <label htmlFor="enterurl" className="col-sm-1 col-form-label">URL</label>
      <div className="col-sm-3">
        <input type="url" className="form-control" id="enterurl" placeholder="Enter URL"/>
      </div>
    </div>        
    <div className="col-auto">
      <button onClick={hideNewSection} className="btn btn-primary">Clear</button>
      <button onClick={validateInput} type="submit" className="btn btn-primary ml-3">Add</button>
    </div>                 
  </div>
  </div>
  </form>
    )
}
