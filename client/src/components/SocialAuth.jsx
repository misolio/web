import Google from "../assets/images/google.svg";
import Facebook from "../assets/images/facebook.svg";

export default function SocialAuth({ onGoogle, onFacebook }) {
  return (
    <div className="social-buttons">
      <button type="button" className="btn-google" onClick={onGoogle}>
        <img src={Google} alt="Google" className="lang-icon" /> Google
      </button>

      <button type="button" className="btn-facebook" onClick={onFacebook}>
        <img src={Facebook} alt="Facebook" className="lang-icon" /> Facebook
      </button>
    </div>
  );
}
