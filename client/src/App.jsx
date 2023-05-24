import { useState, useEffect } from "react";
import Header from "./components/Header";
import VideosPage from "./components/VideosPage";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [videos, setVideos] = useState([]);

  const [sort, setSort] = useState("desc");

  // this is my absolute jank way around having to implement context:
  const [refreshVideos, setRefreshVideos] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let url = `${import.meta.env.VITE_API_URL}/videos`;
        // handling for /videos?order=asc && /videos?order=desc
        if (sort === "asc" || sort === "desc") {
          url += `?order=${sort}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        console.log("useEffect fetchData data:", data);
        if (data.error) {
          setIsError(data.error);
          setVideos([]);
        }
        if (data.success) {
          setIsError(false);
          setVideos(data.payload);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
        setErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [sort, refreshVideos]);

  return (
    <div id="App">
      <Header
        setRefreshVideos={setRefreshVideos}
        sort={sort}
        setSort={setSort}
      />
      <VideosPage
        videos={videos}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
        setRefreshVideos={setRefreshVideos}
      />
    </div>
  );
}

export default App;
