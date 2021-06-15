import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import VideosBoard from "./Components/VideosBoard";
import AddBar from "./Components/AddBar";
import data from "./exampleresponse.json";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  console.log("app is render");
  // useEffect(()=>{

  // },[])
  const [videoData, setVideoData] = useState(data);
  console.log(videoData[0]);
  console.log(videoData);

  return (
    <>
      <Navbar />
      {/* <SearchBar /> */}
      <AddBar setVideoData={setVideoData} videoData={videoData} />
      <VideosBoard videoData={videoData} setVideoData={setVideoData} />
    </>
  );
}

export default App;
