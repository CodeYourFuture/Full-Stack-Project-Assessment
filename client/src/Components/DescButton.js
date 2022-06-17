const DescButton = (props) => {
  const { setData } = props;

  const changeOrder = async () => {
    const response = await fetch("http://127.0.0.1:5000/?order=desc");
    const data = await response.json();
    setData(data);
  };
  const onClickHandler = async () => {
    await changeOrder();
  };
  return <button onClick={onClickHandler}>order by most likes</button>;
};
export default DescButton;
