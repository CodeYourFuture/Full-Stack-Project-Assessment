import { useState, useEffect } from "react";
import Video from "./Video";
import { nanoid } from "nanoid";
import urid from "urid";
import AddVideo from "./AddVideo";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [failure, setFailure] = useState({});
  useEffect(() => {
    async function fetchVideos() {
      try {
        const getVideos = await fetch("http://localhost:5000/");
        const data = await getVideos.json();

        setVideos(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchVideos();
  }, []);
  function handleOnclick(val) {
    const deletedOneVideo = videos.filter((vid) => vid.title !== val);
    setVideos(deletedOneVideo);
  }
  function add(title, url) {
    console.log({ id: urid(6, "num"), title: title, url: url });
    let data = new URLSearchParams();
    data.append("id", urid());
    data.append("title", title);
    data.append("url", url);
    fetch("http://localhost:5000/", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setFailure(data);
        } else {
          setVideos(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const displayVideos = videos.map((vid) => {
    return (
      <Video
        key={nanoid()}
        onclick={handleOnclick}
        title={vid.title}
        url={vid.url}
        rating={vid.rating}
      />
    );
  });
  return (
    <div>
      <div>
        <AddVideo add={add} failure={failure} />
      </div>
      <div className="videoContainer">{displayVideos}</div>
    </div>
  );
}

export default Videos;
