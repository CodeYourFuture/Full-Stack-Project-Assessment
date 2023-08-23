import { useState } from "react";
import exampleresponse from "../exampleresponse.json";
import OneVideoCard from "./OneVideoCard";
const VideoList = ({ keyword }) => {
  const [videoCards, setVideoCards] = useState(exampleresponse);

  const handleDelete = (idVideo) => {
    setVideoCards(videoCards.filter((video) => video.id !== idVideo));
  };
  return (
    <>
      {/* <h1 className="blink_me">Loading.....</h1> */}
      <section className="p-5">
        <div className="container">
          <div className="row row-cols-auto text-center custom-gap ">
            {videoCards
              .filter((video) => {
                if (keyword === "") {
                  return video;
                } else if (
                  video.title.toLowerCase().includes(keyword.toLowerCase())
                ) {
                  return video;
                }
              })
              .map((video) => (
                <OneVideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  rating={video.rating}
                  url={video.url.replace("watch?v=", "embed/")}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default VideoList;
