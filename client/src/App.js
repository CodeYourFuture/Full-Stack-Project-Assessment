import { useState, useEffect } from "react";
import "./App.css";
import AddVideo from "./Components/AddVideo";
import AllVideos from "./Components/AllVideos";
// import exampleresponse from "./Components/exampleresponse.json";

function App() {
  const [videos, setVideos] = useState([]);
  const [refreshPage, setRefreshPage] = useState(0);
  useEffect(() => {
    fetch(`https://paulina-full-stack-project-server.onrender.com/videos`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          throw new Error(
            `Encountered something unexpected: ${res.status} ${res.statusText}`
          );
        }
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((Error) => console.log(Error));
  }, [refreshPage]);

  return (
    <div className="container-fluid">
      <header className="row">
        <h1 className="text-center mt-2 mb-5 pb-5 pt-5 font">
          Video Recommendation
        </h1>
      </header>
      <AddVideo
        setVideos={setVideos}
        videos={videos}
        refreshPage={refreshPage}
        setRefreshPage={setRefreshPage}
      />
      <AllVideos videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default App;
