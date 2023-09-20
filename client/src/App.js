import "./App.css";
import { useEffect, useState } from "react";
import VideoCard from "./components/VideoCard";
import AddVideo from "./components/AddVideo";

function App() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(true); // true up , false down

  useEffect(() => {
      const dataFetch = async () => {
        await fetch("https://fs-assesment-server.onrender.com/videos")
          .then((response) => response.json())
          .then((newdata) => {
            if (sort) {
              newdata.videos.sort((r1, r2) => {
                return r2.rating - r1.rating;
              });
            } else {
              newdata.videos.sort((r1, r2) => {
                return r1.rating - r2.rating;
              });
            }
            setData(newdata);
          });
      };
    dataFetch();
    console.log("data is fetched");
  }, [data]);

  const deleteHandle = (id) => {
    fetch(`https://fs-assesment-server.onrender.com/videos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedData = data.filter((video) => video.id !== id);
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });
  };

  const addVideo = (title, url, date) => {
    let randomRate = Math.floor(Math.random() * 50 + 1);
    const newVideo = {
      title: title,
      url: url,
      rating: randomRate,
      date: date,
    };

    fetch("https://fs-assesment-server.onrender.com/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then(() => {
        setData([...data, data.item[0]]);
      })
      .catch((error) => {
        console.error("Error adding video:", error);
      });
  };

  function sortVideos() {
    if (data) {
      if (sort) {
        data.videos.sort((r1, r2) => {
          return r2.rating - r1.rating;
        });
      } else {
        data.videos.sort((r1, r2) => {
          return r1.rating - r2.rating;
        });
      }
      setSort(!sort);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Video Recommendation</h1>
      </header>
      <AddVideo addVideo={addVideo} />
      <div className="sort-button">
        <button onClick={sortVideos}>{sort ? "Down" : "Up"}</button>
      </div>
      <div className="video-cards">
        {data.videos &&
          data.videos.map((video) => (
            <VideoCard
              key={video.id}
              url={video.url}
              title={video.title}
              rating={video.rating}
              date={video.date}
              delete={() => deleteHandle(video.id)}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
