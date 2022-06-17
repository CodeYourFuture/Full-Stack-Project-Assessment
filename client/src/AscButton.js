const AscButton = (props) => {
  const { setData } = props;

  const changeOrder = async () => {
    const response = await fetch("http://127.0.0.1:5000/?order=asc");
    const data = await response.json();
    setData(data);
  };
  const onClickHandler = async () => {
    await changeOrder();
  };
  return <button onClick={onClickHandler}>order by least liked</button>;
};
export default AscButton;
