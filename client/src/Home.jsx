import { useState } from "react";
import Header from "./Header";
import DisplayVideos from "./DisplayVideos";
import NewVivdeo from "./NewVideo";

function Home() {
  const [refreshVideos, setRefreshVideos] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div className="App">
      <Header toggleForm={toggleForm} />
      <NewVivdeo
        showForm={showForm}
        toggleForm={toggleForm}
        setRefreshVideos={setRefreshVideos}
      />
      <DisplayVideos
        setRefreshVideos={setRefreshVideos}
        refreshVideos={refreshVideos}
      />
    </div>
  );
}

export default Home;
