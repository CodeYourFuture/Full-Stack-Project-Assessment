const AscButton = (props) => {
  const { data, setData } = props;
  console.log(data);

  const onClickHandle = () => {
    setData(
      data.sort((a, b) =>
        a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0
      )
    );
    console.log(data);
  };
  return <button onClick={onClickHandle}>order by least liked</button>;
};
export default AscButton;
