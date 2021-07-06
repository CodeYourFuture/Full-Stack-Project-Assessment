import "./App.css";
import React, { useEffect, useState } from "react";

import DisplayVideos from "./DisplayVideos";
//import videos from "./data/video.json";
import Search from "./Search";
import AddVideo from "./AddVideo";
import OrderList from "./OrderList";

function App() {
  const [videoList, SetVideoList] = useState([]);
  const [videosFiltered, setVideoFiltered] = useState([]);
  const [isAdded, setIsAdded] = useState(0);
  const [order, setOrder] = useState("desc");
  const [searchKey, setSearchKey] = useState("");
  const fetchData = () => {
    fetch(`http://localhost:5000/?order=${order}`)
      .then((res) => res.json())
      .then((data) => {
        SetVideoList(data);
        setVideoFiltered(search(searchKey));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, [order, videoList]);

  const handleSortButton = (isAsc) => {
    const sort = isAsc ? "asc" : "desc";
    setOrder(sort);
  };

  const handleDeleteButton = (id) => {
    //setVideoFiltered(videosFiltered.filter((video) => video.id !== id));

    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("from fetch", data);
      });
    // const changeOrder = order === "asc" ? "desc" : "asc";
    // setOrder(changeOrder);
    console.log("deleted");
  };

  const search = (searchWord) => {
    console.log(searchKey);
    const result = searchKey
      ? videoList.filter((video) =>
          video.title.toLowerCase().includes(searchKey)
        )
      : videoList;
    //setVideoFiltered(result);
    console.log(searchKey);
    return result;

    //console.log(videosFiltered);
  };

  const addVideo = (title, urlId) => {
    const url = `https://www.youtube.com/watch?v=${urlId}`;
    fetch(`http://localhost:5000`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, url }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    // const changeOrder = order === "asc" ? "desc" : "asc";
    // setOrder(changeOrder);
    setIsAdded(1);
  };
  return (
    <div className="App">
      <header className="App-header ">
        <h1>Video Recommendation</h1>
      </header>
      <div className="row ">
        <AddVideo addVideo={addVideo} isAdded={isAdded} />
        <OrderList handleSortButton={handleSortButton} />
        <Search search={search} setSearchKey={setSearchKey} />
      </div>
      <div className="container">
        <div className="row">
          {videosFiltered.map((video, index) => (
            <DisplayVideos
              video={video}
              handleDeleteButton={handleDeleteButton}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
