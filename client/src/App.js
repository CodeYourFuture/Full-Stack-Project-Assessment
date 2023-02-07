import { useState } from "react";
import "./App.css";
import AddVideo from "./components/AddVideo";
import Search from "./components/Search";
import SingleVideo from "./components/SingleVideo";
import data from "./exampleresponse.json";

function App() {
  const [list, setList] = useState(data);

  function handleRemove(id) {
    const newList = list.filter((video) => video.id !== id);
    setList(newList);
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="input-section">
        <AddVideo />
        <Search />
      </div>
      <div className="video-list">
        {list.map((video) => {
          return <SingleVideo key={video.id} {...video} handleRemove={handleRemove} />;
        })}
      </div>
    </div>
  );
}

export default App;
