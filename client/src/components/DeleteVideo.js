const DeleteVideo = ({video, handleDelete}) => {
  return <button onClick={() => handleDelete(video.id)}>Delete</button>;
};

export default DeleteVideo;
