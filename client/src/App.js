import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import VideosBoard from "./Components/VideosBoard";
import AddBar from "./Components/AddBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [videoData, setVideoData] = useState();
  const [isDataUpdating, setIsDataUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log("app is render");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log("fetching data again");
        setVideoData(data);
        setIsLoading(false);
        // setIsUpdatingData(false);
      });
  }, [isDataUpdating, isLoading]);

  return (
    <>
      <Navbar />
      <AddBar
        setVideoData={setVideoData}
        videoData={videoData}
        setIsDataUpdating={setIsDataUpdating}
        isDataUpdating={isDataUpdating}
      />
      {isLoading ? (
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <VideosBoard
          videoData={videoData}
          setVideoData={setVideoData}
          setIsDataUpdating={setIsDataUpdating}
          isDataUpdating={isDataUpdating}
        />
      )}
    </>
  );
}

export default App;
