import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../assets/styles/home.css";
import BannerImage from "../assets/images/cinamonroll2.webp";
import Walk from "../assets/images/walk.webp";
import  useProducts  from "../hooks/useProducts"; 

export default function MainPage() {
  const { t } = useTranslation();
  const { allProducts } = useProducts();

  const latestProducts = [...allProducts]
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .slice(0, 4);

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
        <div className="products-preview">
        {latestProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.primary_image_url} alt={product.product_name} />
            <h3 className="product-title">
              <a
                href={product.product_url}    
                target="_blank"             
                rel="noopener noreferrer"
                className="product-title"
              >
                {product.product_name}
              </a>
            </h3>
            
          </div>
          ))}
          <Link to="/recomendation" className="btn-arrow">
            →
          </Link>

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
