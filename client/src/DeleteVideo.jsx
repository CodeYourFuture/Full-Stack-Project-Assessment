function DeleteVideo({ handleDeleteVideo, video }) {
  return (
    <button onClick={() => handleDeleteVideo(video.id)}>Remove Video</button>
  );
}

export default DeleteVideo;
