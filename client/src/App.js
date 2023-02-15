import "./App.css";
import Header from "./Componets/Header/Header";
import Main from "./Componets/Main/Main";
import ShowVidoes from "./Componets/ShowVideos/ShowVidoes";
import data from "./data/exampleresponse.json";
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
      <Header />
      <Main addVideos={addVideos} />
      <ShowVidoes
        videos={videos}
        decRating={decRating}
        incRating={incRating}
        deletev={deletev}
      />
    </div>
  );
}

export default App;
