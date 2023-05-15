function Votes({ videos, setVideos, video }) {
  function upVote(id) {
    let newVideos = videos.map((eachVideo) => {
      if (eachVideo.id === id) {
        return { ...eachVideo, rating: eachVideo.rating + 1 };
      } else {
        return eachVideo;
      }
    });
    setVideos(newVideos);
  }

  function downVote(id) {
    let newVideos = videos.map((eachVideo) => {
      if (eachVideo.id === id) {
        return { ...eachVideo, rating: eachVideo.rating - 1 };
      } else {
        return eachVideo;
      }
    });
    setVideos(newVideos);
  }
  return (
    <aside>
      <button
        onClick={() => {
          upVote(video.id);
        }}
      >
        Up Vote
      </button>
      <button
        onClick={() => {
          downVote(video.id);
        }}
      >
        Down Vote
      </button>
    </aside>
  );
}

export default Votes;
