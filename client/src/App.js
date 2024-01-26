import "./App.css";
import { useEffect, useState } from "react";
import VideoCard from "./components/VideoCard";
import AddVideo from "./components/AddVideo";

function App() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(true); // true up , false down

  useEffect(() => {
    const dataFetch = async () => {
      await fetch("https://full-stack-aws-server.vercel.app/")
        .then((response) => response.json())
        .then((newdata) => {
          let sortedData = [...newdata]; // Create a copy of the array to avoid mutating the original array

          if (sort) {
            sortedData.sort((r1, r2) => r2.rating - r1.rating);
          } else {
            sortedData.sort((r1, r2) => r1.rating - r2.rating);
          }
          console.log(sortedData)
          setData(sortedData);
        });
    };

    dataFetch();
  }, [sort]);

  const deleteHandle = (id) => {
    fetch(`https://full-stack-aws-server.vercel.app/${id}`, {
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
    };

    fetch("https://full-stack-aws-server.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then(() => {
        setData([...data, newVideo]);
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
        {data &&
          data.map((video) => (
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
