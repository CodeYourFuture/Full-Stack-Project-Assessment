import classes from './Footer.module.css';

const Footer = (props) => {
  return (
    <footer>
      <p>Made with Love</p>{' '}
      <img
        class="emoji"
        alt="heart"
        height="20"
        width="20"
        src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
      ></img>
    </footer>
  );
};

export default Footer;
