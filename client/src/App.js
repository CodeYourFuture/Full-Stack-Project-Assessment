import { useState } from "react";
import "./App.css";
import AddVideo from "./components/AddVideo";
import Search from "./components/Search";
import SingleVideo from "./components/SingleVideo";
import data from "./exampleresponse.json";

function App() {
  const [list, setList] = useState(data.sort((a, b) => b.rating - a.rating));

  function handleRemove(id) {
    const newList = list.filter((video) => video.id !== id);
    setList(newList);
  }

  function searchVideo(text) {
    const newList = data.filter((video) => video.title.toLowerCase().includes(text.toLowerCase()));
    if (text === "") {
      setList(data);
    } else {
      setList(newList);
    }
  }

  function addNewVideo(obj) {
    const newList = [...list, obj];
    setList(newList);
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="input-section">
        <AddVideo addNewVideo={addNewVideo} />
        <Search searchVideo={searchVideo} />
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
