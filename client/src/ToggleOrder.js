import DescButton from "./Components/DescButton";
import AscButton from "./AscButton";
const ToggleOrder = (props) => {
  const { data, setData } = props;
  return (
    <div>
      <DescButton data={data} setData={setData} />
      <AscButton data={data} setData={setData} />
    </div>
  );
};
export default ToggleOrder;
