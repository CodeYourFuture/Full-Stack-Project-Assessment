import React, { useState, useEffect } from "react";
import "../App.css";
// import data from "../exampleresponse.json";
import VideoPanel from "./VideoPanel";
import Search from "./Search";
import Add from "./Add";
import axios from "axios";
// import Delete from "./Delete";

function App() {
  const [allData, setAllData] = useState([]);
  const [videos, setVideos] = useState(allData);
  const searchHandler = (searchText) => {
    let filteredVid = allData.filter((video) =>
      video.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setVideos(filteredVid);
  };

  // useEffect(() => {
  //   axios.get("http://localhost:5000/").then((res) => setVideos(res.data));
  // }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .get("https://videoss-db.herokuapp.com/")
      .then((res) => setVideos(res.data));
  };

  const deleteHandler = (id) => {
    // let filteredVid = allData.filter((video) => video.id !== id);
    // // setVideos(filteredVid);
    // setAllData(filteredVid);
    axios.delete(`https://videoss-db.herokuapp.com/${id}`).then((res) => {
      if (res.status === 200) loadData();
    });
  };
  // const updateRating = (id, rate) => {
  //   const foundVideo = allData.find((video) => video.id === id);
  //   foundVideo.rating = rate;
  //   console.log(rate);
  // };
  const handleSet = (newVideo) => {
    setAllData((previous) => previous.concat(newVideo));
  };
  useEffect(() => {
    setVideos(allData);
  }, [allData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Add allData={allData} handleSet={handleSet} loadData={loadData}/>
      <Search searchHandler={searchHandler} />
      <main>
        {videos
          .sort((a, b) => b.rating - a.rating)
          .map((video) => (
            <>
              <VideoPanel
                key={video.id}
                video={video}
                // updateRating={updateRating}
              />
              {/* <Delete videoId={video.id} deleteHandler={deleteHandler} /> */}
              <button
                onClick={() => {
                  deleteHandler(video.id);
                }}
              >
                DELETE
              </button>
            </>
          ))}
      </main>
    </div>
  );
}

export default App;
