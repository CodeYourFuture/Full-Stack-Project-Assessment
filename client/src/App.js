import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import AllVideosPage from "./pages/AllVideosPage";
import AddVideoPage from "./pages/AddVideoPage";

const App = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState("desc");

  const getAllVideos = async (order = "desc", searchText = "") => {
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
      console.log(error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getAllVideos(order);
  }, [order]);

  return (
    <>
      <header className="app-header">
        <h1>Video Recommendation</h1>
      </header>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <AllVideosPage
              allVideos={allVideos}
              getAllVideos={getAllVideos}
              isLoading={isLoading}
              order={order}
              setOrder={setOrder}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage
              allVideos={allVideos}
              getAllVideos={getAllVideos}
              order={order}
            />
          }
        />
        <Route
          path="/add-video"
          element={<AddVideoPage getAllVideos={getAllVideos} />}
        />
      </Routes>
    </>
  );
};

export default App;
