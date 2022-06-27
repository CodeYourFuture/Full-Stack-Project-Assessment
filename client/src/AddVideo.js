import React, { useState } from "react";
import "./AddVideo.css"
// import SearchIcon from '@mui/icons-material/Search';

function AddVideo({videosData, placeholder, addVideoTitle, addVideoUrl,addVideo}) {
    // const [addTitle, setAddTitle] = useState("")
    // const [addUrl, setAddUrl] = useState("")

    // function handleChangeTitle(e) {
    //     setAddTitle(e.target.value)
    // }

    // function handleChangeUrl(e) {
    //     setAddUrl(e.target.value)
    // }

  return (
      <div className="search">
          <div className="serachInput">
              <input type="text" placeholder={placeholder} onChange={addVideoTitle}/>
              <button onClick={addVideo}>Add Video</button>
              <div className="searchIcon">
                  {/* <SearchIcon /> */}
              </div>
          </div>
          {/* <div className="dataResult">
              {videosData.map((value, key) => {
                  return <div>
                     {value.title} 
                  </div>
              })}
          </div> */}
      </div>
  )
}



export default AddVideo;
