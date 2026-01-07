import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import "../assets/styles/nav.css";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Exit from "../assets/images/exit.svg";
import Picture from "../assets/images/nav.webp";

export default function Nav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Помилка виходу:", error.message);
    }
  };

  return (
    <>
      <div className="nav-top">
        {!open && (
          <button
            className="burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
            
          </button>
         
        )}
        <div className="site-name">SkinCare </div>

        <div className="nav-right">
          {!loading && (
            !user ? (
              <>
                <Link to="/register" onClick={() => setOpen(false)}>
                  {t("nav.register")}
                </Link>
                |
                <Link to="/login" onClick={() => setOpen(false)}>
                  {t("nav.login")}
                </Link>
              </>
            ) : (
              <button className="btn-logout" onClick={handleLogout}>
                <img src={Exit} alt="Exit" className="lang-icon" />
              </button>
            )
          )}

          <LanguageSwitcher />
        </div>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      <aside className={`drawer ${open ? "open" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>
          {t("nav.home")}
        </Link>

        <Link to="/profile" onClick={() => setOpen(false)}>
          {t("nav.profile")}
        </Link>
         <Link to="/recomendation" onClick={() => setOpen(false)}>
          {t("nav.recomendation")}
        </Link>
        <img src={Picture} alt="Picture" className="nav-icon" />
      </aside>
    </>
  );
}
