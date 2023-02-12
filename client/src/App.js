import { useState, useEffect } from "react";
import "./App.css";
import AddVideo from "./components/AddVideo";
import Search from "./components/Search";
import SingleVideo from "./components/SingleVideo";

let fetchedList;

function App() {
  const [list, setList] = useState(undefined);

  useEffect(() => {
    fetch("/videos")
      .then((response) => response.json())
      .then((data) => {
        fetchedList = data.sort((a, b) => b.rating - a.rating);
        setList(fetchedList);
      });
  }, []);

  function handleRemove(id) {
    const newList = list.filter((video) => video.id !== id);
    setList(newList);
    fetch("/videos/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  function searchVideo(text) {
    const newList = fetchedList.filter((video) => video.title.toLowerCase().includes(text.toLowerCase()));
    if (text === "") {
      setList(fetchedList);
    } else {
      setList(newList);
    }
  }

  function addNewVideo(obj) {
    const newList = [...list, obj];
    setList(newList);
    fetch("/videos", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
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
        {list === undefined ? (
          <p>loadind...</p>
        ) : (
          list.map((video) => {
            return <SingleVideo key={video.id} {...video} handleRemove={handleRemove} />;
          })
        )}
      </div>
    </div>
  );
}

export default App;
