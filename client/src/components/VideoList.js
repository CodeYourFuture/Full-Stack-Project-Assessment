import React, { useState, useEffect } from "react";
import RatingBtn from "./RatingBtn";
import DeleteBtn from "./DeleteBtn";
import NewVideo from "./NewVideo";
import PopUp from "./PopUp";

function VideoList() {
  const [popBtn, setPopBtn] = useState(false);
  const [youtubeURLS, setYoutubeURLS] = useState([]);
  const [toggleRate, setToggleRate] = useState("desc");

  useEffect(() => {
    fetch("https://127.0.0.1:5000/videos")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res.json());
      })
      .then((data) => setYoutubeURLS(data));
  }, []);

  function removeLastPart(url) {
    let regex = /^.*(youtu.be\/|v\/|u\/w\/|embed\/|watch\?v=|&v=)([^#?]*).*/;
    let match = url.match(regex);
    return match && match[2].length === 11 ? match[2] : null;
  }

  const toggleList = () => {
    setToggleRate(toggleRate === "asc" ? "desc" : "asc");
  };

  const sortedVideos = youtubeURLS.sort((a, b) => {
    if (toggleRate === "asc") {
      return a.rating - b.rating;
    }
    return b.rating - a.rating;
  });

  const videoPlayer = sortedVideos.map((movie, index) => {
    const youtubeId = removeLastPart(movie.url);
    if (!youtubeId) {
      return null;
    }
    const youtubeEmbed = `https://www.youtube.com/embed/${youtubeId}`;
    return (
      <>
        <div key={index} className="card">
          <iframe
            width="560"
            height="315"
            src={youtubeEmbed}
            title="Tsione's YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div>
            <h4 key={movie.title}>{movie.title}</h4>
            <div>
              <span>{movie.rating}</span>
              <RatingBtn
                movie={movie}
                youtube={youtubeURLS}
                setYoutube={setYoutubeURLS}
              />
            </div>
          </div>

          <div>
            <DeleteBtn
              movie={movie}
              youtube={youtubeURLS}
              setYoutube={setYoutubeURLS}
            />
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="buttons">
        <div>
          <button className="jello-horizontal" id="btn1" onClick={toggleList}>
            Sort{" "}
          </button>
        </div>
        <div>
          <button
            className="jello-horizontal"
            id="btn2"
            onClick={() => setPopBtn(true)}
          >
            Add a Video
          </button>
          <PopUp trigger={popBtn} setTrigger={setPopBtn}>
            <NewVideo
              setYoutubeURLS={setYoutubeURLS}
              youtubeURLS={youtubeURLS}
            />
          </PopUp>
        </div>
      </div>
      <div className="cards">{videoPlayer}</div>
    </>
  );
}

export default VideoList;
