import React, { useState, useEffect } from "react";
import "../App.css";
// import data from "../exampleresponse.json";
import VideoPanel from "./VideoPanel";
import Search from "./Search";
import Add from "./Add";
import axios from "axios";
// import Delete from "./Delete";
const path = "https://videoss-db.herokuapp.com/";

function App() {
  const [allData, setAllData] = useState([])
  const [videos, setVideos] = useState(allData)
  const searchHandler = (searchText) => {
    let filteredVid = allData.filter((video) =>
      video.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    setVideos(filteredVid)
  }
  const deleteHandler = (id) => {
    axios.delete(path + id).then((res) => {
      loadData()
    })
  }

  const loadData = () => {
    axios.get(path).then((res) => {
      console.log(res.data)
      setAllData(res.data)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    // console.log(allData)
    setVideos(allData)
  }, [allData])
  console.log(path)

  return (
    <div className="App">
      <header className="m-5">
        <h1>Video Recommendation</h1>
      </header>
      <Add allData={allData} loadData={loadData}/>
      <Search searchHandler={searchHandler} />
      <main >
        {videos
          .sort((a, b) => b.rating - a.rating)
          .map((video) => (
            <>
              <VideoPanel
                key={video.id}
                video={video}
                deleteHandler = {deleteHandler}
                // updateRating={updateRating}
              />
              {/* <Delete videoId={video.id} deleteHandler={deleteHandler} /> */}

            </>
          ))}
      </main>
    </div>
  );
}

export default App;
