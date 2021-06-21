import SingleVideo from "./SingleVideo";
import "./Videos.css";

const Videos = ({ videosData }) => {
  return (
    <section className="videos">
      {videosData.map((video, index) => {
        return <SingleVideo video={video} key={index} />;
      })}
    </section>
  );
};

export default Videos;
