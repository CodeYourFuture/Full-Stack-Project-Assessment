import "./App.css";
import Main from "./Components/Main";
import AddVidoes from "./Components/addVideo";
// import data from "./exampleresponse.json";
import { useEffect, useState } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setVideos([...data]));
  }, []);
  function addVideos(video) {
    setVideos([...videos, video]);
  }
  function decRating(id, rating) {
    if (rating > 0) {
      setVideos(
        videos.map((vd) =>
          vd.id === id ? { ...vd, rating: vd.rating - 1 } : vd
        )
      );
    }
  }
  function incRating(id) {
    setVideos(
      videos.map((vd) => (vd.id === id ? { ...vd, rating: vd.rating + 1 } : vd))
    );
  }
  function deletev(id) {
    setVideos(videos.filter((vd) => vd.id !== id));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
     
      <Main addVideos={addVideos} />
      <AddVidoes
        videos={videos}
        decRating={decRating}
        incRating={incRating}
        deletev={deletev}
      />
    </div>
  );
}

export default App;