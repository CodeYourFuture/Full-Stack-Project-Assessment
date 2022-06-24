import React, { useState, useEffect, useRef } from "react";
import CardCreator from "./CardCreator";
import Response from "./exampleresponse.json";

let myData = Response;

const Videos = () => {
  const [data, setData] = useState(myData)
  const filteredVideo = id => data.filter(video => video.id !== id)

  const AddVideo = () => {

    const [addVideoData, setAddVideoData] = useState({
      title: '',
      url: '',
    })

    const handleNewVideoData = (event) => {
      event.preventDefault();

      let fieldName = event.target.getAttribute('name');
      let fieldValue = event.target.value;
      let newVideoData = { ...addVideoData };
      newVideoData[fieldName] = fieldValue;
      setAddVideoData(newVideoData)
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      const newVideo = {
        title: addVideoData.title,
        url: addVideoData.url
      }
      const newVideos = [...data, newVideo];
      setData(newVideos);
    }

    return (
      <div className="addVids">
        <div className="searchBars">
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" required="required" onChange={handleNewVideoData} className="searchBar" placeholder="Enter Title" />
            <input type="text" name="url" required="required" onChange={handleNewVideoData} className="searchBar" placeholder="Enter URL" />
            <button type="submit" className="button">Add Video</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        <AddVideo />
      </div>
      <div className="container">
        <CardCreator myData={data} onDelete={(id) => setData(filteredVideo(id))} />
      </div>
    </>
  )
}

export default Videos;