const DeleteButton = (props) => {
  const { data, index, setData } = props;

  const handleClick = () => {
    const filteredData = data.filter((item, i) => i !== index);
    setData(filteredData);
  };
  return (
    <button className="gradient-button" onClick={handleClick}>
      Remove Video
    </button>
  );
};
export default DeleteButton;
