import "./Footer.css";

export const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="footer-columns">
          <div class="footer-column">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div class="footer-column">
            <h3>Useful Links</h3>
            <ul class="footer-links">
              <li>
                <a href="/videos">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Contact Us</h3>
            <p>123 Street, City, Country</p>
            <p>Email: info@example.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>&copy; 2023 Your Website. All rights reserved.</p>
          <ul class="social-icons">
            <li>
              <a href="#">
                <i class="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
