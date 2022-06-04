const UpVoteButton = (props) => {
  const { counter, setCounter } = props;
  const onClickHandler = () => {
    setCounter(() => {
      return counter + 1;
    });
  };
  return (
    <div>
      <button onClick={onClickHandler}>Like</button>
    </div>
  );
};
export default UpVoteButton;
