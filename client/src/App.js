import "./App.css";
import VideoCard from "./Components/VideoCard";
import Header from "./Components/Header";
import AddVideo from "./Components/AddVideo";
import ToggleOrder from "./Components/ToggleOrder";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://full-stack-project-videos.herokuapp.com")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <Header />
      <AddVideo data={data} setData={setData} />
      <ToggleOrder setData={setData} />
      <VideoCard data={data} setData={setData} />
    </div>
  );
}

export default App;
