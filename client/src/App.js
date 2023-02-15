import "./App.css";
import Search from "./components/Search";
import Add from "./components/Add";
// import list from "./exampleresponse.json";
import Singlevideo from "./components/SingleVideo";
import { useState, useEffect } from "react";

let data;

function App() {
  //   199-1  Ordering Results
  // data.sort((a, b) => b.rating - a.rating);
  //   199-1  Ordering Results

  const [list, setList] = useState(undefined);

  useEffect(() => {
    fetch("/videos") ///GET
      .then((response) => response.json())
      .then((videos) => {
        data = videos.sort((a, b) => b.rating - a.rating);
        setList(data);
      });
  }, []);

  const handleRemove = (Id) => {
    const newList = list.filter((movie) => movie.id !== Id);
    setList(newList);
    // level 250- fetch delete video in server
    fetch("/videos/" + Id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const handelSearch = (value) => {
    const newList = data.filter((movie) => {
      let title = movie.title.toLowerCase();
      return title.includes(value.toLowerCase());
    });
    setList(newList);
  };

  const handelSave = (title, url) => {
    const obj = {
      // id: Math.random() * (10000 - 1000) + 1000,
      title: title,
      url: url,
      rating: 0,
      uploadedDate: new Date().toLocaleString("en-US", { hour12: false }),
    };
    data = data.concat([obj]);

    setList(data);
    //  level 250- fetch in add new video to server
    fetch("/videos", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json(obj))
      .then((res) => console.log(res));
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
          {list === undefined ? (
            <p>Loading</p>
          ) : (
            list.map((video) => {
              return (
                <Singlevideo
                  key={video.id}
                  {...video}
                  handleRemove={handleRemove}
                />
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
