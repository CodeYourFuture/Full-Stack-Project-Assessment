// Style
import { Wrapper } from "./Button.styles";

const Button = ({ label, functionality, buttonClass }) => {
  return (
    <Wrapper>
      <button className={buttonClass} onClick={functionality}>
        {label}
      </button>
    </Wrapper>
  );
};

export default Button;
