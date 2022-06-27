import React, { useState, useEffect } from "react";
import "./App.css";
// import exampleData from "./exampleData.js";
import Header from "./Header";
import SearchBar from "./SearchBar";
import AddVideoForm from "./AddVideoForm";
import VideosList from "./VideosList";
import Footer from "./Footer";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = React.useState([]);
  console.log(data);

  //Search
  const handleSearch = (e) => {
    e.preventDefault();
    let searchTerm = e.target.value;
    const searchResult = data.filter((element) => {
      return element.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredData(searchResult);
  };

  //Add Video
  const addVideo = (title, url) => {
    let newVideo = {
      id: uuidv4(),
      title,
      url,
      rating: 0,
    };

    let addedVideoData = data.concat(newVideo);
    console.log(`Added video : ${newVideo.title}`);
    setData(addedVideoData);
  };

  //Remove Video
  const removeVideo = (id) => {
    const dataCopy = [...data];
    console.log(`removed video with id: ${id}`);
    const index = dataCopy.findIndex((video) => {
      return video.id === id;
    });
    dataCopy.splice(index, 1);
    setData(dataCopy);
  };

  const displayFilteredData =
    filteredData.length > 0 ? (
      <VideosList delete={removeVideo} data={filteredData} />
    ) : (
      <VideosList delete={removeVideo} data={data} />
    );

  //       useEffect(() => {
  //     ...
  //   }, []);

  //   return <img src={imgSrc} />;
  // }

  useEffect(() => {
    fetch(`http://localhost:5000/`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <Header />
      <SearchBar handleSearch={handleSearch} />
      <main>
        <AddVideoForm addVideo={addVideo} />
        <div>{displayFilteredData}</div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
