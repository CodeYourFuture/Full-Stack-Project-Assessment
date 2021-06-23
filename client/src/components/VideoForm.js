import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useGlobalContext } from "../context";
import Search from "./Search";


const VideoForm = () => {
  const date = new Date();
  const { data, setData } = useGlobalContext();
  const [clicked, setClicked] = useState(false)
  const [addVideo, setAddVideo] = useState({
    id: uuidv4(),
    title: "",
    url: "",
    rating: 0,
    date: `${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`
  });
  const openform = () => {
    clicked ? setClicked(false) : setClicked(true)
  }
  const handleInput = (event) => {
    const newVideo = { ...addVideo, [event.target.id]: event.target.value };
    setAddVideo(newVideo)
  }

  // const add = (e) => {
  //     e.preventDefault();
  //     if(!addVideo.url.includes("youtube.com")){
  //         alert("make sure you have added youTube videos")
  //     }else if(!addVideo.title){
  //         alert("please make sure you have added title of your video")
  //     }else {
  //         setData(data.concat(addVideo));
  //         setAddVideo({
  //             id:uuidv4(),
  //             title:"",
  //             url:"",
  //             rating:0,
  //             date:""
  //             })
  //     }
  // }

  const add = event => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addVideo)
    };
    fetch(
      "http://localhost:5000/",
      requestOptions
    )
      .then(response => response.json())
      .then(element => {
        if (!addVideo.url.includes("youtube.com")) {
          alert("make sure you have added youTube videos")
        } else if (!addVideo.title) {
          alert("please make sure you have added title of your video")
        } else {
          setData(data.concat(element));
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
      setAddVideo({
        id: uuidv4(),
        title: "",
        url: "",
        rating: 0,
        date: ""
      })
  };


  return (
    <div className="d-flex justify-content-between " style={{ width: "70%", marginLeft: "10rem", height: "12rem" }}>
      <div>
        {<button className="btn btn-primary m-3" onClick={openform}>{clicked ? "Close [X]" : "Add Video"}</button>}
        {clicked ?
          <form className="needs-validation" noValidate>
            <div className="mb-3 row">
              <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
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
            </div>
            <div className="mb-3 row">
              <label htmlFor="url" className="col-sm-2 col-form-label">URL</label>
              <div className="col-sm-10">
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
            </div>
            <div>
              <button className="btn btn-success m-2" onClick={add}>Add</button>
              <button className="btn btn-danger" onClick={openform}>Cancel</button>
            </div>
          </form> : null}
      </div>

      <Search />

    </div>
  )
}

export default VideoForm;