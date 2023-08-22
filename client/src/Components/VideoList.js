import { useState } from "react";
import exampleresponse from "../exampleresponse.json";
import OneVideoCard from "./OneVideoCard";
const VideoList = () => {
  const [videoCards, setVideoCards] = useState(exampleresponse);
  const handleDelete = (id) => {
    setVideoCards(videoCards.filter((video) => video.id !== id));
  };
  return (
    <>
      <section className="p-5">
        <div className="container">
          <div className="row row-cols-auto text-center custom-gap ">
            {videoCards.map((video) => (
              <OneVideoCard
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
