import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/login.css";
import SocialButtons from "../components/SocialAuth";
import OpenEyes from "../assets/images/open_eyes.webp";
import CloseEyes from "../assets/images/close_eyes.webp";

import { auth, db, facebookProvider, } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  // Додати це

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        email: user.email,
        provider: "password",
        createdAt: serverTimestamp(),
      });

      navigate("/");
    } catch (error) {
      console.error("Помилка реєстрації:", error.message);
      alert(error.message);
    }
  };

  
  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          firstName: user.displayName?.split(" ")[0] || "",
          email: user.email,
          photoURL: user.photoURL,
          provider: "google",
          createdAt: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Google auth error:", error.message);
      alert(error.message);
    }
  };
  
  const handleFacebookRegister = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          firstName: user.displayName?.split(" ")[0] || "",
          email: user.email || "",
          photoURL: user.photoURL,
          provider: "facebook",
          createdAt: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      console.error("Facebook auth error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>{t("reg.title")}</h1>
      <p>{t("reg.subtitle")}</p>

      <form className="login-form" onSubmit={handleRegister}>
        <div>
          <label>{t("reg.firstName")}</label>
          <input
            type="text"
            placeholder={t("reg.firstNamePlaceholder")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>{t("reg.email")}</label>
          <input
            type="email"
            placeholder={t("reg.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="password-field">
          <label>{t("reg.password")}</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("reg.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              className="password-toggle-img"
              src={showPassword ? OpenEyes : CloseEyes}
              onClick={togglePassword}   
            />
          </div>
        </div>



        <button type="submit">{t("reg.registerButton")}</button>
      </form>

      <div className="social-login">
        <p>{t("reg.orRegisterWith")}</p>

        <SocialButtons
          onGoogle={handleGoogleRegister}
          onFacebook={handleFacebookRegister}
        />
      </div>
    </div>
  );

}
