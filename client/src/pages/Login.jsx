import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider, facebookProvider } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import SocialAuth from "../components/SocialAuth";
import { ensureUserProfile } from "../components/ensureUserProfile";

import OpenEyes from "../assets/images/open_eyes.webp";
import CloseEyes from "../assets/images/close_eyes.webp";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      await ensureUserProfile(userCredential.user); // 🔥 ГАРАНТОВАНО
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await ensureUserProfile(result.user);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await ensureUserProfile(result.user);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>{t("log.title")}</h1>
      <p>{t("log.subtitle")}</p>

      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <label>{t("log.email")}</label>
          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="password-field">
          <label>{t("log.password")}</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <img
              className="password-toggle-img"
              src={showPassword ? OpenEyes : CloseEyes}
              alt="toggle password"
              onClick={togglePassword}
            />
          </div>
        </div>

        <button type="submit">{t("log.loginButton")}</button>
      </form>

      <div className="social-login">
        <p>{t("log.orLoginWith")}</p>

        <SocialAuth
          onGoogle={handleGoogleLogin}
          onFacebook={handleFacebookLogin}
        />
      </div>
    </div>
  );
}
