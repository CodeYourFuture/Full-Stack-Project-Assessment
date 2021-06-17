import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useGlobalContext } from "../context";
import Search from "./Search";


const VideoForm = () => {
    const date = new Date()
    console.log(date)
    const { data, setData } =useGlobalContext();
    const [clicked, setClicked] = useState(false)
    const [addVideo, setAddVideo] = useState({
        id:uuidv4(),
        title:"",
        url:"",
        rating:0,
        date:`${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`
    });
    const openform = () => {
        clicked ?  setClicked(false) : setClicked(true)
    }
    const handleInput = (event) => {
        const newVideo = { ...addVideo, [event.target.id]: event.target.value };
        setAddVideo(newVideo)
    }

    const add = (e) => {
        e.preventDefault();
        if(!addVideo.url.includes("youtube.com")){
            alert("make sure you have added youTube videos")
        }else if(!addVideo.title){
            alert("please make sure you have added title of your video")
        }else {
            setData(data.concat(addVideo));
            setAddVideo({
                id:uuidv4(),
                title:"",
                url:"",
                rating:0,
                date:""
                })

        }
    }
    return (
        <div  className="d-flex justify-content-between " style={{ width:"70%", marginLeft:"10rem", height:"12rem"  }}>
            <div>
           { <button className="btn btn-primary m-3"  onClick={openform}>{clicked ? "Close [X]" : "Add Video"}</button> }
            {clicked ? 
            <form className="needs-validation" noValidate>
                <div className="form-floating">
                    <label htmlFor="title">Title</label>
                    <input 
                    type="text"
                    className="form-control" 
                    id="title" 
                    placeholder="Title"
                    value={addVideo.title}
                    onChange={handleInput}
                    required
                     />
                </div>
                <div className="form-floating">
                    <label htmlFor="url">URL</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="url" 
                    placeholder="Url"
                    value={addVideo.url}
                    onChange={handleInput}
                    required
                    />
                </div>
                <div>
                    <button className="btn btn-success m-2" onClick={add}>Add</button>
                    <button className="btn btn-danger" onClick={openform}>Cancel</button>
                </div>
                </form> : null }
            </div>
            
                <Search />

        </div>
    )
}

export default VideoForm;