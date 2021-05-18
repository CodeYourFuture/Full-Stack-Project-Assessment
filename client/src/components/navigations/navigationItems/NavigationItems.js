import NavigationItem from './navigationItem/NavigationItem';

const NavigationItems = (props) => {
  return (
    <ul>
      <NavigationItem link="/" exact>
        Main Page
      </NavigationItem>
      <NavigationItem link="/upload">Add Video</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
