import SingleVideo from "./SingleVideo";

const Videos = ({ searchingData, count, setCount }) => {
  return (
    <div>
      {searchingData.map((video) => (
        <SingleVideo video={video} key={video.id} />
      ))}
    </div>
  );
};

export default Videos;
