import { FaFacebook, FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";
import Cinamonroll from "../assets/images/cinamonroll.webp";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>📞 +380 12 345 6789</p>
          <p>✉️ skincare@gmail.com</p>
        </div>

        <div className="footer-right">
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://t.me/mysite" target="_blank" rel="noreferrer"><FaTelegram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <img src={Cinamonroll} alt="Cinamonroll" className="footer-logo" />
        <p>© 2026 SkinCare</p>
      </div>
    </footer>
  );
}
