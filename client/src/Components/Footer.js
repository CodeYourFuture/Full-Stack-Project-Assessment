const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-dark text-light text-center p-4 position-relative"
    >
      <div className="container">
        <p className="lead">Copyright &copy; 2023 Andrius Isin</p>

        <a
          href="#"
          aria-label="Go to top"
          className="position-absolute top-0 end-0 p-3"
        >
          <i className="bi bi-arrow-up-circle h1"></i>
        </a>
      </div>
    </footer>
  );
};
export default Footer;
