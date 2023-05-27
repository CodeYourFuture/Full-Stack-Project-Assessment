import { useEffect, useState } from "react";
import { AddVideo } from "./AddVideo";
import "./App.css";
import { VideosCards } from "./VideosCards";
import { OrderButton } from "./OrderButton";
// import data from "./exampleresponse.json";

function App() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/?order=${order}`, {
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status code ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        setError("Error", error);
      });
  }, [order]);
  console.log(error);

  return (
    <div className="App">
      <header className="App-header">
        <a href="/index.html" alt="Play button animation" className="play-btn">
          .
        </a>
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo videos={videos} setVideos={setVideos} />
      <OrderButton
        videos={videos}
        setVideos={setVideos}
        order={order}
        setOrder={setOrder}
      />
      <VideosCards videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default App;
