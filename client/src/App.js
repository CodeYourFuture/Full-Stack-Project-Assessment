import "./App.css";
import Search from "./components/Search";
import Add from "./components/Add";
import data from "./exampleresponse.json";
import Singlevideo from "./components/SingleVideo";
import { useState } from "react";
 
function App() {
  //   199-1  Ordering Results
  data.sort((a, b) => b.rating - a.rating);
  //   199-1  Ordering Results
  
  const [list, setList] = useState(data);

  const handleRemove = (Id) => {
    const newList = list.filter((movie) => movie.id !== Id);
    setList(newList);
  };

  const handelSearch = (value) => {
    const newList = data.filter((movie) => {
      let title = movie.title.toLowerCase();
      return title.includes(value.toLowerCase());
    });
    setList(newList);
  };

  const handelSave = (title, url) => {
    data = data.concat([
      {
        id: Math.random() * (10000 - 1000) + 1000,
        title: title,
        url: url,
        rating: 0,
        uploadedDate : new Date().toLocaleString('en-US', { hour12: false })
      },
    ]);

    setList(data);
  };

  return (
    <main>
      <header>
        <div className="title">
          <h2> VIDEO LIST</h2>
        </div>
        <div className="search">
          <Search handelSearch={handelSearch} />
        </div>
      </header>
      <section className="content">
        <div className="add">
          <Add handelSave={handelSave} />
        </div>
        <div className="video">
          {list.map((video) => {
            return (
              <Singlevideo
                key={video.id}
                {...video}
                handleRemove={handleRemove}
              />
            );
          })}
        </div>
      </section> 
    </main>
  );
}

export default App;
