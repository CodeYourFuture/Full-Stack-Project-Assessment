import ReactPlayer from "react-player/youtube";

function createVideoPlayer(URL) {
  return (
    <ReactPlayer
      url={`https://www.youtube.com/embed/${URL.split("=")[1]}`}
      controls={true}
    ></ReactPlayer>
  );
}

export default createVideoPlayer;
