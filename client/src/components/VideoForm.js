import React, { useState } from "react";
import Search from "./Search";

const VideoForm = () => {
    const [clicked, setClicked] = useState(false)
    const openform = () => {
        clicked ?  setClicked(false) : setClicked(true)
    }

    return (
        <div  className="d-flex justify-content-between" style={{ width:"70%", marginLeft:"10rem", height:"12rem"  }}>
            <div>
           { <button className="btn btn-primary m-3 " onClick={openform}>{clicked ? "Close [X]" : "Add Video"}</button> }
            {clicked ? 
            <>
                <div class="form-floating">
                    <label htmlFor="title">Email address</label>
                    <input type="text" className="form-control" id="title" placeholder="Title" />
                </div>
                <div class="form-floating">
                    <label htmlFor="url">URL</label>
                    <input type="text" className="form-control" id="url" placeholder="Url" />
                </div>
                <div>
                    <button className="btn btn-success m-2">Add</button>
                    <button className="btn btn-danger" onClick={openform}>Cancel</button>
                </div>
                </> : null }
            </div>
            
                <Search />

        </div>
    )
}

export default VideoForm;