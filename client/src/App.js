import { useEffect, useState } from "react";
import VideoForm from "./components/VideoForm";
import VideoLists from "./components/VideoLists";

function App() {
  const [videoForm, setVideoForm] = useState(false);
  const [allVideos, setAllVideos] = useState([]);

  const getAllVideos = async (searchText, MoviesOrder) => {
    let order = "";
    if (MoviesOrder === undefined || MoviesOrder === "desc") {
      order = "desc";
    } else {
      order = "asc";
    }

    try {
      let url = `${process.env.REACT_APP_SERVERURL}/?order=${order}`;
      if (searchText) {
        url += `&search=${searchText}`;
      }
      const response = await fetch(url);
      if (!response.status === 200) {
        throw new Error("something went wrong!");
      }
      const data = await response.json();
      setAllVideos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Video Recommendation</h1>
      </header>
      <main>
        <div style={{ textAlign: "center", margin: "1rem" }}>
          <button className="new-btn" onClick={(e) => setVideoForm(true)}>
            Add New video
          </button>
          {videoForm && (
            <VideoForm
              setVideoForm={setVideoForm}
              getAllVideos={getAllVideos}
            />
          )}
        </div>
        <VideoLists allVideos={allVideos} getAllVideos={getAllVideos} />
      </main>
    </div>
  );
}

export default App;
