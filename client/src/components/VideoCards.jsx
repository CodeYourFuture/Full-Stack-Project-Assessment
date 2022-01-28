import Card from "./Card";

const VideoCards = ({ data, setData }) => {
  // @param {int} - videoID will always match the video.id in the database
  // filters the data to remove the video the user clicked on
  const removeVideo = (videoID) =>
    setData((data) => data.filter((video) => video.id !== videoID));

  return (
    <div id="card-container">
      {data.map((video) => (
        <Card
          video={video}
          key={video.title + "-" + video.id}
          clickEvent={removeVideo}
        />
      ))}
    </div>
  );
};

export default VideoCards;
