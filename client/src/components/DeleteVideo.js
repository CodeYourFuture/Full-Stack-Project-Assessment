const DeleteVideo = ({video, handleDelete}) => {
  return <button className="btn btn-delete" onClick={() => handleDelete(video.id)}>Delete</button>;
};

export default DeleteVideo;
