import React, { useState } from "react";
import "./App.css";
import AddVideo from "./AddVideo";
// import Video from "./Video";
import VideoSearch from "./VideoSearch";
import ExampleResponse from "./exampleresponse.json";
import AllVideos from "./AllVideos";
import Footer from "./Footer";

function App() {
  const [id, setId] = useState(0);
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
      id: id,
      title: title,
      url: url,
      rating: 0,
    };
    setId((id) => id + 1);
    data.push(newVideo);
  };

  // Prop Function to remove a video
  const removeVideo = (id) => {
    const dataCopy = [...data];
    console.log(`removed video with id:${id}`);
    const index = dataCopy.findIndex((video) => {
      return video.id === id;
    });
    dataCopy.splice(index, 1);
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
        <div className="video-cards">
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
