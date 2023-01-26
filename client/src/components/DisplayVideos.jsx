import React from "react";
import CountLike from "./CountLike";

function DisplayVideos({ data, setData }) {
  const deleteVideo = (e) => {
    console.log(e.target.id);
    let videos = [...data];
    const newArray = videos.filter((video) => video.id !== Number(e.target.id));
    setData(newArray);
  };
  return (
    <div>
      <div>
        {data &&
          data.map((vid) => {
            return (
              <div key={vid.id}>
                <div>
                  <h3>{vid.title}</h3>
                  <iframe
                    width="560"
                    height="315"
                    src={vid.url.replace("watch?v=", "embed/")}
                    title={vid.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p>Rating: {vid.rating}</p>
                  <CountLike />
                  <button id={vid.id} onClick={deleteVideo}>
                    Delete
                  </button>
                </div>

                <br />
                <br />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DisplayVideos;
