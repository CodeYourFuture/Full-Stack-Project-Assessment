import Votes from "./Votes";

//we need a title
// an embedded video
//number of votes
//delete button

const VideoContainer = ({
  videoTitle,
  videoRating,
  videoUrl,
  removeVideo,
  videoId,
}) => {
  //console.log(videoTitle);
  const youTubeId = videoUrl.split("=")[1];
  console.log(youTubeId);
  return (
    <div>
      <h2>{videoTitle}</h2>
      <p>{videoRating}</p>
      <Votes />
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${youTubeId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button onClick={() => removeVideo(videoId)}>Delete</button>
    </div>
  );
};
export default VideoContainer;
