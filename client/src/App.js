import { useEffect, useState } from "react";
import VideoForm from "./components/VideoForm";
import VideoLists from "./components/VideoLists";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [videoForm, setVideoForm] = useState(false);
  const [allVideos, setAllVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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
        {isLoading ? (<div className="spinner">
        <FontAwesomeIcon icon={faSpinner} spin />
            <p>Loading...</p>
        </div>) : (
          allVideos && <VideoLists allVideos={allVideos} getAllVideos={getAllVideos} />)}
      </main>
    </div>
  );
}

export default App;
