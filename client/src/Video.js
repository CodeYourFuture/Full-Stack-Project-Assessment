import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import YouTubeEmbed from "./YouTubeEmbed";
import "bootstrap/dist/css/bootstrap.css";

function Video({
  id,
  title,
  url,
  rating,
  videoData,
  setVideoData,
  setUrl,
}) {
  const handleOnClick = (e) => {
    const selected = e.currentTarget.id;

    if (selected === "dislike") {
      videoData.map((item) => {
        if (id === item.id) {
          item.rating--;
          setVideoData([...videoData]);
        }
        return videoData;
      });
    } else if (selected === "like") {
      videoData.map((item) => {
        if (item.id === id) {
          item.rating++;
          setVideoData([...videoData]);
        }
        return videoData;
      });
    }
  };

  return (
    <div className="video-container">
      <p>{title}</p>
      <div className="vote-container">
        <LikeIcon handleOnClick={handleOnClick} />
        <p>
          <span>{rating}</span> Vote
        </p>
        <DislikeIcon id={id} handleOnClick={handleOnClick} />
      </div>
      <YouTubeEmbed url={url} title={title} setUrl={setUrl} />
      <DeleteButton
        videoData={videoData}
        setVideoData={setVideoData}
        id={id}
      />
    </div>
  );
}

export default Video;
