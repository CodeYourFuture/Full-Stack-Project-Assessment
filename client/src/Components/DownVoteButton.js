const DownVoteButton = (props) => {
  const { counter, setCounter } = props;
  const handleClick = () => {
    setCounter(() => {
      return counter - 1;
    });
  };
  return (
    <div>
      <button onClick={handleClick}>Dislike</button>
    </div>
  );
};
export default DownVoteButton;
