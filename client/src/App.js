import { useState } from "react";
import "./App.css";
import Header from "./Header";
import DisplayVideos from "./DisplayVideos";
import NewVivdeo from "./NewVideo";

function App() {
  const [refreshVideos, setRefreshVideos] = useState(false);
  return (
    <div className="App">
      <Header />
      <NewVivdeo setRefreshVideos={setRefreshVideos} />
      <DisplayVideos
        setRefreshVideos={setRefreshVideos}
        refreshVideos={refreshVideos}
      />
    </div>
  );
}

export default App;
