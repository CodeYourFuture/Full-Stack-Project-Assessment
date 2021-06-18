import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import VideosBoard from "./Components/VideosBoard";
import AddBar from "./Components/AddBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [videoData, setVideoData] = useState();
  const [isDataUpdating, setIsDataUpdating] = useState(false);
  console.log("app is render");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setVideoData(data);
        // setIsUpdatingData(false);
      });
  }, [isDataUpdating]);

  return (
    <>
      <Navbar />
      {/* <SearchBar /> */}
      <AddBar
        setVideoData={setVideoData}
        videoData={videoData}
        setIsDataUpdating={setIsDataUpdating}
        isDataUpdating={isDataUpdating}
      />
      <VideosBoard
        videoData={videoData}
        setVideoData={setVideoData}
        setIsDataUpdating={setIsDataUpdating}
        isDataUpdating={isDataUpdating}
      />
    </>
  );
}

export default App;
