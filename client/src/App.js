import React, { useState, useEffect } from "react";
import "./App.css";
// import SampleData from "./SampleData/exampleresponse.json";
import ListVideos from "./components/ListVideos";
import Nav from "./components/Nav";
import FormDisabled from "./components/FormDisabled";

function App() {
  const [VideosInfo, setVideosInfo] = useState([]);
  const [load, isLoaded] = useState(false);
  const [searchVideos, setSearchVideos] = useState([]);

  useEffect(() => {
    console.log("working...")
    // fetch("https://full-stack-zf9k.onrender.com/")
    //   .then((res) => {
    //     if (res.status >= 200 && res.status <= 299) {
    //       return res.json();
    //       consloe
    //     } else {
    //       throw new Error(
    //         `Encountered something unexpected: ${res.status} ${res.statusText}`
    //       );
    //     }
    //   })
    //   .then((data) => {
    //     console.log(`${data} is delivered`)
    //     VideosInfo()
    //     isLoaded(true)
    //   });

    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setVideosInfo(data)
        isLoaded(true)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [load]);

  console.log(VideosInfo);

  const addVideo = (title, url) => {
    let newVideo = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      url: url,
      rating: Math.floor(Math.random() * 10000),
    };
    let updatedList = VideosInfo.concat(newVideo);
    setVideosInfo(updatedList);
  };

  // search prop function
  const search = (e) => {
    e.preventDefault();
    let searchQuery = e.target.value;
    console.log("searching:", searchQuery);

    const filteredResult = VideosInfo.filter((element) => {
      return element.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setSearchVideos(filteredResult);
  };

  // remove a video prop function
  const removeVideo = (id) => {
    const videoCopy = [...VideosInfo];
    console.log(`removed video with id:${id}`);
    const index = videoCopy.findIndex((video) => {
      return video.id === id;
    });
    videoCopy.splice(index, 1);
    setVideosInfo(videoCopy);
  };

  // <AddVideo addVideo={addVideo} />

  return (
    <div className="App">
      <Nav search={search} />

      <header className="App-header">
        <h1 className="text-3xl font-bold underline">Video Recommendations</h1>
      </header>

      <div className="body-section" >


        {searchVideos.length > 0 ? (
          <ListVideos data={searchVideos} delete={removeVideo} />
        ) : (
          <ListVideos data={VideosInfo} delete={removeVideo} />
        )}
        <FormDisabled addVideo={addVideo} />
      </div>

    </div>
  );
}

export default App;
