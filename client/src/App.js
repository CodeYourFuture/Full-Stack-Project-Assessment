import "./App.css";
import Video from "./components/Video";
import Search from "./components/Search";
import ItemVideo from "./components/ItemVideo";
import { useEffect, useState } from "react";
let datalist;
function App() {
  const [list, setList] = useState();
  useEffect(() => {
    fetch("/videos")
      .then((response) => response.json())
      .then((data) => {
        datalist = data.sort((a, b) => b.rating - a.rating);
        setList(datalist);
      });
  }, []);
  return (
    <div className="App">
      <header className="header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="input-section">
        <Video />
        <Search />
      </div>
      <div className="video-list">
        {list === undefined ? (
          <p>loadind...</p>
        ) : (
          list.map((video) => {
            return <ItemVideo key={video.id} {...video} />;
          })
        )}
      </div>
    </div>
  );
}

export default App;
