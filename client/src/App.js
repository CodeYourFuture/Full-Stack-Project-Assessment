import React, { useState } from "react";
import "./App.css";
import AddVideo from "./AddVideo";
// import Video from "./Video";
import VideoSearch from "./VideoSearch";
import ExampleResponse from "./exampleresponse.json";
import AllVideos from "./AllVideos";
import Footer from "./Footer";

function App() {
  const [data, setData] = useState(ExampleResponse);
  const [filteredVideos, setFilteredVideos] = useState([]);
  console.log(data);

  // Search Function
  const search = (e) => {
    e.preventDefault();
    let searchVal = e.target.value;
    console.info("TO DO!", searchVal);

    const filteredResult = data.filter((element) => {
      return element.title.toLowerCase().includes(searchVal.toLowerCase());
    });
    setFilteredVideos(filteredResult);
  };
  //Prop Function to add video into data
  const addVideo = (title, url) => {
    let newVideo = {
      id: Math.floor(Math.random() * 100000),
      title: title,
      url: url,
      rating: Math.floor(Math.random() * 10000),
    };

    let updatedData = data.concat(newVideo);
    console.log(`Added video :${newVideo.title}`);
    setData(updatedData);
  };

  // Prop Function to remove a video
  const removeVideo = (id) => {
    const dataCopy = [...data];
    const index = dataCopy.findIndex((video) => {
      return video.id === id;
    });
    dataCopy.splice(index, 1);
    console.log(`removed video with id:${id}`);
    setData(dataCopy);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <VideoSearch search={search} />
      </header>
      <main>
        <AddVideo addVideo={addVideo} />

        <div>
          {filteredVideos.length > 0 ? (
            <AllVideos delete={removeVideo} data={filteredVideos} />
          ) : (
            <AllVideos delete={removeVideo} data={data} />
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
