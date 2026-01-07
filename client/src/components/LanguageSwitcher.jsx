import { useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import "../assets/styles/LanguageSwitcher.css";
import Earth from "../assets/images/earth.svg"

export default function LanguageSwitcher() {
  const { t, i18n: i18nInstance } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = ["uk", "en"];
  const currentLang = i18nInstance.language;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setOpen(false);
  };

  return (
    <div className="lang-switcher">
      <button
        className="lang-button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change language"
      >
        <img src={Earth} alt="Earth" className="lang-icon" />
      </button>

      {open && (
        <ul className="lang-menu">
          {languages
            .filter((lang) => lang !== currentLang)
            .map((lang) => (
              <li key={lang}>
                <button
                  className="lang-item"
                  onClick={() => changeLanguage(lang)}
                >
                  {t(`lang.${lang}`)}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
