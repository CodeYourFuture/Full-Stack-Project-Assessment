import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
  return (
    <li>
      <NavLink to={props.link} exact={props.exact}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
