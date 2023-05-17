function DeleteVideo({ video, videos, setVideos }) {
  function handleDeleteVideo(videoID) {
    const updatedVideos = videos.filter((video) => video.id !== videoID);
    setVideos(updatedVideos);
  }

  return (
    <button onClick={() => handleDeleteVideo(video.id)}>Remove Video</button>
  );
}

export default DeleteVideo;
