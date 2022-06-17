const DeleteButton = (props) => {
  const { videoId, setData } = props;
  const deleteRequest = async () => {
    const response = await fetch(`http://127.0.0.1:5000/${videoId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
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
