const DeleteButton = (props) => {
  const { videoId, setData } = props;
  const deleteRequest = async () => {
    const response = await fetch(
      `https://full-stack-project-videos.herokuapp.com/${videoId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    setData(data);
  };

  const handleClick = async () => {
    await deleteRequest();
  };
  return (
    <button className="gradient-button" onClick={handleClick}>
      Remove Video
    </button>
  );
};
export default DeleteButton;
