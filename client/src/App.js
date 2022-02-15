import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Components
import UploadVideo from './components/UploadVideo';
import SearchVideo from './components/SearchVideo';
import VideoLayout from './components/VideoLayout';
import { Header } from './components/Header';


function App() {

  const [videoInfo, setVideoInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  const searchingInfo = videoInfo.filter((video) => 
     video.title.toLowerCase().includes(searchTerm.toLowerCase()
  ));

    const sortButton = () => {
      setIsAscending(!isAscending);
    };
    console.log("TESTTTINNG");

    useEffect(() => {
      const url =  `http://127.0.0.1:5000/?order=${isAscending ? "asc" : "desc"}`;
      console.log(url);
      fetch(url)
      .then((res) => res.json())
      .then((videoInfo) => {
        setVideoInfo(videoInfo);
        console.log(videoInfo);
      })
      .catch((err) => console.log(err));
    }, [isAscending]);



  return (
    <div className="App">
      <Header/>
      <div className="search-container">
      <div className="d-flex-- col-md-9">
        <UploadVideo videoInfo={videoInfo} setVideoInfo={setVideoInfo}/>
        <div>
          <h1>Video Recommendation</h1>
        <SearchVideo setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
    </div>
      </div>
      </div>
      <div className="video-container">
        <VideoLayout 
        searchingInfo={searchingInfo}
        videoInfo={videoInfo}
        sortButton={sortButton}
        setVideoInfo={setVideoInfo}
        />
      </div>
    </div>


  );
}
export default App;
