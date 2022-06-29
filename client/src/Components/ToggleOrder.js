import DescButton from "./DescButton";
import AscButton from "./AscButton";
const ToggleOrder = (props) => {
  const { setData } = props;
  return (
    <>
      <DescButton setData={setData} />
      <AscButton setData={setData} />
    </>
  );
};
export default ToggleOrder;
