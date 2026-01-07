import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../assets/styles/home.css";
import BannerImage from "../assets/images/cinamonroll2.webp";
import SampleProduct from "../assets/images/cinamonroll1.webp";
import Walk from "../assets/images/walk.webp";

export default function MainPage() {
  const { t } = useTranslation();

  return (
    <div className="main-page">
      <section className="hero-banner">
        <img src={BannerImage} alt="Hero Banner" className="banner-image" />
        <div className="banner-text">
          <h1>{t("main.heroTitle")}</h1>
          <p>{t("main.heroSubtitle")}</p>
          <Link to="/recomendation" className="btn-primary">
            {t("main.exploreProducts")}
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>{t("main.featuresTitle")}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>{t("main.feature1.title")}</h3>
            <p>{t("main.feature1.description")}</p>
          </div>
          <div className="feature-card">
            <h3>{t("main.feature2.title")}</h3>
            <p>{t("main.feature2.description")}</p>
          </div>
          <div className="feature-card">
            <h3>{t("main.feature3.title")}</h3>
            <p>{t("main.feature3.description")}</p>
          </div>
        </div>
      </section>

      <section className="recommended-section">
        <h2>{t("main.recommendedTitle")}</h2>
        <div className="products-preview">
          {[1,2,3,4].map(i => (
            <div key={i} className="product-card">
              <img src={SampleProduct} alt="Sample Product" />
              <h3>{t(`main.sampleProductName${i}`)}</h3>
              <p>{t("main.sampleProductDescription")}</p>
              
            </div>
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="info-text">
          <h2>{t("main.aboutTitle")}</h2>
          <p>{t("main.aboutDescription")}</p>
          <Link to="/profile" className="btn-primary">
            {t("main.viewProfile")}
          </Link>
        </div>
        <div className="info-image1">
          <img src={Walk} alt="About us" />
        </div>
      </section>
    </div>
  );
}
