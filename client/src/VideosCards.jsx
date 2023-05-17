import { React } from "react";
import "./VideosCards.css";

export const VideosCards = ({ videos, setVideos }) => {
  // const [videos, setVideos] = useState(video);

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete", data);
        setVideos(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const increaseRating = (id) => {
    let newData = [];
    newData = videos.map((video) =>
      video.id === id ? { ...video, rating: video.rating + 1 } : video
    );
    return setVideos(newData);
  };

  const decreaseRating = (id) => {
    let newData = [];
    newData = videos.map((video) =>
      video.id === id ? { ...video, rating: video.rating - 1 } : video
    );
    return setVideos(newData);
  };

  // console.log(videos);

  const Card = (v) => {
    return (
      <div className="cardContainer" key={v.id}>
        <iframe
          height="240"
          src={v.url.replace("watch?v=", "embed/")}
          title={v.title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h6>{v.title}</h6>
        <span className="UpDownVote">
          <i class="fa fa-thumbs-up" onClick={() => increaseRating(v.id)}></i>
          {v.rating}
          <i class="fa fa-thumbs-down" onClick={() => decreaseRating(v.id)}></i>
        </span>

        <button
          className="deleteButton"
          onClick={() => handleDeleteClick(v.id)}
        >
          Delete Video
        </button>
      </div>
    );
  };

  return (
    <div className="allCardsContainer">
      {videos.map((video) => Card(video))}
    </div>
  );
};
