import { useTranslation } from "react-i18next";
import "../assets/styles/recomendation.css";

import FiltersPanel from "../components/recommendations/FiltersPanel";
import ProductsList from "../components/recommendations/ProductsList";
import UserPreferences from "../components/recommendations/UserPreferences";

import useUserProfile from "../hooks/useUserProfile";
import useProducts from "../hooks/useProducts";
import useRecommendationsFilter from "../hooks/useRecommendationsFilter";

export default function RecommendationsPage() {
  const { t } = useTranslation();

  const { profile, loadingProfile } = useUserProfile();
  const { allProducts, loadingProducts } = useProducts();
  

  const {
    filteredProducts,
    filters,
    setters,
    meta
  } = useRecommendationsFilter(allProducts, profile);

  if (loadingProfile || loadingProducts) {
    return <p>Loading recommendations...</p>;
  }

  return (
    <div>

      <FiltersPanel
        t={t}
        {...filters}
        {...setters}
        {...meta}
      />

      <ProductsList products={filteredProducts} />
    </div>
  );
}
