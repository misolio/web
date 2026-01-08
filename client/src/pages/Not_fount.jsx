import { useTranslation } from "react-i18next";
import Error from "../assets/images/error.webp";
import "../assets/styles/notFound.css";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1>{t("notFound.title")}</h1>
        <h2>{t("notFound.subtitle")}</h2>

        <img src={Error} alt={t("notFound.title")} />

        <div className="not-found__hint">
          {t("notFound.hint")}
        </div>
      </div>
    </div>
  );
}
