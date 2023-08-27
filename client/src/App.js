import { useState } from "react";
import "./App.css";
import Header from "./Header";
import VideosPerent from "./VideosPerent";
import NewVivdeo from "./NewVideo";

function App() {
  const [refreshVideos, setRefreshVideos] = useState(false);
  return (
    <div className="App">
      <Header />
      <NewVivdeo setRefreshVideos={setRefreshVideos} />
      <VideosPerent
        setRefreshVideos={setRefreshVideos}
        refreshVideos={refreshVideos}
      />
    </div>
  );
}

export default App;
