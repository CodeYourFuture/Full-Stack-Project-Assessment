import exampleresponse from "../exampleresponse.json";
import OneVideoCard from "./OneVideoCard";
const VideoList = () => {
  return (
    <>
      <section className="p-5">
        <div className="container">
          <div className="row row-cols-auto text-center custom-gap ">
            {exampleresponse.map((video) => (
              <OneVideoCard
                id={video.id}
                title={video.title}
                rating={video.rating}
                url={video.url.replace("watch?v=", "embed/")}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default VideoList;
