import Card from "./Card";

const VideoCards = ({ video }) => {
  // @param {int} - videoID will always match the video.id in the database
  // filters the data to remove the video the user clicked on
  // const removeVideo = (videoID) =>
  //   setData((data) => data.filter((video) => video.id !== videoID));

  return (
    <div id="card-container">
      <Card video={video} />
    </div>
  );
};

export default VideoCards;
